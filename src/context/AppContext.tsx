import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, ScanStatus, ErrorType } from '../types';
import { generateMockUsers } from '../utils/mockData';

interface AppContextType {
  users: User[];
  currentUser: User | null;
  scanStatus: ScanStatus;
  errorType: ErrorType;
  isAboutModalOpen: boolean;
  isFingerprintModalOpen: boolean;
  isErrorModalOpen: boolean;
  adminVerificationRequired: boolean;
  scanAttempts: number;
  
  // Actions
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  setScanStatus: React.Dispatch<React.SetStateAction<ScanStatus>>;
  setErrorType: React.Dispatch<React.SetStateAction<ErrorType>>;
  setIsAboutModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFingerprintModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsErrorModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAdminVerificationRequired: React.Dispatch<React.SetStateAction<boolean>>;
  setScanAttempts: React.Dispatch<React.SetStateAction<number>>;
  
  // Helper functions
  addUser: (user: Omit<User, 'id' | 'registered'>) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  deleteUser: (id: string) => void;
  startScan: () => void;
  resetScan: () => void;
  simulateScanResult: (success: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(generateMockUsers(5));
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [scanStatus, setScanStatus] = useState<ScanStatus>({
    isScanning: false,
    progress: 0,
    status: 'idle'
  });
  const [errorType, setErrorType] = useState<ErrorType>(null);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isFingerprintModalOpen, setIsFingerprintModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [adminVerificationRequired, setAdminVerificationRequired] = useState(false);
  const [scanAttempts, setScanAttempts] = useState(0);

  const addUser = (user: Omit<User, 'id' | 'registered'>) => {
    const newUser: User = {
      ...user,
      id: `user-${Date.now()}`,
      registered: new Date().toISOString()
    };
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (id: string, data: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...data } : user
    ));
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const startScan = () => {
    setScanStatus({
      isScanning: true,
      progress: 0,
      status: 'scanning'
    });
    
    // Random chance of error for realism
    const errorChance = Math.random();
    if (errorChance < 0.1 && scanAttempts === 0) {
      setTimeout(() => {
        const errors: ErrorType[] = ['read_failure', 'no_scanner', 'timeout'];
        const randomError = errors[Math.floor(Math.random() * errors.length)];
        setErrorType(randomError);
        setIsErrorModalOpen(true);
        setScanStatus({
          isScanning: false,
          progress: 0,
          status: 'error',
          message: 'Scan failed. Please try again.'
        });
      }, 3000);
      return;
    }
    
    // Progress interval
    const interval = setInterval(() => {
      setScanStatus(prev => {
        if (prev.progress >= 100) {
          clearInterval(interval);
          return prev;
        }
        return {
          ...prev,
          progress: prev.progress + 2
        };
      });
    }, 50);
    
    // Simulate scan completion
    setTimeout(() => {
      clearInterval(interval);
      
      // First attempt should fail unless in admin verification mode with multiple attempts
      const shouldSucceed = scanAttempts >= 1 || Math.random() > 0.7;
      
      simulateScanResult(shouldSucceed);
    }, 5000);
  };

  const resetScan = () => {
    setScanStatus({
      isScanning: false,
      progress: 0,
      status: 'idle'
    });
    setErrorType(null);
  };

  const simulateScanResult = (success: boolean) => {
    setScanStatus({
      isScanning: false,
      progress: 100,
      status: success ? 'success' : 'error',
      message: success 
        ? 'Fingerprint verified successfully.' 
        : 'Fingerprint verification failed. Please try again.'
    });
    
    // Update scan attempts counter
    if (!success) {
      setScanAttempts(prev => prev + 1);
    } else {
      setTimeout(() => {
        setScanAttempts(0);
        if (adminVerificationRequired) {
          setAdminVerificationRequired(false);
        }
      }, 2000);
    }
  };

  return (
    <AppContext.Provider value={{
      users,
      currentUser,
      scanStatus,
      errorType,
      isAboutModalOpen,
      isFingerprintModalOpen,
      isErrorModalOpen,
      adminVerificationRequired,
      scanAttempts,
      setUsers,
      setCurrentUser,
      setScanStatus,
      setErrorType,
      setIsAboutModalOpen,
      setIsFingerprintModalOpen,
      setIsErrorModalOpen,
      setAdminVerificationRequired,
      setScanAttempts,
      addUser,
      updateUser,
      deleteUser,
      startScan,
      resetScan,
      simulateScanResult
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};