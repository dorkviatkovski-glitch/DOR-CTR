import Link from 'next/link';

export default function SignupPage() {
  return (
    <section className="page auth-page">
      <h1>Sign up</h1>
      <form className="card form">
        <input placeholder="Email" />
        <input placeholder="Password" type="password" />
        <input placeholder="Confirm password" type="password" />
        <Link className="button primary" href="/collection">Create account</Link>
      </form>
    </section>
  );
}
