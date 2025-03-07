import { useState } from "react";
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Integration of Singin API
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const signinResponse = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name, email, password }),
      });
  
      const data = await signinResponse.json();
      if (data) {
        alert('Registration successful!');
      }else{
        alert('Registration failed');
      }
    };


  return (
    <>
      <section className='flex justify-center items-center h-screen p-4'>
        <form onSubmit={handleSubmit} className="w-full md:w-1/4">
            <div className='text-center space-y-1 mb-6'>
                <h1 className='text-center text-xl font-semibold'>Signup</h1>
                <p className='text-gray-400 text-sm'>Signup for an account</p>
            </div>
          <div className=' flex flex-col space-y-4'>
          <input
            type="name"
            placeholder="Full Name"
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded"
          />
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
            Sign Up
          </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Signup