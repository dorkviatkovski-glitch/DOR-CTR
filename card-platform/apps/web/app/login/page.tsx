import Link from 'next/link';

export default function LoginPage() {
  return (
    <section className="page auth-page">
      <h1>Login</h1>
      <form className="card form">
        <input placeholder="Email" />
        <input placeholder="Password" type="password" />
        <Link className="button primary" href="/collection">Login</Link>
      </form>
    </section>
  );
}
