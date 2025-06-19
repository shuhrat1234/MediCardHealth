import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from '../../components/navigatebars/Sidebar'
import Navbar from '../../components/navigatebars/Navbar'
import ModeratorMain from '../../components/moderator/ModeratorMain'
import ModeratorDoctorManagement from '../../components/moderator/ModeratorDoctorManagement'
import ModeratorPatientManagement from '../../components/moderator/ModeratorPatientManagement'
import ModeratorClinicManagement from '../../components/moderator/ModeratorClinicManagement'
import ModeratorAnalytic from '../../components/moderator/ModeratorAnalytic'
import ModeratorSetting from '../../components/moderator/ModeratorSetting'
import ModeratorAbout from '../../components/moderator/ModeratorAbout'
import ModeratorSupport from '../../components/moderator/ModeratorSupport'

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
                        <Route index element={<ModeratorMain />} />
                        <Route path="doctormanagement" element={<ModeratorDoctorManagement />} />
                        <Route path="patientmanagement" element={<ModeratorPatientManagement />} />
                        <Route path="clinicmanagement" element={<ModeratorClinicManagement />} />
                        <Route path="analytic" element={<ModeratorAnalytic />} />
                        <Route path="setting" element={<ModeratorSetting />} />
                        <Route path="about" element={<ModeratorAbout />} />
                        <Route path="support" element={<ModeratorSupport />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Admin    