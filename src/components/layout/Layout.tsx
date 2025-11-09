import React from 'react';
import Header from './Header';
import Footer from './Footer';
import AboutModal from '../modals/AboutModal';
import ErrorModal from '../modals/ErrorModal';
import FingerprintModal from '../modals/FingerprintModal';
import { useApp } from '../../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { 
    isAboutModalOpen, 
    setIsAboutModalOpen,
    isErrorModalOpen,
    setIsErrorModalOpen,
    isFingerprintModalOpen,
    setIsFingerprintModalOpen
  } = useApp();
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <Header />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
      
      {/* Modals */}
      <AboutModal 
        isOpen={isAboutModalOpen} 
        onClose={() => setIsAboutModalOpen(false)} 
      />
      
      <ErrorModal 
        isOpen={isErrorModalOpen} 
        onClose={() => setIsErrorModalOpen(false)} 
      />
      
      <FingerprintModal
        isOpen={isFingerprintModalOpen}
        onClose={() => setIsFingerprintModalOpen(false)}
      />
    </div>
  );
};

export default Layout;