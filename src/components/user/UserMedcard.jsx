import React, { useState } from 'react';
import { FileText, Download, Calendar, User, Activity, Pill, TestTube, Heart, Eye, Filter, Search } from 'lucide-react';

function UserMedcard() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [medicalHistory] = useState([
    {
      id: 1,
      date: "2025-06-20",
      type: "consultation",
      doctor: "Dr. Aliyev Jamshid",
      specialty: "Kardiolog",
      diagnosis: "Arterial gipertenziya",
      symptoms: "Bosh og'rig'i, yurak urishi tezlashishi",
      treatment: "Lisinopril 10mg, kuniga 1 marta",
      notes: "Qon bosimi nazorat ostida tutilishi kerak"
    },
    {
      id: 2,
      date: "2025-06-15",
      type: "analysis",
      doctor: "Dr. Karimova Nilufar",
      specialty: "Laboratoriya",
      diagnosis: "Qon tahlili",
      symptoms: "",
      treatment: "",
      notes: "Gemoglobin: 135 g/l, Leykositlar: 6.8×10⁹/l, SOE: 12 mm/soat"
    },
    {
      id: 3,
      date: "2025-06-10",
      type: "procedure",
      doctor: "Dr. Usmanov Bobur",
      specialty: "Terapevt",
      diagnosis: "Profilaktik tekshiruv",
      symptoms: "Shikoyat yo'q",
      treatment: "Vitaminlar qabul qilish tavsiya etiladi",
      notes: "Umumiy holat yaxshi"
    },
    {
      id: 4,
      date: "2025-05-28",
      type: "consultation",
      doctor: "Dr. Rahimova Madina",
      specialty: "Oftalmolog",
      diagnosis: "Ko'rish keskinligining pasayishi",
      symptoms: "Uzoqni ko'rishda qiyinchilik",
      treatment: "Ko'zoynak buyurtma qilish",
      notes: "Ko'rish keskinligi: OD -1.5, OS -1.25"
    },
    {
      id: 5,
      date: "2025-05-15",
      type: "analysis",
      doctor: "Dr. Saidov Akmal",
      specialty: "Laboratoriya", 
      diagnosis: "Biokimyoviy tahlil",
      symptoms: "",
      treatment: "",
      notes: "Qand: 5.2 mmol/l, Xolesterol: 4.8 mmol/l, Kreatinin: 85 μmol/l"
    }
  ]);

  const [patientInfo] = useState({
    name: "Abdullayev Oybek Karimovich",
    birthDate: "1985-03-15",
    gender: "Erkak",
    bloodType: "A(II) Rh+",
    allergies: "Penitsillin, yong'oqlar",
    chronicDiseases: "Arterial gipertenziya",
    emergencyContact: "+998 90 123 45 67"
  });

  const getTypeIcon = (type) => {
    switch(type) {
      case 'consultation': return <User className="w-5 h-5" />;
      case 'analysis': return <TestTube className="w-5 h-5" />;
      case 'procedure': return <Activity className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'consultation': return 'bg-blue-100 text-blue-800';
      case 'analysis': return 'bg-green-100 text-green-800';
      case 'procedure': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeName = (type) => {
    switch(type) {
      case 'consultation': return 'Konsultatsiya';
      case 'analysis': return 'Tahlil';
      case 'procedure': return 'Protsedura';
      default: return 'Boshqa';
    }
  };

  const filteredHistory = medicalHistory.filter(record => {
    const matchesFilter = selectedFilter === 'all' || record.type === selectedFilter;
    const matchesSearch = searchTerm === '' || 
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDownloadPDF = () => {
    // В реальном приложении здесь была бы логика генерации PDF
    alert('PDF yuklab olish funksiyasi ishga tushirildi');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

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

  return (
    <div className='min-h-full w-full bg-gray-50 p-6'>
      {/* Header */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Patient Info Sidebar */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-fit">
            <div className="bg-[#3d99f5] px-6 py-4">
              <div className="flex items-center space-x-3">
                <User className="w-6 h-6 text-white" />
                <h2 className="text-xl font-semibold text-white">Bemor ma'lumotlari</h2>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">{patientInfo.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Yoshi:</span>
                    <span className="font-medium">{calculateAge(patientInfo.birthDate)} yosh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Jinsi:</span>
                    <span className="font-medium">{patientInfo.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Qon guruhi:</span>
                    <span className="font-medium">{patientInfo.bloodType}</span>
                  </div>
                </div>
              </div>
              
              <hr className="border-gray-200" />
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-red-500" />
                  Allergiyalar
                </h4>
                <p className="text-sm text-gray-600">{patientInfo.allergies}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Activity className="w-4 h-4 mr-2 text-orange-500" />
                  Surunkali kasalliklar
                </h4>
                <p className="text-sm text-gray-600">{patientInfo.chronicDiseases}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Shoshilinch aloqa</h4>
                <p className="text-sm text-gray-600">{patientInfo.emergencyContact}</p>
              </div>
            </div>
          </div>
          
          {/* PDF Download Button */}
          <div className="mt-6">
            <button 
              onClick={handleDownloadPDF}
              className="w-full bg-[#3d99f5] hover:bg-[#2d7cd4] text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors shadow-sm"
            >
              <Download className="w-5 h-5" />
              <span>PDF yuklab olish</span>
            </button>
          </div>
        </div>

        {/* Medical History */}
        <div className="xl:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-[#3d99f5] px-6 py-4">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-white" />
                <h2 className="text-xl font-semibold text-white">Tibbiy tarix</h2>
              </div>
            </div>
            
            {/* Filters and Search */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select 
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent"
                  >
                    <option value="all">Barcha yozuvlar</option>
                    <option value="consultation">Konsultatsiyalar</option>
                    <option value="analysis">Tahlillar</option>
                    <option value="procedure">Protseduralar</option>
                  </select>
                </div>
                
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Shifokor, tashxis yoki mutaxassislik bo'yicha qidirish..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            {/* Medical Records */}
            <div className="p-6 max-h-125 overflow-y-auto">
              {filteredHistory.length > 0 ? (
                <div className="space-y-4">
                  {filteredHistory.map((record) => (
                    <div key={record.id} className="border border-gray-200 rounded-lg p-6 hover:border-[#3d99f5] transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-[#3d99f5] bg-opacity-10 rounded-lg flex items-center justify-center text-[#3d99f5]">
                            {getTypeIcon(record.type)}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-gray-800">{record.doctor}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(record.type)}`}>
                                {getTypeName(record.type)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{record.specialty}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(record.date)}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-800 mb-1">Tashxis</h4>
                          <p className="text-sm text-gray-600">{record.diagnosis}</p>
                        </div>
                        {record.symptoms && (
                          <div>
                            <h4 className="font-medium text-gray-800 mb-1">Shikoyatlar</h4>
                            <p className="text-sm text-gray-600">{record.symptoms}</p>
                          </div>
                        )}
                        {record.treatment && (
                          <div>
                            <h4 className="font-medium text-gray-800 mb-1">Davolash</h4>
                            <p className="text-sm text-gray-600">{record.treatment}</p>
                          </div>
                        )}
                        {record.notes && (
                          <div>
                            <h4 className="font-medium text-gray-800 mb-1">Qo'shimcha ma'lumotlar</h4>
                            <p className="text-sm text-gray-600">{record.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Hech qanday yozuv topilmadi</h3>
                  <p className="text-gray-600">Qidiruv shartlarini o'zgartirib ko'ring</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserMedcard;