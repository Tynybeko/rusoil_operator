import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { FetchWorkProccess } from '../redux/slices/operator'
import Loading from '../components/loading/Loading'
import { Button } from '../components/UI'
import { Link, useNavigate } from 'react-router-dom'
import AuthModal from '../components/auth/AuthModal'

export default function WorkersLayout() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const { data: auth } = useAppSelector(state => state.auth)
    const { data: operators, isLoading } = useAppSelector(state => state.operator)
    useEffect(() => {
        localStorage.removeItem('scnToken')
        if (auth) {
            dispatch(FetchWorkProccess({
                status: true,
                work__gas_station: auth.gas_station.id
            }))
        }
    }, [])
    const handleConfirm = (res: any) => {
        const authedUser = operators?.results.find(el => el.work.employee.user.id == res.data.works.employee.user.id)
        if (auth?.employee.user.id == res.data.works.employee.user.id || authedUser) {
            localStorage.setItem('scnToken', res.data?.token)
            return navigate('/operator')
        }
        setError('Откройте смену!')
    }





    return (
        <div className='w-full h-full flex items-center justify-center gap-3 flex-wrap'>
            {
                isLoading && <Loading />
            }
            <AuthModal cancelBtn confirText='Войти' error={error} title='Вход' confirm={handleConfirm} cancel={() => null} login />
            <Button onClick={() => navigate('/admin')} className='!absolute z-50 top-5 right-5'>
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
