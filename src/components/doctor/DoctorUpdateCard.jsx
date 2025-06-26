import React, { useState } from 'react';
import { Save, Plus, Trash2, User, Calendar, FileText, Pill, Activity, Search, X } from 'lucide-react';

function DoctorUpdateCard() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPatientSearch, setShowPatientSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDiagnosis, setCurrentDiagnosis] = useState('');
  const [prescriptions, setPrescriptions] = useState([]);
  const [historyEntry, setHistoryEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    recommendations: ''
  });

  // Mock patients data
  const patients = [
    {
      id: 1,
      name: 'Abdullayev Abdulla Abdullayevich',
      birthDate: '1985-03-15',
      phone: '+998 90 123 45 67',
      currentDiagnosis: 'Gipertoniya',
      lastVisit: '2024-06-20'
    },
    {
      id: 2,
      name: 'Karimova Oygul Salimovna',
      birthDate: '1992-07-22',
      phone: '+998 91 234 56 78',
      currentDiagnosis: 'Astma',
      lastVisit: '2024-06-18'
    },
    {
      id: 3,
      name: 'Toshmatov Sardor Akramovich',
      birthDate: '1978-11-08',
      phone: '+998 93 345 67 89',
      currentDiagnosis: 'Diabet 2-tur',
      lastVisit: '2024-06-22'
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const selectPatient = (patient) => {
    setSelectedPatient(patient);
    setCurrentDiagnosis(patient.currentDiagnosis);
    setShowPatientSearch(false);
    setSearchTerm('');
  };

  const addPrescription = () => {
    setPrescriptions([...prescriptions, {
      id: Date.now(),
      medication: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: ''
    }]);
  };

  const updatePrescription = (id, field, value) => {
    setPrescriptions(prescriptions.map(prescription =>
      prescription.id === id ? { ...prescription, [field]: value } : prescription
    ));
  };

  const removePrescription = (id) => {
    setPrescriptions(prescriptions.filter(prescription => prescription.id !== id));
  };

  const handleSave = () => {
    if (!selectedPatient) {
      alert('Iltimos, bemorni tanlang');
      return;
    }

    // Here you would typically save to backend
    console.log({
      patientId: selectedPatient.id,
      diagnosis: currentDiagnosis,
      prescriptions,
      historyEntry
    });

    alert('Ma\'lumotlar muvaffaqiyatli saqlandi!');
    
    // Reset form
    setPrescriptions([]);
    setHistoryEntry({
      date: new Date().toISOString().split('T')[0],
      description: '',
      recommendations: ''
    });
  };

  return (
    <div className='min-h-full w-full bg-[#f7f7f7] p-5'>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Tibbiy kartochkani yangilash</h1>
          <p className="text-gray-600">Tashxis qo'yish, retsept yozish, bemor tarixini yangilash</p>
        </div>

        {/* Patient Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Bemorni tanlash</h2>
            <button
              onClick={() => setShowPatientSearch(true)}
              className="bg-[#3d99f5] text-white px-4 py-2 rounded-lg hover:bg-[#2d7de5] transition-all duration-200 transform hover:scale-105 flex items-center gap-2 shadow-md"
            >
              <Search className="w-4 h-4" />
              Bemorni tanlash
            </button>
          </div>

          {selectedPatient ? (
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <div className="w-12 h-12 bg-gradient-to-r from-[#3d99f5] to-[#2d7de5] rounded-full flex items-center justify-center shadow-md">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{selectedPatient.name}</h3>
                <p className="text-sm text-gray-600">
                  {calculateAge(selectedPatient.birthDate)} yosh • {selectedPatient.phone}
                </p>
              </div>
              <button
                onClick={() => setSelectedPatient(null)}
                className="text-gray-400 hover:text-gray-600 hover:bg-white rounded-full p-2 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-gray-300" />
              </div>
              <p className="text-lg font-medium mb-2">Bemorni tanlang</p>
              <p className="text-sm">Kartochkani yangilash uchun bemorni tanlang</p>
            </div>
          )}
        </div>

        {/* Patient Search Modal */}
        {showPatientSearch && (
          <div className="fixed inset-0 bg-white bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl border border-gray-100 transform transition-all duration-300">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Bemor qidirish</h3>
                <button
                  onClick={() => setShowPatientSearch(false)}
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Bemor ismini kiriting..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="max-h-80 overflow-y-auto">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    onClick={() => selectPatient(patient)}
                    className="p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer rounded-xl border border-transparent hover:border-blue-200 transition-all duration-200 mb-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#3d99f5] to-[#2d7de5] rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{patient.name}</p>
                        <p className="text-sm text-gray-600">{patient.currentDiagnosis}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredPatients.length === 0 && searchTerm && (
                  <div className="text-center py-8 text-gray-500">
                    <p>Bemor topilmadi</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {selectedPatient && (
          <div className="space-y-6">
            {/* Diagnosis Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[#3d99f5] to-[#2d7de5] rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                Tashxis qo'yish
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Joriy tashxis
                </label>
                <textarea
                  value={currentDiagnosis}
                  onChange={(e) => setCurrentDiagnosis(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                  rows="3"
                  placeholder="Tashxisni kiriting..."
                />
              </div>
            </div>

            {/* Prescriptions Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#3d99f5] to-[#2d7de5] rounded-lg flex items-center justify-center">
                    <Pill className="w-5 h-5 text-white" />
                  </div>
                  Retsept yozish
                </h2>
                <button
                  onClick={addPrescription}
                  className="bg-gradient-to-r from-[#3d99f5] to-[#2d7de5] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Retsept qo'shish
                </button>
              </div>

              {prescriptions.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Pill className="w-10 h-10 text-gray-300" />
                  </div>
                  <p className="text-lg font-medium mb-2">Retseptlar yo'q</p>
                  <p className="text-sm">Yangi retsept yaratish uchun "Retsept qo'shish" tugmasini bosing</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {prescriptions.map((prescription, index) => (
                    <div key={prescription.id} className="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-gray-50 to-blue-50">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium text-gray-800 flex items-center gap-2">
                          <span className="w-6 h-6 bg-[#3d99f5] text-white rounded-full flex items-center justify-center text-sm">
                            {index + 1}
                          </span>
                          Retsept #{index + 1}
                        </h4>
                        <button
                          onClick={() => removePrescription(prescription.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg p-2 transition-all duration-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Dori nomi
                          </label>
                          <input
                            type="text"
                            value={prescription.medication}
                            onChange={(e) => updatePrescription(prescription.id, 'medication', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent outline-none transition-all duration-200"
                            placeholder="Dori nomini kiriting"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Dozasi
                          </label>
                          <input
                            type="text"
                            value={prescription.dosage}
                            onChange={(e) => updatePrescription(prescription.id, 'dosage', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent outline-none transition-all duration-200"
                            placeholder="50mg, 1 tabl"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Qabul qilish chastotasi
                          </label>
                          <input
                            type="text"
                            value={prescription.frequency}
                            onChange={(e) => updatePrescription(prescription.id, 'frequency', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent outline-none transition-all duration-200"
                            placeholder="Kuniga 2 marta"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Davomiyligi
                          </label>
                          <input
                            type="text"
                            value={prescription.duration}
                            onChange={(e) => updatePrescription(prescription.id, 'duration', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent outline-none transition-all duration-200"
                            placeholder="10 kun"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Qo'shimcha ko'rsatmalar
                        </label>
                        <textarea
                          value={prescription.instructions}
                          onChange={(e) => updatePrescription(prescription.id, 'instructions', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent outline-none transition-all duration-200"
                          rows="2"
                          placeholder="Ovqatdan keyin, suv bilan..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Medical History Update */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[#3d99f5] to-[#2d7de5] rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                Bemor tarixini yangilash
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tashrif sanasi
                  </label>
                  <input
                    type="date"
                    value={historyEntry.date}
                    onChange={(e) => setHistoryEntry({...historyEntry, date: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent outline-none transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tashrif tavsifi
                  </label>
                  <textarea
                    value={historyEntry.description}
                    onChange={(e) => setHistoryEntry({...historyEntry, description: e.target.value})}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                    rows="4"
                    placeholder="Bemorning shikoyatlari, ko'rik natijalari, tekshiruvlar..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tavsiyalar
                  </label>
                  <textarea
                    value={historyEntry.recommendations}
                    onChange={(e) => setHistoryEntry({...historyEntry, recommendations: e.target.value})}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                    rows="3"
                    placeholder="Davolash, rejim, ovqatlanish bo'yicha tavsiyalar..."
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="bg-gradient-to-r from-[#3d99f5] to-[#2d7de5] text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-3 text-lg font-medium"
              >
                <Save className="w-6 h-6" />
                O'zgarishlarni saqlash
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorUpdateCard;