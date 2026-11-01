# LessonLog

LessonLog is a tutor and student management web app for independent tutors and coaches who teach several students across different subjects. It brings students, lesson times, homework, progress notes and payments into one place, replacing scattered notebooks, chat threads and calendar apps.

A tutor can see at a glance who is coming up next, what homework is outstanding, and which sessions are still unpaid.

## Features

- Authentication: sign up, sign in, sign out, password recovery and persistent sessions
- Dashboard: today's and this week's lessons, outstanding homework, unpaid sessions and active students
- Student records: create, view, edit, search and archive students, with guardian contact details
- Lessons: schedule lessons with subject, date, duration and rate, and mark them completed, cancelled or missed
- Homework: assign tasks per lesson with due dates and status, in list and board views
- Payments: record payments against lessons and see each student's outstanding balance
- Student detail page with lesson history, progress notes and balance
- Responsive layouts, validation, loading and empty states, and useful error messages

## Tech stack

- Frontend: React, Vite, Tailwind CSS, React Router, TanStack Query, React Hook Form, Zod
- Backend: Supabase (Postgres, Auth, Row Level Security)

## Security

Each tutor can only access their own records. Row Level Security policies enforce ownership on every table, and outstanding balances are calculated from lessons and payments, never stored as an editable number.

## Status

Month 1 MVP, in development.
