import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Input, InputPassword } from '../components/UI'
import { PRIMARY_API } from '../axios'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { useNavigate } from 'react-router-dom'
import AuthActions from '../redux/slices/auth'
import ConfirmAlert from '../components/alerts/Confirm'
import Loading from '../components/loading/Loading'


const POLICY = `Компания "Россия-Нефть" обязуется обеспечивать конфиденциальность и безопасность персональных данных своих пользователей. Собираемые данные будут использоваться исключительно в целяx безопасности и не будут передаваться третьим лицам без предварительного согласия пользователя, за исключением случаев, предусмотренных законодательством. Пользователи имеют право на доступ к своим данным, их корректировку или удаление по запросу. Для этого они могут обратиться по адресу +996 312 391515.`


export default function Auth() {
  const [confCheck, setConfCheck] = useState(false)
  const [confConfirm, setConfConfirm] = useState(false)
  const navigate = useNavigate()
  const [{
    isLoading,
    isError
  }, setState] = useState({
    isLoading: false,
    isError: ''
  })
  const dispatch = useAppDispatch()
  const [inputValue, setInputValue] = useState({
    login: '',
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
    const form = e.target as HTMLFormElement
    PRIMARY_API.post('/accounts/employees/login/', inputValue)
      .then(res => {
        setState({
          isLoading: false,
          isError: ''
        })
        localStorage.setItem('prmToken', res.data?.token)
        dispatch(AuthActions.login(res.data.works))
        navigate('/')
        form.reset()
      })
      .catch(() => setState({ isLoading: false, isError: 'Неверный логин или пароль' }))

  }
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      {
        confConfirm && <ConfirmAlert icon className='w-[350px]' title='Политика конфиденциальности' desc={POLICY} onCancel={() => {
          setConfConfirm(false)
          setConfCheck(false)
        }} onConfirm={() => {
          setConfCheck(true)
          setConfConfirm(false)
        }} />
      }
      {
        isLoading && <Loading />
      }
      <div className='rounded-lg dark:bg-gray-700  px-4 py-2 pb-0 max-w-[350px] w-full border border-primary-500'>
        <h1 className='dark:text-white text-center text-xl'>Авторизация</h1>
        <form onSubmit={handleSumit} className='flex flex-col gap-4 p-2 rounded-t-x'>
          <Input name='login' onChange={handleChange} autoSave='on' autoComplete='on' placeholder="Login" text='Логин' />
          <InputPassword error={isError} name='password' onChange={handleChange} placeholder="Password" text='Password' />
          <div onClick={() => setConfConfirm(true)} className='group cursor-pointer items-center flex gap-4'>
            <div className='w-5 h-5 rounded border-black border flex overflow-hidden items-center justify-center'>
              {
                confCheck &&
                <svg className="feather feather-check" fill="none" height="24" stroke="green" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" /></svg>

              }
            </div>
            <p className='group-hover:text-blue-500'>Соглашаюсь с условиями</p>
          </div>
          <Button disabled={isLoading || Object.values(inputValue).some(item => !item) || !confCheck} className='mx-auto' variant='primary'>Войти</Button>
        </form>
      </div>
    </div>
  )
}
