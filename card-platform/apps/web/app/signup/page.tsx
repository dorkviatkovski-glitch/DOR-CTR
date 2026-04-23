'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signup } from '../../lib/api';

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');
    const confirmPassword = String(formData.get('confirmPassword') ?? '');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError(null);
    setPending(true);

    try {
      await signup({ email, password });
      router.push('/collection');
    } catch {
      setError('Unable to create account right now.');
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="page auth-page">
      <h1>Sign up</h1>
      <form className="card form" onSubmit={onSubmit}>
        <input name="email" placeholder="Email" type="email" required />
        <input name="password" placeholder="Password" type="password" required />
        <input name="confirmPassword" placeholder="Confirm password" type="password" required />
        <button className="button primary" disabled={pending} type="submit">
          {pending ? 'Creating...' : 'Create account'}
        </button>
        {error ? <p>{error}</p> : null}
      </form>
    </section>
  );
}
