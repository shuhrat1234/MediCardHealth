import {
    Home, Hospital, ChartNoAxesCombined, Calendar, FilePlus, IdCard, Settings, LogOut, Info, Clipboard as ClipboardIcon

} from 'lucide-react'






export const admin = [
    { icon: Home, label: 'Asosiy', path: '/admin/' },
    { icon: ClipboardIcon, label: 'Foydalanuvchilar', path: '/admin/user' },
    { icon: ClipboardIcon, label: 'Klinikalar', path: '/admin/clinic' },
    { icon: Settings, label: 'Sozlamalar', path: '/admin/setting' },
    { icon: LogOut, label: 'Chiqish', path: '/login' },
    { icon: Info, label: 'Loyiha haqida', path: '/admin/about ' },
    { icon: Info, label: 'Texnik yordam', path: '/admin/support' }
]

export const user = [
    // { icon: Home, label: 'Asosiy', path: '/user/' },
    // { icon: IdCard, label: 'Tibbiy kartam', path: '/user/medcard' },
    // { icon: Calendar, label: 'Qabulga yozilish', path: '/user/registration' },
    // { icon: ClipboardIcon, label: 'Qabul yozuvlarim', path: '/user/appointment' },
    // { icon: Settings, label: 'Sozlamalar', path: '/user/setting' },
    { icon: LogOut, label: 'Chiqish', path: '/login' },
    // { icon: Info, label: 'Loyiha haqida', path: '/user/about ' },
    // { icon: Info, label: 'Texnik yordam', path: '/user/support' }
]

export const doctor = [
    // { icon: Home, label: 'Asosiy', path: '/doctor/' },
    // { icon: ClipboardIcon, label: 'Navbatlarim', path: '/doctor/spot' },
    // { icon: IdCard, label: 'Bemor kartalari', path: '/doctor/patientcard' },
    // { icon: FilePlus, label: 'Kartani yangilash', path: '/doctor/updatecard' },
    // { icon: Settings, label: 'Sozlamalar', path: '/doctor/setting' },
    { icon: LogOut, label: 'Chiqish', path: '/login' },
    // { icon: Info, label: 'Loyiha haqida', path: '/doctor/about' },
    // { icon: Info, label: 'Texnik yordam', path: '/doctor/support' }
]

export const moderator = [
    { icon: Home, label: 'Asosiy', path: '/moderator/' },
    { icon: ClipboardIcon, label: 'Shifokorlarni boshqarish', path: '/moderator/doctormanagement' },
    { icon: Calendar, label: 'Bemorlarni boshqarish', path: '/moderator/patientmanagement' },
    // { icon: Hospital, label: 'Klinikalarni boshqarish', path: '/moderator/clinicmanagement' },
    // { icon: ChartNoAxesCombined, label: 'Analitika', path: '/moderator/analytic' },
    // { icon: Settings, label: 'Sozlamalar', path: '/moderator/setting' },
    { icon: LogOut, label: 'Chiqish', path: '/login' },
    // { icon: Info, label: 'Loyiha haqida', path: '/moderator/about ' },
    // { icon: Info, label: 'Texnik yordam', path: '/moderator/support' }
]
