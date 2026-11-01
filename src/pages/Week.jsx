import { useState } from 'react'
import { addDays, addWeeks, format, isSameDay, startOfWeek } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button, PageHeader, Pill, statusTone } from '../components/ui'
import { weekLessons } from '../data/sample'
import { cn } from '../lib/cn'

export default function Week() {
  const [offset, setOffset] = useState(0)
  const start = startOfWeek(addWeeks(new Date('2026-10-29'), offset), { weekStartsOn: 1 })
  const today = new Date('2026-10-29')
  const total = weekLessons.reduce((n, d) => n + d.length, 0)

  return (
    <>
      <PageHeader
        title={`Week of ${format(start, 'd MMM')}`}
        subtitle={`${total} lessons`}
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" aria-label="Previous week" onClick={() => setOffset((o) => o - 1)}><ChevronLeft size={18} /></Button>
            <Button variant="secondary" aria-label="Next week" onClick={() => setOffset((o) => o + 1)}><ChevronRight size={18} /></Button>
          </div>
        }
      />

      {/* Seven columns that stay usable on a tablet; scroll sideways on phones */}
      <div className="overflow-x-auto">
        <div className="grid min-w-[640px] grid-cols-7 gap-1.5">
          {weekLessons.map((items, i) => {
            const day = addDays(start, i)
            return (
              <div
                key={i}
                className={cn('min-h-80 rounded-xl border border-line p-2', isSameDay(day, today) && offset === 0 ? 'bg-brand-soft' : 'bg-white')}
              >
                <div className="mb-2 text-xs font-bold">{format(day, 'EEE d')}</div>
                {items.length === 0 && <div className="text-[13px] text-muted">Free</div>}
                {items.map((l, j) => (
                  <Pill key={j} tone={statusTone[l.status]} className="mb-1.5 block whitespace-normal rounded-lg">
                    {l.time} {l.name}
                  </Pill>
                ))}
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {['Scheduled', 'Completed', 'Missed', 'Cancelled'].map((s) => <Pill key={s} tone={statusTone[s]}>{s}</Pill>)}
      </div>
    </>
  )
}
