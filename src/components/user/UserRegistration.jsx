import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Stethoscope, CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react';

function UserRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const clinics = [
    {
      id: 1,
      name: "Toshkent Tibbiyot Markazi",
      address: "Yunusobod tumani, Abdulla Qodiriy ko'chasi 42",
      phone: "+998 71 123-45-67",
      rating: 4.8,
      specialties: ["Kardiologiya", "Nevrologiya", "Terapiya", "Ginekologiya"]
    },
    {
      id: 2,
      name: "Shifa Klinikasi",
      address: "Mirzo Ulug'bek tumani, Bobur ko'chasi 15",
      phone: "+998 71 234-56-78",
      rating: 4.6,
      specialties: ["Oftalmologiya", "Lor", "Dermatologiya", "Pediatriya"]
    },
    {
      id: 3,
      name: "Hayot Tibbiy Markazi",
      address: "Shayxontohur tumani, Navoi ko'chasi 28",
      phone: "+998 71 345-67-89",
      rating: 4.7,
      specialties: ["Ortopediya", "Kardiologiya", "Endokrinologiya", "Urologiya"]
    }
    
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Aliyev Jamshid",
      specialty: "Kardiolog",
      experience: "15 yil tajriba",
      rating: 4.9,
      price: "250,000 so'm",
      clinicId: 1,
      avatar: "👨‍⚕️"
    },
    {
      id: 2,
      name: "Dr. Karimova Nilufar",
      specialty: "Terapevt",
      experience: "12 yil tajriba",
      rating: 4.8,
      price: "200,000 so'm",
      clinicId: 1,
      avatar: "👩‍⚕️"
    },
    {
      id: 3,
      name: "Dr. Rahmonov Botir",
      specialty: "Oftalmolog",
      experience: "10 yil tajriba",
      rating: 4.7,
      price: "180,000 so'm",
      clinicId: 2,
      avatar: "👨‍⚕️"
    },
    {
      id: 4,
      name: "Dr. Saidova Madina",
      specialty: "Lor",
      experience: "8 yil tajriba",
      rating: 4.6,
      price: "170,000 so'm",
      clinicId: 2,
      avatar: "👩‍⚕️"
    }
  ];

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30"
  ];

  const availableDoctors = selectedClinic ? doctors.filter(doc => doc.clinicId === selectedClinic.id) : [];

  const handleClinicSelect = (clinic) => {
    setSelectedClinic(clinic);
    setSelectedDoctor(null);
    setSelectedDate('');
    setSelectedTime('');
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate('');
    setSelectedTime('');
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedClinic !== null;
      case 2: return selectedDoctor !== null;
      case 3: return selectedDate !== '' && selectedTime !== '';
      default: return true;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const confirmAppointment = () => {
    alert('Uchrashuvingiz muvaffaqiyatli ro\'yxatdan o\'tkazildi!');
    // Reset form
    setCurrentStep(1);
    setSelectedClinic(null);
    setSelectedDoctor(null);
    setSelectedDate('');
    setSelectedTime('');
  };

  // Generate next 14 days for date selection
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  return (
    <div className='w-full bg-gray-50 p-6'>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-[#3d99f5] px-8 py-6">
            <h1 className="text-3xl font-semibold text-white flex items-center">
              <Calendar className="w-8 h-8 mr-4" />
              Shifokorga yozilish
            </h1>
          </div>

          {/* Progress Steps */}
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {['Klinika tanlash', 'Shifokor tanlash', 'Vaqt tanlash', 'Tasdiqlash'].map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium ${
                    currentStep > index + 1 ? 'bg-green-500 text-white' :
                    currentStep === index + 1 ? 'bg-[#3d99f5] text-white' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > index + 1 ? <CheckCircle className="w-6 h-6" /> : index + 1}
                  </div>
                  <span className={`ml-3 text-lg ${currentStep === index + 1 ? 'text-[#3d99f5] font-medium' : 'text-gray-600'}`}>
                    {step}
                  </span>
                  {index < 3 && <ArrowRight className="w-6 h-6 mx-6 text-gray-400" />}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="p-8 min-h-96">
            {/* Step 1: Clinic Selection */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Klinikani tanlang</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {clinics.map((clinic) => (
                    <div
                      key={clinic.id}
                      onClick={() => handleClinicSelect(clinic)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                        selectedClinic?.id === clinic.id ? 'border-[#3d99f5] bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-gray-800">{clinic.name}</h3>
                        <div className="flex items-center text-yellow-500">
                          <span className="text-sm font-medium">⭐ {clinic.rating}</span>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{clinic.address}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          <span>{clinic.phone}</span>
                        </div>
                        <div className="mt-2">
                          <span className="text-xs font-medium text-gray-500">Mutaxassisliklar:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {clinic.specialties.slice(0, 3).map((specialty, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-xs rounded">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Doctor Selection */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Shifokorni tanlang</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      onClick={() => handleDoctorSelect(doctor)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                        selectedDoctor?.id === doctor.id ? 'border-[#3d99f5] bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl">{doctor.avatar}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{doctor.specialty}</p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">{doctor.experience}</span>
                            <span className="text-yellow-500">⭐ {doctor.rating}</span>
                          </div>
                          <div className="mt-2 text-lg font-semibold text-[#3d99f5]">
                            {doctor.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Date and Time Selection */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Sana va vaqtni tanlang</h2>
                
                {/* Date Selection */}
                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Sanani tanlang</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                    {getAvailableDates().map((date) => (
                      <button
                        key={date}
                        onClick={() => handleDateSelect(date)}
                        className={`p-3 text-sm rounded-lg border transition-all ${
                          selectedDate === date 
                            ? 'border-[#3d99f5] bg-blue-50 text-[#3d99f5]' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium">
                          {new Date(date).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short' })}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(date).toLocaleDateString('uz-UZ', { weekday: 'short' })}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">Vaqtni tanlang</h3>
                    <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-7 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className={`p-2 text-sm rounded-lg border transition-all ${
                            selectedTime === time 
                              ? 'border-[#3d99f5] bg-blue-50 text-[#3d99f5]' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Uchrashuvni tasdiqlang</h2>
                
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-[#3d99f5]" />
                    <div>
                      <h3 className="font-semibold text-gray-800">{selectedClinic?.name}</h3>
                      <p className="text-sm text-gray-600">{selectedClinic?.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Stethoscope className="w-5 h-5 text-[#3d99f5]" />
                    <div>
                      <h3 className="font-semibold text-gray-800">{selectedDoctor?.name}</h3>
                      <p className="text-sm text-gray-600">{selectedDoctor?.specialty}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-[#3d99f5]" />
                    <div>
                      <h3 className="font-semibold text-gray-800">{formatDate(selectedDate)}</h3>
                      <p className="text-sm text-gray-600">{selectedTime}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">Narx:</span>
                      <span className="text-xl font-semibold text-[#3d99f5]">{selectedDoctor?.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Orqaga
            </button>
            
            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className="px-6 py-2 bg-[#3d99f5] text-white rounded-lg hover:bg-[#2d7cd4] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Keyingisi
              </button>
            ) : (
              <button
                onClick={confirmAppointment}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Uchrashuvni tasdiqlash
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserRegistration;