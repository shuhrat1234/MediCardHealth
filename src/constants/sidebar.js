import {
    Menu, X, Home, Users, Calendar,
    FileText, Settings, User, Heart, Activity,
    Clipboard as ClipboardIcon // 👈 fix here
} from 'lucide-react'






export const admin = [
    { icon: Home, label: 'Главная', path: '/admin/' },
    { icon: Users, label: 'Пациенты', path: '/admin/patients' },
    { icon: Calendar, label: 'Расписание', path: '/admin/schedule' },
    { icon: Activity, label: 'Диагностика', path: '/admin/diagnostics' },
    { icon: ClipboardIcon, label: 'Медкарты', path: '/admin/records' }, // ✅ здесь
    { icon: FileText, label: 'Отчеты', path: '/admin/reports' },
    { icon: Settings, label: 'Настройки', path: '/admin/settings' }
]

export const user = [
    { icon: Home, label: 'Главная', path: '/user/' },
    { icon: Users, label: 'Пациенты', path: '/user/patients' },
    { icon: Calendar, label: 'Расписание', path: '/user/schedule' },
    { icon: Activity, label: 'Диагностика', path: '/user/diagnostics' },
    { icon: ClipboardIcon, label: 'Медкарты', path: '/user/records' }, // ✅ здесь
    { icon: FileText, label: 'Отчеты', path: '/user/reports' },
    { icon: Settings, label: 'Настройки', path: '/user/settings' }
]

export const doctor = [
    { icon: Home, label: 'Главная', path: '/doctor/' },
    { icon: Users, label: 'Пациенты', path: '/doctor/patients' },
    { icon: Calendar, label: 'Расписание', path: '/doctor/schedule' },
    { icon: Activity, label: 'Диагностика', path: '/doctor/diagnostics' },
    { icon: ClipboardIcon, label: 'Медкарты', path: '/doctor/records' }, // ✅ здесь
    { icon: FileText, label: 'Отчеты', path: '/doctor/reports' },
    { icon: Settings, label: 'Настройки', path: '/doctor/settings' }
]

export const moderator = [
    { icon: Home, label: 'Главная', path: '/moderator/' },
    { icon: Users, label: 'Пациенты', path: '/moderator/patients' },
    { icon: Calendar, label: 'Расписание', path: '/moderator/schedule' },
    { icon: Activity, label: 'Диагностика', path: '/moderator/diagnostics' },
    { icon: ClipboardIcon, label: 'Медкарты', path: '/moderator/records' }, // ✅ здесь
    { icon: FileText, label: 'Отчеты', path: '/moderator/reports' },
    { icon: Settings, label: 'Настройки', path: '/moderator/settings' }
]
