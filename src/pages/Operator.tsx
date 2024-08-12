
import { ChangeEvent, useEffect, useState } from 'react'
import { Button, Input } from '../components/UI'
import { IUser } from '../types'
import { API, PRIMARY_API, } from '../axios'
import ErrorAlert from '../components/alerts/Error'
import { useAppSelector } from '../redux/hooks'
import { useNavigate } from 'react-router-dom'
import MiniLoading from '../components/loading/MiniLoading'
import UserHistory from '../components/operator/UserHistory'
import ConfirmAlert from '../components/alerts/Confirm'
import Alert from '../components/alerts/Alert'
import { useDispatch } from 'react-redux'
import OperatorActions from '../redux/slices/operator'
import useDebounce from '../hooks/useDebounce'



export default function Operator() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const operator = useAppSelector(state => state.operator.changed)
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const [amount, setAmount] = useState(0)
    const [confirm, setConfirm] = useState(false)
    const [error, setError] = useState('')
    const [data, setData] = useState<IUser | null>(null)
    const [processMethod, setProcessMethod] = useState<'Remove' | 'Add'>('Remove')
    const [contact, setContact] = useState<string>('')
    const debouncedCode = useDebounce<string>(contact, 700)


    useEffect(() => {
        if (debouncedCode.length < 8) return
        findUser(debouncedCode)
    }, [debouncedCode])

    const logout = () => {
        dispatch(OperatorActions.logout())
        navigate('/')
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setContact(e.target.value)
    }





    const findUser = (code?: string) => {
        setLoading(true)
        const res = API.post('/users/by-card-number/', {
            card_number: code
        })
        res
            .then((res: any) => {
                setData(res.data)
            })
            .catch((e: any) => {
                setError(e?.response?.data?.detail ?? 'Не удалось найти!')
                setData(null)
            })
            .finally(() => {
                setLoading(false)
                setContact('')
            })
    }

    const handleRemove = () => {
        setLoading(true)
        const response = API.post('/work-spaces/', {
            work_proccess: operator?.id,
            method: processMethod,
            amount,
            client: data?.id
        })
        response
            .then(() => {
                if (processMethod == 'Remove') {
                    setData(prev => {
                        if (!prev) return null
                        prev.client.bonus_card.bonus_balance -= amount
                        return prev
                    })
                }
                setSuccess('Операция прошла успешно!')
                setError('')
            })
            .catch(err => {
                if (processMethod == 'Remove') {
                    setSuccess('')
                    if ('amount' in err.response.data) {
                        return setError(err.response.data.amount ?? 'Ошибка при снятии!')
                    }
                    setError(err?.response?.data?.detail ?? `Ошибка при снятии\n${err?.message ?? ''}`)
                }
            })
            .finally(() => {
                setLoading(false)
                setContact('')
                setConfirm(false)
                setAmount(0)

            })

    }

    return (
        <div className="w-full h-full inset-0 overflow-hidden bg-gray-400">
            {
                confirm && <ConfirmAlert title='Вы действительно хотите совершить эту операцию' desc='Проверьте данные внимательно!' onConfirm={handleRemove} onCancel={() => setConfirm(false)} />
            }
            <div className="w-full h-full inset-0 overflow-hidden">
                <div className='w-full flex   '>
                    <label htmlFor='contact' className='relative max-w-xl h-full  sm:min-h-[400px] justify-between  overflow-y-auto w-full bg-white p-5 rounded-lg flex flex-col gap-2'>
                        {
                            loading && <MiniLoading />
                        }
                        <div className='items-center flex w-full gap-2 border-b-2 pb-2 border-red-400'>
                            <Button onClick={() => setProcessMethod('Remove')} variant={processMethod == 'Remove' ? 'primary' : 'some'} className={` flex-1 ${processMethod == 'Remove' ? '' : ''} text-xl font-bold`} type='button'>Снятие</Button>
                            <Button onClick={() => setProcessMethod('Add')} variant={processMethod == 'Add' ? 'primary' : 'some'} className={`flex-1 text-xl font-bold`} type='button'>Пополнение</Button>
                        </div>
                        {
                            data ?
                                <div className="relative mt-2 flex-1">
                                    <div className="mt-1 border-t border-gray-100">
                                        <dl className="divide-y divide-gray-100">
                                            <div className="px-4 border-y-2  py-3 sm:gap-4 sm:px-0 flex justify-between items-center">
                                                <dt className="text-3xl font-medium leading-6 text-gray-900 flex gap-3 items-center"><p className='truncate text-nowrap max-w-[380px]'> {data?.get_full_name}</p>{data?.client.is_verify && <img width={40} height={40} src='/png/verify.png' />}</dt>
                                                <dd className="mt-1 text-3xl leading-6 text-gray-700 sm:col-span-2 flex gap-1  flex-nowrap sm:mt-0"><span className='text-secondary500 text-4xl font-bold'>{data?.client.bonus_card.bonus_balance.toFixed(2)}</span> c</dd>
                                            </div>
                                        </dl>
                                    </div>
                                    <div className='flex w-full gap-2 mt-2 items-start'>
                                        <Input stateStyle='text-sm font-medium' succes={success} error={error} className='text-xl' value={+amount ?? 0} type='text' onChange={(e) => isNaN(+e.target.value) ? null : setAmount(+e.target.value)} text='' />
                                        <Button variant='danger' onClick={() => setConfirm(true)} type='button' className='mb-1 py-3 text-xl'>Подтвердить</Button>
                                    </div>
                                    <UserHistory data={data} />
                                </div>
                                :
                                <div className='w-full h-full flex flex-col justify-center items-center'>
                                    <img src="/png/qr.png" alt="" />
                                    <h3 className='text-2xl text-blue-500'>Отскранируй QR код</h3>
                                    <p>или введите код клиента</p>
                                    <p onClick={logout} className='text-blue-500 underline cursor-pointer mt-2 lowercase'>Выйти</p>
                                </div>
                        }
                        {
                            data
                                ?
                                <Button onClick={() => setData(null)} variant='some'>Назад</Button>
                                :
                                <Input id='contact' autoFocus stateStyle='text-sm font-medium' error={error} className='text-xl' labelStyle='text-lg' placeholder='Код клиента' required type='text' value={contact} onChange={handleChange} text='Код клиента' />

                        }
                    </label>
                </div>
            </div>
        </div>
    )
}
