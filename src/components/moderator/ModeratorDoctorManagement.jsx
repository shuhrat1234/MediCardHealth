import React, { useEffect, useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, Save, X, User, Phone, CalendarIcon, FileTextIcon } from 'lucide-react';
import { doctorDelete, doctorGet, doctorPost, doctorPut } from '../../api/services/doctorService';

function ModeratorDoctorManagement() {
  const [doctors, setDoctors] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedViewDoctor, setSelectedViewDoctor] = useState(null);
  const [selectedEditDoctor, setSelectedEditDoctor] = useState(null);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState({});

  // specialties
  const specialties = [
    'Kardiolog', 'Nevrolog', 'Jarroh', 'Terapevt', 'Pediatr',
    'Dermatolog', 'Oftalmolog', 'Lor', 'Ginekolog', 'Urolog'
  ];

  // add form data
  const [addFormData, setAddFormData] = useState({
    user_id: "",
    fio: "",
    is_active: true,
    doctor_profile: {
      specialty: "",
      experience: "",
      bio: "",
      phone: "",
      schedule: ""
    }
  });

  // edit form data
  const [editFormData, setEditFormData] = useState({
    user_id: "",
    fio: "",
    is_active: true,
    doctor_profile: {
      specialty: "",
      experience: "",
      bio: "",
      phone: "",
      schedule: ""
    }
  });

  // get-all-doctors
  const fetchDoctors = async () => {
    try {
      const { data } = await doctorGet();
      console.log("Fetched doctors:", data);
      const validDoctors = data.results?.filter(
        doctor => doctor && typeof doctor === 'object' && doctor.user_id && doctor.doctor_profile
      ) || [];
      console.log("Valid doctors:", validDoctors);
      if (data.results?.length !== validDoctors.length) {
        console.warn("Filtered out invalid doctors:", data.results?.filter(
          doctor => !doctor || typeof doctor !== 'object' || !doctor.user_id || !doctor.doctor_profile
        ));
      }
      setDoctors(validDoctors);
    } catch (error) {
      console.error("Error fetching doctors:", error.response?.data || error.message);
      setDoctors([]);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // form-validation
  const validateForm = (data) => {
    const newErrors = {};
    if (!data.user_id.match(/^[A-Z]{2}\s?\d{7}$/)) {
      newErrors.user_id = "User ID format: 2 uppercase English letters, space, 7 digits (e.g., AB 1234567)";
    }
    if (!data.fio.trim()) {
      newErrors.fio = "FIO majburiy";
    }
    if (!data.doctor_profile.specialty || !String(data.doctor_profile.specialty).trim()) {
      newErrors.specialty = "Mutaxassislik kiritilishi majburiy";
    }
    if (!data.doctor_profile.experience) {
      newErrors.experience = "Tajriba kiritilishi shart";
    }
    if (!data.doctor_profile.bio.trim()) {
      newErrors.bio = "Haqida kiritilishi majburiy";
    }
    const phoneDigits = String(data.doctor_profile.phone).replace(/\D/g, '');
    if (phoneDigits.length !== 9) {
      newErrors.phone = "Telefon raqam noto‘g‘ri yoki to‘liq emas";
    }
    if (!data.doctor_profile.schedule.trim()) {
      newErrors.schedule = "Ish jadvali kiritilishi majburiy";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // user_id input handler
  const handleUserIdInput = (value) => {
    let formattedValue = value.toUpperCase().slice(0, 10);
    formattedValue = formattedValue.replace(/[^A-Z]/g, (match, offset) => offset < 2 ? '' : match);
    if (formattedValue.length > 2 && formattedValue[2] !== ' ') {
      formattedValue = formattedValue.slice(0, 2) + ' ' + formattedValue.slice(2);
    }
    if (formattedValue.length > 3) {
      const parts = formattedValue.split(' ');
      if (parts[1]) {
        parts[1] = parts[1].replace(/[^0-9]/g, '').slice(0, 7);
        formattedValue = parts[0] + ' ' + parts[1];
      }
    }
    return formattedValue;
  };

  const handlePhone = (value, isDeleting) => {
    let digits = value.replace(/\D/g, "").slice(0, 9);
    if (isDeleting) return value;
    let formatted = "";
    if (digits.length > 0) formatted += "(" + digits.slice(0, 2);
    if (digits.length >= 2) formatted += ") " + digits.slice(2, 5);
    if (digits.length >= 5) formatted += "-" + digits.slice(5, 7);
    if (digits.length >= 7) formatted += "-" + digits.slice(7, 9);
    return formatted;
  };

  // add-doctor
  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "user_id") {
      const formattedValue = handleUserIdInput(value);
      setAddFormData(prev => ({ ...prev, user_id: formattedValue }));
      return;
    }
    if (name === "is_active") {
      setAddFormData(prev => ({
        ...prev,
        is_active: value === "true"
      }));
      return;
    }
    if (name === "phone") {
      const prevValue = addFormData.doctor_profile.phone || "";
      const isDeleting = value.length < prevValue.length;
      const formattedPhone = handlePhone(value, isDeleting);
      setAddFormData(prev => ({
        ...prev,
        doctor_profile: { ...prev.doctor_profile, phone: formattedPhone }
      }));
      return;
    }
    if (['specialty', 'experience', 'bio', 'schedule'].includes(name)) {
      setAddFormData(prev => ({
        ...prev,
        doctor_profile: { ...prev.doctor_profile, [name]: value }
      }));
    } else {
      setAddFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    if (!validateForm(addFormData)) return;
    try {
      const formattedData = {
        ...addFormData,
        user_id: addFormData.user_id.replace(/\s/g, '')
      };
      await doctorPost(formattedData);
      await fetchDoctors();
      resetAddForm();
    } catch (error) {
      console.error("Shifokor qo'shishda xatolik:", error.response?.data || error.message);
    }
  };

  const resetAddForm = () => {
    setAddFormData({
      user_id: "",
      fio: "",
      is_active: true,
      doctor_profile: { specialty: "", experience: "", bio: "", phone: "", schedule: "" }
    });
    setErrors({});
    setShowAddModal(false);
  };

  // edit-doctor
  const handleEdit = (doctor) => {
    const formattedUserId = doctor.user_id.replace(/([A-Z]{2})(\d{7})/, '$1 $2');
    setEditFormData({
      user_id: formattedUserId,
      fio: doctor.fio,
      is_active: doctor.is_active,
      doctor_profile: {
        specialty: doctor.doctor_profile?.specialty || "",
        experience: doctor.doctor_profile?.experience || "",
        bio: doctor.doctor_profile?.bio || "",
        phone: doctor.doctor_profile?.phone || "",
        schedule: doctor.doctor_profile?.schedule || ""
      }
    });
    setSelectedEditDoctor(doctor);
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "user_id") {
      const formattedValue = handleUserIdInput(value);
      setEditFormData(prev => ({ ...prev, user_id: formattedValue }));
      return;
    }
    if (name === "is_active") {
      setEditFormData(prev => ({
        ...prev,
        is_active: value === "true"
      }));
    } else if (name === "phone") {
      const prevValue = editFormData.doctor_profile.phone || "";
      const isDeleting = value.length < prevValue.length;
      setEditFormData(prev => ({
        ...prev,
        doctor_profile: { ...prev.doctor_profile, phone: handlePhone(value, isDeleting) }
      }));
    } else if (['specialty', 'experience', 'bio', 'schedule'].includes(name)) {
      setEditFormData(prev => ({
        ...prev,
        doctor_profile: { ...prev.doctor_profile, [name]: value }
      }));
    } else {
      setEditFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdateDoctor = async (e) => {
    e.preventDefault();
    if (!validateForm(editFormData)) return;
    const updateData = {
      user_id: editFormData.user_id.replace(/\s/g, ''),
      fio: editFormData.fio,
      is_active: editFormData.is_active,
      doctor_profile: {
        specialty: editFormData.doctor_profile.specialty,
        experience: editFormData.doctor_profile.experience,
        bio: editFormData.doctor_profile.bio,
        phone: editFormData.doctor_profile.phone,
        schedule: editFormData.doctor_profile.schedule
      }
    };
    try {
      await doctorPut(editFormData.user_id.replace(/\s/g, ''), updateData);
      await fetchDoctors();
      resetEditForm();
    } catch (error) {
      console.error("Yangilashda xatolik:", error.response?.data || error.message);
    }
  };

  const resetEditForm = () => {
    setEditFormData({
      user_id: "",
      fio: "",
      is_active: true,
      doctor_profile: { specialty: "", experience: "", bio: "", phone: "", schedule: "" }
    });
    setErrors({});
    setShowEditModal(false);
  };

  // delete-doctor
  const handleDelete = (doctor) => {
    setDoctorToDelete(doctor);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await doctorDelete(doctorToDelete.user_id);
      setDoctors(doctors.filter(doctor => doctor.user_id !== doctorToDelete.user_id));
      setShowDeleteModal(false);
      setDoctorToDelete(null);
    } catch (error) {
      console.error("Shifokorni o'chirishda xatolik:", error);
    }
  };

  // view-doctor
  const handleView = (doctor) => {
    const formattedDoctor = {
      ...doctor,
      user_id: doctor.user_id.replace(/([A-Z]{2})(\d{7})/, '$1 $2')
    };
    setSelectedViewDoctor(formattedDoctor);
    setShowViewModal(true);
  };

  // filters-doctor
  const filteredDoctor = doctors?.filter(doctor => {
    if (!doctor || !doctor.user_id || !doctor.doctor_profile) {
      console.warn("Skipping invalid doctor:", doctor);
      return false;
    }
    return (
      !searchTerm ||
      (doctor.user_id && doctor.user_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (doctor.fio && doctor.fio.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (doctor.doctor_profile.specialty && doctor.doctor_profile.specialty.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (doctor.doctor_profile.experience && String(doctor.doctor_profile.experience).toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }) || [];
  console.log("Filtered doctors:", filteredDoctor);

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      {/* Search and Add */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Shifokorlarni qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="cursor-pointer w-full sm:w-auto bg-[#3d99f5] hover:bg-[#2d89e5] text-white px-4 py-2 rounded-lg flex items-center justify-center sm:justify-start space-x-2 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Shifokor qo'shish</span>
        </button>
      </div>

      {/* Table Doctors */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 overflow-x-scroll">
        <table className="w-full table-auto">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">USER ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FIO</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MUTAXASSISLIK</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TAJRIBA</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TELEFON RAQAM</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISH JADVALI</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HOLAT</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AMALLAR</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDoctor?.length > 0 ? (
              filteredDoctor.map((doctor) => {
                if (
                  !doctor.doctor_profile.specialty ||
                  !doctor.doctor_profile.experience ||
                  !doctor.doctor_profile.phone ||
                  !doctor.doctor_profile.schedule
                ) {
                  console.warn(`Empty fields in doctor_profile for doctor ${doctor.user_id}:`, doctor.doctor_profile);
                }
                return (
                  <tr key={doctor.user_id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className='text-sm text-gray-900'>
                        {doctor.user_id.replace(/([A-Z]{2})(\d{7})/, '$1 $2')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className='flex items-center'>
                        <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
                          <User className='w-5 h-5 text-[#3d99f5]' />
                        </div>
                        <div className='ml-4'>
                          <div className='text-sm font-medium text-gray-900'>{doctor.fio}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className='text-sm text-gray-900'>{doctor?.doctor_profile?.specialty || "Kiritilmagan"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className='text-sm text-gray-900'>{doctor?.doctor_profile?.experience || "Kiritilmagan"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className='text-sm text-gray-900'>{doctor?.doctor_profile?.phone?.replace('=', '+') || "Kiritilmagan"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className='text-sm text-gray-900'>{doctor?.doctor_profile?.schedule || "Kiritilmagan"}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className={`w-[90px] h-[30px] flex justify-center items-center rounded-full text-sm text-white ${doctor.is_active ? 'bg-green-500' : 'bg-red-500'}`}>
                        {doctor.is_active ? 'Faol' : 'No Faol'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleView(doctor)}
                          className="cursor-pointer p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 rounded-md hover:bg-gray-100"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(doctor)}
                          className="cursor-pointer p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 rounded-md hover:bg-gray-100"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(doctor)}
                          className="cursor-pointer p-2 text-gray-600 hover:text-red-600 transition-colors duration-200 rounded-md hover:bg-gray-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-8 text-gray-500">
                  Shifokorlar topilmadi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4'>
              <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold text-gray-900'>Yangi shifokor qo'shish</h2>
                <button
                  onClick={resetAddForm}
                  className='cursor-pointer text-gray-400 hover:text-gray-600 transition-colors duration-200'
                >
                  <X className='w-6 h-6' />
                </button>
              </div>
            </div>
            <form onSubmit={handleAddDoctor} className='p-6'>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User ID *</label>
                  <input
                    type="text"
                    name='user_id'
                    value={addFormData.user_id}
                    onChange={handleAddInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="AB 1234567"
                    maxLength={10}
                  />
                  {errors.user_id && <p className="mt-1 text-sm text-red-600">{errors.user_id}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">FIO *</label>
                  <input
                    type="text"
                    name='fio'
                    value={addFormData.fio}
                    onChange={handleAddInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.fio && <p className="mt-1 text-sm text-red-600">{errors.fio}</p>}
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Mutaxassislik *</label>
                  <select
                    name="specialty"
                    value={addFormData.doctor_profile.specialty}
                    onChange={handleAddInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Tanlang...</option>
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                  {errors.specialty && <p className="mt-1 text-sm text-red-600">{errors.specialty}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tajriba (yil) *</label>
                  <input
                    name='experience'
                    type="number"
                    value={addFormData.doctor_profile.experience}
                    onChange={handleAddInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Haqida *</label>
                  <input
                    name='bio'
                    type="text"
                    value={addFormData.doctor_profile.bio}
                    onChange={handleAddInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefon raqam *</label>
                  <input
                    name='phone'
                    type="tel"
                    value={addFormData.doctor_profile.phone}
                    onChange={handleAddInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ish jadvali *</label>
                  <input
                    name='schedule'
                    type="text"
                    value={addFormData.doctor_profile.schedule}
                    onChange={handleAddInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.schedule && <p className="mt-1 text-sm text-red-600">{errors.schedule}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Holat *</label>
                  <select
                    name='is_active'
                    value={addFormData.is_active ? 'true' : 'false'}
                    onChange={handleAddInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="true">Faol</option>
                    <option value="false">No Faol</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={resetAddForm}
                  className='cursor-pointer px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200'
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className='cursor-pointer px-4 py-2 bg-[#3d99f5] text-white rounded-lg hover:bg-[#2d89e5] transition-colors duration-200 flex items-center gap-2 shadow-md hover:shadow-lg'
                >
                  <Save className='w-4 h-4' />
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedEditDoctor && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4'>
              <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold text-gray-900'>Shifokor tahrirlash</h2>
                <button
                  onClick={resetEditForm}
                  className='cursor-pointer text-gray-400 hover:text-gray-600 transition-colors duration-200'
                >
                  <X className='w-6 h-6' />
                </button>
              </div>
            </div>
            <form onSubmit={handleUpdateDoctor} className='p-6'>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User ID *</label>
                  <input
                    type="text"
                    name='user_id'
                    value={editFormData.user_id}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength={10}
                  />
                  {errors.user_id && <p className="mt-1 text-sm text-red-600">{errors.user_id}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">FIO *</label>
                  <input
                    type="text"
                    name='fio'
                    value={editFormData.fio}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.fio && <p className="mt-1 text-sm text-red-600">{errors.fio}</p>}
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Mutaxassislik *</label>
                  <select
                    name="specialty"
                    value={editFormData.doctor_profile.specialty}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Tanlang...</option>
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                  {errors.specialty && <p className="mt-1 text-sm text-red-600">{errors.specialty}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tajriba (yil) *</label>
                  <input
                    name='experience'
                    type="number"
                    value={editFormData.doctor_profile.experience}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Haqida *</label>
                  <input
                    name='bio'
                    type="text"
                    value={editFormData.doctor_profile.bio}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefon raqam *</label>
                  <input
                    name='phone'
                    type="tel"
                    value={editFormData.doctor_profile.phone}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ish jadvali *</label>
                  <input
                    name='schedule'
                    type="text"
                    value={editFormData.doctor_profile.schedule}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.schedule && <p className="mt-1 text-sm text-red-600">{errors.schedule}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Holat *</label>
                  <select
                    name='is_active'
                    value={editFormData.is_active ? 'true' : 'false'}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="true">Faol</option>
                    <option value="false">No Faol</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={resetEditForm}
                  className='cursor-pointer px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200'
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className='cursor-pointer px-4 py-2 bg-[#3d99f5] text-white rounded-lg hover:bg-[#2d89e5] transition-colors duration-200 flex items-center gap-2 shadow-md hover:shadow-lg'
                >
                  <Save className='w-4 h-4' />
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedViewDoctor && (
        <div className='fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm'>
          <div className='bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl'>
            <div className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4'>
              <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold text-gray-900'>Shifokor ma'lumotlari</h2>
                <button
                  onClick={() => setShowViewModal(false)}
                  className='cursor-pointer text-gray-400 hover:text-gray-600'
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
                      <p className='text-xs text-gray-500'>User ID</p>
                      <p className='font-medium text-sm text-gray-900'>{selectedViewDoctor.user_id}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <User className='w-5 h-5 text-gray-400' />
                    <div>
                      <p className='text-xs text-gray-500'>FIO</p>
                      <p className='font-medium text-sm text-gray-900'>{selectedViewDoctor.fio}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <FileTextIcon className='w-5 h-5 text-gray-400' />
                    <div>
                      <p className='text-xs text-gray-500'>Mutaxassislik</p>
                      <p className='font-medium text-sm text-gray-900'>{selectedViewDoctor?.doctor_profile?.specialty || "Kiritilmagan"}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <FileTextIcon className='w-5 h-5 text-gray-400' />
                    <div>
                      <p className='text-xs text-gray-500'>Tajriba (yil)</p>
                      <p className='font-medium text-sm text-gray-900'>{selectedViewDoctor?.doctor_profile?.experience || "Kiritilmagan"}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <FileTextIcon className='w-5 h-5 text-gray-400' />
                    <div>
                      <p className='text-xs text-gray-500'>Haqida</p>
                      <p className='font-medium text-sm text-gray-900'>{selectedViewDoctor?.doctor_profile?.bio || "Kiritilmagan"}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <Phone className='w-5 h-5 text-gray-400' />
                    <div>
                      <p className='text-xs text-gray-500'>Telefon raqam</p>
                      <p className='font-medium text-sm text-gray-900'>{selectedViewDoctor?.doctor_profile?.phone || "Kiritilmagan"}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <CalendarIcon className='w-5 h-5 text-gray-400' />
                    <div>
                      <p className='text-xs text-gray-500'>Ish jadvali</p>
                      <p className='font-medium text-sm text-gray-900'>{selectedViewDoctor?.doctor_profile?.schedule || "Kiritilmagan"}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <FileTextIcon className='w-5 h-5 text-gray-400' />
                    <div>
                      <p className='text-xs text-gray-500'>Holat</p>
                      <p className='font-medium text-sm text-gray-900'>{selectedViewDoctor.is_active ? 'Faol' : 'No Faol'}</p>
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
        <div className='fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm'>
          <div className='bg-white rounded-lg max-w-md w-full p-6 shadow-2xl'>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>Shifokorni o'chirish</h3>
            <p className='text-gray-600 mb-6'>
              Haqiqatan ham<strong className='mx-[5px]'>{doctorToDelete?.fio}</strong>
              nomli shifokorni o'chirmoqchimisiz? Bu amalni bekor qilib bo'lmaydi.
            </p>
            <div className='flex justify-end gap-3'>
              <button
                onClick={() => setShowDeleteModal(false)}
                className='cursor-pointer px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200'
              >
                Bekor qilish
              </button>
              <button
                onClick={confirmDelete}
                className='cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200'
              >
                O'chirish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModeratorDoctorManagement;