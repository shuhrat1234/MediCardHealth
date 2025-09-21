import React, { useEffect, useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, MapPin, Phone, Clock, Users, Building, Star, X, Save } from 'lucide-react';
import { 
  clinicServicesGet, 
  clinicServicePost, 
  clinicServicePut, 
  clinicServiceDelete,
  clinicServiceGetById 
} from '../../api/services/clinicService';
import axios from '../../api/axiosInstance';

function AdminClinicServices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState(null);
  const [services, setServices] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedViewService, setSelectedViewService] = useState(null);
  const [selectedEditService, setSelectedEditService] = useState(null);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [errors, setErrors] = useState({});

  // Form data for adding a service
  const [addFormData, setAddFormData] = useState({
    name: '',
  });

  // Form data for editing a service
  const [editFormData, setEditFormData] = useState({
    name: '',
  });

  // Fetch services and stats
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Ma'lumotlarni yuklash boshlandi...");
        
        // Avval faqat servicesni yuklaymiz
        const servicesRes = await clinicServicesGet();
        console.log("Services response:", servicesRes);
        setServices(servicesRes.data);

        // Statsni alohida yuklaymiz, xatolik bo'lsa ham davom etsin
        try {
          const statsRes = await axios.get('/fillials-statistic/');
          setStats(statsRes.data);
        } catch (statsError) {
          console.warn("Stats yuklashda xatolik:", statsError);
          // Stats yuklanmasa ham dastur ishlashda davom etsin
        }
        
      } catch (error) {
        console.error("API error:", error);
        console.error("Error details:", {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
      }
    };
    fetchData();
  }, []);

  // Form validation
  const validateForm = (data) => {
    const newErrors = {};
    if (!data.name.trim()) {
      newErrors.name = 'Xizmat nomi majburiy';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add service input handler
  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setAddFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add service
  const handleAddService = async (e) => {
    e.preventDefault();
    if (!validateForm(addFormData)) return;
    try {
      await clinicServicePost(addFormData);
      const { data } = await clinicServicesGet();
      setServices(data);
      resetAddForm();
    } catch (error) {
      console.error('Xizmat qo\'shishda xatolik:', error.response?.data || error.message);
    }
  };

  const resetAddForm = () => {
    setAddFormData({
      name: '',
    });
    setErrors({});
    setShowAddModal(false);
  };

  // Edit service
  const handleEdit = async (service) => {
    try {
      const { data } = await clinicServiceGetById(service.id);
      setEditFormData({
        name: data.name,
      });
      setSelectedEditService(data);
      setShowEditModal(true);
    } catch (error) {
      console.error('Xizmat ma\'lumotlarini olishda xatolik:', error.response?.data || error.message);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateService = async (e) => {
    e.preventDefault();
    if (!validateForm(editFormData)) return;
    try {
      await clinicServicePut(selectedEditService?.id, editFormData);
      const { data } = await clinicServicesGet();
      setServices(data);
      resetEditForm();
    } catch (error) {
      console.error('Yangilashda xatolik:', error.response?.data || error.message);
    }
  };

  const resetEditForm = () => {
    setEditFormData({
      name: '',
    });
    setErrors({});
    setShowEditModal(false);
    setSelectedEditService(null);
  };

  // Delete service
  const handleDelete = (service) => {
    setServiceToDelete(service);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await clinicServiceDelete(serviceToDelete?.id);
      setServices(services?.filter((service) => service?.id !== serviceToDelete?.id));
      setShowDeleteModal(false);
      setServiceToDelete(null);
    } catch (error) {
      console.error('Xizmatni o\'chirishda xatolik:', error.response?.data || error.message);
    }
  };

  // View service
  const handleView = async (service) => {
    try {
      const { data } = await clinicServiceGetById(service.id);
      setSelectedViewService(data);
      setShowViewModal(true);
    } catch (error) {
      console.error('Xizmat ma\'lumotlarini olishda xatolik:', error.response?.data || error.message);
    }
  };

  // Filter services
  const filteredServices = services?.filter((service) => {
    const matchesSearch = service.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

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
                placeholder='Xizmat qidirish...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent'
              />
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className='bg-[#3d99f5] text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2'
            >
              <Plus className='h-5 w-5' />
              Xizmat qo'shish
            </button>
          </div>

          {/* Stats Cards */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
            <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
              <div className='flex items-center'>
                <Building className='h-8 w-8 text-[#3d99f5]' />
                <div className='ml-3'>
                  <p className='text-sm font-medium text-gray-500'>Jami xizmatlar</p>
                  <p className='text-2xl font-bold text-gray-900'>{services?.length ?? 0}</p>
                </div>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
              <div className='flex items-center'>
                <Building className='h-8 w-8 text-green-500' />
                <div className='ml-3'>
                  <p className='text-sm font-medium text-gray-500'>Jami filiallar</p>
                  <p className='text-2xl font-bold text-gray-900'>{stats?.total_fillials ?? 0}</p>
                </div>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
              <div className='flex items-center'>
                <Building className='h-8 w-8 text-red-500' />
                <div className='ml-3'>
                  <p className='text-sm font-medium text-gray-500'>Faol filiallar</p>
                  <p className='text-2xl font-bold text-gray-900'>{stats?.active_fillials ?? 0}</p>
                </div>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
              <div className='flex items-center'>
                <Users className='h-8 w-8 text-purple-500' />
                <div className='ml-3'>
                  <p className='text-sm font-medium text-gray-500'>Shifokorlar</p>
                  <p className='text-2xl font-bold text-gray-900'>{stats?.total_doctors ?? 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredServices?.length === 0 ? (
            <div className='col-span-full text-center py-12'>
              <Building className='h-16 w-16 text-gray-300 mx-auto mb-4' />
              <h3 className='text-lg font-medium text-gray-900 mb-2'>Xizmatlar topilmadi</h3>
              <p className='text-gray-500'>
                {searchTerm
                  ? "Qidiruv natijasi topilmadi. Boshqa kalit so'zlar bilan harakat qiling."
                  : "Hozircha xizmatlar ro'yxati bo'sh."}
              </p>
            </div>
          ) : (
            filteredServices?.map((service) => (
              <div key={service.id} className='bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
                <div className='p-6'>
                  <div className='flex justify-between items-start mb-4'>
                    <div className='flex-1'>
                      <h3 className='font-semibold text-gray-900 text-lg mb-2'>{service.name}</h3>
                    </div>
                  </div>

                  <div className='space-y-3 mb-4'>
                    <div className='flex items-start gap-2'>
                      <Building className='h-4 w-4 text-gray-400 mt-1 flex-shrink-0' />
                      <div>
                        <p className='text-sm text-gray-600'>Filiallar soni: {service.fillials_count || '0'}</p>
                        <p className='text-xs text-gray-500'>{service.related_fillials || 'Hech qaysi filialga biriktirilmagan'}</p>
                      </div>
                    </div>
                  </div>

                  <div className='flex justify-between items-center pt-4 border-t border-gray-200'>
                    <div className='flex items-center gap-2'>
                      <button
                        onClick={() => handleView(service)}
                        className='text-[#3d99f5] hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50'
                      >
                        <Eye className='h-4 w-4' />
                      </button>
                      <button
                        onClick={() => handleEdit(service)}
                        className='text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50'
                      >
                        <Edit className='h-4 w-4' />
                      </button>
                      <button
                        onClick={() => handleDelete(service)}
                        className='text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50'
                      >
                        <Trash2 className='h-4 w-4' />
                      </button>
                    </div>
                    <button
                      onClick={() => handleView(service)}
                      className='text-sm text-[#3d99f5] hover:text-blue-700 font-medium'
                    >
                      Batafsil ko'rish
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <div className='fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm'>
            <div className='bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl'>
              <div className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4'>
                <div className='flex justify-between items-center'>
                  <h2 className='text-xl font-semibold text-gray-900'>Yangi xizmat qo'shish</h2>
                  <button
                    onClick={resetAddForm}
                    className='cursor-pointer text-gray-400 hover:text-gray-600 transition-colors duration-200'
                  >
                    <X className='w-6 h-6' />
                  </button>
                </div>
              </div>
              <form onSubmit={handleAddService} className='p-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Xizmat nomi *</label>
                  <input
                    type='text'
                    name='name'
                    value={addFormData.name}
                    onChange={handleAddInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Kardiologiya konsultatsiyasi'
                  />
                  {errors.name && <p className='mt-1 text-sm text-red-600'>{errors.name}</p>}
                </div>
                <div className='flex justify-end space-x-3 mt-6'>
                  <button
                    type='button'
                    onClick={resetAddForm}
                    className='cursor-pointer px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200'
                  >
                    Bekor qilish
                  </button>
                  <button
                    type='submit'
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
        {showEditModal && selectedEditService && (
          <div className='fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm'>
            <div className='bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl'>
              <div className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4'>
                <div className='flex justify-between items-center'>
                  <h2 className='text-xl font-semibold text-gray-900'>Xizmatni tahrirlash</h2>
                  <button
                    onClick={resetEditForm}
                    className='cursor-pointer text-gray-400 hover:text-gray-600 transition-colors duration-200'
                  >
                    <X className='w-6 h-6' />
                  </button>
                </div>
              </div>
              <form onSubmit={handleUpdateService} className='p-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Xizmat nomi *</label>
                  <input
                    type='text'
                    name='name'
                    value={editFormData.name}
                    onChange={handleEditInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Kardiologiya konsultatsiyasi'
                  />
                  {errors.name && <p className='mt-1 text-sm text-red-600'>{errors.name}</p>}
                </div>
                <div className='flex justify-end space-x-3 mt-6'>
                  <button
                    type='button'
                    onClick={resetEditForm}
                    className='cursor-pointer px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200'
                  >
                    Bekor qilish
                  </button>
                  <button
                    type='submit'
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
        {showViewModal && selectedViewService && (
          <div className='fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm'>
            <div className='bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl'>
              <div className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4'>
                <div className='flex justify-between items-center'>
                  <h2 className='text-xl font-semibold text-gray-900'>Xizmat ma'lumotlari</h2>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className='cursor-pointer text-gray-400 hover:text-gray-600'
                  >
                    <X className='w-6 h-6' />
                  </button>
                </div>
              </div>
              <div className='p-6'>
                <div className='space-y-4'>
                  <div className='flex items-center gap-3'>
                    <Building className='w-5 h-5 text-gray-400' />
                    <div>
                      <p className='text-xs text-gray-500'>Nomi</p>
                      <p className='font-medium text-sm text-gray-900'>{selectedViewService.name}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <Building className='w-5 h-5 text-gray-400' />
                    <div>
                      <p className='text-xs text-gray-500'>Filiallar soni</p>
                      <p className='font-medium text-sm text-gray-900'>{selectedViewService.fillials_count || '0'}</p>
                    </div>
                  </div>
                  <div className='flex items-start gap-3'>
                    <Building className='w-5 h-5 text-gray-400' />
                    <div>
                      <p className='text-xs text-gray-500'>Bog'langan filiallar</p>
                      <p className='font-medium text-sm text-gray-900'>
                        {selectedViewService.related_fillials || 'Hech qaysi filialga biriktirilmagan'}
                      </p>
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
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>Xizmatni o'chirish</h3>
              <p className='text-gray-600 mb-6'>
                Haqiqatan ham <strong className='mx-[5px]'>{serviceToDelete?.name}</strong> nomli xizmatni
                o'chirmoqchimisiz? Bu amalni bekor qilib bo'lmaydi.
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
    </div>
  );
}

export default AdminClinicServices;