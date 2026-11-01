import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button, Card, PageHeader, Pill, Row } from '../components/ui'
import { homework } from '../data/sample'
import { cn } from '../lib/cn'

const columns = [
  { key: 'todo', label: 'To do' },
  { key: 'doing', label: 'In progress' },
  { key: 'done', label: 'Done' },
]

export default function Homework() {
  const [view, setView] = useState('Board')
  const open = homework.filter((h) => h.status !== 'done').length
  const overdue = homework.filter((h) => h.tone === 'danger').length

  return (
    <>
      <PageHeader
        title="Homework"
        subtitle={`${open} outstanding · ${overdue} overdue`}
        actions={
          <div className="flex items-center gap-2">
            {['Board', 'List'].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                aria-pressed={view === v}
                className={cn('min-h-11 px-3 text-sm font-semibold text-[#5A524A]', view === v && 'border-b-[3px] border-brand text-brand-dark')}
              >
                {v}
              </button>
            ))}
            <Button><Plus size={16} className="mr-1 inline" aria-hidden />Assign homework</Button>
          </div>
        }
      />

      {view === 'Board' ? (
        <div className="grid gap-4 md:grid-cols-3">
          {columns.map((c) => {
            const items = homework.filter((h) => h.status === c.key)
            return (
              <div key={c.key} className="rounded-2xl bg-[#F3EEE6] p-3.5">
                <b>{c.label} · {items.length}</b>
                {items.length === 0 && <p className="mt-3 text-sm text-muted">Nothing here.</p>}
                {items.map((h) => (
                  <Card key={h.id} className="mt-2.5 p-3.5">
                    <b>{h.title}</b>
                    <div className="mb-2.5 mt-1 text-[13px] text-muted">{h.student} · {h.subject}</div>
                    <Pill tone={h.tone}>{h.due}</Pill>
                  </Card>
                ))}
              </div>
            )
          })}
        </div>
      ) : (
        <Card>
          {homework.map((h) => (
            <Row key={h.id} title={h.title} sub={`${h.student} · ${h.subject}`} right={<Pill tone={h.tone}>{h.due}</Pill>} />
          ))}
        </Card>
      )}
    </>
  )
}
