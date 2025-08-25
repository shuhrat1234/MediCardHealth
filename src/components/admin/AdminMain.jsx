import React, { useEffect, useState } from 'react';
import { Users, Building2, Stethoscope, Activity, Clock, FileText, AlertCircle, ChevronRight } from 'lucide-react';
import { doctorGet } from "../../api/services/doctorService";
import { patientGet } from "../../api/services/patientService";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function AdminMain() {
  const navigate = useNavigate()

  const [stats, setStats] = useState({
    clinics: { count: 0, change: '+0' },
    doctors: { count: 0, change: '+0' },
    patients: { count: 0, change: '+0' }
  });

  const [actionsMap, setActionsMap] = useState(5)

  const [recentActivities, setRecentActivities] = useState([
    {
      user_fio: "Admin User",
      action: "doctor",
      appointment_id: 101,
      timestamp: new Date().toISOString(),
      details: "Yangi shifokor qo‘shildi"
    },
    {
      user_fio: "Admin User",
      action: "doctor",
      appointment_id: 101,
      timestamp: new Date().toISOString(),
      details: "Yangi shifokor qo‘shildi"
    },
    {
      user_fio: "Admin User",
      action: "doctor",
      appointment_id: 101,
      timestamp: new Date().toISOString(),
      details: "Yangi shifokor qo‘shildi"
    },
    {
      user_fio: "Admin User",
      action: "doctor",
      appointment_id: 101,
      timestamp: new Date().toISOString(),
      details: "Yangi shifokor qo‘shildi"
    },
    {
      user_fio: "Admin User",
      action: "doctor",
      appointment_id: 101,
      timestamp: new Date().toISOString(),
      details: "Yangi shifokor qo‘shildi"
    },
    {
      user_fio: "Admin User",
      action: "doctor",
      appointment_id: 101,
      timestamp: new Date().toISOString(),
      details: "Yangi shifokor qo‘shildi"
    },
    {
      user_fio: "Admin User",
      action: "doctor",
      appointment_id: 101,
      timestamp: new Date().toISOString(),
      details: "Yangi shifokor qo‘shildi"
    },
    {
      user_fio: "Admin User",
      action: "doctor",
      appointment_id: 101,
      timestamp: new Date().toISOString(),
      details: "Yangi shifokor qo‘shildi"
    },
    {
      user_fio: "Admin User",
      action: "doctor",
      appointment_id: 101,
      timestamp: new Date().toISOString(),
      details: "Yangi shifokor qo‘shildi"
    },
    {
      user_fio: "Admin User",
      action: "doctor",
      appointment_id: 101,
      timestamp: new Date().toISOString(),
      details: "Yangi shifokor qo‘shildi"
    },
    {
      user_fio: "Admin User",
      action: "doctor",
      appointment_id: 101,
      timestamp: new Date().toISOString(),
      details: "Yangi shifokor qo‘shildi"
    },
    {
      user_fio: "Admin User",
      action: "doctor",
      appointment_id: 101,
      timestamp: new Date().toISOString(),
      details: "Yangi shifokor qo‘shildi"
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorRes, patientRes, actionsRes] = await Promise.all([
          doctorGet(),
          patientGet(),
          axios.get('/recently-actions/')
        ]);

        setStats({
          clinics: { count: 0, change: '+0' },
          doctors: { count: doctorRes.data.length, change: '+0' },
          patients: { count: patientRes.data.length, change: '+0' }
        });

        setRecentActivities(prev => [
          ...prev,
          ...(Array.isArray(actionsRes.data) ? actionsRes.data : [])
        ])

      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  const StatCard = ({ title, count, change, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{count.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-2">
            Bu oyda{' '}
            <span className="text-green-600 font-medium">{change} ta</span>
          </p>
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
          <Icon size={24} style={{ color }} />
        </div>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const getIconColor = (action) => {
      switch (action) {
        case 'clinic': return '#3b82f6';
        case 'doctor': return '#10b981';
        case 'complaint': return '#f59e0b';
        case 'patient': return '#8b5cf6';
        default: return '#6b7280';
      }
    };

    return (
      <div className="flex items-start space-x-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
        <div className="p-2 rounded-full" style={{ backgroundColor: `${getIconColor(activity.action)}20` }}>
          <AlertCircle size={16} style={{ color: getIconColor(activity.action) }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{activity.user_fio}</p>
          <p className="text-sm text-gray-500">{activity.details}</p>
          <div className="flex items-center mt-1">
            <Clock size={12} className="text-gray-400 mr-1" />
            <span className="text-xs text-gray-400">
              {new Date(activity.timestamp).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-full w-full bg-gray-50 p-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Klinikalar soni"
          count={stats.clinics.count}
          change={stats.clinics.change}
          icon={Building2}
          color="#3b82f6"
        />
        <StatCard
          title="Shifokorlar soni"
          count={stats.doctors.count}
          change={stats.doctors.change}
          icon={Stethoscope}
          color="#10b981"
        />
        <StatCard
          title="Bemorlar soni"
          count={stats.patients.count}
          change={stats.patients.change}
          icon={Users}
          color="#8b5cf6"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md min-h-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">So'nggi harakatlar</h2>
                <Activity size={20} className="text-gray-400" />
              </div>
            </div>
            <div className="relative h-[585px] overflow-y-scroll p-2 overflow-x-hidden">
              <div className="space-y-1">
                {recentActivities.slice(0, actionsMap).map((activity, index) => (
                  <ActivityItem key={index} activity={activity} />
                ))}
              </div>
              {
                recentActivities.length > actionsMap &&
                <div className='p-4 bg-gray-50 border-t border-gray-200 w-full absolute bottom-0'>
                  <button
                    onClick={() => setActionsMap(recentActivities.length)}
                    className='cursor-pointer text-[18px] text-blue-600 hover:text-blue-800 font-medium flex gap-[3px] items-center'>
                    Barcha harakatlarni ko'rish <ChevronRight className='size-5' />
                  </button>
                </div>
              }
            </div>
          </div>
        </div>

        {/* Quick Actions & System Status */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tezkor amallar</h3>
            <div className="space-y-3">
              <button onClick={() => navigate('clinic')} className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <span className="text-sm font-medium">Yangi klinika qo'shish</span>
                <Building2 size={16} className="text-gray-400" />
              </button>
              <button onClick={() => navigate('user')} className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <span className="text-sm font-medium">Shifokorlarni ko'rish</span>
                <Stethoscope size={16} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tizim holati</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Server holati</span>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-green-600">Faol</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Ma'lumotlar bazasi</span>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-green-600">Bog'langan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Umumiy statistika</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Jami Klinikalar soni</span>
                <span className="text-sm font-bold text-blue-600">{stats.clinics.count}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Jami Shifokorlar soni</span>
                <span className="text-sm font-bold text-green-600">{stats.doctors.count}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Jami Bemorlar soni</span>
                <span className="text-sm font-bold text-purple-600">{stats.patients.count}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMain;