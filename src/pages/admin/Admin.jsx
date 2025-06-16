import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminMain from '../../components/admin/AdminMain'
import Sidebar from '../../components/navigatebars/Sidebar'
import Navbar from '../../components/navigatebars/Navbar'
import AdminPatients from '../../components/admin/AdminPatients'

function Admin() {
    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Сайдбар */}
            <Sidebar />

            {/* Основная колонка: navbar + контент */}
            <div className="flex-1 flex flex-col min-h-screen">
                <Navbar />

                <div className="flex-1">
                    <Routes>
                        <Route path="" element={<AdminMain />} />
                        <Route path="patients" element={<AdminPatients />} />
                    </Routes>
                </div>
            </div>
        </div>

    )
}

export default Admin