import React, { useContext, useState } from 'react'
import { Menu, X, Search, Bell, User, Globe, ChevronDown } from 'lucide-react'
import { Context } from '../../App'

function Navbar() {
  const { sidebarOpen, setSidebarOpen } = useContext(Context) || { sidebarOpen: false, setSidebarOpen: () => {} }
  
  const [searchQuery, setSearchQuery] = useState('')
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('RU')
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const languages = [
    { code: 'RU', name: 'Русский', flag: '🇷🇺' },
    { code: 'UZ', name: 'O\'zbekcha', flag: '🇺🇿' },
    { code: 'EN', name: 'English', flag: '🇺🇸' }
  ]

  const notifications = [
    { id: 1, text: 'Новый пациент записался на прием', time: '5 мин назад', unread: true },
    { id: 2, text: 'Результаты анализов готовы', time: '15 мин назад', unread: true },
    { id: 3, text: 'Напоминание о встрече в 14:00', time: '1 ч назад', unread: false }
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 px-4 py-3 sticky top-0 z-30 w-full">
      <div className="flex items-center justify-between lg:max-w-[calc(100vw-18rem)]">
        {/* Левая часть - кнопка бургер */}
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors mr-4"
          >
            {sidebarOpen ? <X size={20} color="#007bff" /> : <Menu size={20} color="#007bff" />}
          </button>
          
          {/* Заголовок страницы (скрыт на мобильных) */}
          <h2 className="hidden sm:block text-lg font-semibold text-gray-800">
            Панель управления
          </h2>
        </div>

        {/* Центральная часть - поиск */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Поиск пациентов, записей..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Правая часть - уведомления, язык, профиль */}
        <div className="flex items-center space-x-2">
          {/* Уведомления с бейджем */}
          <div className="relative">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
              <Bell size={20} color="#6b7280" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Смена языка */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Globe size={18} color="#6b7280" />
              <span className="hidden sm:block text-sm font-medium text-gray-700">{currentLanguage}</span>
              <ChevronDown size={16} color="#6b7280" />
            </button>
            
            {showLanguageMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLanguage(lang.code)
                      setShowLanguageMenu(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                      currentLanguage === lang.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="font-medium">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Профиль */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <User size={16} color="white" />
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">Доктор Иванов</span>
              <ChevronDown size={16} color="#6b7280" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="font-semibold text-gray-800">Доктор Иванов</p>
                  <p className="text-sm text-gray-500">ivanov@medcenter.uz</p>
                </div>
                <div className="py-1">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-gray-700">
                    Мой профиль
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-gray-700">
                    Настройки
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-gray-700">
                    Помощь
                  </button>
                  <hr className="my-2 border-gray-200" />
                  <button className="w-full text-left px-4 py-2 hover:bg-red-50 transition-colors text-red-600">
                    Выйти
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Закрытие выпадающих меню при клике вне их */}
      {(showLanguageMenu || showProfileMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowLanguageMenu(false)
            setShowProfileMenu(false)
          }}
        />
      )}
    </nav>
  )
}

export default Navbar