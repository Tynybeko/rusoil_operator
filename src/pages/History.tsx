import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import Loading from '../components/loading/Loading'
import Pagination from '../components/pagination/Pagination'
import { FetchHistory } from '../redux/slices/history'
import UserSelect from '../components/select/UserSelect'
import { IOption, InitialObjectType } from '../types'
import { formatDate } from '../utils'
import Select from '../components/select/Select'
import ErrorAlert from '../components/alerts/Error'


const methodSelectData: IOption<string | null>[] = [
  { title: 'Все', value: null },
  { title: 'Снятие', value: 'Remove' },
  { title: 'Пополнение', value: 'Add' },
]


const limitSelect: IOption<number | null>[] = [
  { title: '12', value: 12 },
  { title: '20', value: 20 },
  { title: '30', value: 30 },
  { title: '50', value: 50 },
  { title: '70', value: 70 },
  { title: '100', value: 100 },
]

export default function History() {
  const dispatch = useAppDispatch()
  const auth = useAppSelector(state => state.auth.data)
  const checkingOperator = useMemo(() => {
    if (!auth) return null;
    return (auth.employee.user.current_role == 'operator')
  }, [auth])

  const [query, setQuery] = useState<InitialObjectType>({
    limit: limitSelect[0].value,
    page: 1,
    work_proccess__work__employee: checkingOperator ? auth?.employee.id : null
  })
  const { isLoading, isError, data } = useAppSelector(state => state.history)
  const changeQuery = (key: string, value: any) => {
    if (query[key] == value) return
    setQuery(prev => ({ ...prev, [key]: value }))
  }
  const getData = () => {
    dispatch(FetchHistory(query))
  }
  useEffect(() => {
    getData()
  }, [query])
  return (
    <div className='py-5'>
      <div className='mb-5 flex gap-5 w-full px-5'>
        <div className='max-w-[300px] w-full'>
          <UserSelect disabled={!!checkingOperator} onChange={(worker) => changeQuery('work_proccess__work__employee', worker?.employee.id)} />
        </div>
        <div className='max-w-[220px] w-full'>
          <Select defaultValue={methodSelectData[0]} options={methodSelectData} onChange={(meth => changeQuery('method', meth?.value))} />
        </div>
        <div className='max-w-[100px] w-full'>
          <Select defaultValue={limitSelect[0]} options={limitSelect} onChange={(meth => changeQuery('limit', meth?.value))} />
        </div>
      </div>
      {
        isLoading && <Loading />
      }
      {
        isError && <ErrorAlert btnText='Повторить' onClose={() => getData()} desc='Ошибка при получении' />
      }
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Клиент
              </th>
              <th scope="col" className="px-6 py-3">
                Метод
              </th>
              <th scope="col" className="px-6 py-3">
                Сумма
              </th>
              <th scope="col" className="px-6 py-3">
                Сотрудник
              </th>
              <th scope="col" className="px-6 py-3">
                Время
              </th>
            </tr>
          </thead>
          <tbody>
            {
              data && data.results.map(item => (
                <tr className={` border-b dark:bg-gray-800 dark:border-gray-700 ${item.method != 'Remove' ? 'bg-blue-100' : 'bg-red-100'} `}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.client.get_full_name}
                  </th>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.method == 'Remove' ? 'Снятие' : 'Пополнение'}
                  </th>
                  <td className="px-6 py-4">
                    {item.amount}
                  </td>
                  <td className="px-6 py-4  whitespace-nowrap">
                    {item.work_proccess.work.employee.user.get_full_name}
                  </td>
                  <td className="px-6 py-4">
                    {formatDate(item.created_at)}
                  </td>
                </tr>
              ))
            }
            {
              data && data.results.length < 1 ?
                <tr className='border-b dark:bg-gray-800 dark:border-gray-700 bg-gray-200'>
                  <td colSpan={5} className='text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    Пусто
                  </td>
                </tr> : null
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5}>
                {
                  data && data.total_pages &&
                  <Pagination page={query.page} limit={query.limit} siblings={1} onPageChange={(pg) => changeQuery('page', pg)} totalPage={data.total_pages} />

                }
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
