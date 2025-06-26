import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, Filter, Users, UserCheck, UserX, Shield } from 'lucide-react';

function AdminUser() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Sample user data
  const users = [
    {
      id: 1,
      name: "Karimov Akmal Bekovich",
      email: "a.karimov@clinic.uz",
      role: "doctor",
      specialty: "Kardiolog",
      phone: "+998 90 123 45 67",
      experience: "15 yil",
      status: "active",
      avatar: null
    },
    {
      id: 2,
      name: "Abdullayeva Malika Ravshanovna",
      email: "m.abdullayeva@clinic.uz",
      role: "doctor",
      specialty: "Nevrolog",
      phone: "+998 91 234 56 78",
      experience: "8 yil",
      status: "active",
      avatar: null
    },
    {
      id: 3,
      name: "Tursunov Bobur Alievich",
      email: "b.tursunov@clinic.uz",
      role: "doctor",
      specialty: "Jarroh",
      phone: "+998 93 345 67 89",
      experience: "12 yil",
      status: "active",
      avatar: null
    },
    {
      id: 4,
      name: "Nazarova Dilnoza Rustamovna",
      email: "d.nazarova@clinic.uz",
      role: "moderator",
      specialty: "Moderator",
      phone: "+998 94 456 78 90",
      experience: "3 yil",
      status: "active",
      avatar: null
    },
    {
      id: 5,
      name: "Saidov Jahongir Muzaffarovich",
      email: "j.saidov@clinic.uz",
      role: "patient",
      specialty: "Bemor",
      phone: "+998 95 567 89 01",
      experience: "-",
      status: "active",
      avatar: null
    },
    {
      id: 6,
      name: "Usmonova Sevara Akramovna",
      email: "s.usmonova@clinic.uz",
      role: "patient",
      specialty: "Bemor",
      phone: "+998 97 678 90 12",
      experience: "-",
      status: "inactive",
      avatar: null
    }
  ];

  const getRoleColor = (role) => {
    switch (role) {
      case 'doctor':
        return 'bg-blue-100 text-blue-800';
      case 'moderator':
        return 'bg-purple-100 text-purple-800';
      case 'patient':
        return 'bg-green-100 text-green-800';
      case 'admin':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleText = (role) => {
    switch (role) {
      case 'doctor':
        return 'Shifokor';
      case 'moderator':
        return 'Moderator';
      case 'patient':
        return 'Bemor';
      case 'admin':
        return 'Admin';
      default:
        return role;
    }
  };

  const getStatusColor = (status) => {
    return status === 'active'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  const getStatusText = (status) => {
    return status === 'active' ? 'Faol' : 'Nofaol';
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleStats = () => {
    const stats = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});

    return {
      total: users.length,
      doctors: stats.doctor || 0,
      moderators: stats.moderator || 0,
      patients: stats.patient || 0,
      active: users.filter(u => u.status === 'active').length
    };
  };

  const stats = getRoleStats();

  return (
    <div className='min-h-screen w-full bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
         <div className='mb-8'>
          {/* Stats Cards */}
          <div className='grid grid-cols-1 md:grid-cols-5 gap-4 mb-6'>
            <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
              <div className='flex items-center'>
                <Users className='h-8 w-8 text-[#3d99f5]' />
                <div className='ml-3'>
                  <p className='text-sm font-medium text-gray-500'>Jami</p>
                  <p className='text-2xl font-bold text-gray-900'>{stats.total}</p>
                </div>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
              <div className='flex items-center'>
                <UserCheck className='h-8 w-8 text-blue-500' />
                <div className='ml-3'>
                  <p className='text-sm font-medium text-gray-500'>Shifokorlar</p>
                  <p className='text-2xl font-bold text-gray-900'>{stats.doctors}</p>
                </div>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
              <div className='flex items-center'>
                <Shield className='h-8 w-8 text-purple-500' />
                <div className='ml-3'>
                  <p className='text-sm font-medium text-gray-500'>Moderatorlar</p>
                  <p className='text-2xl font-bold text-gray-900'>{stats.moderators}</p>
                </div>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
              <div className='flex items-center'>
                <Users className='h-8 w-8 text-green-500' />
                <div className='ml-3'>
                  <p className='text-sm font-medium text-gray-500'>Bemorlar</p>
                  <p className='text-2xl font-bold text-gray-900'>{stats.patients}</p>
                </div>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
              <div className='flex items-center'>
                <UserCheck className='h-8 w-8 text-green-500' />
                <div className='ml-3'>
                  <p className='text-sm font-medium text-gray-500'>Faol</p>
                  <p className='text-2xl font-bold text-gray-900'>{stats.active}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6'>
          <div className='flex flex-col lg:flex-row gap-4'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
              <input
                type='text'
                placeholder='Shifokor qidirish...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent'
              />
            </div>

            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className='px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent'
            >
              <option value='all'>Barcha rollar</option>
              <option value='doctor'>Shifokorlar</option>
              <option value='moderator'>Moderatorlar</option>
              <option value='patient'>Bemorlar</option>
            </select>

            <button className='bg-[#3d99f5] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2'>
              <Plus className='h-5 w-5' />
              Shifokor qo'shish
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    SHIFOKOR
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    MUTAXASSISLIK
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    TELEFON
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    TAJRIBA
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    HOLAT
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    AMALLAR
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='h-10 w-10 bg-[#3d99f5] rounded-full flex items-center justify-center'>
                          <span className='text-white font-medium text-sm'>
                            {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </span>
                        </div>
                        <div className='ml-4'>
                          <div className='text-sm font-medium text-gray-900'>{user.name}</div>
                          <div className='text-sm text-gray-500'>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center gap-2'>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                          {getRoleText(user.role)}
                        </span>
                        {user.role === 'doctor' && (
                          <span className='text-sm text-gray-900'>{user.specialty}</span>
                        )}
                        {user.role !== 'doctor' && (
                          <span className='text-sm text-gray-500'>{user.specialty}</span>
                        )}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {user.phone}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {user.experience}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                        {getStatusText(user.status)}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                      <div className='flex items-center gap-2'>
                        <button className='text-[#3d99f5] hover:text-blue-700 p-1'>
                          <Eye className='h-4 w-4' />
                        </button>
                        <button className='text-green-600 hover:text-green-800 p-1'>
                          <Edit className='h-4 w-4' />
                        </button>
                        <button className='text-red-600 hover:text-red-800 p-1'>
                          <Trash2 className='h-4 w-4' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className='text-center py-12'>
              <Users className='h-16 w-16 text-gray-300 mx-auto mb-4' />
              <h3 className='text-lg font-medium text-gray-900 mb-2'>Foydalanuvchilar topilmadi</h3>
              <p className='text-gray-500'>
                {searchTerm
                  ? 'Qidiruv natijasi topilmadi. Boshqa kalit so\'zlar bilan harakat qiling.'
                  : 'Hozircha foydalanuvchilar ro\'yxati bo\'sh.'
                }
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className='bg-white px-4 py-3 border-t border-gray-200 rounded-b-lg'>
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
                    Jami <span className='font-medium'>{filteredUsers.length}</span> ta foydalanuvchi ko'rsatilmoqda
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

export default AdminUser;