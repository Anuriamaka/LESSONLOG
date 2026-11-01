import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '../components/ui'

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

function Field({ label, error, ...props }) {
  return (
    <div className="mt-4">
      <label htmlFor={props.id} className="mb-1.5 block text-[13px] font-bold">{label}</label>
      <input
        {...props}
        className="min-h-11 w-full rounded-xl border border-[#CFC7BB] bg-white px-3 text-[15px] outline-brand"
      />
      {error && <p role="alert" className="mt-1 text-[13px] text-[#9A3412]">{error}</p>}
    </div>
  )
}

export default function SignIn() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  // TODO: replace with supabase.auth.signInWithPassword({ email, password })
  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600))
    toast.success('Signed in')
    navigate('/dashboard')
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="flex flex-1 flex-col justify-between bg-brand p-10 text-white lg:p-16">
        <div className="text-[22px] font-extrabold">LessonLog</div>
        <div className="py-10">
          <h1 className="mb-4 text-4xl font-extrabold leading-tight lg:text-5xl">
            Know who is next, what is due, and who owes you.
          </h1>
          <p className="max-w-md text-[17px]">
            Students, lessons, homework and payments in one calm workspace for independent tutors.
          </p>
        </div>
        <div className="text-[13px]">Month 1 MVP</div>
      </div>
      <div className="flex flex-1 items-center justify-center p-6 lg:p-12">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm rounded-2xl border border-line bg-white p-8" noValidate>
          <h2 className="text-2xl font-extrabold">Welcome back</h2>
          <p className="text-sm text-muted">Sign in to your workspace</p>
          <Field id="email" label="Email" type="email" placeholder="you@example.com" error={errors.email?.message} {...register('email')} />
          <Field id="password" label="Password" type="password" placeholder="Enter your password" error={errors.password?.message} {...register('password')} />
          <div className="my-4 flex justify-between text-[13px]">
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Keep me signed in</label>
            <a href="#" className="font-bold text-brand-dark">Forgot password?</a>
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </Button>
          <p className="mt-4 text-center text-[13px] text-muted">
            New here? <Link to="/signin" className="font-bold text-brand-dark">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
