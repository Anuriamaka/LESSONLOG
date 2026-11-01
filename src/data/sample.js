// Sample data. Replace each export with a Supabase query later.
export const students = [
  { id: 1, name: 'Maya Okafor', level: 'Year 10', subject: 'Maths', guardian: 'Ngozi Okafor', email: 'ngozi@example.com', phone: '555-0142', archived: false },
  { id: 2, name: 'Daniel Reyes', level: 'Year 12', subject: 'Physics', guardian: 'Luis Reyes', email: 'luis@example.com', phone: '555-0177', archived: false },
  { id: 3, name: 'Priya Shah', level: 'Year 11', subject: 'English', guardian: 'Anita Shah', email: 'anita@example.com', phone: '555-0121', archived: false },
  { id: 4, name: 'Tomás Lima', level: 'Year 9', subject: 'Spanish', guardian: 'Rita Lima', email: 'rita@example.com', phone: '555-0190', archived: false },
  { id: 5, name: 'Chloe Barrett', level: 'Year 13', subject: 'Chemistry', guardian: 'Sam Barrett', email: 'sam@example.com', phone: '555-0166', archived: false },
  { id: 6, name: 'Old Student', level: 'Year 8', subject: 'Maths', guardian: 'A. Parent', email: 'a@example.com', phone: '555-0100', archived: true },
]

// status: Scheduled | Completed | Missed | Cancelled
export const lessons = [
  { id: 1, studentId: 1, date: '2026-10-29', subject: 'Maths', duration: 60, rate: 40, status: 'Completed', paid: true },
  { id: 2, studentId: 1, date: '2026-10-22', subject: 'Maths', duration: 60, rate: 40, status: 'Completed', paid: false },
  { id: 3, studentId: 1, date: '2026-10-15', subject: 'Maths', duration: 60, rate: 40, status: 'Completed', paid: false },
  { id: 4, studentId: 1, date: '2026-10-08', subject: 'Maths', duration: 60, rate: 40, status: 'Cancelled', paid: false },
  { id: 5, studentId: 2, date: '2026-10-22', subject: 'Physics', duration: 45, rate: 70, status: 'Completed', paid: false },
  { id: 6, studentId: 2, date: '2026-10-15', subject: 'Physics', duration: 45, rate: 70, status: 'Completed', paid: false },
  { id: 7, studentId: 3, date: '2026-10-22', subject: 'English', duration: 60, rate: 120, status: 'Completed', paid: false },
  { id: 8, studentId: 4, date: '2026-10-22', subject: 'Spanish', duration: 45, rate: 65, status: 'Completed', paid: false },
  { id: 9, studentId: 4, date: '2026-10-15', subject: 'Spanish', duration: 45, rate: 70, status: 'Completed', paid: false },
  { id: 10, studentId: 4, date: '2026-10-08', subject: 'Spanish', duration: 45, rate: 70, status: 'Completed', paid: false },
]

// Balance is derived, never stored: completed lessons that are not yet paid.
export const balanceFor = (studentId) =>
  lessons.filter((l) => l.studentId === studentId && l.status === 'Completed' && !l.paid)
    .reduce((sum, l) => sum + l.rate, 0)
export const unpaidCount = (studentId) =>
  lessons.filter((l) => l.studentId === studentId && l.status === 'Completed' && !l.paid).length

export const todayLessons = [
  { id: 1, time: '9:00 AM', student: 'Maya Okafor', subject: 'Maths', duration: 60, rate: 40, status: 'Completed' },
  { id: 2, time: '2:00 PM', student: 'Daniel Reyes', subject: 'Physics', duration: 45, rate: 70, status: 'Scheduled', next: true },
  { id: 3, time: '4:30 PM', student: 'Priya Shah', subject: 'English', duration: 60, rate: 120, status: 'Scheduled' },
]

export const notes = {
  1: [{ date: '29 Oct', text: 'Solid on factorising; needs more practice with completing the square. Set two timed problems for next week.' }],
}

// status: todo | doing | done
export const homework = [
  { id: 1, title: 'Fractions sheet', student: 'Maya', subject: 'Maths', due: 'Due Fri', status: 'todo', tone: 'neutral' },
  { id: 2, title: 'Essay outline', student: 'Priya', subject: 'English', due: 'Due today', status: 'todo', tone: 'warn' },
  { id: 3, title: 'Kinematics set', student: 'Daniel', subject: 'Physics', due: 'Overdue', status: 'todo', tone: 'danger' },
  { id: 4, title: 'Verb tenses drill', student: 'Tomás', subject: 'Spanish', due: 'Due Mon', status: 'doing', tone: 'neutral' },
  { id: 5, title: 'Lab report draft', student: 'Chloe', subject: 'Chemistry', due: 'Due Wed', status: 'doing', tone: 'neutral' },
  { id: 6, title: 'Factorising set', student: 'Maya', subject: 'Maths', due: 'Handed in', status: 'done', tone: 'success' },
  { id: 7, title: 'Reading log', student: 'Priya', subject: 'English', due: 'Handed in', status: 'done', tone: 'success' },
]

// Week view: index 0 = Monday
export const weekLessons = [
  [{ time: '4:00', name: 'Maya', status: 'Completed' }],
  [{ time: '3:30', name: 'Priya', status: 'Completed' }, { time: '5:00', name: 'Chloe', status: 'Completed' }],
  [{ time: '4:00', name: 'Tomás', status: 'Missed' }],
  [{ time: '9:00', name: 'Maya', status: 'Completed' }, { time: '2:00', name: 'Daniel', status: 'Scheduled' }, { time: '4:30', name: 'Priya', status: 'Scheduled' }],
  [{ time: '3:00', name: 'Maya', status: 'Scheduled' }, { time: '4:00', name: 'Tomás', status: 'Scheduled' }],
  [{ time: '10:00', name: 'Daniel', status: 'Scheduled' }],
  [],
]
