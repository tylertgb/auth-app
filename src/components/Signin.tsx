import { useState } from 'react';
const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Integration of Singin API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const signinResponse = await fetch('/api/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await signinResponse.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      window.location.href = '/';
    }
  };

  return (
    <>
      <section className='flex justify-center items-center h-screen p-4'>
        <form onSubmit={handleSubmit} className="w-full md:w-1/4 flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded"
          />
          <button type="submit" className="p-2 bg-blue-800 text-white rounded">
            Sign In
          </button>
        </form>
      </section>
    </>
  );
};

export default Signin;
