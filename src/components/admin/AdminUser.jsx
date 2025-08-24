import React, { useEffect, useState } from "react";
import ModeratorDoctorManagement from "../moderator/ModeratorDoctorManagement";
import ModeratorPatientManagement from "../moderator/ModeratorPatientManagement";
import ModeratorMainManagement from "../moderator/ModeratorMainManagement";
import { Shield, Stethoscope, UserCheck, Users } from "lucide-react";
import { doctorGet } from "../../api/services/doctorService";
import { patientGet } from "../../api/services/patientService";
import { moderatorGet } from "../../api/services/moderatorService";

function AdminUser() {
  const [selectedRole, setSelectedRole] = useState("moderator");
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [moderators, setModerators] = useState([]);

  useEffect(() => {
    doctorGet().then((res) => setDoctors(res.data));
    patientGet().then((res) => setPatients(res.data));
    moderatorGet().then((res) => setModerators(res.data));
  }, []);

  const total = doctors.length + patients.length + moderators.length;
  const active = [...doctors, ...patients, ...moderators].filter(
    (u) => u.is_active === true
  ).length;

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="max-w-7xl mx-auto relative">
        <div className="mb-8 p-6 pb-0">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Jami */}
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
              <Users className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Jami</p>
                <p className="text-2xl font-bold">{total}</p>
              </div>
            </div>
            {/* Shifokorlar */}
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
              <Stethoscope className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Shifokorlar</p>
                <p className="text-2xl font-bold">{doctors.length}</p>
              </div>
            </div>
            {/* Moderatorlar */}
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
              <Shield className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-500">Moderatorlar</p>
                <p className="text-2xl font-bold">{moderators.length}</p>
              </div>
            </div>
            {/* Bemorlar */}
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
              <Users className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Bemorlar</p>
                <p className="text-2xl font-bold">{patients.length}</p>
              </div>
            </div>
            {/* Faol */}
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
              <UserCheck className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Faol</p>
                <p className="text-2xl font-bold">{active}</p>
              </div>
            </div>
          </div>
        </div>

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="absolute top-[163px] right-[250px] px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent"
        >
          <option value="moderator">Moderatorlar</option>
          <option value="doctor">Shifokorlar</option>
          <option value="patient">Bemorlar</option>
          <option value="clinic">Klinikalar</option>
        </select>

        {selectedRole === "moderator" && <ModeratorMainManagement />}
        {selectedRole === "doctor" && <ModeratorDoctorManagement />}
        {selectedRole === "patient" && <ModeratorPatientManagement />}
        {selectedRole === "clinic" && <ModeratorPatientManagement />}
      </div>
    </div>
  );
}

export default AdminUser;