import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../App'; // Adjust the path according to your file structure

function Login() {
    const navigate = useNavigate();
    const { setToken, setRole } = useContext(Context);

    const [formData, setFormData] = useState({
        id: '',
        fullName: '',
        role: 'user'
    });

    const [errors, setErrors] = useState({});

    const roles = [
        { value: 'user', label: 'BEMOR' },
        { value: 'doctor', label: 'SHIFOKOR' },
        { value: 'moderator', label: 'MODERATOR' }
    ];

    const validateId = (id) => {
        const idPattern = /^[A-Z]{2}\s\d{7}$/;
        return idPattern.test(id);
    };

    const formatId = (value) => {
        let cleaned = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();

        if (cleaned.length > 2) {
            cleaned = cleaned.slice(0, 2) + ' ' + cleaned.slice(2, 9);
        }

        return cleaned;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'id') {
            const formattedValue = formatId(value);
            setFormData(prev => ({
                ...prev,
                [name]: formattedValue
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = () => {
        const newErrors = {};

        if (!formData.id) {
            newErrors.id = 'Majburiy maydon';
        } else if (!validateId(formData.id)) {
            newErrors.id = 'ID format noto\'g\'ri';
        }

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Majburiy maydon';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            let loginSuccess = false;
            let userRole = '';

            // Admin credentials
            if (formData.id === 'AD 1111111' && formData.fullName === 'Jasur Tursunov Akramovich') {
                loginSuccess = true
                userRole = 'admin';
            }
            // Regular user credentials
            else if (formData.id === 'AB 1234567' && formData.fullName === 'Dilnoza Karimova Rustamovna' && formData.role === 'user') {
                loginSuccess = true;
                userRole = 'user';
            }
            else if (formData.id === 'DR 2222222' && formData.fullName === 'Sherzod Islomov Bahromovich' && formData.role === 'doctor') {
                loginSuccess = true;
                userRole = 'doctor';
            }
            else if (formData.id === 'MD 3333333' && formData.fullName === 'Maftuna Yoldosheva Davronovna' && formData.role === 'moderator') {
                loginSuccess = true;
                userRole = 'moderator';
            }
            else {
                alert('Noto\'g\'ri ma\'lumotlar kiritildi');
                return;
            }

            // If login is successful, set token and role, then navigate
            if (loginSuccess) {
                setToken(true);
                setRole(userRole);

                // Navigate to the appropriate page based on role
                setTimeout(() => {
                    navigate(`/${userRole}`);
                }, 1000); // Small delay to show the alert
            }

        } catch (error) {
            console.log(error);
            alert('Ma\'lumotlarni to\'liq to\'ldiring');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md">
                {/* Card Container */}
                <div className="bg-white border border-gray-300 shadow-lg">
                    {/* Header */}
                    <div className="p-8 text-center border-b border-gray-300">
                        <div className="text-5xl font-bold mb-3">
                            <span className="text-[#3d99f5]">MediCard</span>
                        </div>
                        <div className="w-55 h-1 bg-[#3d99f5] mx-auto mb-4"></div>
                    </div>

                    {/* Title Section */}
                    <div className="p-6 text-center border-b border-gray-300">
                        <h2 className="text-xl font-semibold text-gray-800 mb-1">
                            Tizimga kirish
                        </h2>
                    </div>

                    {/* Form Section */}
                    <div className="p-6">
                        <div className="space-y-5">
                            {/* Full Name Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    To'liq ism
                                </label>
                                <input
                                    name="fullName"
                                    type="text"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors ${errors.fullName ? 'border-red-400' : ''
                                        }`}
                                    placeholder="Familiya Ism Otasining ismi"
                                />
                                {errors.fullName && (
                                    <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                                )}
                            </div>

                            {/* ID Label */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    FOYDALANUVCHI ID
                                </label>
                                <input
                                    name="id"
                                    type="text"
                                    value={formData.id}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors font-mono ${errors.id ? 'border-red-400' : ''
                                        }`}
                                    placeholder="XX 1234567"
                                    maxLength={10}
                                />
                                {errors.id && (
                                    <p className="mt-1 text-sm text-red-500">{errors.id}</p>
                                )}
                                <p className="mt-1 text-xs text-gray-500">
                                    2 TA HARF VA 7 TA RAQAM (MASALAN: AB 1234567)
                                </p>
                            </div>

                            {/* Role Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    LOGINTYPE
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {roles.map((role) => (
                                        <label
                                            key={role.value}
                                            className={`flex items-center justify-center p-3 border cursor-pointer transition-colors ${formData.role === role.value
                                                ? 'border-[#3d99f5] bg-blue-50 text-[#3d99f5]'
                                                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="role"
                                                value={role.value}
                                                checked={formData.role === role.value}
                                                onChange={handleInputChange}
                                                className="sr-only"
                                            />
                                            <span className="text-sm font-medium">{role.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="w-full py-3 bg-[#3d99f5] text-white font-semibold hover:bg-[#1b89f7] focus:outline-none focus:ring-2 focus:ring-[#3d99f5] focus:ring-offset-2 transition-colors"
                                >
                                    Tizimga kirish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;