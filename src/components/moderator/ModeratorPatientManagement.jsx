import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Save,
  X,
  User,
  Phone,
  CalendarIcon,
  FileTextIcon,
  MapPin,
} from "lucide-react";
import {
  patientDelete,
  patientGet,
  patientPost,
  patientPut,
} from "../../api/services/patientService";

function ModeratorPatientManagement() {
  const [patients, setPatients] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedViewPatient, setSelectedViewPatient] = useState(null);
  const [selectedEditPatient, setSelectedEditPatient] = useState(null);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState({});

  // add form data
  const [addFormData, setAddFormData] = useState({
    user_id: "",
    fio: "",
    is_active: true,
    patient_profile: {
      phone: "",
      age: "",
      gender: "",
      address: "",
    },
  });

  // edit form data
  const [editFormData, setEditFormData] = useState({
    user_id: "",
    fio: "",
    is_active: true,
    patient_profile: {
      phone: "",
      age: "",
      gender: "",
      address: "",
    },
  });

  // get-all-patients
  const fetchPatients = async () => {
    try {
      const { data } = await patientGet();
      console.log("Fetched patients:", data);
      setPatients(data);
    } catch (error) {
      console.error(
        "Error fetching patients:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // form-validation
  const validateForm = (data) => {
    const newErrors = {};
    // Validate user_id: 2 uppercase English letters, optional space, 7 digits
    if (!data.user_id.match(/^[A-Z]{2}\s?\d{7}$/)) {
      newErrors.user_id =
        "User ID format: 2 uppercase English letters, space, 7 digits (e.g., AB 1234567)";
    }
    if (!data.fio.trim()) {
      newErrors.fio = "FIO majburiy";
    }
    if (!data.patient_profile.age || !String(data.patient_profile.age).trim()) {
      newErrors.age = "Yosh majburiy";
    }
    if (!data.patient_profile.gender) {
      newErrors.gender = "Jins kiritilishi shart";
    }
    if (!data.patient_profile.address.trim()) {
      newErrors.address = "Joylashuv majburiy";
    }
    const phoneDigits = String(data.patient_profile.phone).replace(/\D/g, "");
    if (phoneDigits.length !== 9) {
      newErrors.phone = "Telefon raqam noto‘g‘ri yoki to‘liq emas";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // user_id input handler
  const handleUserIdInput = (value) => {
    let formattedValue = value.toUpperCase().slice(0, 10);

    // Remove non-English letters for first two characters
    formattedValue = formattedValue.replace(/[^A-Z]/g, (match, offset) =>
      offset < 2 ? "" : match
    );

    // Add space after 2 letters if 3rd character is entered
    if (formattedValue.length > 2 && formattedValue[2] !== " ") {
      formattedValue =
        formattedValue.slice(0, 2) + " " + formattedValue.slice(2);
    }

    // After space, allow only digits
    if (formattedValue.length > 3) {
      const parts = formattedValue.split(" ");
      if (parts[1]) {
        parts[1] = parts[1].replace(/[^0-9]/g, "").slice(0, 7);
        formattedValue = parts[0] + " " + parts[1];
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

  // add-patient
  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "user_id") {
      const formattedValue = handleUserIdInput(value);
      setAddFormData((prev) => ({ ...prev, user_id: formattedValue }));
      return;
    }
    if (name === "is_active") {
      setAddFormData((prev) => ({
        ...prev,
        is_active: value === "true",
      }));
      return;
    }
    if (name === "phone") {
      const prevValue = addFormData.patient_profile.phone || "";
      const isDeleting = value.length < prevValue.length;
      const formattedPhone = handlePhone(value, isDeleting);
      setAddFormData((prev) => ({
        ...prev,
        patient_profile: { ...prev.patient_profile, phone: formattedPhone },
      }));
      return;
    }
    if (["age", "gender", "address"].includes(name)) {
      setAddFormData((prev) => ({
        ...prev,
        patient_profile: { ...prev.patient_profile, [name]: value },
      }));
    } else {
      setAddFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();
    if (!validateForm(addFormData)) return;
    try {
      const formattedData = {
        ...addFormData,
        user_id: addFormData.user_id.replace(/\s/g, ""),
      };
      await patientPost(formattedData);
      await fetchPatients();
      resetAddForm();
    } catch (error) {
      console.error(
        "Bemor qo'shishda xatolik:",
        error.response?.data || error.message
      );
    }
  };

  const resetAddForm = () => {
    setAddFormData({
      user_id: "",
      fio: "",
      is_active: true,
      patient_profile: { phone: "", age: "", gender: "", address: "" },
    });
    setErrors({});
    setShowAddModal(false);
  };

  // edit-patient
  const handleEdit = (patient) => {
    const formattedUserId = patient.user_id.replace(
      /([A-Z]{2})(\d{7})/,
      "$1 $2"
    );
    setEditFormData({
      user_id: formattedUserId,
      fio: patient.fio,
      is_active: patient.is_active,
      patient_profile: {
        phone: patient.patient_profile?.phone || "",
        age: patient.patient_profile?.age || "",
        gender: patient.patient_profile?.gender || "",
        address: patient.patient_profile?.address || "",
      },
    });
    setSelectedEditPatient(patient);
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "user_id") {
      const formattedValue = handleUserIdInput(value);
      setEditFormData((prev) => ({ ...prev, user_id: formattedValue }));
      return;
    }
    if (name === "is_active") {
      setEditFormData((prev) => ({
        ...prev,
        is_active: value === "true",
      }));
    } else if (name === "phone") {
      const prevValue = editFormData.patient_profile.phone || "";
      const isDeleting = value.length < prevValue.length;
      setEditFormData((prev) => ({
        ...prev,
        patient_profile: {
          ...prev.patient_profile,
          phone: handlePhone(value, isDeleting),
        },
      }));
    } else if (["age", "gender", "address"].includes(name)) {
      setEditFormData((prev) => ({
        ...prev,
        patient_profile: { ...prev.patient_profile, [name]: value },
      }));
    } else {
      setEditFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdatePatient = async (e) => {
    e.preventDefault();
    const updateData = {
      user_id: editFormData.user_id.replace(/\s/g, ""),
      fio: editFormData.fio,
      is_active: editFormData.is_active,
      patient_profile: {
        phone: editFormData.patient_profile.phone,
        age: editFormData.patient_profile.age,
        gender: editFormData.patient_profile.gender,
        address: editFormData.patient_profile.address,
      },
    };
    if (!validateForm(updateData)) return;
    try {
      await patientPut(editFormData.user_id.replace(/\s/g, ""), updateData);
      await fetchPatients();
      resetEditForm();
    } catch (error) {
      console.error(
        "Yangilashda xatolik:",
        error.response?.data || error.message
      );
    }
  };

  const resetEditForm = () => {
    setEditFormData({
      user_id: "",
      fio: "",
      is_active: true,
      patient_profile: { phone: "", age: "", gender: "", address: "" },
    });
    setErrors({});
    setShowEditModal(false);
  };

  // delete-patient
  const handleDelete = (patient) => {
    setPatientToDelete(patient);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await patientDelete(patientToDelete.user_id);
      setPatients(
        patients.filter(
          (patient) => patient.user_id !== patientToDelete.user_id
        )
      );
      setShowDeleteModal(false);
      setPatientToDelete(null);
    } catch (error) {
      console.error("Bemor o'chirishda xatolik:", error);
    }
  };

  // view-patient
  const handleView = (patient) => {
    const formattedPatient = {
      ...patient,
      user_id: patient.user_id.replace(/([A-Z]{2})(\d{7})/, "$1 $2"),
    };
    setSelectedViewPatient(formattedPatient);
    setShowViewModal(true);
  };

  // filters-patient
  // const filteredPatients = patients?.filter(
  //   (patient) =>
  //     patient.user_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     patient.fio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     patient.patient_profile?.phone
  //       ?.toLowerCase()
  //       .includes(searchTerm.toLowerCase()) ||
  //     patient.patient_profile?.age
  //       ?.toString()
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase()) ||
  //     patient.patient_profile?.gender
  //       ?.toLowerCase()
  //       .includes(searchTerm.toLowerCase()) ||
  //     patient.patient_profile?.address
  //       ?.toLowerCase()
  //       .includes(searchTerm.toLowerCase())
  // );

  console.log(`patients:`, patients)

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      {/* Search and Add */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Bemorlarni qidirish..."
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
          <span>Bemor qo'shish</span>
        </button>
      </div>

      {/* Table Patient */}
      {/* <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 overflow-x-scroll">
        <table className="w-full table-auto">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                USER ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                BEMOR
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                TELEFON
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                YOSHI
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                JINSI
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                HOLATI
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                JOYLASHUV
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                AMALLAR
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr
                  key={patient.user_id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {patient.user_id.replace(/([A-Z]{2})(\d{7})/, "$1 $2")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-[#3d99f5]" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {patient.fio}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {patient.patient_profile?.phone || "Kiritilmagan"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {patient.patient_profile?.age || "Kiritilmagan"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {patient.patient_profile?.gender || "Kiritilmagan"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`w-[90px] h-[30px] flex justify-center items-center rounded-full text-sm text-white ${patient.is_active ? "bg-green-500" : "bg-red-500"
                        }`}
                    >
                      {patient.is_active ? "Faol" : "No Faol"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {patient.patient_profile?.address || "Kiritilmagan"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleView(patient)}
                        className="cursor-pointer p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 rounded-md hover:bg-gray-100"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(patient)}
                        className="cursor-pointer p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 rounded-md hover:bg-gray-100"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(patient)}
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
                <td colSpan="8" className="text-center py-8 text-gray-500">
                  Bemorlar topilmadi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div> */}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Yangi bemor qo'shish
                </h2>
                <button
                  onClick={resetAddForm}
                  className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <form onSubmit={handleAddPatient} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    User ID *
                  </label>
                  <input
                    type="text"
                    name="user_id"
                    value={addFormData.user_id}
                    onChange={handleAddInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="AB 1234567"
                    maxLength={10}
                  />
                  {errors.user_id && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.user_id}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    FIO *
                  </label>
                  <input
                    type="text"
                    name="fio"
                    value={addFormData.fio}
                    onChange={handleAddInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.fio && (
                    <p className="mt-1 text-sm text-red-600">{errors.fio}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon raqam *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={addFormData.patient_profile.phone}
                    onChange={handleAddInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Yosh *
                  </label>
                  <input
                    name="age"
                    type="number"
                    value={addFormData.patient_profile.age}
                    onChange={handleAddInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.age && (
                    <p className="mt-1 text-sm text-red-600">{errors.age}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jins *
                  </label>
                  <select
                    name="gender"
                    value={addFormData.patient_profile.gender}
                    onChange={handleAddInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="" disabled>
                      Jinsni tanlang
                    </option>
                    <option value="male">Erkak</option>
                    <option value="female">Ayol</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Joylashuv *
                  </label>
                  <input
                    name="address"
                    type="text"
                    value={addFormData.patient_profile.address}
                    onChange={handleAddInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.address}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Holat *
                  </label>
                  <select
                    name="is_active"
                    value={addFormData.is_active ? "true" : "false"}
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
                  className="cursor-pointer px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="cursor-pointer px-4 py-2 bg-[#3d99f5] text-white rounded-lg hover:bg-[#2d89e5] transition-colors duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedEditPatient && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Bemorni tahrirlash
                </h2>
                <button
                  onClick={resetEditForm}
                  className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <form onSubmit={handleUpdatePatient} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    User ID *
                  </label>
                  <input
                    type="text"
                    name="user_id"
                    defaultValue={editFormData.user_id}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength={10}
                  />
                  {errors.user_id && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.user_id}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    FIO *
                  </label>
                  <input
                    type="text"
                    name="fio"
                    defaultValue={editFormData.fio}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.fio && (
                    <p className="mt-1 text-sm text-red-600">{errors.fio}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon raqam *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    defaultValue={editFormData.patient_profile.phone}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Yosh *
                  </label>
                  <input
                    name="age"
                    type="number"
                    defaultValue={editFormData.patient_profile.age}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.age && (
                    <p className="mt-1 text-sm text-red-600">{errors.age}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jins *
                  </label>
                  <select
                    name="gender"
                    defaultValue={editFormData.patient_profile.gender}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="" disabled>
                      Jinsni tanlang
                    </option>
                    <option value="male">Erkak</option>
                    <option value="female">Ayol</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Joylashuv *
                  </label>
                  <input
                    name="address"
                    type="text"
                    defaultValue={editFormData.patient_profile.address}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.address}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Holat *
                  </label>
                  <select
                    name="is_active"
                    defaultValue={editFormData.is_active ? "true" : "false"}
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
                  className="cursor-pointer px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="cursor-pointer px-4 py-2 bg-[#3d99f5] text-white rounded-lg hover:bg-[#2d89e5] transition-colors duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedViewPatient && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Bemor ma'lumotlari
                </h2>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="cursor-pointer text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">User ID</p>
                      <p className="font-medium text-sm text-gray-900">
                        {selectedViewPatient.user_id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">FIO</p>
                      <p className="font-medium text-sm text-gray-900">
                        {selectedViewPatient.fio}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Telefon raqam</p>
                      <p className="font-medium text-sm text-gray-900">
                        {selectedViewPatient.patient_profile?.phone ||
                          "Kiritilmagan"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileTextIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Yosh</p>
                      <p className="font-medium text-sm text-gray-900">
                        {selectedViewPatient.patient_profile?.age ||
                          "Kiritilmagan"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileTextIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Jins</p>
                      <p className="font-medium text-sm text-gray-900">
                        {selectedViewPatient.patient_profile?.gender ||
                          "Kiritilmagan"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Joylashuv</p>
                      <p className="font-medium text-sm text-gray-900">
                        {selectedViewPatient.patient_profile?.address ||
                          "Kiritilmagan"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileTextIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Holat</p>
                      <p className="font-medium text-sm text-gray-900">
                        {selectedViewPatient.is_active ? "Faol" : "No Faol"}
                      </p>
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
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Bemorni o'chirish
            </h3>
            <p className="text-gray-600 mb-6">
              Haqiqatan ham
              <strong className="mx-[5px]">{patientToDelete?.fio}</strong>
              nomli bemorni o'chirmoqchimisiz? Bu amalni bekor qilib bo'lmaydi.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="cursor-pointer px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                Bekor qilish
              </button>
              <button
                onClick={confirmDelete}
                className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
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

export default ModeratorPatientManagement;