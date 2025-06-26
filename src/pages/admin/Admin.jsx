import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminMain from '../../components/admin/AdminMain'
import Sidebar from '../../components/navigatebars/Sidebar'
import Navbar from '../../components/navigatebars/Navbar'
import AdminUser from '../../components/admin/AdminUser'
import AdminClinic from '../../components/admin/AdminClinic'
import AdminSetting from '../../components/admin/AdminSetting'
import AdminAbout from '../../components/admin/AdminAbout'
import AdminSupport from '../../components/admin/AdminSupport'

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
                        <Route index element={<AdminMain />} />
                        <Route path="user" element={<AdminUser />} />
                        <Route path="clinic" element={<AdminClinic />} />
                        <Route path="setting" element={<AdminSetting />} />
                        <Route path="about" element={<AdminAbout />} />
                        <Route path="support" element={<AdminSupport />} />
                    </Routes>
                </div>
            </div>
        </div>

    )
}

export default Admin