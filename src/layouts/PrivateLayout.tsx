import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { FetchProfileAuth } from '../redux/slices/auth'
import Loading from '../components/loading/Loading'

export default function PrivateLayout() {
    const { isLoading, data } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(FetchProfileAuth())
    }, [])


    return (
        <>
            {
                isLoading && <Loading />
            }
            <Outlet />
        </>
    )
}
