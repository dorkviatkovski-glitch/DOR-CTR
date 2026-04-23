import { AuthForm } from '@/features/auth/AuthForm';

export default function SignupPage() {
  return (
    <section className="page auth-page">
      <h1>Sign up</h1>
      <AuthForm mode="signup" />
    </section>
  );
}
