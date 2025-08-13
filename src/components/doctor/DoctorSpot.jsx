import React, { useEffect, useState } from 'react';
import { Calendar, Clock, User, Phone, FileText, Plus, CheckCircle, AlertCircle } from 'lucide-react';

function DoctorSpot() {
  const [appointments, setAppointments] = useState([]);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const getPatients = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await patientGet();
      setAppointments(result)
    } catch (error) {
      setApiError(
        error.response?.data?.detail || "Tizimga kirishda xatolik yuz berdi"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPatients()
  }, [])



  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    time: '',
    phone: '',
    notes: ''
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const updateStatus = (id, newStatus) => {
    setAppointments(appointments.map(apt =>
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
  };

  const addAppointment = () => {
    if (newAppointment.patientName && newAppointment.time) {
      const appointment = {
        id: Date.now(),
        ...newAppointment,
        status: 'kutilmoqda'
      };
      setAppointments([...appointments, appointment]);
      setNewAppointment({ patientName: '', time: '', phone: '', notes: '' });
      setShowAddForm(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'kutilmoqda': return 'bg-yellow-100 text-yellow-800';
      case 'keldi': return 'bg-blue-100 text-blue-800';
      case 'tugallandi': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'kutilmoqda': return <Clock className="w-4 h-4" />;
      case 'keldi': return <AlertCircle className="w-4 h-4" />;
      case 'tugallandi': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full" style={{ backgroundColor: '#3d99f5' }}>
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Jami qabullar</p>
                <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-500">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Kutilmoqda</p>
                <p className="text-2xl font-bold text-gray-900">
                  {appointments.filter(apt => apt.status === 'kutilmoqda').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-500">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Keldi</p>
                <p className="text-2xl font-bold text-gray-900">
                  {appointments.filter(apt => apt.status === 'keldi').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-500">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Tugallandi</p>
                <p className="text-2xl font-bold text-gray-900">
                  {appointments.filter(apt => apt.status === 'tugallandi').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Mening yozuvlarim (Navbatlar)
              </h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#3d99f5' }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Yangi qabul qo'shish
              </button>
            </div>
            <p className="text-gray-600 mt-1">
              Barcha tayinlangan qabullar ro'yxati
            </p>
          </div>

          {/* Add Appointment Form */}
          {showAddForm && (
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Yangi qabul qo'shish</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Bemor ismi"
                  value={newAppointment.patientName}
                  onChange={(e) => setNewAppointment({ ...newAppointment, patientName: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  placeholder="Telefon raqami"
                  value={newAppointment.phone}
                  onChange={(e) => setNewAppointment({ ...newAppointment, phone: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Izohlar"
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={addAppointment}
                  className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#3d99f5' }}
                >
                  Saqlash
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Bekor qilish
                </button>
              </div>
            </div>
          )}

          {/* Appointments List */}
          <div className="divide-y divide-gray-200">

            {isLoading ?
              <div className='w-full py-10 flex items-center justify-center'>
                <div className='w-10 h-10 rounded-full border-2 border-b-0 border-blue-500'></div>
              </div> :

              appointments.map((appointment) => (
                <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#3d99f5' }}>
                          <User className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{appointment.patientName}</h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            <span className="text-sm">{appointment.time}</span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <Phone className="w-4 h-4 mr-1" />
                            <span className="text-sm">{appointment.phone}</span>
                          </div>
                          {appointment.notes && (
                            <div className="flex items-center text-gray-500">
                              <FileText className="w-4 h-4 mr-1" />
                              <span className="text-sm">{appointment.notes}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusIcon(appointment.status)}
                        <span className="ml-1 capitalize">{appointment.status}</span>
                      </span>

                      <div className="flex space-x-2">
                        {appointment.status === 'kutilmoqda' && (
                          <button
                            onClick={() => updateStatus(appointment.id, 'keldi')}
                            className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            Keldi
                          </button>
                        )}
                        {appointment.status === 'keldi' && (
                          <button
                            onClick={() => updateStatus(appointment.id, 'tugallandi')}
                            className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
                          >
                            Tugallash
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorSpot;