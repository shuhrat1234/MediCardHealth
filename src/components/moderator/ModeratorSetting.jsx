import React, { useState } from "react";
import {
  Camera,
  User,
  Mail,
  Phone,
  Save,
  Shield,
  Settings,
  Bell,
  Globe,
  MessageSquare,
  Clock,
  Eye,
  EyeOff,
  Lock,
  UserCheck,
} from "lucide-react";

function ModeratorSetting() {
  const [formData, setFormData] = useState({
    userId: "MD12345",
    firstName: "Moderator",
    lastName: "Tibbiyot",
    email: "moderator@medclinic.uz",
    phone: "+998901234567",
    bio: "Tibbiy klinika moderatori",
    timezone: "Asia/Tashkent",
    language: "uz",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    system: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "userId") {
      const regex = /^[A-Z]{0,2}[0-9]{0,5}$/;
      if (value.length <= 7 && regex.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Parollar mos kelmaydi!");
      return;
    }
    alert("Sozlamalar muvaffaqiyatli saqlandi!");
  };

  const handleNotificationChange = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-green-50 p-3 rounded-full">
              <UserCheck className="h-8 w-8 text-[#3d99f5]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Moderator sozlamalari
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
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#2b76c2] to-[#3d99f5] flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
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
                      className="w-4 h-4 text-[#3d99f5] rounded focus:ring-[#2b76c2]"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">SMS</span>
                    <input
                      type="checkbox"
                      checked={notifications.sms}
                      onChange={() => handleNotificationChange("sms")}
                      className="w-4 h-4 text-[#3d99f5] rounded focus:ring-[#2b76c2]"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tizim</span>
                    <input
                      type="checkbox"
                      checked={notifications.system}
                      onChange={() => handleNotificationChange("system")}
                      className="w-4 h-4 text-[#3d99f5] rounded focus:ring-[#2b76c2]"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b76c2] focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b76c2] focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b76c2] focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b76c2] focus:border-transparent transition-all"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b76c2] focus:border-transparent transition-all"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b76c2] focus:border-transparent transition-all"
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

                {/* Bio */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Qisqacha ma'lumot
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b76c2] focus:border-transparent transition-all resize-none"
                    placeholder="O'zingiz haqingizda qisqacha yozing..."
                  />
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b76c2] focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b76c2] focus:border-transparent transition-all"
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
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-[#2b76c2] to-[#3d99f5] text-white font-semibold rounded-lg shadow-md hover:from-[#3d99f5] hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-[#2b76c2] focus:ring-offset-2 transition-all"
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

export default ModeratorSetting;
