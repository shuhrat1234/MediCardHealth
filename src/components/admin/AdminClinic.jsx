import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, MapPin, Phone, Clock, Users, Building, Star } from 'lucide-react';

function AdminClinic() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Sample clinic data
  const clinics = [
    {
      id: 1,
      name: "Toshkent Tibbiyot Markazi",
      type: "Umumiy klinika",
      address: "Chilonzor tumani, Bunyodkor ko'chasi 5A",
      phone: "+998 71 200 10 10",
      workingHours: "24/7",
      doctors: 45,
      rating: 4.8,
      status: "active",
      services: ["Kardiologiya", "Nevrologiya", "Jarrohlik", "Terapiya"],
      totalPatients: 1250
    },
    {
      id: 2,
      name: "Markaziy Klinika",
      type: "Ixtisoslashgan klinika",
      address: "Yunusobod tumani, Amir Temur shoh ko'chasi 12",
      phone: "+998 71 150 20 20",
      workingHours: "08:00 - 20:00",
      doctors: 28,
      rating: 4.6,
      status: "active",
      services: ["Ginekologiya", "Pediatriya", "Dermatologiya"],
      totalPatients: 890
    },
    {
      id: 3,
      name: "Oila Poliklinikasi",
      type: "Oilaviy klinika",
      address: "Mirzo Ulug'bek tumani, Universitetskaya ko'chasi 7",
      phone: "+998 71 180 30 30",
      workingHours: "09:00 - 18:00",
      doctors: 15,
      rating: 4.4,
      status: "active",
      services: ["Oilaviy shifokor", "Bolalar shifokori", "Terapiya"],
      totalPatients: 650
    },
    {
      id: 4,
      name: "Sport Tibbiyoti Klinikasi",
      type: "Ixtisoslashgan klinika",
      address: "Shayxontohur tumani, Bobur ko'chasi 25",
      phone: "+998 71 190 40 40",
      workingHours: "07:00 - 22:00",
      doctors: 12,
      rating: 4.7,
      status: "active",
      services: ["Ortopediya", "Fizioterapiya", "Sport tibbiyoti"],
      totalPatients: 420
    },
    {
      id: 5,
      name: "Ayollar Salomatligi Markazi",
      type: "Ixtisoslashgan klinika",
      address: "Sergeli tumani, Yangi Sergeli MFY",
      phone: "+998 71 170 50 50",
      workingHours: "08:30 - 17:30",
      doctors: 18,
      rating: 4.5,
      status: "maintenance",
      services: ["Ginekologiya", "Akusherlik", "Mammologiya"],
      totalPatients: 780
    },
    {
      id: 6,
      name: "Bolalar Tibbiyot Markazi",
      type: "Bolalar klinikasi",
      address: "Bektemir tumani, Chinor ko'chasi 9",
      phone: "+998 71 160 60 60",
      workingHours: "24/7",
      doctors: 35,
      rating: 4.9,
      status: "inactive",
      services: ["Pediatriya", "Bolalar jarrohlik", "Neonatologiya"],
      totalPatients: 1100
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Faol';
      case 'inactive':
        return 'Nofaol';
      case 'maintenance':
        return 'Ta\'mirlash';
      default:
        return status;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Umumiy klinika':
        return 'bg-blue-100 text-blue-800';
      case 'Ixtisoslashgan klinika':
        return 'bg-purple-100 text-purple-800';
      case 'Oilaviy klinika':
        return 'bg-green-100 text-green-800';
      case 'Bolalar klinikasi':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredClinics = clinics.filter(clinic => {
    const matchesSearch = clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clinic.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clinic.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || clinic.status === selectedStatus;
    const matchesType = selectedType === 'all' || clinic.type === selectedType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getClinicStats = () => {
    return {
      total: clinics.length,
      active: clinics.filter(c => c.status === 'active').length,
      totalDoctors: clinics.reduce((sum, c) => sum + c.doctors, 0),
      totalPatients: clinics.reduce((sum, c) => sum + c.totalPatients, 0),
      avgRating: (clinics.reduce((sum, c) => sum + c.rating, 0) / clinics.length).toFixed(1)
    };
  };

  const stats = getClinicStats();

  return (
    <div className='min-h-screen w-full bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Page Title and Search */}
        <div className='mb-8'>
          <div className='flex justify-between items-start mb-6'>
            <div className='relative flex-1 mr-4'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
              <input
                type='text'
                placeholder='Klinika qidirish...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent'
              />
            </div>
            <button className='bg-[#3d99f5] text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2'>
              <Plus className='h-5 w-5' />
              Klinika qo'shish
            </button>
          </div>

          {/* Stats Cards */}
          <div className='grid grid-cols-1 md:grid-cols-5 gap-4 mb-6'>
            <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
              <div className='flex items-center'>
                <Building className='h-8 w-8 text-[#3d99f5]' />
                <div className='ml-3'>
                  <p className='text-sm font-medium text-gray-500'>Jami klinikalar</p>
                  <p className='text-2xl font-bold text-gray-900'>{stats.total}</p>
                </div>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
              <div className='flex items-center'>
                <Building className='h-8 w-8 text-green-500' />
                <div className='ml-3'>
                  <p className='text-sm font-medium text-gray-500'>Faol</p>
                  <p className='text-2xl font-bold text-gray-900'>{stats.active}</p>
                </div>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
              <div className='flex items-center'>
                <Users className='h-8 w-8 text-blue-500' />
                <div className='ml-3'>
                  <p className='text-sm font-medium text-gray-500'>Shifokorlar</p>
                  <p className='text-2xl font-bold text-gray-900'>{stats.totalDoctors}</p>
                </div>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
              <div className='flex items-center'>
                <Users className='h-8 w-8 text-purple-500' />
                <div className='ml-3'>
                  <p className='text-sm font-medium text-gray-500'>Bemorlar</p>
                  <p className='text-2xl font-bold text-gray-900'>{stats.totalPatients.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
              <div className='flex items-center'>
                <Star className='h-8 w-8 text-yellow-500' />
                <div className='ml-3'>
                  <p className='text-sm font-medium text-gray-500'>O'rtacha reyting</p>
                  <p className='text-2xl font-bold text-gray-900'>{stats.avgRating}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6'>
          <div className='flex flex-col lg:flex-row gap-4'>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className='px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent'
            >
              <option value='all'>Barcha turlar</option>
              <option value='Umumiy klinika'>Umumiy klinikalar</option>
              <option value='Ixtisoslashgan klinika'>Ixtisoslashgan klinikalar</option>
              <option value='Oilaviy klinika'>Oilaviy klinikalar</option>
              <option value='Bolalar klinikasi'>Bolalar klinikalari</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className='px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent'
            >
              <option value='all'>Barcha holatlar</option>
              <option value='active'>Faol</option>
              <option value='inactive'>Nofaol</option>
              <option value='maintenance'>Ta'mirlash</option>
            </select>
          </div>
        </div>

        {/* Clinics Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredClinics.length === 0 ? (
            <div className='col-span-full text-center py-12'>
              <Building className='h-16 w-16 text-gray-300 mx-auto mb-4' />
              <h3 className='text-lg font-medium text-gray-900 mb-2'>Klinikalar topilmadi</h3>
              <p className='text-gray-500'>
                {searchTerm 
                  ? 'Qidiruv natijasi topilmadi. Boshqa kalit so\'zlar bilan harakat qiling.'
                  : 'Hozircha klinikalar ro\'yxati bo\'sh.'
                }
              </p>
            </div>
          ) : (
            filteredClinics.map((clinic) => (
              <div key={clinic.id} className='bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
                <div className='p-6'>
                  <div className='flex justify-between items-start mb-4'>
                    <div className='flex-1'>
                      <h3 className='font-semibold text-gray-900 text-lg mb-2'>{clinic.name}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(clinic.type)}`}>
                        {clinic.type}
                      </span>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(clinic.status)}`}>
                      {getStatusText(clinic.status)}
                    </span>
                  </div>

                  <div className='space-y-3 mb-4'>
                    <div className='flex items-start gap-2'>
                      <MapPin className='h-4 w-4 text-gray-400 mt-1 flex-shrink-0' />
                      <p className='text-sm text-gray-600'>{clinic.address}</p>
                    </div>
                    
                    <div className='flex items-center gap-2'>
                      <Phone className='h-4 w-4 text-gray-400' />
                      <p className='text-sm text-gray-600'>{clinic.phone}</p>
                    </div>
                    
                    <div className='flex items-center gap-2'>
                      <Clock className='h-4 w-4 text-gray-400' />
                      <p className='text-sm text-gray-600'>{clinic.workingHours}</p>
                    </div>
                  </div>

                  <div className='grid grid-cols-3 gap-4 py-3 border-t border-gray-200 mb-4'>
                    <div className='text-center'>
                      <p className='text-lg font-semibold text-gray-900'>{clinic.doctors}</p>
                      <p className='text-xs text-gray-500'>Shifokorlar</p>
                    </div>
                    <div className='text-center'>
                      <p className='text-lg font-semibold text-gray-900'>{clinic.totalPatients}</p>
                      <p className='text-xs text-gray-500'>Bemorlar</p>
                    </div>
                    <div className='text-center'>
                      <div className='flex items-center justify-center gap-1'>
                        <Star className='h-4 w-4 text-yellow-500 fill-current' />
                        <p className='text-lg font-semibold text-gray-900'>{clinic.rating}</p>
                      </div>
                      <p className='text-xs text-gray-500'>Reyting</p>
                    </div>
                  </div>

                  <div className='mb-4'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Xizmatlar:</p>
                    <div className='flex flex-wrap gap-1'>
                      {clinic.services.slice(0, 3).map((service, index) => (
                        <span key={index} className='inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded'>
                          {service}
                        </span>
                      ))}
                      {clinic.services.length > 3 && (
                        <span className='inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded'>
                          +{clinic.services.length - 3} ko'proq
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='flex justify-between items-center pt-4 border-t border-gray-200'>
                    <div className='flex items-center gap-2'>
                      <button className='text-[#3d99f5] hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50'>
                        <Eye className='h-4 w-4' />
                      </button>
                      <button className='text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50'>
                        <Edit className='h-4 w-4' />
                      </button>
                      <button className='text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50'>
                        <Trash2 className='h-4 w-4' />
                      </button>
                    </div>
                    <button className='text-sm text-[#3d99f5] hover:text-blue-700 font-medium'>
                      Batafsil ko'rish
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {filteredClinics.length > 0 && (
          <div className='bg-white px-4 py-3 border border-gray-200 rounded-lg mt-6'>
            <div className='flex items-center justify-between'>
              <div className='flex-1 flex justify-between sm:hidden'>
                <button className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'>
                  Oldingi
                </button>
                <button className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'>
                  Keyingi
                </button>
              </div>
              <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
                <div>
                  <p className='text-sm text-gray-700'>
                    Jami <span className='font-medium'>{filteredClinics.length}</span> ta klinika ko'rsatilmoqda
                  </p>
                </div>
                <div>
                  <nav className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'>
                    <button className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>
                      Oldingi
                    </button>
                    <button className='relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'>
                      1
                    </button>
                    <button className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>
                      Keyingi
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminClinic;