import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="p-4 bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <span>My App</span>
        {isAuthenticated && (
          <button onClick={logout} className="py-2 px-5 bg-red-600 rounded text-white">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;