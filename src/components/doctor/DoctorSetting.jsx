import React, { useEffect, useState } from "react";
import {
  Camera,
  User,
  Mail,
  Phone,
  Save,
  Clock,
  Globe,
  Bell,
  UserCheck,
  Stethoscope,
  BookOpen,
  Calendar,
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";
import { doctorGetId, doctorPut } from "../../api/services/doctorService";

function DoctorSetting() {
   const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialty: "",
    education: "",
    consultationHours: "",
    timezone: "",
    language: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Yangi yuklangan rasm
  const [notifications, setNotifications] = useState({
    email: false,
    sms: false,
    system: false,
  });

  const userId = localStorage.getItem("userId");

  // Doktor ma’lumotlarini yuklash
  useEffect(() => {
    if (userId) {
      doctorGetId(userId)
        .then((res) => {
          const data = res.data;
          setFormData({
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            email: data.email || "",
            phone: data.phone || "",
            specialty: data.specialty || "",
            education: data.education || "",
            consultationHours: data.consultation_hours || "",
            timezone: data.timezone || "",
            language: data.language || "",
            password: "",
            confirmPassword: "",
          });
          if (data.image) {
            setProfileImage(data.image);
          }
          setNotifications({
            email: data.notify_email ?? false,
            sms: data.notify_sms ?? false,
            system: data.notify_system ?? false,
          });
        })
        .catch((err) => {
          console.error("Doktor ma'lumotlarini yuklashda xatolik:", err);
        });
    }
  }, [userId]);

  // Input o‘zgarishi
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Rasm yuklash
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Bildirishnoma sozlamalari
  const handleNotificationChange = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Saqlash
  const handleSave = () => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    console.error("User ID mavjud emas, iltimos tizimga qayta kiring.");
    return;
  }

  if (formData.password && formData.password !== formData.confirmPassword) {
    console.error("Parollar mos kelmaydi!");
    return;
  }

  const updatedData = {
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    specialty: formData.specialty,
    education: formData.education,
    consultation_hours: formData.consultationHours,
    timezone: formData.timezone,
    language: formData.language,
    notify_email: notifications.email,
    notify_sms: notifications.sms,
    notify_system: notifications.system,
  };

  if (formData.password) {
    updatedData.password = formData.password;
  }

  const sendData = new FormData();
  for (const key in updatedData) {
    sendData.append(key, updatedData[key]);
  }
  if (imageFile) {
    sendData.append("image", imageFile);
  }

  console.log("===== Yuborilayotgan FormData =====");
  for (let [key, value] of sendData.entries()) {
    console.log(`${key}:`, value);
  }
  console.log("====");

  doctorPut(userId, sendData)
    .then((res) => {
      console.log("✅ Sozlamalar muvaffaqiyatli saqlandi:", res.data);
    })
    .catch((err) => {
      console.error(" Sozlamalarni saqlashda xatolik:", err);
    });
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-50 p-3 rounded-full">
              <UserCheck className="h-8 w-8 text-[#3d99f5]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Doktor sozlamalari
              </h1>
              <p className="text-gray-600">
                Profil va tizim sozlamalarini boshqarish
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Image Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-[#3d99f5]" />
                Profil rasmi
              </h2>

              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#3d99f5] to-blue-600 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-16 w-16 text-white" />
                    )}
                  </div>
                  <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="h-6 w-6 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-3 text-center">
                  Yangi rasm yuklash uchun
                  <br />
                  bosing
                </p>
              </div>

              {/* Notifications Section */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Bell className="h-4 w-4 mr-2 text-[#3d99f5]" />
                  Bildirishnomalar
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Email</span>
                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={() => handleNotificationChange("email")}
                      className="w-4 h-4 text-[#3d99f5] rounded focus:ring-[#3d99f5]"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">SMS</span>
                    <input
                      type="checkbox"
                      checked={notifications.sms}
                      onChange={() => handleNotificationChange("sms")}
                      className="w-4 h-4 text-[#3d99f5] rounded focus:ring-[#3d99f5]"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tizim</span>
                    <input
                      type="checkbox"
                      checked={notifications.system}
                      onChange={() => handleNotificationChange("system")}
                      className="w-4 h-4 text-[#3d99f5] rounded focus:ring-[#3d99f5]"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Main Settings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <User className="h-5 w-5 mr-2 text-[#3d99f5]" />
                Asosiy ma'lumotlar
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Ism
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent transition-all"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Familiya
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-[#3d99f5]" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent transition-all"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-[#3d99f5]" />
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent transition-all"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Lock className="h-4 w-4 mr-2 text-[#3d99f5]" />
                    Yangi parol
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent transition-all"
                      placeholder="Yangi parol kiriting"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Lock className="h-4 w-4 mr-2 text-[#3d99f5]" />
                    Parolni tasdiqlash
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent transition-all"
                      placeholder="Parolni qayta kiriting"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Specialty */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Stethoscope className="h-4 w-4 mr-2 text-[#3d99f5]" />
                    Mutaxassislik
                  </label>
                  <select
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent transition-all"
                  >
                    <option value="Kardiologiya">Kardiologiya</option>
                    <option value="Nevrologiya">Nevrologiya</option>
                    <option value="Pediatriya">Pediatriya</option>
                    <option value="Ortopediya">Ortopediya</option>
                  </select>
                </div>

                {/* Education */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-[#3d99f5]" />
                    Ta'lim
                  </label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent transition-all"
                    placeholder="Ta'lim muassasasi va yillari"
                  />
                </div>

                {/* Consultation Hours */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-[#3d99f5]" />
                    Konsultatsiya vaqtlari
                  </label>
                  <select
                    name="consultationHours"
                    value={formData.consultationHours}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent transition-all"
                  >
                    <option value="monday-friday">Dushanba-Juma</option>
                    <option value="weekends">Shanba-Yakshanba</option>
                    <option value="flexible">Moslashuvchan</option>
                  </select>
                </div>

                {/* Timezone */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-[#3d99f5]" />
                    Vaqt zonasi
                  </label>
                  <select
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent transition-all"
                  >
                    <option value="Asia/Tashkent">Toshkent (UTC+5)</option>
                    <option value="Asia/Samarkand">Samarqand (UTC+5)</option>
                  </select>
                </div>

                {/* Language */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-[#3d99f5]" />
                    Til
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent transition-all"
                  >
                    <option value="uz">O'zbekcha</option>
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSave}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-[#3d99f5] to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-[#3d99f5] focus:ring-offset-2 transition-all"
                >
                  <Save className="h-5 w-5 mr-2" />
                  Saqlash
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorSetting;
