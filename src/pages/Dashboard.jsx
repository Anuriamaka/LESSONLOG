import { Plus } from 'lucide-react'
import { Button, Card, PageHeader, Pill, Row, statusTone } from '../components/ui'
import { students, todayLessons, homework, balanceFor, unpaidCount } from '../data/sample'
import { cn } from '../lib/cn'

const weekCounts = [['Mon', 2], ['Tue', 3], ['Wed', 1], ['Thu', 3], ['Fri', 4], ['Sat', 2], ['Sun', 0]]

export default function Dashboard() {
  const owing = students
    .map((s) => ({ ...s, owed: balanceFor(s.id), sessions: unpaidCount(s.id) }))
    .filter((s) => s.owed > 0)
    .sort((a, b) => b.owed - a.owed)
  const totalOwed = owing.reduce((n, s) => n + s.owed, 0)
  const totalSessions = owing.reduce((n, s) => n + s.sessions, 0)
  const active = students.filter((s) => !s.archived).length
  const openHomework = homework.filter((h) => h.status !== 'done')

  return (
    <>
      <PageHeader
        title="Good morning, Ada"
        subtitle={`${new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })} · ${active} active students`}
        actions={<Button><Plus size={16} className="mr-1 inline" aria-hidden />New lesson</Button>}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="mb-1 text-base font-bold">Today · {todayLessons.length} lessons</h2>
          {todayLessons.map((l) => (
            <Row
              key={l.id}
              title={`${l.time} · ${l.student}`}
              sub={`${l.subject} · ${l.duration} min · $${l.rate}`}
              right={<Pill tone={statusTone[l.status]}>{l.next ? 'Next up' : l.status}</Pill>}
            />
          ))}
        </Card>

        <Card className="border-[#F0DFA8] bg-warn-soft">
          <div className="text-[13px] text-muted">Money owed</div>
          <div className="text-4xl font-extrabold">${totalOwed}</div>
          <div className="mb-1 text-[13px] text-muted">{totalSessions} unpaid sessions · {owing.length} students</div>
          {owing.slice(0, 3).map((s) => (
            <Row key={s.id} title={s.name} sub={`${s.sessions} session${s.sessions > 1 ? 's' : ''}`} right={<b>${s.owed}</b>} />
          ))}
          <Button variant="secondary" className="mt-2 w-full">Record payment</Button>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="text-base font-bold">This week · 15 lessons</h2>
          <div className="mt-3 flex gap-2">
            {weekCounts.map(([d, n]) => (
              <div key={d} className={cn('flex-1 rounded-xl px-2 py-3 text-center', d === 'Thu' ? 'bg-brand-soft font-bold' : 'bg-canvas')}>
                <div className="text-[13px] text-muted">{d}</div>
                <div className="text-2xl font-extrabold">{n}</div>
                <div className="text-xs text-muted">lessons</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="mb-1 text-base font-bold">Homework outstanding · {openHomework.length}</h2>
          {openHomework.slice(0, 3).map((h) => (
            <Row key={h.id} title={h.title} sub={`${h.student} · ${h.subject}`} right={<Pill tone={h.tone}>{h.due}</Pill>} />
          ))}
        </Card>
      </div>
    </>
  )
}
