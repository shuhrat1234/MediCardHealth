import React, { useState } from 'react'
import { Plus, Edit2, Trash2, Search, X, Save, Eye, Phone, Mail, MapPin, Calendar, Building, Users, Clock } from 'lucide-react'

function ModeratorClinicManagement() {
  const [clinics, setClinics] = useState([
    {
      id: 1,
      name: 'Toshkent Tibbiyot Markazi',
      address: 'Toshkent sh., Amir Temur ko\'chasi 25',
      phone: '+998 71 123 45 67',
      email: 'info@ttm.uz',
      director: 'Karimov Akmal Bekovich',
      foundedDate: '2010-03-15',
      licenseNumber: 'CLINIC-2024-001',
      workingHours: '08:00 - 20:00',
      services: 'Kardiologiya, Nevrologiya, Jarrohlik',
      capacity: 150,
      status: 'Faol'
    },
    {
      id: 2,
      name: 'Samarqand Bolalar Shifoxonasi',
      address: 'Samarqand sh., Registon ko\'chasi 12',
      phone: '+998 66 234 56 78',
      email: 'info@samarkand-pediatric.uz',
      director: 'Abdullayeva Malika Ravshanovna',
      foundedDate: '2015-09-10',
      licenseNumber: 'CLINIC-2024-002',
      workingHours: '24/7',
      services: 'Pediatriya, Neonatologiya, Bolalar jarrohlik',
      capacity: 80,
      status: 'Faol'
    },
    {
      id: 3,
      name: 'Andijon Viloyat Shifoxonasi',
      address: 'Andijon sh., Navoiy ko\'chasi 45',
      phone: '+998 74 345 67 89',
      email: 'info@andijan-hospital.uz',
      director: 'Tursunov Bobur Alievich',
      foundedDate: '2005-12-01',
      licenseNumber: 'CLINIC-2024-003',
      workingHours: '24/7',
      services: 'Umumiy tibbiyot, Tez yordam, Jarrohlik',
      capacity: 200,
      status: 'Faol'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingClinic, setEditingClinic] = useState(null)
  const [selectedClinic, setSelectedClinic] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [clinicToDelete, setClinicToDelete] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    director: '',
    foundedDate: '',
    licenseNumber: '',
    workingHours: '',
    services: '',
    capacity: '',
    status: 'Faol'
  })

  const workingHoursOptions = [
    '08:00 - 18:00',
    '08:00 - 20:00',
    '09:00 - 19:00',
    '24/7',
    'Dushanba-Juma 08:00-18:00',
    'Dushanba-Shanba 08:00-20:00'
  ]

  const filteredClinics = clinics.filter(clinic =>
    clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clinic.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clinic.director.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingClinic) {
      setClinics(clinics.map(clinic =>
        clinic.id === editingClinic.id ? { ...formData, id: editingClinic.id } : clinic
      ))
    } else {
      setClinics([...clinics, { ...formData, id: Date.now() }])
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      phone: '',
      email: '',
      director: '',
      foundedDate: '',
      licenseNumber: '',
      workingHours: '',
      services: '',
      capacity: '',
      status: 'Faol'
    })
    setEditingClinic(null)
    setShowModal(false)
  }

  const handleEdit = (clinic) => {
    setFormData(clinic)
    setEditingClinic(clinic)
    setShowModal(true)
  }

  const handleDelete = (clinic) => {
    setClinicToDelete(clinic)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    setClinics(clinics.filter(clinic => clinic.id !== clinicToDelete.id))
    setShowDeleteModal(false)
    setClinicToDelete(null)
  }

  const handleView = (clinic) => {
    setSelectedClinic(clinic)
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
              placeholder="Klinika qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent'
            />
          </div>
          <button
            onClick={() => setShowModal(true)}
            className='bg-[#3d99f5] hover:bg-[#2d89e5] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors'
          >
            <Plus className='w-5 h-5' />
            Klinika qoshish
          </button>
        </div>

        {/* Clinics Table */}
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Klinika
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Direktor
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Telefon
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Sig\'im
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
                {filteredClinics.map((clinic) => (
                  <tr key={clinic.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
                          <Building className='w-5 h-5 text-[#3d99f5]' />
                        </div>
                        <div className='ml-4'>
                          <div className='text-sm font-medium text-gray-900'>
                            {clinic.name}
                          </div>
                          <div className='text-sm text-gray-500'>{clinic.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>{clinic.director}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>{clinic.phone}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>{clinic.capacity} o\'rin</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${clinic.status === 'Faol'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                        }`}>
                        {clinic.status}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                      <div className='flex items-center gap-2'>
                        <button
                          onClick={() => handleView(clinic)}
                          className='text-[#3d99f5] hover:text-[#2d89e5] p-1 rounded'
                          title="Ko'rish"
                        >
                          <Eye className='w-4 h-4' />
                        </button>
                        <button
                          onClick={() => handleEdit(clinic)}
                          className='text-indigo-600 hover:text-indigo-900 p-1 rounded'
                          title="Tahrirlash"
                        >
                          <Edit2 className='w-4 h-4' />
                        </button>
                        <button
                          onClick={() => handleDelete(clinic)}
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
                    {editingClinic ? 'Klinikani tahrirlash' : 'Yangi klinika qo\'shish'}
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
                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Klinika nomi *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Direktor *
                    </label>
                    <input
                      type="text"
                      name="director"
                      value={formData.director}
                      onChange={handleInputChange}
                      required
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent'
                    />
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
                      placeholder="+998 71 123 45 67"
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
                      Tashkil etilgan sana
                    </label>
                    <input
                      type="date"
                      name="foundedDate"
                      value={formData.foundedDate}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Ish vaqti
                    </label>
                    <select
                      name="workingHours"
                      value={formData.workingHours}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent'
                    >
                      <option value="">Tanlang...</option>
                      {workingHoursOptions.map(hours => (
                        <option key={hours} value={hours}>{hours}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Sig\'im (o\'rin soni) *
                    </label>
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      required
                      min="1"
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
                      Manzil *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows="2"
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent'
                    />
                  </div>

                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Xizmatlar
                    </label>
                    <textarea
                      name="services"
                      value={formData.services}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Masalan: Kardiologiya, Nevrologiya, Jarrohlik"
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
        {selectedClinic && (
          <div className='fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl'>
              <div className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4'>
                <div className='flex justify-between items-center'>
                  <h2 className='text-xl font-semibold text-gray-900'>
                    Klinika ma'lumotlari
                  </h2>
                  <button
                    onClick={() => setSelectedClinic(null)}
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
                      <Building className='w-5 h-5 text-gray-400' />
                      <div>
                        <p className='text-sm text-gray-500'>Klinika nomi</p>
                        <p className='font-medium'>{selectedClinic.name}</p>
                      </div>
                    </div>

                    <div className='flex items-center gap-3'>
                      <Users className='w-5 h-5 text-gray-400' />
                      <div>
                        <p className='text-sm text-gray-500'>Direktor</p>
                        <p className='font-medium'>{selectedClinic.director}</p>
                      </div>
                    </div>

                    <div className='flex items-center gap-3'>
                      <Phone className='w-5 h-5 text-gray-400' />
                      <div>
                        <p className='text-sm text-gray-500'>Telefon</p>
                        <p className='font-medium'>{selectedClinic.phone}</p>
                      </div>
                    </div>

                    <div className='flex items-center gap-3'>
                      <Mail className='w-5 h-5 text-gray-400' />
                      <div>
                        <p className='text-sm text-gray-500'>Email</p>
                        <p className='font-medium'>{selectedClinic.email}</p>
                      </div>
                    </div>

                    <div className='flex items-center gap-3'>
                      <Clock className='w-5 h-5 text-gray-400' />
                      <div>
                        <p className='text-sm text-gray-500'>Ish vaqti</p>
                        <p className='font-medium'>{selectedClinic.workingHours}</p>
                      </div>
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <div>
                      <p className='text-sm text-gray-500 mb-1'>Sig\'im</p>
                      <p className='font-medium'>{selectedClinic.capacity} o\'rin</p>
                    </div>

                    <div>
                      <p className='text-sm text-gray-500 mb-1'>Litsenziya raqami</p>
                      <p className='font-medium'>{selectedClinic.licenseNumber}</p>
                    </div>

                    <div>
                      <p className='text-sm text-gray-500 mb-1'>Tashkil etilgan sana</p>
                      <p className='font-medium'>{selectedClinic.foundedDate}</p>
                    </div>

                    <div>
                      <p className='text-sm text-gray-500 mb-1'>Holat</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${selectedClinic.status === 'Faol'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                        }`}>
                        {selectedClinic.status}
                      </span>
                    </div>

                    <div className='flex items-start gap-3'>
                      <MapPin className='w-5 h-5 text-gray-400 mt-1' />
                      <div>
                        <p className='text-sm text-gray-500'>Manzil</p>
                        <p className='font-medium'>{selectedClinic.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='mt-6'>
                  <p className='text-sm text-gray-500 mb-2'>Xizmatlar</p>
                  <p className='font-medium bg-gray-50 p-3 rounded-lg'>{selectedClinic.services}</p>
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
                Klinikani o'chirish
              </h3>
              <p className='text-gray-600 mb-6'>
                Haqiqatan ham <strong>{clinicToDelete?.name}</strong>
                nomli klinikani o'chirmoqchimisiz? Bu amalni bekor qilib bo'lmaydi.
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

export default ModeratorClinicManagement