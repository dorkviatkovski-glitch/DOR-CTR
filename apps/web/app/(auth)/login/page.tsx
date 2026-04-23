import { AuthForm } from '@/features/auth/AuthForm';

export default function LoginPage() {
  return (
    <section className="page auth-page">
      <h1>Login</h1>
      <AuthForm mode="login" />
    </section>
  );
}
