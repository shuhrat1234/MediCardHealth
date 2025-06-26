import React, { useState } from 'react';
import { Users, Building2, Stethoscope, Activity, Clock, FileText, TrendingUp, AlertCircle } from 'lucide-react';

function AdminMain() {
  const [stats] = useState({
    clinics: { count: 25, change: '+2' },
    doctors: { count: 142, change: '+8' },
    patients: { count: 1876, change: '+156' }
  });

  const [recentActivities] = useState([
    {
      id: 1,
      type: 'clinic',
      title: 'Yangi klinika royxatdan otkazildi',
      description: '"Salomatlik+" tibbiyot markazi',
      time: '2 soat oldin',
      icon: Building2
    },
    {
      id: 2,
      type: 'doctor',
      title: 'Shifokor tasdiqlandi',
      description: 'Doktor Ivanov A.S. – Kardiolog',
      time: '3 soat oldin',
      icon: Stethoscope
    },
    {
      id: 3,
      type: 'complaint',
      title: 'Shifokorga shikoyat',
      description: 'Doktor Petrov V.M. – korib chiqish talab qilinmoqda',
      time: '5 soat oldin',
      icon: AlertCircle
    },
    {
      id: 4,
      type: 'patient',
      title: 'Yangi bemor',
      description: 'Yangi bemor royxatdan otdi',
      time: '1 soat oldin',
      icon: Users
    },
    {
      id: 5,
      type: 'doctor',
      title: 'Shifokor tasdiqlandi',
      description: 'Doktor Ivanov A.S. – Kardiolog',
      time: '3 soat oldin',
      icon: Stethoscope
    },
  ]);

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
    const IconComponent = activity.icon;
    const getIconColor = (type) => {
      switch (type) {
        case 'clinic': return '#3b82f6';
        case 'doctor': return '#10b981';
        case 'complaint': return '#f59e0b';
        case 'patient': return '#8b5cf6';
        default: return '#6b7280';
      }
    };

    return (
      <div className="flex items-start space-x-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
        <div className="p-2 rounded-full" style={{ backgroundColor: `${getIconColor(activity.type)}20` }}>
          <IconComponent size={16} style={{ color: getIconColor(activity.type) }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
          <p className="text-sm text-gray-500">{activity.description}</p>
          <div className="flex items-center mt-1">
            <Clock size={12} className="text-gray-400 mr-1" />
            <span className="text-xs text-gray-400">{activity.time}</span>
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
            <div className="p-2">
              <div className="space-y-1">
                {recentActivities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
              <div className="p-4 pt-10 text-center">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Barcha harakatlarni ko'rish
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & System Status */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tezkor amallar</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-sm font-medium">Yangi klinika qo'shish</span>
                <Building2 size={16} className="text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-sm font-medium">Shifokorlarni ko'rish</span>
                <Stethoscope size={16} className="text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-sm font-medium">Hisobotlar</span>
                <FileText size={16} className="text-gray-400" />
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
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Backup</span>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-yellow-600">6 soat oldin</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bugungi statistika</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Yangi bemorlar</span>
                <span className="text-sm font-bold text-blue-600">23</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Qabullar</span>
                <span className="text-sm font-bold text-green-600">167</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Faol shifokorlar</span>
                <span className="text-sm font-bold text-purple-600">89</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMain;