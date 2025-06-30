import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../../components/navigatebars/Sidebar";
import Navbar from "../../components/navigatebars/Navbar";
import UserMain from "../../components/user/UserMain";
import UserMedcard from "../../components/user/UserMedcard";
import UserRegistration from "../../components/user/UserRegistration";
import UserAppointment from "../../components/user/UserAppointment";
import UserSetting from "../../components/user/UserSetting";
import UserAbout from "../../components/user/UserAbout";
import UserSupport from "../../components/user/UserSupport";

function User() {
  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Sidebar — фиксированная высота, не скроллится */}
      <div className="h-full">
        <Sidebar />
      </div>

      {/* Правая часть — navbar + скроллируемый контент */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Navbar />

        <div className="flex-1 overflow-y-auto">
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
  );
}

export default User;
