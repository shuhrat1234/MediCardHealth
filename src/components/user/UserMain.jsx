import React, { useState } from 'react';
import { Calendar, Bell, Clock, User, Phone, MapPin, Pill, AlertCircle } from 'lucide-react';

function UserMain() {
  const [appointments] = useState([
    {
      id: 1,
      doctor: "Dr. Aliyev Jamshid",
      specialty: "Kardiolog",
      date: "2025-06-26",
      time: "09:30",
      location: "1-xona, 2-qavat"
    },
    {
      id: 2,
      doctor: "Dr. Karimova Nilufar",
      specialty: "Nevropatolog",
      date: "2025-06-28",
      time: "14:00",
      location: "3-xona, 1-qavat"
    },
    {
      id: 3,
      doctor: "Dr. Usmanov Bobur",
      specialty: "Terapevt",
      date: "2025-07-02",
      time: "11:15",
      location: "5-xona, 2-qavat"
    }
  ]);

  const [notifications] = useState([
    {
      id: 1,
      type: "recipe",
      title: "Dori qabul qilish vaqti",
      message: "Aspirin 100mg - kuniga 1 marta, nonushtadan keyin",
      time: "08:00",
      icon: <Pill className="w-5 h-5" />
    },
    {
      id: 2,
      type: "reminder",
      title: "Tekshiruv eslatmasi",
      message: "Ertaga Dr. Aliyev bilan ko'rishuvingiz bor",
      time: "Ertaga",
      icon: <AlertCircle className="w-5 h-5" />
    },
    {
      id: 3,
      type: "recipe",
      title: "Qon bosimini o'lchash",
      message: "Har kuni ertalab qon bosimingizni o'lchashni unutmang",
      time: "Har kuni",
      icon: <Bell className="w-5 h-5" />
    }
  ]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Bugun";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Ertaga";
    } else {
      return date.toLocaleDateString('uz-UZ', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div className='min-h-full w-full bg-gray-50 p-6'>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ближайшие записи */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[#3d99f5] px-6 py-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-white" />
              <h2 className="text-xl font-semibold text-white">Yaqin Qabullar</h2>
            </div>
          </div>
          
          <div className="p-6">
            {appointments.length > 0 ? (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#3d99f5] transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <User className="w-4 h-4 text-[#3d99f5]" />
                          <h3 className="font-semibold text-gray-800">{appointment.doctor}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{appointment.specialty}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatDate(appointment.date)} - {appointment.time}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
                          <MapPin className="w-4 h-4" />
                          <span>{appointment.location}</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="bg-[#3d99f5] text-white px-3 py-1 rounded-full text-xs font-medium">
                          {formatDate(appointment.date) === "Bugun" ? "Bugun" : 
                           formatDate(appointment.date) === "Ertaga" ? "Ertaga" : "Kelgusi"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Hozircha qabullar yo'q</p>
              </div>
            )}
          </div>
        </div>

        {/* Уведомления */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[#3d99f5] px-6 py-4">
            <div className="flex items-center space-x-3">
              <Bell className="w-6 h-6 text-white" />
              <h2 className="text-xl font-semibold text-white">Eslatmalar</h2>
            </div>
          </div>
          
          <div className="p-6">
            {notifications.length > 0 ? (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#3d99f5] transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#3d99f5] bg-opacity-10 rounded-lg flex items-center justify-center text-white">
                        {notification.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 mb-1">{notification.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-500">{notification.time}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            notification.type === 'recipe' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {notification.type === 'recipe' ? 'Retsept' : 'Eslatma'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Eslatmalar yo'q</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[#3d99f5] hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#3d99f5] bg-opacity-10 rounded-lg flex items-center justify-center text-white group-hover:bg-[#3d99f5] group-hover:text-white transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">Aloqa</h3>
              <p className="text-sm text-gray-600">Shifokor bilan bog'lanish</p>
            </div>
          </div>
        </button>

        <button className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[#3d99f5] hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#3d99f5] bg-opacity-10 rounded-lg flex items-center justify-center text-white group-hover:bg-[#3d99f5] group-hover:text-white transition-colors">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">Yangi qabul</h3>
              <p className="text-sm text-gray-600">Qabul vaqti belgilash</p>
            </div>
          </div>
        </button>

        <button className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[#3d99f5] hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#3d99f5] bg-opacity-10 rounded-lg flex items-center justify-center text-white group-hover:bg-[#3d99f5] group-hover:text-white transition-colors">
              <Pill className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">Dorilar</h3>
              <p className="text-sm text-gray-600">Retseptlar ko'rish</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default UserMain;