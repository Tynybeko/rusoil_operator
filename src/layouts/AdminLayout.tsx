import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
    return (
        <div className='container h-full flex flex-col justify-between'>
            <Header />
            <div className='flex-[1_1_0] w-full h-full overflow-y-auto'>
                <Outlet />
            </div>
        </div >
    )
}
