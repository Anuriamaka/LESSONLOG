import { useState } from 'react'
import { Search } from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { Button, Card, PageHeader, Pill, Row, statusTone } from '../components/ui'
import { students as seed, lessons, notes, homework, balanceFor } from '../data/sample'
import { cn } from '../lib/cn'

const tabs = ['Lessons', 'Progress notes', 'Homework']

export default function Students() {
  const [list, setList] = useState(seed)
  const [q, setQ] = useState('')
  const [selectedId, setSelectedId] = useState(1)
  const [showArchived, setShowArchived] = useState(false)
  const [tab, setTab] = useState('Lessons')

  const visible = list.filter((s) => s.archived === showArchived && s.name.toLowerCase().includes(q.toLowerCase()))
  const s = list.find((x) => x.id === selectedId)
  const ls = lessons.filter((l) => l.studentId === selectedId)
  const billed = ls.filter((l) => l.status === 'Completed').reduce((n, l) => n + l.rate, 0)
  const outstanding = balanceFor(selectedId)

  const archive = () => {
    setList((prev) => prev.map((x) => (x.id === selectedId ? { ...x, archived: true } : x)))
    toast.success(`${s.name} archived`)
  }

  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <aside className="shrink-0 lg:w-72">
        <h1 className="mb-3 text-xl font-extrabold">Students</h1>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-3.5 text-muted" aria-hidden />
          <input
            aria-label="Search students"
            placeholder="Search students"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="min-h-11 w-full rounded-xl border border-[#CFC7BB] bg-white pl-9 pr-3 text-sm outline-brand"
          />
        </div>
        <div className="mt-2 flex flex-col gap-1.5">
          {visible.length === 0 && <p className="p-3 text-sm text-muted">No students found.</p>}
          {visible.map((x) => (
            <button
              key={x.id}
              onClick={() => setSelectedId(x.id)}
              className={cn('rounded-xl border border-line p-3 text-left', x.id === selectedId ? 'bg-brand-soft' : 'bg-white')}
            >
              <div className="font-bold">{x.name}</div>
              <div className="text-[13px] text-muted">
                {x.subject} · {balanceFor(x.id) ? `$${balanceFor(x.id)} owed` : 'Paid up'}
              </div>
            </button>
          ))}
        </div>
        <button onClick={() => setShowArchived((v) => !v)} className="mt-3 text-[13px] font-bold text-brand-dark">
          {showArchived ? 'Show active' : `Show archived (${list.filter((x) => x.archived).length})`}
        </button>
      </aside>

      {s ? (
        <section className="flex min-w-0 flex-1 flex-col gap-4">
          <PageHeader
            title={s.name}
            subtitle={`${s.level} · ${s.subject} · Guardian: ${s.guardian} · ${s.email} · ${s.phone}`}
            actions={
              <div className="flex gap-2">
                <Button variant="secondary">Edit</Button>
                <Button variant="secondary" onClick={archive}>Archive</Button>
                <Button>Schedule lesson</Button>
              </div>
            }
          />
          <div className="grid gap-4 sm:grid-cols-3">
            <Card><div className="text-[13px] text-muted">Billed</div><b className="text-2xl">${billed}</b></Card>
            <Card><div className="text-[13px] text-muted">Paid</div><b className="text-2xl">${billed - outstanding}</b></Card>
            <Card className="border-[#F0DFA8] bg-warn-soft"><div className="text-[13px] text-muted">Outstanding</div><b className="text-2xl">${outstanding}</b></Card>
          </div>

          <div role="tablist" className="flex border-b border-line">
            {tabs.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={cn('min-h-11 px-4 text-sm font-semibold text-[#5A524A]', tab === t && 'border-b-[3px] border-brand text-brand-dark')}
              >
                {t}
              </button>
            ))}
          </div>

          <Card>
            {tab === 'Lessons' && (
              <>
                <h2 className="mb-1 text-base font-bold">Lesson history</h2>
                {ls.length === 0 && <p className="text-sm text-muted">No lessons yet. Schedule the first one.</p>}
                {ls.map((l) => (
                  <Row
                    key={l.id}
                    title={format(new Date(l.date), 'd MMM')}
                    sub={`${l.subject} · ${l.duration} min · $${l.rate}`}
                    right={
                      <div className="flex gap-2">
                        <Pill tone={statusTone[l.status]}>{l.status}</Pill>
                        {l.status === 'Completed' && <Pill tone={l.paid ? 'success' : 'warn'}>{l.paid ? 'Paid' : 'Unpaid'}</Pill>}
                      </div>
                    }
                  />
                ))}
              </>
            )}
            {tab === 'Progress notes' && (
              <>
                <h2 className="mb-1 text-base font-bold">Progress notes</h2>
                {(notes[selectedId] || []).length === 0 && <p className="text-sm text-muted">No notes yet.</p>}
                {(notes[selectedId] || []).map((n, i) => (
                  <Row key={i} title={n.date} sub={n.text} />
                ))}
              </>
            )}
            {tab === 'Homework' && (
              <>
                <h2 className="mb-1 text-base font-bold">Homework</h2>
                {homework.filter((h) => h.student === s.name.split(' ')[0]).map((h) => (
                  <Row key={h.id} title={h.title} sub={h.subject} right={<Pill tone={h.tone}>{h.due}</Pill>} />
                ))}
              </>
            )}
          </Card>
        </section>
      ) : (
        <p className="text-muted">Select a student to see their details.</p>
      )}
    </div>
  )
}
