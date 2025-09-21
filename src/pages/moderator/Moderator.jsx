import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../../components/navigatebars/Sidebar";
import Navbar from "../../components/navigatebars/Navbar";
import ModeratorMain from "../../components/moderator/ModeratorMain";
import ModeratorDoctorManagement from "../../components/moderator/ModeratorDoctorManagement";
import ModeratorPatientManagement from "../../components/moderator/ModeratorPatientManagement";
import ModeratorClinicManagement from "../../components/moderator/ModeratorClinicManagement";
import ModeratorAnalytic from "../../components/moderator/ModeratorAnalytic";
import ModeratorSetting from "../../components/moderator/ModeratorSetting";
import ModeratorAbout from "../../components/moderator/ModeratorAbout";
import ModeratorSupport from "../../components/moderator/ModeratorSupport";

function Moderator() {
  return (
    <div className="flex bg-gray-50 h-screen overflow-hidden">
      {/* Sidebar — фиксированной высоты и не скроллится */}
      <div className="h-full">
        <Sidebar />
      </div>

      {/* Правая часть: скроллим только контент */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route index element={<ModeratorMain />} />
            <Route
              path="doctormanagement"
              element={<ModeratorDoctorManagement />}
            />

            <Route
              path="patientmanagement"
              element={<ModeratorPatientManagement />}
            />
            <Route
              path="clinics"
              element={<ModeratorClinicManagement />}
            />
            <Route path="analytic" element={<ModeratorAnalytic />} />
            <Route path="setting" element={<ModeratorSetting />} />
            <Route path="about" element={<ModeratorAbout />} />
            <Route path="support" element={<ModeratorSupport />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Moderator;
