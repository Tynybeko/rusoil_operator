import React, { useEffect, useMemo, useState } from 'react'
import { IWork, IWorkProccess, InitialObjectType } from '../../types'
import { Button } from '../UI'
import { PRIMARY_API } from '../../axios'
import MiniLoading from '../loading/MiniLoading'
import ErrorAlert from '../alerts/Error'
import { AxiosError } from 'axios'
import AuthModal from '../auth/AuthModal'
import { useAppDispatch } from '../../redux/hooks'
import OperatorActions from '../../redux/slices/operator'



const errorInitialValue: InitialObjectType = {
    title: '',
    desc: ''
}


interface EmployeerProps {
    person: IWork
}

export default function Emloyeer({ person }: EmployeerProps) {
    const dispatch = useAppDispatch()
    const [workProcess, setWorkProcess] = useState<IWorkProccess[] | null>(null)
    const [checkAuth, setCheckAuth] = useState({
        process: '',
        open: false
    })
    const [error, setError] = useState(errorInitialValue)
    const { active, disactive } = useMemo(() => {
        if (!workProcess) return {}
        const active = workProcess.find(item => item.status)
        const disactive = workProcess.find(item => item.status == false)
        return {
            active,
            disactive
        }
    }, [workProcess])
    const [loading, setLoading] = useState(false)
    const getData = () => {
        setLoading(true)
        PRIMARY_API.get('/work-process/', {
            params: {
                work: person.id,
                work__employee: person.employee.id,
                ordering: '-id',
                limit: 5
            }
        })
            .then(res => setWorkProcess(res.data.results))
            .catch((e: any) => {
                setError({
                    title: e?.message,
                    desc: e?.response?.data?.detail ?? 'Ошибка при получени смен'
                })
            })
            .finally(() => setLoading(false))
    }
    useEffect(() => {
        getData()
    }, [])


    const openWorkProcess = async () => {
        setLoading(true)
        try {
            const { data } = await PRIMARY_API.post('/work-process/', {
                start_time: new Date(),
                work: person.id
            })
            dispatch(OperatorActions.add({...data, work: person}))
            getData()
        } catch (e: any) {
            setError({
                title: e?.message,
                desc: e?.response?.data?.detail ?? 'Ошибка при открытии смены'
            })
        }
    }
    const closeWorkProcess = async () => {
        setLoading(true)
        try {
            if (!workProcess) return
            const { data } = await PRIMARY_API.patch(`/work-process/${workProcess[0]?.id}/`, {
                status: false
            })
            dispatch(OperatorActions.remove(data))
            getData()
        } catch (e: any) {
            setError({
                title: e.message,
                desc: e.response?.data?.detail ?? 'Ошибка при закрытии смены'
            })
        }
        setLoading(false)
    }

    const checkingProcess = () => {
        if (checkAuth.process == 'open') {
            openWorkProcess()
            return setCheckAuth(prev => ({ ...prev, open: false }))
        }
        closeWorkProcess()
        setCheckAuth(prev => ({ ...prev, open: false }))
    }
    return (
        <>
            {
                (error.title || error.desc) && <ErrorAlert onClose={() => setError(errorInitialValue)} title={error.title} desc={error.desc} />
            }
            {
                checkAuth.open && <AuthModal confirm={checkingProcess} cancel={() => setCheckAuth(prev => ({ ...prev, open: false }))} />
            }
            <li key={person.id} className={`flex relative justify-between gap-x-6 py-5 px-5 ${active ? 'bg-blue-100' : 'bg-red-100'} `}>
                {
                    loading && <MiniLoading />
                }
                <div className="flex min-w-0 gap-x-4">
                    <img alt="" src={person.employee.user.image ?? '/png/user-icon.png'} className="h-12 w-12 flex-none object-cover rounded-full bg-gray-50" />
                    <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{person.employee.user.get_full_name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.employee.position.title}</p>
                    </div>
                </div>
                <div className='flex gap-5 items-center'>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="capitalize text-sm leading-6 text-gray-900">{person.employee.role}</p>
                        {
                            !active ?
                                disactive ? (
                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        Последняя активность <time dateTime={new Date(disactive?.end_time).toLocaleString('ru')}>{new Date(disactive?.end_time).toLocaleString('ru')}</time>
                                    </p>) : null

                                : (
                                    <div className="mt-1 flex items-center gap-x-1.5">
                                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        </div>
                                        <p className="text-xs leading-5 text-gray-500">Online</p>
                                    </div>
                                )}
                    </div>
                    <div>
                        {
                            !active ? <Button onClick={() => setCheckAuth({ process: 'open', open: true })}>Отркыть смену</Button> : <Button onClick={() => setCheckAuth({ process: 'close', open: true })} variant='danger'>Закрыть смену</Button>
                        }
                    </div>
                </div >

            </li >
        </>

    )
}
