import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Fingerprint, Home, UserPlus, Users, Info, Menu, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Header: React.FC = () => {
  const { setIsAboutModalOpen } = useApp();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={18} /> },
    { path: '/admin-registration', label: 'Admin Registration', icon: <UserPlus size={18} /> },
    { path: '/user-registration', label: 'User Registration', icon: <Users size={18} /> }
  ];
  
  return (
    <header className="bg-gray-900 border-b border-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xl font-semibold text-blue-400"
            onClick={closeMenu}
          >
            <Fingerprint size={24} />
            <span>SecurePrint</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors
                          ${isActive(item.path) 
                            ? 'text-blue-400 bg-blue-900/30' 
                            : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800/50'}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            
            <button 
              onClick={() => setIsAboutModalOpen(true)}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors
                        text-gray-300 hover:text-blue-400 hover:bg-gray-800/50"
            >
              <Info size={18} />
              <span>About</span>
            </button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 hover:text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-900 border-t border-gray-800 py-2 px-4 absolute w-full z-50">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-2 py-2 rounded-md transition-colors
                          ${isActive(item.path) 
                            ? 'text-blue-400 bg-blue-900/30' 
                            : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800/50'}`}
                onClick={closeMenu}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            
            <button 
              onClick={() => {
                setIsAboutModalOpen(true);
                closeMenu();
              }}
              className="flex items-center gap-1.5 px-2 py-2 rounded-md transition-colors
                        text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 text-left"
            >
              <Info size={18} />
              <span>About</span>
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;