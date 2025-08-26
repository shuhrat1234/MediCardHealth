import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/services/authService";

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    fullName: "",
    role: 4,
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { value: 4, label: "BEMOR" },
    { value: 3, label: "SHIFOKOR" },
    { value: 2, label: "MODERATOR" },
  ];

  const isSpecialUser = formData.fullName.trim() === "Xurmatullayev Lektor Akbarovich";

  const validateId = (id) => {
    const idPattern = isSpecialUser ? /^[A-Z]{2}\s\d{8}$/ : /^[A-Z]{2}\s\d{7}$/;
    return idPattern.test(id);
  };

  const formatId = (value) => {
    let cleaned = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    const maxDigits = isSpecialUser ? 8 : 7;
    if (cleaned.length > 2) {
      cleaned = cleaned.slice(0, 2) + " " + cleaned.slice(2, 2 + maxDigits);
    }
    return cleaned;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "To'liq ism kiritilishi shart";
    }
    if (!formData.id || !validateId(formData.id)) {
      newErrors.id = `ID noto'g'ri formatda (masalan, AB ${isSpecialUser ? "12345678" : "1234567"})`;
    }
    if (![2, 3, 4].includes(formData.role)) {
      newErrors.role = "Iltimos, rolni tanlang";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "id") {
      newValue = formatId(value);
    } else if (name === "role") {
      newValue = parseInt(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await login({
        user_id: formData.id.replace(/\s/g, ""),
        fio: formData.fullName,
        role: formData.role,
      });

      const { access, refresh, role } = result.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("role", role);

      const rolePaths = {
        1: "/admin",
        2: "/moderator",
        3: "/doctor",
        4: "/user",
      };

      navigate(rolePaths[role] || "/login");
      setApiError("");
    } catch (error) {
      setApiError(
        error.response?.data?.detail || "Tizimga kirishda xatolik yuz berdi"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-300 shadow-lg">
          <div className="p-8 text-center border-b border-gray-300">
            <div className="text-5xl font-bold mb-3">
              <span className="text-[#3d99f5]">MediCard</span>
            </div>
            <div className="w-55 h-1 bg-[#3d99f5] mx-auto mb-4"></div>
          </div>
          <div className="p-6 text-center border-b border-gray-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              Tizimga kirish
            </h2>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To'liq ism
                </label>
                <input
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors ${
                    errors.fullName ? "border-red-400" : ""
                  }`}
                  placeholder="Familiya Ism Otasining ismi"
                  disabled={isLoading}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  FOYDALANUVCHI ID
                </label>
                <input
                  name="id"
                  type="text"
                  value={formData.id}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors font-mono ${
                    errors.id ? "border-red-400" : ""
                  }`}
                  placeholder={`XX ${isSpecialUser ? "12345678" : "1234567"}`}
                  maxLength={isSpecialUser ? 11 : 10} // 2 letters + space + 8 or 7 digits
                  disabled={isLoading}
                />
                {errors.id && (
                  <p className="mt-1 text-sm text-red-500">{errors.id}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  2 TA HARF VA {isSpecialUser ? "8" : "7"} TA RAQAM (MASALAN: AB{" "}
                  {isSpecialUser ? "12345678" : "1234567"})
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  LOGINTYPE
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {roles.map((role) => (
                    <label
                      key={role.value}
                      htmlFor={`role-${role.value}`}
                      className={`flex items-center justify-center p-3 border cursor-pointer transition-colors ${
                        formData.role === role.value
                          ? "border-[#3d99f5] bg-blue-50 text-[#3d99f5]"
                          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <input
                        id={`role-${role.value}`}
                        type="radio"
                        name="role"
                        value={role.value}
                        checked={formData.role === role.value}
                        onChange={handleInputChange}
                        className="sr-only"
                        disabled={isLoading}
                      />
                      <span className="text-sm font-medium">{role.label}</span>
                    </label>
                  ))}
                </div>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-500">{errors.role}</p>
                )}
              </div>
              {apiError && (
                <p className="text-sm text-red-500 text-center">{apiError}</p>
              )}
              <div className="pt-4">
                <button
                  type="submit"
                  className={`w-full py-3 bg-[#3d99f5] text-white font-semibold hover:bg-[#1b89f7] focus:outline-none focus:ring-2 focus:ring-[#3d99f5] focus:ring-offset-2 transition-colors ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? "Yuklanmoqda..." : "Tizimga kirish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;