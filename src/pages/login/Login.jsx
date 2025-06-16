import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        id: '',
        fullName: '',
        role: 'user'
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate()
    const roles = [
        { value: 'user', label: 'Пациент' },
        { value: 'doctor', label: 'Доктор' },
        { value: 'moderator', label: 'Модератор' },
        { value: 'admin', label: 'Админ' }
    ];

    const validateId = (id) => {
        const idPattern = /^[A-Z]{2}\d{5}$/;
        return idPattern.test(id);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = e => {
        e.preventDefault()
        const newErrors = {};

        if (!formData.id) {
            newErrors.id = 'Обязательное поле';
        } else if (!validateId(formData.id)) {
            newErrors.id = 'Неверный формат ID';
        }

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Обязательное поле';
        }

        setErrors(newErrors);

        try {

            if (formData.id == 'AE11111' && formData.fullName == 'User' && formData.role == 'user') {
                alert(`${formData.fullName} siz bemor profiliga muafaqiyatli kirdingiz`)
                localStorage.setItem('role', 'user')
                localStorage.setItem('token', true)
                navigate('/user')
            }
            if (formData.id == 'AE22222' && formData.fullName == 'Admin' && formData.role == 'admin') {
                alert(`${formData.fullName} siz bemor profiliga muafaqiyatli kirdingiz`)
                localStorage.setItem('role', 'admin')
                localStorage.setItem('token', true)
                navigate('/admin')
            }
            if (formData.id == 'AE33333' && formData.fullName == 'Doctor' && formData.role == 'doctor') {
                alert(`${formData.fullName} siz bemor profiliga muafaqiyatli kirdingiz`)
                localStorage.setItem('role', 'doctor')
                localStorage.setItem('token', true)
                navigate('/doctor')
            }
            if (formData.id == 'AE44444' && formData.fullName == 'Moderator' && formData.role == 'moderator') {
                alert(`${formData.fullName} siz bemor profiliga muafaqiyatli kirdingiz`)
                localStorage.setItem('role', 'moderator')
                localStorage.setItem('token', true)
                navigate('/moderator')
            }
        }
        catch (error) {
            console.log(error)
            const role = localStorage.getItem('role')
            if (role == null) {
                alert('Malumotlarni toliq toldiring')
            }
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-sm">
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-[#007bff] rounded-full mx-auto mb-6 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-white rounded-sm"></div>
                    </div>
                    <h1 className="text-2xl font-light text-gray-900 tracking-wide">
                        МЕДИЦИНСКИЙ ЦЕНТР
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            name="id"
                            type="text"
                            value={formData.id}
                            onChange={handleInputChange}
                            className={`w-full px-0 py-3 border-0 border-b-2 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#007bff] transition-colors ${errors.id ? 'border-red-400' : 'border-gray-200'
                                }`}
                            placeholder="ID сотрудника"
                            maxLength={7}
                        />
                        {errors.id && (
                            <p className="mt-2 text-sm text-red-500">{errors.id}</p>
                        )}
                    </div>

                    <div>
                        <input
                            name="fullName"
                            type="text"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className={`w-full px-0 py-3 border-0 border-b-2 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#007bff] transition-colors ${errors.fullName ? 'border-red-400' : 'border-gray-200'
                                }`}
                            placeholder="Фамилия Имя Отчество"
                        />
                        {errors.fullName && (
                            <p className="mt-2 text-sm text-red-500">{errors.fullName}</p>
                        )}
                    </div>

                    <div>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            className="w-full px-3 py-3 border-0 border-b-2 border-gray-200 bg-transparent text-gray-900 focus:outline-none focus:border-[#007bff] transition-colors appearance-none cursor-pointer"
                        >
                            {roles.map((role) => (
                                <option key={role.value} value={role.value} className="bg-white py-1">
                                    {role.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="pt-8">
                        <button
                            className="w-full py-4 rounded-2xl bg-[#007bff] text-white font-medium tracking-wide hover:bg-[#0056b3] focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:ring-opacity-50 transition-all duration-200"
                        >
                            ВОЙТИ
                        </button>
                    </div>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-xs text-gray-400 text-center">
                        Формат ID: две заглавные буквы + пять цифр
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;