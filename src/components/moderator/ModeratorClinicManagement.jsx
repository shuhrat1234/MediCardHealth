import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Save, Eye, Phone, Mail, MapPin, Calendar, Building, Users, Clock } from 'lucide-react';
import { clinicGet, clinicPost, clinicPut, clinicDelete } from '../../api/services/clinicService';

function ModeratorClinicManagement() {
  const [clinics, setClinics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingClinic, setEditingClinic] = useState(null);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clinicToDelete, setClinicToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    director: '', // Maps to fio
    user_id: '',
    foundedDate: '',
    licenseNumber: '',
    workingHours: '',
    services: '', // Maps to description
    capacity: '',
    status: 'Faol',
    fillial: 1,
  });

  const workingHoursOptions = [
    '08:00 - 18:00',
    '08:00 - 20:00',
    '09:00 - 19:00',
    '24/7',
    'Dushanba-Juma 08:00-18:00',
    'Dushanba-Shanba 08:00-20:00',
  ];

  // Fetch clinics on component mount
  useEffect(() => {
    const fetchClinics = async () => {
      try {
        setLoading(true);
        const response = await clinicGet();
        // Map API response to component's expected structure
        const mappedClinics = response.data.results.map(clinic => ({
          id: clinic.id,
          name: clinic.name,
          address: clinic.address,
          phone: clinic.phone,
          email: clinic.email,
          director: clinic.user.fio,
          user_id: clinic.user.user_id,
          is_active: clinic.user.is_active,
          status: clinic.user.is_active ? 'Faol' : 'Nofaol',
          services: clinic.description,
          total_fillials: clinic.total_fillials,
          total_doctors: clinic.total_doctors,
          total_appointments: clinic.total_appointments,
          pending_appointments: clinic.pending_appointments,
          total_audit_logs: clinic.total_audit_logs,
          // Maintain UI fields not in API response
          foundedDate: clinic.foundedDate || '',
          licenseNumber: clinic.licenseNumber || '',
          workingHours: clinic.workingHours || '',
          capacity: clinic.capacity || '',
        }));
        setClinics(mappedClinics);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.detail || 'Klinikalarni yuklashda xatolik yuz berdi.');
        setLoading(false);
        console.error('Error fetching clinics:', err);
      }
    };
    fetchClinics();
  }, []);

  const filteredClinics = clinics.filter(clinic =>
    clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clinic.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clinic.director.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.address || !formData.phone || !formData.email || !formData.director || !formData.user_id || !formData.capacity) {
      alert('Iltimos, barcha majburiy maydonlarni to\'ldiring.');
      return;
    }

    // Structure data for POST/PUT request
    const postData = {
      fio: formData.director,
      user_id: formData.user_id,
      is_active: formData.status === 'Faol',
      clinic_profile: {
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        description: formData.services,
        fillial: parseInt(formData.fillial, 10),
      },
    };

    try {
      // Send POST or PUT request
      const response = editingClinic
        ? await clinicPut(editingClinic.id, postData)
        : await clinicPost(postData);

      // Map response to local state format
      const newClinic = {
        id: editingClinic ? editingClinic.id : response.data.id || Date.now(),
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        director: formData.director,
        user_id: formData.user_id,
        is_active: formData.status === 'Faol',
        status: formData.status,
        services: formData.services,
        foundedDate: formData.foundedDate,
        licenseNumber: formData.licenseNumber,
        workingHours: formData.workingHours,
        capacity: formData.capacity,
        total_fillials: response.data.total_fillials || 0,
        total_doctors: response.data.total_doctors || 0,
        total_appointments: response.data.total_appointments || 0,
        pending_appointments: response.data.pending_appointments || 0,
        total_audit_logs: response.data.total_audit_logs || 0,
      };

      // Update local state
      if (editingClinic) {
        setClinics(clinics.map(clinic =>
          clinic.id === editingClinic.id ? newClinic : clinic
        ));
      } else {
        setClinics([...clinics, newClinic]);
      }

      resetForm();
    } catch (error) {
      console.error('Error saving clinic data:', error);
      alert(error.response?.data?.detail || 'Klinika ma\'lumotlarini saqlashda xatolik yuz berdi.');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      phone: '',
      email: '',
      director: '',
      user_id: '',
      foundedDate: '',
      licenseNumber: '',
      workingHours: '',
      services: '',
      capacity: '',
      status: 'Faol',
      fillial: 1,
    });
    setEditingClinic(null);
    setShowModal(false);
  };

  const handleEdit = (clinic) => {
    setFormData({
      name: clinic.name,
      address: clinic.address,
      phone: clinic.phone,
      email: clinic.email,
      director: clinic.director,
      user_id: clinic.user_id,
      foundedDate: clinic.foundedDate,
      licenseNumber: clinic.licenseNumber,
      workingHours: clinic.workingHours,
      services: clinic.services,
      capacity: clinic.capacity,
      status: clinic.status,
      fillial: clinic.total_fillials || 1,
    });
    setEditingClinic(clinic);
    setShowModal(true);
  };

  const handleDelete = (clinic) => {
    setClinicToDelete(clinic);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      // Send DELETE request
      await clinicDelete(clinicToDelete.id);
      setClinics(clinics.filter(clinic => clinic.id !== clinicToDelete.id));
      setShowDeleteModal(false);
      setClinicToDelete(null);
    } catch (error) {
      console.error('Error deleting clinic:', error);
      alert(error.response?.data?.detail || 'Klinikani o\'chirishda xatolik yuz berdi.');
    }
  };

  const handleView = (clinic) => {
    setSelectedClinic(clinic);
  };

  if (loading) {
    return <div className='text-center p-6'>Yuklanmoqda...</div>;
  }

  if (error) {
    return <div className='text-center p-6 text-red-600'>{error}</div>;
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
            Klinika qo\'shish
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
                      Direktor (FIO) *
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
                      Foydalanuvchi ID *
                    </label>
                    <input
                      type="text"
                      name="user_id"
                      value={formData.user_id}
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
                      Filial raqami *
                    </label>
                    <input
                      type="number"
                      name="fillial"
                      value={formData.fillial}
                      onChange={handleInputChange}
                      required
                      min="1"
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
  );
}

export default ModeratorClinicManagement;