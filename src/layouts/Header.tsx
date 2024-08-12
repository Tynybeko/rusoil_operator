import React, { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/UI';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import AuthActions from '../redux/slices/auth';
import ConfirmAlert from '../components/alerts/Confirm';
import OperatorActions from '../redux/slices/operator';


interface IUrls {
    title: string;
    href: string
}

const URLS: IUrls[] = [
    { title: 'Смены', href: '/admin' },
    { title: 'Операции', href: 'history' },
]

export default function Header() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { data } = useAppSelector(state => state.auth)
    const { pathname } = useLocation()
    const [logoutConfirm, setLogoutConfirm] = useState(false)
    const activate = (url: string) => {
        return url.includes(pathname.split('/').at(-1) ?? '') ? 'active' : ''
    }

    const logount = () => {
        dispatch(AuthActions.logout())
        dispatch(OperatorActions.logout())
        navigate('/auth')
    }


    return (
        <header className='w-full py-4 px-4 mb-2 items-center  justify-between  border-b-2 hidden mi:flex '>
            {
                logoutConfirm && <ConfirmAlert desc='Вы точно хотите выйти?' onCancel={() => setLogoutConfirm(false)} onConfirm={logount} />
            }
            <div className="logo relative">
                <img width={60} height={50} src="/svg/russia-neft.svg" alt="Logo" />
            </div>
            <nav className='header_nav'>
                <ul className='flex gap-4'>
                    {
                        URLS.map(url => (
                            <li>
                                <Link className={`${activate(url.href)} text-xl px-3 rounded-lg py-1 text-center border-b-2 border-translate hover:border-primary-700 text-primary-500`} to={url.href}>{url.title}</Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
            <div className='flex gap-3 items-center'>
                <p>
                    <span className='text-secondary-700'>{data?.gas_station.title}</span>
                </p>
                <Button className='' onClick={() => navigate('/')} variant='danger'>
                    <svg className="feather feather-users" fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                </Button>
                <Button className='' onClick={() => setLogoutConfirm(true)} variant='danger'><svg className="feather feather-lock" fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><rect height="11" rx="2" ry="2" width="18" x="3" y="11" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg></Button>
            </div>
        </header >
    )
}
