import React, { useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { admin } from '../../constants/sidebar'
import { user } from '../../constants/sidebar'
import { doctor } from '../../constants/sidebar'
import { moderator } from '../../constants/sidebar'
import { Heart } from 'lucide-react'

// Контекст для управления состоянием сайдбара
const SidebarContext = React.createContext()

function Sidebar() {
    // Получаем состояние sidebarOpen из контекста
    const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext) || { sidebarOpen: false, setSidebarOpen: () => { } }
    const location = useLocation()
    const firstSliced = location.pathname.split('/')[1] // получаем первую часть пути (role)

    const map = {
        admin,
        moderator,
        user,
        doctor
    }

    const matchedArray = map[firstSliced] // например, если firstSliced === 'user', получим user
    console.log(matchedArray)
    return (
        <>
            {/* Мобильная кнопка бургер - убираем, так как она теперь в навбаре */}

            {/* Оверлей для мобильных устройств */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className={`
  fixed top-0 left-0 h-screen bg-white shadow-xl border-r border-gray-200 z-40 transition-transform duration-300 ease-in-out
  ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
  lg:translate-x-0 lg:static lg:shadow-none
  w-80 lg:w-72
`}>

                <div className="flex flex-col h-full">
                    {/* Хедер с логотипом */}
                    <div className="flex items-center justify-center p-6 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Heart size={24} color="white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-800">MedCenter</h1>
                                <p className="text-sm text-gray-500">Медицинский центр</p>
                            </div>
                        </div>
                    </div>
                    {/* Навигационное меню */}
                    <nav className="flex-1 py-4">
                        <ul className="space-y-1 px-4">
                            {matchedArray.map((item, index) => (
                                <li key={index}>
                                    <NavLink to={item?.path}
                                        onClick={() => {
                                            // Здесь будет логика навигации
                                            console.log(`Переход на ${item.path}`)
                                            // На мобильных устройствах закрываем сайдбар после клика
                                            if (window.innerWidth < 1024) {
                                                setSidebarOpen(false)
                                            }
                                        }}
                                        className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg hover:bg-blue-50 transition-colors group"
                                    >
                                        <item.icon
                                            size={20}
                                            className="text-gray-500 group-hover:text-blue-600 transition-colors"
                                        />
                                        <span className="font-medium text-gray-700 group-hover:text-blue-700 transition-colors">
                                            {item.label}
                                        </span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Футер с дополнительной информацией */}
                    <div className="p-4 border-t border-gray-100">
                        <div className="text-center">
                            <p className="text-xs text-gray-400">
                                © 2025 MedCenter
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                Версия 2.1.0
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar