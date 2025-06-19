import React, { useState } from 'react'
import { Plus, Edit2, Trash2, Search, X, Save, Eye, Phone, Mail, MapPin, Calendar, User, Briefcase } from 'lucide-react'

function ModeratorDoctorManagement() {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      firstName: 'Akmal',
      lastName: 'Karimov',
      middleName: 'Bekovich',
      specialty: 'Kardiolog',
      phone: '+998 90 123 45 67',
      email: 'a.karimov@clinic.uz',
      experience: 15,
      education: 'Toshkent tibbiyot akademiyasi',
      address: 'Toshkent sh., Navoiy ko\'chasi 12',
      birthDate: '1978-05-15',
      licenseNumber: 'DOC-2024-001',
      status: 'Faol'
    },
    {
      id: 2,
      firstName: 'Malika',
      lastName: 'Abdullayeva',
      middleName: 'Ravshanovna',
      specialty: 'Nevrolog',
      phone: '+998 91 234 56 78',
      email: 'm.abdullayeva@clinic.uz',
      experience: 8,
      education: 'Samarqand tibbiyot instituti',
      address: 'Toshkent sh., Amir Temur ko\'chasi 45',
      birthDate: '1985-09-22',
      licenseNumber: 'DOC-2024-002',
      status: 'Faol'
    },
    {
      id: 3,
      firstName: 'Bobur',
      lastName: 'Tursunov',
      middleName: 'Alievich',
      specialty: 'Jarroh',
      phone: '+998 93 345 67 89',
      email: 'b.tursunov@clinic.uz',
      experience: 12,
      education: 'Andijon tibbiyot instituti',
      address: 'Toshkent sh., Chilonzor 78',
      birthDate: '1980-03-10',
      licenseNumber: 'DOC-2024-003',
      status: 'Faol'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState(null)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [doctorToDelete, setDoctorToDelete] = useState(null)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    specialty: '',
    phone: '',
    email: '',
    experience: '',
    education: '',
    address: '',
    birthDate: '',
    licenseNumber: '',
    status: 'Faol'
  })

  const specialties = [
    'Kardiolog', 'Nevrolog', 'Jarroh', 'Terapevt', 'Pediatr', 
    'Dermatolog', 'Oftalmolog', 'Lor', 'Ginekolog', 'Urolog'
  ]

  const filteredDoctors = doctors.filter(doctor =>
    doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingDoctor) {
      setDoctors(doctors.map(doctor =>
        doctor.id === editingDoctor.id ? { ...formData, id: editingDoctor.id } : doctor
      ))
    } else {
      setDoctors([...doctors, { ...formData, id: Date.now() }])
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      middleName: '',
      specialty: '',
      phone: '',
      email: '',
      experience: '',
      education: '',
      address: '',
      birthDate: '',
      licenseNumber: '',
      status: 'Faol'
    })
    setEditingDoctor(null)
    setShowModal(false)
  }

  const handleEdit = (doctor) => {
    setFormData(doctor)
    setEditingDoctor(doctor)
    setShowModal(true)
  }

  const handleDelete = (doctor) => {
    setDoctorToDelete(doctor)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    setDoctors(doctors.filter(doctor => doctor.id !== doctorToDelete.id))
    setShowDeleteModal(false)
    setDoctorToDelete(null)
  }

  const handleView = (doctor) => {
    setSelectedDoctor(doctor)
  }

  return (
    <div className='min-h-full w-full bg-[#f7f7f7] p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Search and Add Button */}
        <div className='flex flex-col sm:flex-row justify-between items-center mb-6 gap-4'>
          <div className='relative flex-1 max-w-md'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
            <input
              type="text"
              placeholder="Shifokor qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-0'
            />
          </div>
          <button
            onClick={() => setShowModal(true)}
            className='bg-[#3d99f5] hover:bg-[#2d89e5] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors'
          >
            <Plus className='w-5 h-5' />
            Shifokor qoshish
          </button>
        </div>

        {/* Doctors Table */}
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Shifokor
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Mutaxassislik
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Telefon
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Tajriba
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Holat
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
                          <User className='w-5 h-5 text-[#3d99f5]' />
                        </div>
                        <div className='ml-4'>
                          <div className='text-sm font-medium text-gray-900'>
                            {doctor.lastName} {doctor.firstName} {doctor.middleName}
                          </div>
                          <div className='text-sm text-gray-500'>{doctor.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>{doctor.specialty}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>{doctor.phone}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>{doctor.experience} yil</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        doctor.status === 'Faol' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {doctor.status}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                      <div className='flex items-center gap-2'>
                        <button
                          onClick={() => handleView(doctor)}
                          className='text-[#3d99f5] hover:text-[#2d89e5] p-1 rounded'
                          title="Ko'rish"
                        >
                          <Eye className='w-4 h-4' />
                        </button>
                        <button
                          onClick={() => handleEdit(doctor)}
                          className='text-indigo-600 hover:text-indigo-900 p-1 rounded'
                          title="Tahrirlash"
                        >
                          <Edit2 className='w-4 h-4' />
                        </button>
                        <button
                          onClick={() => handleDelete(doctor)}
                          className='text-red-600 hover:text-red-900 p-1 rounded'
                          title="O'chirish"
                        >
                          <Trash2 className='w-4 h-4' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className='fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl'>
              <div className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4'>
                <div className='flex justify-between items-center'>
                  <h2 className='text-xl font-semibold text-gray-900'>
                    {editingDoctor ? 'Shifokorni tahrirlash' : 'Yangi shifokor qo\'shish'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className='text-gray-400 hover:text-gray-600'
                  >
                    <X className='w-6 h-6' />
                  </button>
                </div>
              </div>

              <div className='p-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Familiya *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Ism *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Otasining ismi
                    </label>
                    <input
                      type="text"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Mutaxassislik *
                    </label>
                    <select
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleInputChange}
                      required
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent'
                    >
                      <option value="">Tanlang...</option>
                      {specialties.map(specialty => (
                        <option key={specialty} value={specialty}>{specialty}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+998 90 123 45 67"
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Tajriba (yil) *
                    </label>
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Tug'ilgan sana
                    </label>
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Litsenziya raqami
                    </label>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Holat
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent'
                    >
                      <option value="Faol">Faol</option>
                      <option value="Nofaol">Nofaol</option>
                    </select>
                  </div>

                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Ta'lim
                    </label>
                    <input
                      type="text"
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent'
                    />
                  </div>

                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Manzil
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent'
                    />
                  </div>
                </div>

                <div className='flex justify-end gap-3 mt-6'>
                  <button
                    type="button"
                    onClick={resetForm}
                    className='px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors'
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className='px-4 py-2 bg-[#3d99f5] text-white rounded-lg hover:bg-[#2d89e5] transition-colors flex items-center gap-2'
                  >
                    <Save className='w-4 h-4' />
                    Saqlash
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View Modal */}
        {selectedDoctor && (
          <div className='fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl'>
              <div className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4'>
                <div className='flex justify-between items-center'>
                  <h2 className='text-xl font-semibold text-gray-900'>
                    Shifokor ma'lumotlari
                  </h2>
                  <button
                    onClick={() => setSelectedDoctor(null)}
                    className='text-gray-400 hover:text-gray-600'
                  >
                    <X className='w-6 h-6' />
                  </button>
                </div>
              </div>

              <div className='p-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-4'>
                    <div className='flex items-center gap-3'>
                      <User className='w-5 h-5 text-gray-400' />
                      <div>
                        <p className='text-sm text-gray-500'>F.I.Sh</p>
                        <p className='font-medium'>{selectedDoctor.lastName} {selectedDoctor.firstName} {selectedDoctor.middleName}</p>
                      </div>
                    </div>

                    <div className='flex items-center gap-3'>
                      <Briefcase className='w-5 h-5 text-gray-400' />
                      <div>
                        <p className='text-sm text-gray-500'>Mutaxassislik</p>
                        <p className='font-medium'>{selectedDoctor.specialty}</p>
                      </div>
                    </div>

                    <div className='flex items-center gap-3'>
                      <Phone className='w-5 h-5 text-gray-400' />
                      <div>
                        <p className='text-sm text-gray-500'>Telefon</p>
                        <p className='font-medium'>{selectedDoctor.phone}</p>
                      </div>
                    </div>

                    <div className='flex items-center gap-3'>
                      <Mail className='w-5 h-5 text-gray-400' />
                      <div>
                        <p className='text-sm text-gray-500'>Email</p>
                        <p className='font-medium'>{selectedDoctor.email}</p>
                      </div>
                    </div>

                    <div className='flex items-center gap-3'>
                      <Calendar className='w-5 h-5 text-gray-400' />
                      <div>
                        <p className='text-sm text-gray-500'>Tajriba</p>
                        <p className='font-medium'>{selectedDoctor.experience} yil</p>
                      </div>
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <div>
                      <p className='text-sm text-gray-500 mb-1'>Ta'lim</p>
                      <p className='font-medium'>{selectedDoctor.education}</p>
                    </div>

                    <div>
                      <p className='text-sm text-gray-500 mb-1'>Litsenziya raqami</p>
                      <p className='font-medium'>{selectedDoctor.licenseNumber}</p>
                    </div>

                    <div>
                      <p className='text-sm text-gray-500 mb-1'>Tug'ilgan sana</p>
                      <p className='font-medium'>{selectedDoctor.birthDate}</p>
                    </div>

                    <div>
                      <p className='text-sm text-gray-500 mb-1'>Holat</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedDoctor.status === 'Faol' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedDoctor.status}
                      </span>
                    </div>

                    <div className='flex items-start gap-3'>
                      <MapPin className='w-5 h-5 text-gray-400 mt-1' />
                      <div>
                        <p className='text-sm text-gray-500'>Manzil</p>
                        <p className='font-medium'>{selectedDoctor.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className='fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-lg max-w-md w-full p-6 shadow-2xl'>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                Shifokorni o'chirish
              </h3>
              <p className='text-gray-600 mb-6'>
                Haqiqatan ham <strong>{doctorToDelete?.firstName} {doctorToDelete?.lastName}</strong> 
                nomli shifokorni o'chirmoqchimisiz? Bu amalni bekor qilib bo'lmaydi.
              </p>
              <div className='flex justify-end gap-3'>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className='px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors'
                >
                  Bekor qilish
                </button>
                <button
                  onClick={confirmDelete}
                  className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'
                >
                  O'chirish
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ModeratorDoctorManagement