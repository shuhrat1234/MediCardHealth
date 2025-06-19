import React from 'react'
import { Users, Building2, UserCheck, Activity, Clock, CheckCircle, AlertCircle } from 'lucide-react'

function ModeratorMain() {
  // Sample data - replace with real data from your API
  const stats = {
    clinics: 25,
    doctors: 142,
    patients: 1876
  }

  const recentActions = [
    {
      id: 1,
      action: 'Yangi klinika royxatdan otkazildi',
      details: '"Salomatlik+" tibbiyot markazi',
      time: '2 soat oldin',
      type: 'success',
      icon: Building2
    },
    {
      id: 2,
      action: 'Shifokor tasdiqlandi',
      details: 'Doktor Ivanov A.S. – Kardiolog',
      time: '3 soat oldin',
      type: 'success',
      icon: UserCheck
    },
    {
      id: 3,
      action: 'Shifokorga shikoyat',
      details: 'Doktor Petrov V.M. – korib chiqish talab qilinmoqda',
      time: '5 soat oldin',
      type: 'warning',
      icon: AlertCircle
    },
    {
      id: 4,
      action: 'Yangi bemor',
      details: 'Royxatdan otgan: Sidorov P.I.',
      time: '6 soat oldin',
      type: 'info',
      icon: Users
    },
    {
      id: 5,
      action: 'Klinika profilidagi yangilanish',
      details: '7-son poliklinika ma\'lumotlarni yangiladi',
      time: '1 kun oldin',
      type: 'info',
      icon: Building2
    }
  ]

  const getActionColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-[#3d99f5] bg-blue-50 border-[#3d99f5]'
      case 'warning':
        return 'text-[#3d99f5] bg-blue-50 border-[#3d99f5]'
      case 'info':
        return 'text-[#3d99f5] bg-blue-50 border-[#3d99f5]'
      default:
        return 'text-[#3d99f5] bg-gray-50 border-[#3d99f5]'
    }
  }

  return (
    <div className='min-h-full w-full bg-[#f7f7f7] p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Statistics Cards */}
        <div className='mb-8'>
          <h2 className='text-xl font-medium text-gray-700 mb-4'>Statistika</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* Clinics Card */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600'>Klinikalar soni</p>
                  <p className='text-3xl font-bold text-[#3d99f5] mt-2'>{stats.clinics}</p>
                </div>
                <div className='p-3 bg-blue-100 rounded-full'>
                  <Building2 className='h-6 w-6 text-[#3d99f5]' />
                </div>
              </div>
              <div className='mt-4 flex items-center text-sm text-gray-700'>
                <span>Bu oyda +2 ta</span>
              </div>
            </div>

            {/* Doctors Card */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-700'>Shifokorlar soni</p>
                  <p className='text-3xl font-bold text-[#3d99f5] mt-2'>{stats.doctors}</p>
                </div>
                <div className='p-3 bg-blue-100 rounded-full'>
                  <UserCheck className='h-6 w-6 text-[#3d99f5]' />
                </div>
              </div>
              <div className='mt-4 flex items-center text-sm text-gray-700'>
                <span>Bu oyda +8 ta</span>
              </div>
            </div>

            {/* Patients Card */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-700'>Bemorlar soni</p>
                  <p className='text-3xl font-bold text-[#3d99f5] mt-2'>{stats.patients.toLocaleString()}</p>
                </div>
                <div className='p-3 bg-blue-100 rounded-full'>
                  <Users className='h-6 w-6 text-[#3d99f5]' />
                </div>
              </div>
              <div className='mt-4 flex items-center text-sm text-gray-700'>
                <span>Bu oyda +156 ta </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Actions */}
        <div>
          <h2 className='text-xl font-medium text-gray-700 mb-4'>So'nggi harakatlar</h2>
          <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
            <div className='p-4 border-b border-gray-200'>
              <div className='flex items-center'>
                <Activity className='h-5 w-5 text-gray-500 mr-2' />
                <h3 className='text-lg font-medium text-gray-800'>Yaqinda bo'lgan voqealar</h3>
              </div>
            </div>
            <div className='divide-y divide-gray-200'>
              {recentActions.map((action) => {
                const IconComponent = action.icon
                return (
                  <div key={action.id} className='p-4 hover:bg-gray-50 transition-colors duration-150'>
                    <div className='flex items-start space-x-4'>
                      <div className={`p-2 rounded-full ${getActionColor(action.type)}`}>
                        <IconComponent className='h-4 w-4' />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-sm font-medium text-gray-900'>
                          {action.action}
                        </p>
                        <p className='text-sm text-gray-600 mt-1'>
                          {action.details}
                        </p>
                        <div className='flex items-center mt-2 text-xs text-gray-500'>
                          <Clock className='h-3 w-3 mr-1' />
                          {action.time}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className='p-4 bg-gray-50 border-t border-gray-200'>
              <button className='text-sm text-blue-600 hover:text-blue-800 font-medium'>
                Barcha harakatlarni ko'rish →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModeratorMain