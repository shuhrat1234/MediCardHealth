import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, MapPin, Filter, Search, ChevronRight } from 'lucide-react';

function UserAppointment() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample appointment data
  const upcomingAppointments = [
    {
      id: 1,
      doctorName: "Dr. Aziza Karimova",
      specialty: "Kardiolog",
      date: "2025-06-26",
      time: "10:00",
      location: "Toshkent Tibbiyot Markazi",
      phone: "+998 90 123 45 67",
      status: "confirmed"
    },
    {
      id: 2,
      doctorName: "Dr. Bobur Rahimov",
      specialty: "Nevropatolog",
      date: "2025-06-28",
      time: "14:30",
      location: "Markaziy Klinika",
      phone: "+998 91 234 56 78",
      status: "pending"
    },
    {
      id: 3,
      doctorName: "Dr. Malika Usmonova",
      specialty: "Dermotolog",
      date: "2025-07-02",
      time: "09:15",
      location: "Oila Poliklinikasi",
      phone: "+998 93 345 67 89",
      status: "confirmed"
    }
  ];

  const pastAppointments = [
    {
      id: 4,
      doctorName: "Dr. Sardor Toshev",
      specialty: "Terapevt",
      date: "2025-06-20",
      time: "11:00",
      location: "Shaharsoz Poliklinikasi",
      phone: "+998 94 456 78 90",
      status: "completed"
    },
    {
      id: 5,
      doctorName: "Dr. Nargiza Alimova",
      specialty: "Ginekolog",
      date: "2025-06-15",
      time: "15:00",
      location: "Ayollar Salomatligi Markazi",
      phone: "+998 95 567 89 01",
      status: "completed"
    },
    {
      id: 6,
      doctorName: "Dr. Javohir Nazarov",
      specialty: "Ortoped",
      date: "2025-06-10",
      time: "08:30",
      location: "Sport Tibbiyoti Klinikasi",
      phone: "+998 97 678 90 12",
      status: "completed"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Tasdiqlangan';
      case 'pending':
        return 'Kutilmoqda';
      case 'completed':
        return 'Tugallangan';
      default:
        return status;
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('uz-UZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const currentAppointments = activeTab === 'upcoming' ? upcomingAppointments : pastAppointments;
  const filteredAppointments = currentAppointments.filter(appointment =>
    appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='min-h-screen w-full bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>                                 
        {/* Tab Navigation */}
        <div className='mb-6'>
          <div className='border-b border-gray-200'>
            <nav className='-mb-px flex space-x-8'>
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'upcoming'
                    ? 'border-[#3d99f5] text-[#3d99f5]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Kelayotgan qabullar
                <span className='ml-2 bg-[#3d99f5] text-white text-xs px-2 py-1 rounded-full'>
                  {upcomingAppointments.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'past'
                    ? 'border-[#3d99f5] text-[#3d99f5]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                O'tgan qabullar
                <span className='ml-2 bg-gray-500 text-white text-xs px-2 py-1 rounded-full'>
                  {pastAppointments.length}
                </span>
              </button>
            </nav>
          </div>
        </div>

        {/* Search and Filter */}
        <div className='mb-6 flex flex-col sm:flex-row gap-4'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
            <input
              type='text'
              placeholder='Shifokor yoki mutaxassislik boyicha qidiring...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent'
            />
          </div>
          <button className='flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'>
            <Filter className='h-5 w-5 text-gray-500' />
            <span className='text-gray-700'>Filter</span>
          </button>
        </div>

        {/* Appointments List */}
        <div className='space-y-4'>
          {filteredAppointments.length === 0 ? (
            <div className='text-center py-12'>
              <Calendar className='h-16 w-16 text-gray-300 mx-auto mb-4' />
              <h3 className='text-lg font-medium text-gray-900 mb-2'>
                {activeTab === 'upcoming' ? 'Kelayotgan qabullar yo\'q' : 'O\'tgan qabullar yo\'q'}
              </h3>
              <p className='text-gray-500'>
                {searchTerm 
                  ? 'Qidiruv natijasi topilmadi. Boshqa kalit so\'zlar bilan harakat qiling.'
                  : activeTab === 'upcoming' 
                    ? 'Hozircha rejalashtirilgan qabullaringiz yo\'q.'
                    : 'Hozircha o\'tgan qabullaringiz yo\'q.'
                }
              </p>
            </div>
          ) : (
            filteredAppointments.map((appointment) => (
              <div key={appointment.id} className='bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
                <div className='p-6'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-3 mb-3'>
                        <div className='h-12 w-12 bg-[#3d99f5] rounded-full flex items-center justify-center'>
                          <User className='h-6 w-6 text-white' />
                        </div>
                        <div>
                          <h3 className='font-semibold text-gray-900 text-lg'>{appointment.doctorName}</h3>
                          <p className='text-[#3d99f5] font-medium'>{appointment.specialty}</p>
                        </div>
                      </div>
                      
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                        <div className='flex items-center gap-3'>
                          <Calendar className='h-5 w-5 text-gray-400' />
                          <div>
                            <p className='text-sm text-gray-500'>Sana</p>
                            <p className='font-medium text-gray-900'>{formatDate(appointment.date)}</p>
                          </div>
                        </div>
                        
                        <div className='flex items-center gap-3'>
                          <Clock className='h-5 w-5 text-gray-400' />
                          <div>
                            <p className='text-sm text-gray-500'>Vaqt</p>
                            <p className='font-medium text-gray-900'>{appointment.time}</p>
                          </div>
                        </div>
                        
                        <div className='flex items-center gap-3'>
                          <MapPin className='h-5 w-5 text-gray-400' />
                          <div>
                            <p className='text-sm text-gray-500'>Joylashuv</p>
                            <p className='font-medium text-gray-900'>{appointment.location}</p>
                          </div>
                        </div>
                        
                        <div className='flex items-center gap-3'>
                          <Phone className='h-5 w-5 text-gray-400' />
                          <div>
                            <p className='text-sm text-gray-500'>Telefon</p>
                            <p className='font-medium text-gray-900'>{appointment.phone}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className='flex flex-col items-end gap-3'>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </span>
                      
                      {activeTab === 'upcoming' && (
                        <button className='flex items-center gap-2 text-[#3d99f5] hover:text-blue-700 font-medium'>
                          Batafsil
                          <ChevronRight className='h-4 w-4' />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                {activeTab === 'upcoming' && appointment.status === 'confirmed' && (
                  <div className='px-6 py-3 bg-green-50 border-t border-green-200'>
                    <p className='text-sm text-green-800'>
                      ✓ Qabul tasdiqlangan. Belgilangan vaqtda klinikaga tashrif buyuring.
                    </p>
                  </div>
                )}
                
                {activeTab === 'upcoming' && appointment.status === 'pending' && (
                  <div className='px-6 py-3 bg-yellow-50 border-t border-yellow-200'>
                    <p className='text-sm text-yellow-800'>
                      ⏳ Qabul tasdiqlanishini kutmoqda. Tez orada sizga aloqa qilamiz.
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        {activeTab === 'upcoming' && filteredAppointments.length > 0 && (
          <div className='mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>Tezkor amallar</h3>
            <div className='flex flex-wrap gap-3'>
              <button className='bg-[#3d99f5] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
                Yangi qabul belgilash
              </button>
              <button className='border border-[#3d99f5] text-[#3d99f5] px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors'>
                Qabulni o'zgartirish
              </button>
              <button className='border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors'>
                Eslatma qo'yish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserAppointment;