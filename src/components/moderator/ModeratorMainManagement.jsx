import React, { useEffect, useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, Save, X, User, Phone, CalendarIcon, FileTextIcon, MapPin } from 'lucide-react';
import { moderatorGet, moderatorPost, moderatorDelete, moderatorPut } from '../../api/services/moderatorService';

function ModeratorMainManagement() {
  const [moderator, setModerator] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedViewModerator, setSelectedViewModerator] = useState(null);
  const [selectedEditModerator, setSelectedEditModerator] = useState(null);
  const [moderatorToDelete, setModeratorToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState({});

  // add form data

  const [addFormData, setAddFormData] = useState({
    fio: "",
    is_active: true,
    moderator_profile: {
      experience: "",
      notes: "",
      fillial: "",
    }
  });

  // edit form data

  const [editFormData, setEditFormData] = useState({
    fio: "",
    is_active: true,
    moderator_profile: {
      experience: "",
      notes: "",
      fillial: "",
    }
  });

  // get-all-moderator

  const fetchModerator = async () => {
    try {
      const { data } = await moderatorGet();
      console.log("Fetched moderator:", data);
      setModerator(data);
    } catch (error) {
      console.error("Error fetching moderator:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchModerator();
  }, []);

  // form-validation

  const validateForm = (data) => {
    const newErrors = {};
    if (!data.fio.trim()) {
      newErrors.fio = "FIO majburiy";
    }
    if (!data.moderator_profile.experience || !String(data.moderator_profile.experience).trim()) {
      newErrors.experience = "Tajriba yil kiritilishi majburiy";
    }
    if (!data.moderator_profile.notes) {
      newErrors.notes = "Eslatmalar kiritilishi shart";
    }
    if (!data.moderator_profile.fillial.trim()) {
      newErrors.fillial = "Fillial kiritilishi majburiy";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // add-moderator

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "is_active") {
      setAddFormData(prev => ({
        ...prev,
        is_active: value === "true"
      }));
      return;
    }
    if (['experience', 'notes', 'fillial'].includes(name)) {
      setAddFormData(prev => ({
        ...prev,
        moderator_profile: { ...prev.moderator_profile, [name]: value }
      }));
    } else {
      setAddFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddModerator = async (e) => {
    e.preventDefault();
    if (!validateForm(addFormData)) return;
    try {
      await moderatorPost(addFormData);
      await fetchModerator();
      resetAddForm();
    } catch (error) {
      console.error("Moderator qo'shishda xatolik:", error.response?.data || error.message);
    }
  };

  const resetAddForm = () => {
    setAddFormData({
      fio: "",
      is_active: true,
      moderator_profile: { experience: "", notes: "", fillial: "" }
    });
    setErrors({});
    setShowAddModal(false);
  };

  // edit-moderator

  const handleEdit = (moderator) => {
    setEditFormData({
      user_id: moderator.user_id,
      fio: moderator.fio,
      is_active: moderator.is_active,
      experience: moderator.moderator_profile?.experience || "",
      notes: moderator.moderator_profile?.notes || "",
      fillial: moderator.moderator_profile?.fillial || "",
    });
    setSelectedEditModerator(moderator)
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "is_active") {
      setEditFormData(prev => ({
        ...prev,
        is_active: value === "true"
      }));
    } else {
      setEditFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleUpdateModerator = async (e) => {
    e.preventDefault();

    const updateData = {
      fio: editFormData.fio,
      is_active: editFormData.is_active,
      moderator_profile: {
        experience: editFormData.experience,
        notes: editFormData.notes,
        fillial: editFormData.fillial,
      }
    };

    try {
      await moderatorPut(editFormData.user_id, updateData);
      await fetchModerator();
      resetEditForm();
    } catch (error) {
      console.error("Yangilashda xatolik:", error.response?.data || error.message);
    }
  };

  const resetEditForm = () => {
    setEditFormData({
      user_id: "",
      fio: "",
      is_active: false,
      moderator_profile: { experience: "", notes: "", fillial: "" }
    });
    setErrors({});
    setShowEditModal(false);
  };

  // delete-moderator

  const handleDelete = (moderator) => {
    setModeratorToDelete(moderator);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await moderatorDelete(moderatorToDelete.user_id);
      setModerator(moderator.filter(moderator => moderator.user_id !== moderatorToDelete.user_id));
      setShowDeleteModal(false);
      setModeratorToDelete(null);
    } catch (error) {
      console.error("Moderator o'chirishda xatolik:", error);
    }
  };

  // view-moderator

  const handleView = (moderator) => {
    setSelectedViewModerator(moderator);
    setShowViewModal(true);
  };

  // filters-moderator

  const filteredModerator = moderator.filter(moderator =>
    moderator.fio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    moderator.experience?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    moderator.fillial?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">

      {/* Search and Add */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Moderatorlarni qidirish..."
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
          <span>Moderator qo'shish</span>
        </button>
      </div>

      {/* Table Moderator */}

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 overflow-x-scroll">
        <table className="w-full table-auto overflow-x-scroll">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MODERATOR</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TAJRIBA</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ESLATMALAR</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">fillial</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holati</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AMALLAR</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredModerator.length > 0 ? (
              filteredModerator.map((moderator) => (
                <tr key={moderator.user_id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className='flex items-center'>
                      <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
                        <User className='w-5 h-5 text-[#3d99f5]' />
                      </div>
                      <div className='ml-4'>
                        <div className='text-sm font-medium text-gray-900'>{moderator.fio}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className='text-sm text-gray-900'>{moderator.experience ? moderator.experience : "Kiritilmagan"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className='text-sm text-gray-900'>{moderator.notes ? moderator.notes : "Kiritilmagan"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className='text-sm text-gray-900'>{moderator.fillial ? moderator.fillial : "Kiritilmagan"}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className={`w-[90px] h-[30px] flex justify-center items-center rounded-full text-sm text-white ${moderator.is_active ? 'bg-green-500' : 'bg-red-500'}`}>
                      {moderator.is_active ? 'Faol' : 'No Faol'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleView(moderator)}
                        className="cursor-pointer p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 rounded-md hover:bg-gray-100"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(moderator)}
                        className="cursor-pointer p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 rounded-md hover:bg-gray-100"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(moderator)}
                        className="cursor-pointer p-2 text-gray-600 hover:text-red-600 transition-colors duration-200 rounded-md hover:bg-gray-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-500">
                  Moderatorlar topilmadi.
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
                <h2 className='text-xl font-semibold text-gray-900'>Yangi moderator qo'shish</h2>
                <button
                  onClick={resetAddForm}
                  className='cursor-pointer text-gray-400 hover:text-gray-600 transition-colors duration-200'
                >
                  <X className='w-6 h-6' />
                </button>
              </div>
            </div>
            <form onSubmit={handleAddModerator} className='p-6'>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tajriba (yil) *</label>
                  <input
                    name='experience'
                    type="number"
                    value={addFormData.moderator_profile.experience}
                    onChange={handleAddInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Eslatmalar *</label>
                  <input
                    name='notes'
                    type="text"
                    value={addFormData.moderator_profile.notes}
                    onChange={handleAddInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.notes && <p className="mt-1 text-sm text-red-600">{errors.notes}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fillial *</label>
                  <input
                    name='fillial'
                    type="text"
                    value={addFormData.moderator_profile.fillial}
                    onChange={handleAddInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.fillial && <p className="mt-1 text-sm text-red-600">{errors.fillial}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Holat *</label>
                  <select
                    name='is_active'
                    required
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

      {showEditModal && selectedEditModerator && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4'>
              <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold text-gray-900'>Moderatorni tahrirlash</h2>
                <button
                  onClick={resetEditForm}
                  className='cursor-pointer text-gray-400 hover:text-gray-600 transition-colors duration-200'
                >
                  <X className='w-6 h-6' />
                </button>
              </div>
            </div>
            <form onSubmit={handleUpdateModerator} className='p-6'>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tajriba (yil) *</label>
                  <input
                    name='experience'
                    type="number"
                    value={editFormData.moderator_profile.experience}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Eslatmalar *</label>
                  <input
                    name='notes'
                    type="text"
                    value={editFormData.moderator_profile.notes}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.notes && <p className="mt-1 text-sm text-red-600">{errors.notes}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fillial *</label>
                  <input
                    name='fillial'
                    type="text"
                    value={editFormData.moderator_profile.fillial}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.fillial && <p className="mt-1 text-sm text-red-600">{errors.fillial}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Holat *</label>
                  <select
                    name='is_active'
                    required
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

      {showViewModal && selectedViewModerator && (
        <div className='fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm'>
          <div className='bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl'>
            <div className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4'>
              <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold text-gray-900'>Moderatorni ma'lumotlari</h2>
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
                      <p className='text-xs text-gray-500'>FIO</p>
                      <p className='font-medium text-sm text-gray-900'>{selectedViewModerator.fio}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <FileTextIcon className='w-5 h-5 text-gray-400' />
                    <div>
                      <p className='text-xs text-gray-500'>Tajriba (yil)</p>
                      <p className='font-medium text-sm text-gray-900'>{selectedViewModerator.experience}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <FileTextIcon className='w-5 h-5 text-gray-400' />
                    <div>
                      <p className='text-xs text-gray-500'>Eslatmalar</p>
                      <p className='font-medium text-sm text-gray-900'>{selectedViewModerator.notes}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <FileTextIcon className='w-5 h-5 text-gray-400' />
                    <div>
                      <p className='text-xs text-gray-500'>Fillial</p>
                      <p className='font-medium text-sm text-gray-900'>{selectedViewModerator.fillial}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <FileTextIcon className='w-5 h-5 text-gray-400' />
                    <div>
                      <p className='text-xs text-gray-500'>Holat</p>
                      <p className='font-medium text-sm text-gray-900'>{selectedViewModerator.is_active ? 'Faol' : 'No Faol'}</p>
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
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>Moderatorni o'chirish</h3>
            <p className='text-gray-600 mb-6'>
              Haqiqatan ham<strong className='mx-[5px]'>{moderatorToDelete?.fio}</strong>
              nomli moderatorni o'chirmoqchimisiz? Bu amalni bekor qilib bo'lmaydi.
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

export default ModeratorMainManagement;