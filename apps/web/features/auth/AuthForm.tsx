'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { login, signup } from './auth.api';

type Mode = 'login' | 'signup';

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response =
        mode === 'signup' ? await signup({ email, password }) : await login({ email, password });
      router.push(response.next);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to authenticate.');
    }
  }

  return (
    <form className="card form" onSubmit={onSubmit}>
      <input placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {mode === 'signup' && (
        <input
          placeholder="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      )}
      {error && <p className="error-text">{error}</p>}
      <button className="button primary" type="submit">
        {mode === 'signup' ? 'Create account' : 'Login'}
      </button>
      {mode === 'login' && (
        <p>
          Need an account? <Link href="/signup">Sign up</Link>
        </p>
      )}
    </form>
  );
}
