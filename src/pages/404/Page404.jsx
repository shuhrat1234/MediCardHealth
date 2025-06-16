import React from 'react';
import { Heart, Stethoscope, Activity, ArrowLeft } from 'lucide-react';

function Page404() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated medical cross */}
        <div className="relative mb-8">
          <div className="inline-block relative">
            <div
              className="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center shadow-2xl animate-pulse"
              style={{ backgroundColor: '#007bff' }}
            >
              <div className="text-white text-6xl font-bold">404</div>
            </div>

            {/* Floating medical icons */}
            <div className="absolute -top-4 -left-4 animate-bounce delay-100">
              <Heart className="w-8 h-8 text-red-400 fill-current" />
            </div>
            <div className="absolute -top-4 -right-4 animate-bounce delay-300">
              <Stethoscope className="w-8 h-8" style={{ color: '#007bff' }} />
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce delay-500">
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-6 mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Диагноз: <span style={{ color: '#007bff' }}>Страница не найдена</span>
          </h1>
        </div>
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            className="flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            style={{ backgroundColor: '#007bff' }}
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5" />
            Вернуться назад
          </button>

          <button
            className="px-6 py-3 border-2 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200"
            style={{ borderColor: '#007bff', color: '#007bff' }}
            onClick={() => window.location.href = '/user'}
          >
            На главную
          </button>
        </div>

        {/* Heartbeat line animation */}
        <div className="mt-12 flex justify-center">
          <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full animate-pulse"
              style={{ backgroundColor: '#007bff', width: '30%' }}
            ></div>
          </div>
        </div>

        <p className="mt-4 text-gray-500 text-sm">
          Пульс системы: стабильный
        </p>
      </div>
    </div>
  );
}

export default Page404