import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../../components/navigatebars/Sidebar";
import Navbar from "../../components/navigatebars/Navbar";
import ClinicStatistic from "../../components/clinic/ClinicStatistic";
import ClinicMain from "../../components/clinic/ClinicMain";
import ClinicDoctors from "../../components/clinic/ClinicDoctors";
import ClinicSupport from "../../components/clinic/ClinicSupport";

function Clinic() {
  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Sidebar — фиксированной высоты */}
      <div className="h-full">
        <Sidebar />
      </div>

      {/* Правая часть: Navbar + Routes — скроллится только контент */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Navbar />

        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route index element={<ClinicMain />} />
            <Route path="statistic" element={<ClinicStatistic />} />
            <Route path="doctors" element={<ClinicDoctors/>} />
            <Route path="support" element={<ClinicSupport />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Clinic;
