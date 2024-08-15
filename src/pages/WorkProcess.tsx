import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { FetchWorkers } from '../redux/slices/workers'
import Emloyeer from '../components/employeer/Emloyeer'
import ErrorAlert from '../components/alerts/Error'
import { useNavigate } from 'react-router-dom'

export default function WorkProcess() {
  const { data } = useAppSelector(state => state.auth)
  const { data: workers, isError } = useAppSelector(state => state.workers)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (data && data.gas_station) {
      dispatch(FetchWorkers({ gas_station: data.gas_station.id }))
    }
  }, [])
  return (
    <div className='py-5'>
      <ul role="list" className="divide-y divide-gray-100">
        {workers && workers.results?.map((person) => (
          <Emloyeer person={person} />
        ))}
        {
          isError && <ErrorAlert btnText='Операции' onClose={() => navigate('/admin/history')} desc='Не удалось получить данные!' />
        }
      </ul>
    </div>
  )
}
