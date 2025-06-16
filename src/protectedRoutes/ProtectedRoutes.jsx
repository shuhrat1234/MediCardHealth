import React, { useContext } from 'react'
import { Context } from '../App'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

function ProtectedRoutes() {
    const { token, role } = useContext(Context)
    const location = useLocation()
    if (!token) {
        return <Navigate to="/login" replace />
    }
    const pathname = location.pathname
    const roleRoutes = {
        admin: '/admin',
        moderator: '/moderator',
        doctor: '/doctor',
        user: '/user'
    }
    const allowedPath = roleRoutes[role]
    if (!pathname.startsWith(allowedPath)) {
        return <Navigate to={allowedPath} replace />
    }
    return <Outlet />
}

export default ProtectedRoutes
