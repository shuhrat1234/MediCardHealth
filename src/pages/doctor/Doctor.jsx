import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../../components/navigatebars/Sidebar";
import Navbar from "../../components/navigatebars/Navbar";
import DoctorMain from "../../components/doctor/DoctorMain";
import DoctorSpot from "../../components/doctor/DoctorSpot";
import DoctorPatientcard from "../../components/doctor/DoctorPatientcard";
import DoctorUpdateCard from "../../components/doctor/DoctorUpdateCard";
import DoctorSetting from "../../components/doctor/DoctorSetting";
import DoctorAbout from "../../components/doctor/DoctorAbout";
import DoctorSupport from "../../components/doctor/DoctorSupport";

function Doctor() {
  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Сайдбар: не скроллится */}
      <div className="h-full">
        <Sidebar />
      </div>

      {/* Правая часть: скроллится при переполнении */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Navbar />

        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route index element={<DoctorMain />} />
            <Route path="spot" element={<DoctorSpot />} />
            <Route path="patientcard" element={<DoctorPatientcard />} />
            <Route path="updatecard" element={<DoctorUpdateCard />} />
            <Route path="setting" element={<DoctorSetting />} />
            <Route path="about" element={<DoctorAbout />} />
            <Route path="support" element={<DoctorSupport />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Doctor;