import React, { useEffect, useState } from 'react';
import { Calendar, Users, Clock, Bell, User, AlertCircle, Plus, Eye } from 'lucide-react';

function DoctorMain() {
  const [Appointments, setAppointments] = useState([])

  const getPatients = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await patientGet();
      setAppointments(result)
    } catch (error) {
      setApiError(
        error.response?.data?.detail || "Tizimga kirishda xatolik yuz berdi"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPatients()
  }, [])

  const notifications = [
    {
      id: 1,
      type: 'new_patient',
      title: 'Yangi bemor',
      message: 'Yusupov Anvar royxatdan otdi',
      time: '10 daqiqa oldin',
      priority: 'high'
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Qabul eslatmasi',
      message: 'Karimova Nodira bilan qabul 15:00 da boshlanadi',
      time: '30 daqiqa oldin',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'new_patient',
      title: 'Yangi bemor',
      message: 'Rahmonov Bekzod royxatdan otdi',
      time: '1 soat oldin',
      priority: 'high'
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Dori eslatmasi',
      message: 'Toshmatov Bobur uchun retsept yangilash kerak',
      time: '2 soat oldin',
      priority: 'low'
    },
    {
      id: 5,
      type: 'reminder',
      title: 'Laboratoriya natijasi',
      message: 'Ahmadov Jasur ning tahlil natijalari tayyor',
      time: '3 soat oldin',
      priority: 'medium'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f7f7f7] p-4">
      {/* Current Appointments Section */}
      <div className="mb-6">
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="p-4 text-white bg-[#3d99f5]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <div>
                  <h2 className="text-xl font-bold">Joriy qabullar</h2>
                  <p className="opacity-80 text-sm">Bugungi qabullar</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{Appointments.length}</p>
                <p className="opacity-80 text-xs">qabul</p>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="space-y-3">
              {Appointments.slice(0, 3).map((appointment) => (
                <div key={appointment.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 transition-all duration-200 hover:shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ background: '#3d99f5' }}>
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{appointment.patient}</h3>
                        <p className="text-sm text-gray-600">{appointment.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Clock className="w-4 h-4" style={{ color: '#3d99f5' }} />
                        <span className="font-bold text-gray-900">{appointment.time}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${appointment.status === 'confirmed'
                        ? 'bg-green-100 text-green-700'
                        : 'text-white'
                        }`}
                        style={appointment.status === 'pending' ? { backgroundColor: '#3d99f5' } : {}}>
                        {appointment.status === 'confirmed' ? 'Tasdiqlangan' : 'Kutilmoqda'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex space-x-3">
                <button className="flex-1 flex items-center justify-center space-x-2 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 hover:opacity-90"
                  style={{ backgroundColor: '#3d99f5' }}>
                  <Plus className="w-4 h-4" />
                  <span>Yangi qabul</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold transition-colors duration-200">
                  <Eye className="w-4 h-4" />
                  <span>Barchasi</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="p-4 text-white" style={{ background: '#3d99f5' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <div>
                  <h2 className="text-xl font-bold">Bildirishnomalar</h2>
                  <p className="opacity-80 text-sm">Yangi xabarlar</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold">{notifications.length}</span>
                <span className="opacity-80 text-xs ml-1">yangi</span>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="space-y-3">
              {notifications.slice(0, 3).map((notification) => (
                <div key={notification.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 transition-all duration-200 hover:shadow-sm">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full flex-shrink-0 ${notification.type === 'new_patient' ? 'bg-green-100' : ''
                      }`}
                      style={notification.type === 'reminder' ? { backgroundColor: '#f0f7ff' } : {}}>
                      {notification.type === 'new_patient' ? (
                        <Users className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5" style={{ color: '#3d99f5' }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-gray-900">{notification.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${notification.priority === 'high' ? 'bg-red-100 text-red-700' :
                          notification.priority === 'low' ? 'bg-gray-100 text-gray-700' : 'text-white'
                          }`}
                          style={notification.priority === 'medium' ? { backgroundColor: '#3d99f5' } : {}}>
                          {notification.priority === 'high' ? 'Muhim' :
                            notification.priority === 'medium' ? 'Orta' : 'Past'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                          <span className="text-lg">×</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold transition-all duration-200">
                Barcha bildirishnomalar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorMain;