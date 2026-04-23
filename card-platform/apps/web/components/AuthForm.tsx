'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

type Mode = 'login' | 'signup';

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isSignup = mode === 'signup';

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    setLoading(false);

    if (response.ok) {
      router.replace('/collection');
    }
  }

  return (
    <section className="page auth-page">
      <h1>{isSignup ? 'Sign up' : 'Login'}</h1>
      <form className="card form" onSubmit={onSubmit}>
        <input name="email" placeholder="Email" type="email" required />
        <input name="password" placeholder="Password" type="password" required />
        {isSignup ? <input placeholder="Confirm password" type="password" required /> : null}
        <button className="button primary" type="submit" disabled={loading}>
          {loading ? 'Please wait...' : isSignup ? 'Create account' : 'Login'}
        </button>
      </form>
      {isSignup ? null : (
        <p>
          Need an account? <Link href="/signup">Sign up</Link>
        </p>
      )}
    </section>
  );
}
