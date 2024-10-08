import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { FetchAuthOperator } from '../redux/slices/operator'
import Loading from '../components/loading/Loading'
import { FetchGetStation } from '../redux/slices/station'

export default function OperatorLayout() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { isLoading, changed } = useAppSelector(state => state.operator)
    useEffect(() => {
        const TOKEN = localStorage.getItem('scnToken')
        if (!TOKEN) return navigate('/')
        dispatch(FetchAuthOperator())
        // if (changed) {
        //     dispatch(FetchGetStation(changed.))
        // }
    }, [])
    return (
        <div className='container h-full flex flex-col justify-between'>
            {
                isLoading && <Loading />
            }
            <div className='flex-[1_1_0] w-full h-full overflow-y-auto'>
                <Outlet />
            </div>
        </div >
    )
}
