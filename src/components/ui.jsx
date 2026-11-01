import { cn } from '../lib/cn'

const tones = {
  success: 'bg-[#DCF1E3] text-[#17653A]',
  info: 'bg-[#E0EAFB] text-[#1E4FB8]',
  warn: 'bg-[#FFF1C9] text-[#7A5300]',
  danger: 'bg-[#FBE4DC] text-[#9A3412]',
  neutral: 'bg-[#ECE9E4] text-[#57504A]',
}

// Lesson / payment status -> tone
export const statusTone = {
  Completed: 'success', Scheduled: 'info', Missed: 'danger', Cancelled: 'neutral',
  Paid: 'success', Unpaid: 'warn',
}

export function Pill({ tone = 'neutral', className, children }) {
  return (
    <span className={cn('inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-bold', tones[tone], className)}>
      {children}
    </span>
  )
}

export function Card({ className, ...props }) {
  return <section className={cn('rounded-2xl border border-line bg-white p-4', className)} {...props} />
}

export function Button({ variant = 'primary', className, ...props }) {
  const styles = {
    primary: 'bg-brand text-white hover:bg-brand-dark',
    secondary: 'border border-[#CFC7BB] bg-white text-brand-dark hover:bg-brand-soft',
  }
  return (
    <button
      className={cn('min-h-11 rounded-xl px-4 text-sm font-bold transition-colors', styles[variant], className)}
      {...props}
    />
  )
}

export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-extrabold">{title}</h1>
        {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
      </div>
      {actions}
    </div>
  )
}

export function Row({ title, sub, right }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-[#EFEAE2] py-3 text-sm first:border-t-0">
      <div>
        <div className="font-bold">{title}</div>
        {sub && <div className="text-[13px] text-muted">{sub}</div>}
      </div>
      {right}
    </div>
  )
}
