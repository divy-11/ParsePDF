import React from 'react';
import { FileText, History, User as UserIcon, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <FileText className="h-6 w-6 text-blue-600" />
          <span className="ml-2 font-semibold text-gray-900">PDF Converter</span>
        </div>
        <nav className="p-4 space-y-1">
          <Link
            to="/home"
            className={`flex items-center px-4 py-2 text-sm rounded-lg ${
              isActive('/home') 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FileText className="h-5 w-5 mr-3" />
            Convert PDF
          </Link>
          <Link
            to="/history"
            className={`flex items-center px-4 py-2 text-sm rounded-lg ${
              isActive('/history')
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <History className="h-5 w-5 mr-3" />
            History
          </Link>
          <Link
            to="/profile"
            className={`flex items-center px-4 py-2 text-sm rounded-lg ${
              isActive('/profile')
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
            onClick={() => {/* Handle logout */}}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg w-full"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}