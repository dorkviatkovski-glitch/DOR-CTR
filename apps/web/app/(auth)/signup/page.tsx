'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { api } from '@/lib/api';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <section className="page auth-page">
      <h1>Sign up</h1>
      <form
        className="card form"
        onSubmit={(event) => {
          event.preventDefault();
          setError(null);
          if (password !== confirmPassword) {
            setError('Passwords must match');
            return;
          }

          startTransition(async () => {
            try {
              const response = await api.signup({ email, password });
              router.push(response.next);
            } catch (submitError) {
              setError(submitError instanceof Error ? submitError.message : 'Sign up failed');
            }
          });
        }}
      >
        <input placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          placeholder="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        {error ? <span className="small">{error}</span> : null}
        <button className="button primary" type="submit" disabled={isPending}>
          {isPending ? 'Creating account…' : 'Create account'}
        </button>
      </form>
      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </section>
  );
}
