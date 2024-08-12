import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import OperatorActions, { FetchWorkProccess } from '../redux/slices/operator'
import Loading from '../components/loading/Loading'
import { formatDate } from '../utils'
import { Button } from '../components/UI'
import { Link, useNavigate } from 'react-router-dom'
import { IWork, IWorkProccess } from '../types'
import AuthModal from '../components/auth/AuthModal'
import Auth from './Auth'

export default function WorkersLayout() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { data: auth } = useAppSelector(state => state.auth)
    const { data: operators, isLoading } = useAppSelector(state => state.operator)
    useEffect(() => {
        if (auth) {
            dispatch(FetchWorkProccess({
                status: true,
                work__gas_station: auth.gas_station.id
            }))
        }
    }, [])
    const [userChange, setUserChange] = useState<IWorkProccess | null>(null)
    const handleCancel = () => setUserChange(null)
    const handleConfirm = (res: any) => {
        localStorage.setItem('scnToken', res.data?.token)
        dispatch(OperatorActions.login(userChange))
        navigate('/operator')
    }


    return (
        <div className='w-full h-full flex items-center justify-center gap-3 flex-wrap'>
            {
                isLoading && <Loading />
            }
            {
                userChange && <AuthModal cancel={handleCancel} authedUser={userChange.work} confirm={handleConfirm} />
            }
            {
                operators && operators.results?.map(item => (
                    <div key={item.id} onClick={() => setUserChange(item)} className='hover:bg-gray-200 cursor-pointer bg-gray-100 border  gap-3 max-w-[200px] px-5 py-4 flex flex-col items-center justify-center rounded-lg'>
                        <img className='rounded-full w-20 h-20 object-cover' src={item.work.employee.user.image ?? '/png/user-icon.png'} alt="Icon" />
                        <h4 className='w-full text-center'>{item.work.employee.user.get_full_name}</h4>
                        <p className='text-primary-500'>
                            {formatDate(item.start_time)}
                        </p>
                    </div>
                ))
            }
            <Button onClick={() => navigate('/admin')} className='!absolute top-5 right-5'>
                <svg className="feather feather-settings" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            </Button>
            {
                operators && operators.results.length == 0 &&
                <Link to={'/admin'}>
                    <div className='hover:bg-gray-200 cursor-pointer bg-gray-100 border  gap-3  px-5 py-4 flex flex-col items-center justify-center rounded-lg'>
                        <h4 className='bold text-2xl w-full text-center'>Нету открытых смен</h4>
                    </div>
                </Link>
            }
        </div>
    )
}
