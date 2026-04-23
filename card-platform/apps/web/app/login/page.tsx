'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login } from '../../lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setError(null);
    setPending(true);

    try {
      await login({
        email: String(formData.get('email') ?? ''),
        password: String(formData.get('password') ?? '')
      });
      router.push('/collection');
    } catch {
      setError('Unable to login with those credentials.');
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="page auth-page">
      <h1>Login</h1>
      <form className="card form" onSubmit={onSubmit}>
        <input name="email" placeholder="Email" type="email" required />
        <input name="password" placeholder="Password" type="password" required />
        <button className="button primary" disabled={pending} type="submit">
          {pending ? 'Logging in...' : 'Login'}
        </button>
        {error ? <p>{error}</p> : null}
      </form>
      <p>
        Need an account? <Link href="/signup">Sign up</Link>
      </p>
    </section>
  );
}
