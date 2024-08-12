import React, { useEffect, useState } from 'react'
import { IBaseResponse, IUser, IWorkSpaces } from '../../types'
import MiniLoading from '../loading/MiniLoading'
import { PRIMARY_API } from '../../axios'
import { formatDate } from '../../utils'



interface IUserHistory {
    isLoading: boolean,
    isError: string,
    data: IBaseResponse<IWorkSpaces[]> | null
}
export default function UserHistory({ data }: { data: IUser | null }) {

    const [history, setHistory] = useState<IUserHistory>({
        isLoading: false,
        isError: '',
        data: null
    })
    const fetchUserHistory = () => {
        setHistory({
            isLoading: true,
            isError: '',
            data: null
        })
        PRIMARY_API.get('/work-spaces/', {
            params: {
                client__user: data?.id,
                ordering: '-id',
                limit: 3
            }
        })
            .then(res => {
                setHistory(prev => ({ ...prev, data: res.data, isLoading: false }))
            })
            .catch(err => {
                setHistory(prev => ({ ...prev, isError: 'Не удалось получить историю', isLoading: false }))
            })
    }

    useEffect(() => {
        if (!data) return
        fetchUserHistory()
    }, [data])

    return (
        <div className='flex relative flex-col gap-2 w-full min-h-40 mt-2'>
            {
                history.isLoading && <MiniLoading />
            }
            {
                history.data ? <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-[14px] text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-3 py-1">
                                    Заправка
                                </th>
                                <th scope="col" className="px-3 py-1">
                                    Метод
                                </th>
                                <th scope="col" className="px-3 py-1">
                                    Сумма
                                </th>
                                <th scope="col" className="px-3 py-1">
                                    Время
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                history.data?.results?.map(item => (
                                    <tr className={` border-b dark:bg-gray-800 dark:border-gray-700 text-[14px] `}>
                                        <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.work_proccess?.work?.gas_station?.title ?? 'Неизвестно'}
                                        </th>
                                        <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.method == 'Remove' ? 'Снятие' : 'Пополнение'}
                                        </th>
                                        <td className="px-3 py-2">
                                            {item.amount}
                                        </td>
                                        <td className="px-3 py-2">
                                            {formatDate(item.created_at)}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                    : null
            }
        </div>

    )
}
