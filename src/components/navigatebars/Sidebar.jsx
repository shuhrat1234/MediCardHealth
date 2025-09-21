import React, { useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { admin } from '../../constants/sidebar'
import { user } from '../../constants/sidebar'
import { doctor } from '../../constants/sidebar'
import { moderator } from '../../constants/sidebar'
import { X } from 'lucide-react'
import { Context } from '../../App'

// Utility function for conditional classes
const cn = (...classes) => classes.filter(Boolean).join(' ')

function Sidebar() {
    const { sidebarOpen, setSidebarOpen } = useContext(Context) || { sidebarOpen: false, setSidebarOpen: () => { } }
    const location = useLocation()
    const firstSliced = location.pathname.split('/')[1]

    const map = {
        admin,
        moderator,
        user,
        doctor
    }

    const matchedArray = map[firstSliced]

    // Split navigation items into groups
    const mainNavItems = matchedArray?.slice(0, 5) || []
    const settingsItems = matchedArray?.slice(5, 6) || []
    const helpItems = matchedArray?.slice(6, 9) || []

    const renderNavItem = (item, index, isActive) => {
        const Icon = item.icon;

        return (
            <NavLink
                key={index}
                to={item.path}
                onClick={() => {
                    console.log(`Переход на ${item.path}`)
                    if (window.innerWidth < 1024) {
                        setSidebarOpen(false)
                    }
                }}
                className={cn(
                    "group relative flex items-center w-full px-4 py-3 text-base transition-colors duration-150",
                    isActive
                        ? "text-blue-500 bg-blue-50 border-r-2 border-blue-500"
                        : "text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                )}
            >
                <div className="flex items-center justify-center mr-4 h-5 w-5">
                    <Icon
                        className={cn(
                            "h-5 w-5",
                            isActive
                                ? "text-blue-500"
                                : "text-gray-600"
                        )}
                    />
                </div>
                <span className="font-normal">{item.label}</span>
            </NavLink>
        );
    }

    const renderSectionHeader = (title) => (
        <div className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
            {title}
        </div>
    )

    return (
        <>
            {/* Backdrop overlay with blur for mobile */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed left-0 top-0 z-50 h-full w-80 lg:w-72 border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out",
                sidebarOpen ? 'translate-x-0' : '-translate-x-full',
                "lg:translate-x-0 lg:static lg:shadow-none lg:z-auto"
            )}>
                <div className="flex flex-col h-full">
                    {/* Header with close button for mobile */}
                    <div className="text-center pt-8 pb-6 border-b border-gray-100 relative">
                        {/* Close button - only visible on mobile */}
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <X size={20} className="text-gray-600" />
                        </button>

                        <div className="text-2xl font-medium mb-2">
                            <span className="text-[#3d99f5]">MediCard</span>
                        </div>
                        <div className="w-16 h-1 bg-[#3d99f5] mx-auto"></div>
                    </div>

                    {/* Navigation - scrollable content */}
                    <div className="flex-1 overflow-y-auto">
                        {/* BOSHQARUV PANELI Section */}
                        {mainNavItems.length > 0 && (
                            <>
                                {renderSectionHeader("BOSHQARUV PANELI")}
                                <nav>
                                    {mainNavItems.map((item, index) => {
                                        const isActive = location.pathname === item.path;
                                        return renderNavItem(item, index, isActive);
                                    })}
                                </nav>
                            </>
                        )}

                        {/* SOZLAMALAR Section */}
                        {settingsItems.length > 0 && (
                            <>
                                <div className="mt-8">
                                    {renderSectionHeader("SOZLAMALAR")}
                                </div>
                                <nav>
                                    {settingsItems.map((item, index) => {
                                        const isActive = location.pathname === item.path;
                                        return renderNavItem(item, `settings-${index}`, isActive);
                                    })}
                                </nav>
                            </>
                        )}

                        {/* YORDAM Section */}
                        {helpItems.length > 0 && (
                            <>
                                <div className="mt-6">
                                    {renderSectionHeader("YORDAM")}
                                </div>
                                <nav>
                                    {helpItems.map((item, index) => {
                                        const isActive = location.pathname === item.path;
                                        return renderNavItem(item, `help-${index}`, isActive);
                                    })}
                                </nav>
                            </>
                        )}
                    </div>

                    {/* Footer spacer to ensure content doesn't get cut off */}
                    <div className="h-4 bg-white"></div>
                </div>
            </aside>
        </>
    )
}

export default Sidebar