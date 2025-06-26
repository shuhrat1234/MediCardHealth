import React, { useState } from 'react';
import { Search, User, Calendar, FileText, Activity, Eye, Plus } from 'lucide-react';

function DoctorPatientCard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Mock patient data
  const patients = [
    {
      id: 1,
      name: 'Abdullayev Abdulla Abdullayevich',
      birthDate: '1985-03-15',
      phone: '+998 90 123 45 67',
      lastVisit: '2024-06-20',
      status: 'Faol',
      diagnosis: 'Gipertoniya',
      analyses: [
        { date: '2024-06-20', type: 'Umumiy qon tahlili', result: 'Norma' },
        { date: '2024-06-15', type: 'Biokimyoviy tahlil', result: 'Xolesterin yuqori' }
      ],
      history: [
        { date: '2024-06-20', diagnosis: 'Rejali ko\'rik', doctor: 'Kardiolog Petrov A.I.' },
        { date: '2024-05-10', diagnosis: 'Gipertoniya 2-daraja', doctor: 'Terapevt Sidorova M.V.' }
      ]
    },
    {
      id: 2,
      name: 'Karimova Oygul Salimovna',
      birthDate: '1992-07-22',
      phone: '+998 91 234 56 78',
      lastVisit: '2024-06-18',
      status: 'Faol',
      diagnosis: 'Astma',
      analyses: [
        { date: '2024-06-18', type: 'Spirometriya', result: 'O\'rtacha buzilishlar' },
        { date: '2024-06-10', type: 'Allergiya testlari', result: 'Changiga musbat' }
      ],
      history: [
        { date: '2024-06-18', diagnosis: 'Astma og\'ishi', doctor: 'Pulmonolog Kozlov V.P.' },
        { date: '2024-05-20', diagnosis: 'Rejali kuzatuv', doctor: 'Pulmonolog Kozlov V.P.' }
      ]
    },
    {
      id: 3,
      name: 'Toshmatov Sardor Akramovich',
      birthDate: '1978-11-08',
      phone: '+998 93 345 67 89',
      lastVisit: '2024-06-22',
      status: 'Faol',
      diagnosis: 'Diabet 2-tur',
      analyses: [
        { date: '2024-06-22', type: 'Qon glyukozasi', result: 'Yuqori 8.2 mmol/l' },
        { date: '2024-06-15', type: 'HbA1c', result: '7.8%' }
      ],
      history: [
        { date: '2024-06-22', diagnosis: 'Davolanishni tuzatish', doctor: 'Endokrinolog Volkova E.A.' },
        { date: '2024-05-25', diagnosis: 'Rejali nazorat', doctor: 'Endokrinolog Volkova E.A.' }
      ]
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <div className='min-h-full w-full bg-[#f7f7f7] p-5'>
      <div className="max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Bemor ismi yoki tashxis bo'yicha qidirish..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Patient List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Bemorlar ro'yxati</h2>
              <button className="bg-[#3d99f5] text-white px-4 py-2 rounded-lg hover:bg-[#2d7de5] transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Qo'shish
              </button>
            </div>

            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className={`bg-white rounded-lg shadow-sm p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedPatient?.id === patient.id ? 'ring-2 ring-[#3d99f5] bg-blue-50' : ''
                }`}
                onClick={() => setSelectedPatient(patient)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#3d99f5] rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{patient.name}</h3>
                      <p className="text-sm text-gray-600">{calculateAge(patient.birthDate)} yosh</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    patient.status === 'Faol' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {patient.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Oxirgi tashrif: {patient.lastVisit}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Activity className="w-4 h-4" />
                    <span>{patient.diagnosis}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Patient Details */}
          <div className="bg-white rounded-lg shadow-sm">
            {selectedPatient ? (
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#3d99f5] rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{selectedPatient.name}</h2>
                    <p className="text-gray-600">{calculateAge(selectedPatient.birthDate)} yosh • {selectedPatient.phone}</p>
                  </div>
                </div>

                {/* Patient Info */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Tug'ilgan sana</p>
                    <p className="font-medium">{selectedPatient.birthDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Asosiy tashxis</p>
                    <p className="font-medium">{selectedPatient.diagnosis}</p>
                  </div>
                </div>

                {/* Recent Analyses */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#3d99f5]" />
                    Tahlil natijalari
                  </h3>
                  <div className="space-y-3">
                    {selectedPatient.analyses.map((analysis, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">{analysis.type}</p>
                          <p className="text-sm text-gray-600">{analysis.date}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium ${
                            analysis.result.includes('Norma') ? 'text-green-600' : 'text-orange-600'
                          }`}>
                            {analysis.result}
                          </p>
                          <button className="text-[#3d99f5] text-sm hover:underline flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            Batafsil
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Medical History */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#3d99f5]" />
                    Tibbiy tarix
                  </h3>
                  <div className="space-y-3">
                    {selectedPatient.history.map((record, idx) => (
                      <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-medium text-gray-800">{record.diagnosis}</p>
                          <span className="text-sm text-gray-500">{record.date}</span>
                        </div>
                        <p className="text-sm text-gray-600">Shifokor: {record.doctor}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg mb-2">Bemorni tanlang</p>
                <p className="text-sm">Batafsil ma'lumotni ko'rish uchun chap tomondagi ro'yxatdan bemorni tanlang</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorPatientCard;