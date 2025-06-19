import {
    Home, Calendar, Settings, LogOut, Info, Clipboard as ClipboardIcon

} from 'lucide-react'






export const admin = [
    { icon: Home, label: 'Asosiy', path: '/admin/' },
    { icon: ClipboardIcon, label: 'Medkarta', path: '/admin/medcard' },
    { icon: Calendar, label: 'Qabullar', path: '/admin/admissions' },
    { icon: Settings, label: 'Akkaunt', path: '/admin/account' },
    { icon: Settings, label: 'Sozlamalar', path: '/admin/settings' },
    { icon: LogOut, label: 'Chiqish', path: '/login' },
    { icon: Info, label: 'Loyiha haqida', path: '/admin/about ' },
    { icon: Info, label: 'Texnik yordam', path: '/admin/support' }
]

export const user = [
    { icon: Home, label: 'Asosiy', path: '/user/' },
    { icon: ClipboardIcon, label: 'Medkarta', path: '/user/medcard' },
    { icon: Calendar, label: 'Qabullar', path: '/user/admissions' },
    { icon: Settings, label: 'Akkaunt', path: '/user/account' },
    { icon: Settings, label: 'Sozlamalar', path: '/user/settings' },
    { icon: LogOut, label: 'Chiqish', path: '/login' },
    { icon: Info, label: 'Loyiha haqida', path: '/user/about ' },
    { icon: Info, label: 'Texnik yordam', path: '/user/support' }
]

export const doctor = [
    { icon: Home, label: 'Asosiy', path: '/doctor/' },
    { icon: ClipboardIcon, label: 'Medkarta', path: '/doctor/medcard' },
    { icon: Calendar, label: 'Qabullar', path: '/doctor/admissions' },
    { icon: Settings, label: 'Akkaunt', path: '/doctor/account' },
    { icon: Settings, label: 'Sozlamalar', path: '/doctor/settings' },
    { icon: LogOut, label: 'Chiqish', path: '/login' },
    { icon: Info, label: 'Loyiha haqida', path: '/doctor/about ' },
    { icon: Info, label: 'Texnik yordam', path: '/doctor/support' }
]

export const moderator = [
    { icon: Home, label: 'Asosiy', path: '/moderator/' },
    { icon: ClipboardIcon, label: 'Shifokorlarni boshqarish', path: '/moderator/doctormanagement' },
    { icon: Calendar, label: 'Bemorlarni boshqarish', path: '/moderator/patientmanagement' },
    { icon: Settings, label: 'Klinikalarni boshqarish', path: '/moderator/clinicmanagement' },
    { icon: Settings, label: 'Analitika', path: '/moderator/analytic' },
    { icon: Settings, label: 'Sozlamalar', path: '/moderator/setting' },
    { icon: LogOut, label: 'Chiqish', path: '/login' },
    { icon: Info, label: 'Loyiha haqida', path: '/moderator/about ' },
    { icon: Info, label: 'Texnik yordam', path: '/moderator/support' }
]
