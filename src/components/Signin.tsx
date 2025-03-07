import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BiLoader } from 'react-icons/bi';
import { FaCircleCheck, FaExclamation } from 'react-icons/fa6';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [submitStatus, setSubmitStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Integration of Signin API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('processing');
    setSubmitStatus(true);
    setErrorMessage('');

    try {
      const signinResponse = await fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await signinResponse.json();

      if (!signinResponse.ok) {
        // Handle API errors (e.g., invalid credentials)
        setStatus('error');
        setErrorMessage(data.error || 'Invalid credentials. Please try again.');
        setTimeout(() => setStatus('idle'), 3000);
        return;
      }

      if (data.token) {
        setStatus('success');
        login(data.token); // Update authentication state
        setTimeout(() => {
          window.location.href = '/dashboard'; // Redirect to Dashboard page
        }, 1000);
      } else {
        // Handle empty data (e.g no token returned)
        setStatus('error');
        setErrorMessage('Please sign up for an account.');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
      setTimeout(() => setStatus('idle'), 3000);
    } finally {
      setTimeout(() => setSubmitStatus(false), 3000);
    }
  };

  return (
    <>
      <section className="flex flex-col justify-center items-center h-screen p-4 relative">
        {/* Status Message */}
        <span
          className={`bg-gray-100 py-2 px-4 rounded text-sm text-gray-400 absolute top-6 ${
            submitStatus ? 'block' : 'hidden'
          }`}
        >
          {status === 'processing' ? (
            <span className="flex items-center gap-2">
              <BiLoader className="animate-spin duration-700" /> Signing in...
            </span>
          ) : status === 'success' ? (
            <span className="flex items-center gap-2">
              <FaCircleCheck className="text-green-500 text-xl" /> Successful!
            </span>
          ) : status === 'error' ? (
            <span className="flex items-center gap-2">
              <FaExclamation className="text-red-500 text-xl" />{' '}
              {errorMessage}
            </span>
          ) : (
            ''
          )}
        </span>

        {/* Signin Form */}
        <form onSubmit={handleSubmit} className="w-full md:w-1/4">
          <div className="text-center space-y-1 mb-6">
            <h1 className="text-center text-xl font-semibold">Login</h1>
            <p className="text-gray-400 text-sm">
              Enter your credentials to login
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border rounded"
              required
            />
            <button
              type="submit"
              className="p-2 bg-blue-800 text-white rounded flex justify-center items-center gap-1 disabled:opacity-50"
              disabled={status === 'processing'}
            >
              {status === 'processing' ? (
                <BiLoader className="text-2xl animate-spin duration-700" />
              ) : (
                'Login'
              )}
              {status === 'success' && (
                <FaCircleCheck className="text-green-500 text-xl" />
              )}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Signin;
