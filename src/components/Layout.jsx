import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, CalendarDays, ClipboardList, Wallet, LogOut } from 'lucide-react'
import { cn } from '../lib/cn'

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/students', label: 'Students', icon: Users },
  { to: '/lessons', label: 'Lessons', icon: CalendarDays },
  { to: '/homework', label: 'Homework', icon: ClipboardList },
  { to: '/payments', label: 'Payments', icon: Wallet },
]

export default function Layout() {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-screen">
      {/* Icon rail on tablet, full sidebar from lg */}
      <aside className="sticky top-0 flex h-screen w-16 shrink-0 flex-col gap-1 border-r border-line bg-white p-2 lg:w-60 lg:p-3.5">
        <div className="px-2.5 pb-4 pt-2 text-xl font-extrabold text-brand">
          <span className="lg:hidden">L</span>
          <span className="hidden lg:inline">LessonLog</span>
        </div>
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            aria-label={label}
            className={({ isActive }) =>
              cn(
                'flex min-h-11 items-center justify-center gap-2.5 rounded-xl p-2.5 text-sm text-[#5A524A] lg:justify-start',
                isActive && 'bg-brand-soft font-bold text-brand-dark'
              )
            }
          >
            <Icon size={18} aria-hidden />
            <span className="hidden lg:inline">{label}</span>
          </NavLink>
        ))}
        <div className="mt-auto p-2.5 text-[13px] text-muted">
          <div className="hidden lg:block">
            Signed in as
            <div className="font-bold text-ink">Ada Nwosu</div>
          </div>
          <button
            onClick={() => navigate('/signin')}
            aria-label="Sign out"
            className="mt-2 flex min-h-11 items-center gap-2 font-bold text-brand-dark"
          >
            <LogOut size={18} aria-hidden />
            <span className="hidden lg:inline">Sign out</span>
          </button>
        </div>
      </aside>
      <main className="flex min-w-0 flex-1 flex-col gap-5 p-5 lg:p-9">
        <Outlet />
      </main>
    </div>
  )
}
