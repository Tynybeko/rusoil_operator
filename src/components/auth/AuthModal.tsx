import React, { ChangeEvent, FormEvent, useMemo, useState } from 'react'
import { Button, Input, InputPassword, Modal } from '../..//components/UI'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { PRIMARY_API } from '../../axios'
import { IWork } from '../../types';
import ConfirmAlert from '../alerts/Confirm';
import Alert from '../alerts/Alert';

interface IAuthModalProps {
    confirm: (result: any) => void;
    cancel: (result: any) => void;
    authedUser?: null | IWork
}

export default function AuthModal({ confirm, cancel, authedUser }: IAuthModalProps) {
    const { data } = useAppSelector(state => state.auth)
    const [confCheck, setConfCheck] = useState(false)
    const [confConfirm, setConfConfirm] = useState(false)
    const user = useMemo(() => {
        return authedUser ?? data
    }, [data, authedUser])

    const [{
        isLoading,
        isError
    }, setState] = useState({
        isLoading: false,
        isError: ''
    })
    const [inputValue, setInputValue] = useState({
        login: user?.employee.user.phone,
        password: ''
    })
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setInputValue(prev => ({ ...prev, [name]: value }))
    }
    const handleSumit = (e: FormEvent<HTMLFormElement>) => {
        setState({
            isLoading: true,
            isError: ''
        })
        e.preventDefault()
        PRIMARY_API.post('/accounts/employees/login/', inputValue)
            .then((res) => {
                setState({
                    isLoading: false,
                    isError: ''
                })
                if (res.data.works.employee.user?.id == user?.employee.user?.id) {
                    return confirm(res)
                }
                setState({ isLoading: false, isError: 'Нету доступа' })
            })
            .catch(() => setState({ isLoading: false, isError: 'Неверный логин или пароль' }))

    }
    return (
        <>

            <Modal className='w-full' onClose={cancel}>
                {
                    confConfirm && <ConfirmAlert icon className='w-[350px]' title='Conf conf vonm' desc='Bla Bla bla lk Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore facere ad saepe maxime quos eveniet ipsam iste. Dolor cupiditate consectetur ipsam eaque, quam praesentium. Error et nisi dolor recusandae. Nostrum!' onCancel={() => setConfConfirm(false)} onConfirm={() => {
                        setConfCheck(true)
                        setConfConfirm(false)
                    }} />
                }

                <div className='max-w-[350px] mx-auto rounded-lg dark:bg-gray-700 bg-white  px-4 py-2 pb-0 w-full border border-primary-500'>
                    <h1 className='dark:text-white text-center text-xl'>Подтвердите действие</h1>
                    <form onSubmit={handleSumit} className='flex flex-col gap-4 p-2 rounded-t-x'>
                        {/* <Input name='login' onChange={handleChange} autoSave='on' autoComplete='on' placeholder="Login" text='Логин' /> */}
                        <InputPassword error={isError} name='password' onChange={handleChange} placeholder="Пароль" text='Пароль' />
                        <div onClick={() => setConfConfirm(true)} className='group cursor-pointer flex gap-4'>
                            <input checked={confCheck} id='conf' type="checkbox" />
                            <p className='group-hover:text-blue-500'>Соглашаюсь с условиями</p>
                        </div>
                        <div className='w-full grid gap-3'>
                            <Button type='submit' disabled={isLoading || Object.values(inputValue).some(item => !item) || !confCheck} className='w-full' variant='primary'>Подтвердить</Button>
                            <Button onClick={cancel} variant='secondary' className='w-full' type='button'>Назад</Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>


    )
}
