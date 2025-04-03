import React, { useState } from 'react';
import { FileText, History, User as UserIcon, LogOut, Home, MoonIcon, SunIcon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface LayoutProps {
  children: React.ReactNode;
}
export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  // const [darkMode, setDarkMode] = useState(false);

  // const toggleDarkMode = () => {
  //   setDarkMode((prev) => !prev);
  //   document.documentElement.classList.toggle('dark', !darkMode);
  // };

  const handleLogout = async () => {
    const resp = await axios.post("http://localhost:6060/api/user/logout")
    console.log(resp.data.message)
    navigate('/')
  }
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <FileText className="h-6 w-6 text-blue-600" />
          <span className="ml-2 font-semibold text-gray-900">parsePDF</span>
        </div>
        <nav className="p-4 space-y-1 flex-grow">
          <Link
            to="/home"
            className={`flex items-center px-4 py-2 text-sm rounded-lg ${isActive('/home')
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            <Home className="h-5 w-5 mr-3" />
            Home
          </Link>
          <Link
            to="/history"
            className={`flex items-center px-4 py-2 text-sm rounded-lg ${isActive('/history')
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            <History className="h-5 w-5 mr-3" />
            History
          </Link>
          <Link
            to="/profile"
            className={`flex items-center px-4 py-2 text-sm rounded-lg ${isActive('/profile')
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            <UserIcon className="h-5 w-5 mr-3" />
            Profile
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg w-full transition"
          >
            <LogOut className="h-5 w-5 mr-3 text-red-600" />
            Logout
          </button>
          {/* <button onClick={toggleDarkMode} className="fixed bottom-6 right-6 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition">
            {darkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
          </button> */}
        </div>
      </aside>

      <main className="ml-64 flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}