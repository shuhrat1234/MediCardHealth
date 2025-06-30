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
  Lock, // 👈 Добавь это
} from "lucide-react";  


function AdminSetting() {
  const [formData, setFormData] = useState({
    userId: "AB12345",
    firstName: "Администратор",
    lastName: "Системы",
    email: "admin@medclinic.uz",
    phone: "+998901234567",
    bio: "Системный администратор медицинской клиники",
    timezone: "Asia/Tashkent",
    language: "ru",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    system: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Валидация для User ID (2 заглавные буквы + 5 цифр)
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
    alert("Настройки сохранены успешно!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-50 p-3 rounded-full">
              <Settings className="h-8 w-8 text-[#3d99f5]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Настройки администратора
              </h1>
              <p className="text-gray-600">
                Управление профилем и системными настройками
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
                Фото профиля
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
                  Нажмите для загрузки
                  <br />
                  новой фотографии
                </p>
              </div>

              {/* User ID Section */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-[#3d99f5]" />
                  ID пользователя
                </label>
                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  onChange={handleInputChange}
                  placeholder="AB12345"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent text-center font-mono text-lg font-semibold tracking-wider"
                  maxLength={7}
                />
                <p className="text-xs text-gray-500 mt-1">
                  2 заглавные буквы + 5 цифр
                </p>
              </div>
            </div>
          </div>

          {/* Main Settings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <User className="h-5 w-5 mr-2 text-[#3d99f5]" />
                Основная информация
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Имя
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
                    Фамилия
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
                  <label className=" text-sm font-medium text-gray-700 flex items-center">
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
                  <label className=" text-sm font-medium text-gray-700 flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-[#3d99f5]" />
                    Телефон
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent transition-all"
                  />
                </div>

              </div>

              {/* Password Section */}
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-[#3d99f5]" />
                  Безопасность
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Новый пароль
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Введите новый пароль"
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#3d99f5]"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Подтвердите пароль
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Повторите пароль"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d99f5] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-8 py-3 bg-[#3d99f5] text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <Save className="h-5 w-5" />
                  <span>Сохранить изменения</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSetting;
