import React, { SetStateAction } from 'react'
import { IUser } from '../../types';
import { Button, Input } from '../UI';

interface ClientInfoBarProps {
    open: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>,
    data: IUser | null
}

export default function ClientInfoBar({ open, setOpen, data }: ClientInfoBarProps) {
    return (
        <div className={`pointer-events-none ${open ? '' : 'translate-x-full'}   transition duration-500 fixed inset-y-0 right-0 flex max-w-full pl-10`}>
            <div
                className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
                <div className={`flex  transition duration-500 h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl`}>
                    <div className="px-4 flex w-full justify-between sm:px-6">
                        <button
                            type="button"
                            onClick={() => setOpen(prev => !prev)}
                            className="relative rounded-md text-gray-300 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <svg className="feather feather-x" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="18" x2="6" y1="6" y2="18" /><line x1="6" x2="18" y1="6" y2="18" /></svg>
                        </button>
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Данные пользователя</h3>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <img className='rounded-xl' src={data?.image ?? '/png/user-icon.png'} alt="" />
                        <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">ФИО</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data?.get_full_name}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">ИНН</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data?.passport_number ?? 'Не верифицирован'}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Контакты</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data?.phone}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Баланс</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data?.client.bonus_card.bonus_balance} c</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Верифицикация</dt>
                                    <dd className={`mt-1 ${data?.client.is_verify ? 'text-primary-500' : 'text-red-500'}  text-sm leading-6 sm:col-span-2 sm:mt-0`}>{data?.client.is_verify ? 'Верифицирован' : 'Не верифицирован'}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 items-end">
                                    <Input text='Cумма' />
                                    <Button className='mb-1'>Подтвердить</Button>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
