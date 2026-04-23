'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { api } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <section className="page auth-page">
      <h1>Login</h1>
      <form
        className="card form"
        onSubmit={(event) => {
          event.preventDefault();
          setError(null);
          startTransition(async () => {
            try {
              const response = await api.login({ email, password });
              router.push(response.next);
            } catch (submitError) {
              setError(submitError instanceof Error ? submitError.message : 'Login failed');
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
        {error ? <span className="small">{error}</span> : null}
        <button className="button primary" type="submit" disabled={isPending}>
          {isPending ? 'Logging in…' : 'Login'}
        </button>
      </form>
      <p>
        Need an account? <Link href="/signup">Sign up</Link>
      </p>
    </section>
  );
}
