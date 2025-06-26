import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from '../../components/navigatebars/Sidebar'
import Navbar from '../../components/navigatebars/Navbar'
import UserMain from '../../components/user/UserMain'
import UserMedcard from '../../components/user/UserMedcard'
import UserRegistration from '../../components/user/UserRegistration'
import UserAppointment from '../../components/user/UserAppointment'
import UserSetting from '../../components/user/UserSetting'
import UserAbout from '../../components/user/UserAbout'
import UserSupport from '../../components/user/UserSupport'



function User() {
    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Сайдбар */}
            <Sidebar />

            {/* Основная колонка: navbar + контент */}
            <div className="flex-1 flex flex-col min-h-screen">
                <Navbar />

                <div className="flex-1">
                    <Routes>
                        <Route index element={<UserMain />} />
                        <Route path="medcard" element={<UserMedcard />} />
                        <Route path="registration" element={<UserRegistration />} />
                        <Route path="appointment" element={<UserAppointment />} />
                        <Route path="setting" element={<UserSetting />} />
                        <Route path="about" element={<UserAbout />} />
                        <Route path="support" element={<UserSupport />} />
                    </Routes>
                </div>
            </div>
        </div>

    )
}

export default User