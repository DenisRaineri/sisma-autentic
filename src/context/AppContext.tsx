import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, ScanStatus, ErrorType, AuthenticationResult, BiometricData } from '../types';
import { BiometricService } from '../services/BiometricService';
import { DatabaseService } from '../services/DatabaseService';

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
  addUser: (user: Omit<User, 'id' | 'registered'>, biometricData: BiometricData) => Promise<boolean>;
  updateUser: (id: string, data: Partial<User>) => Promise<boolean>;
  deleteUser: (id: string) => Promise<boolean>;
  startScan: () => Promise<void>;
  resetScan: () => void;
  authenticateUser: (username: string) => Promise<AuthenticationResult>;
  initializeServices: () => Promise<boolean>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [scanStatus, setScanStatus] = useState<ScanStatus>({
    isScanning: false,
    progress: 0,
    status: 'idle',
    deviceConnected: false
  });
  const [errorType, setErrorType] = useState<ErrorType>(null);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isFingerprintModalOpen, setIsFingerprintModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [adminVerificationRequired, setAdminVerificationRequired] = useState(false);
  const [scanAttempts, setScanAttempts] = useState(0);

  const biometricService = BiometricService.getInstance();
  const databaseService = DatabaseService.getInstance();

  const initializeServices = async (): Promise<boolean> => {
    try {
      await databaseService.initialize();
      const biometricInitialized = await biometricService.initialize();
      
      setScanStatus(prev => ({
        ...prev,
        deviceConnected: biometricInitialized
      }));
      
      if (!biometricInitialized) {
        setErrorType('no_scanner');
      }
      
      // Carregar usuários do banco
      const dbUsers = await databaseService.getAllUsers();
      setUsers(dbUsers.map(u => ({
        id: u.id,
        name: u.name,
        username: u.username,
        accessLevel: u.accessLevel,
        fingerprintId: u.fingerprintId,
        registered: u.registered
      })));
      
      return biometricInitialized;
    } catch (error) {
      console.error('Erro ao inicializar serviços:', error);
      return false;
    }
  };

  const addUser = async (user: Omit<User, 'id' | 'registered'>, biometricData: BiometricData): Promise<boolean> => {
    try {
      const userId = await databaseService.createUser({
        ...user,
        fingerprintTemplate: biometricData.template,
        createdAt: biometricData.capturedAt
      });
      
      const newUser: User = {
        ...user,
        id: userId,
        registered: new Date().toISOString()
      };
      
      setUsers(prev => [...prev, newUser]);
      return true;
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      return false;
    }
  };

  const updateUser = async (id: string, data: Partial<User>): Promise<boolean> => {
    try {
      const success = await databaseService.updateUser(id, data);
      if (success) {
        setUsers(prev => prev.map(user => 
          user.id === id ? { ...user, ...data } : user
        ));
      }
      return success;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return false;
    }
  };

  const deleteUser = async (id: string): Promise<boolean> => {
    try {
      const success = await databaseService.deleteUser(id);
      if (success) {
        setUsers(prev => prev.filter(user => user.id !== id));
      }
      return success;
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      return false;
    }
  };

  const startScan = async (): Promise<void> => {
    if (!biometricService.isDeviceConnected()) {
      setErrorType('device_disconnected');
      setIsErrorModalOpen(true);
      return;
    }

    setScanStatus({
      isScanning: true,
      progress: 0,
      status: 'scanning',
      deviceConnected: true
    });

    // Progress simulation
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

    try {
      const result = await biometricService.scanFingerprint();
      clearInterval(interval);
      
      if (result.success && result.template) {
        setScanStatus({
          isScanning: false,
          progress: 100,
          status: 'success',
          message: 'Impressão digital capturada com sucesso',
          quality: result.quality,
          deviceConnected: true
        });
      } else {
        setScanAttempts(prev => prev + 1);
        setScanStatus({
          isScanning: false,
          progress: 0,
          status: 'error',
          message: result.error || 'Falha na captura',
          deviceConnected: true
        });
        
        if (result.error?.includes('qualidade')) {
          setErrorType('poor_quality');
        } else {
          setErrorType('read_failure');
        }
      }
    } catch (error) {
      clearInterval(interval);
      setScanStatus({
        isScanning: false,
        progress: 0,
        status: 'error',
        message: 'Erro durante a captura',
        deviceConnected: false
      });
      setErrorType('read_failure');
    }
  };

  const resetScan = () => {
    setScanStatus({
      isScanning: false,
      progress: 0,
      status: 'idle'
    });
    setErrorType(null);
  };

  const authenticateUser = async (username: string): Promise<AuthenticationResult> => {
    try {
      const user = await databaseService.getUserByUsername(username);
      if (!user) {
        return { success: false, error: 'Usuário não encontrado' };
      }

      const scanResult = await biometricService.scanFingerprint();
      if (!scanResult.success || !scanResult.template) {
        return { 
          success: false, 
          error: scanResult.error || 'Falha na captura biométrica',
          attempts: scanAttempts + 1
        };
      }

      const isMatch = await biometricService.verifyFingerprint(
        user.fingerprintTemplate,
        scanResult.template.template
      );

      if (isMatch) {
        await databaseService.updateLastAccess(user.id);
        setCurrentUser({
          id: user.id,
          name: user.name,
          username: user.username,
          accessLevel: user.accessLevel,
          fingerprintId: user.fingerprintId,
          registered: user.registered
        });
        setScanAttempts(0);
        return { success: true, user };
      } else {
        setScanAttempts(prev => prev + 1);
        return { 
          success: false, 
          error: 'Impressão digital não confere',
          attempts: scanAttempts + 1
        };
      }
    } catch (error) {
      console.error('Erro na autenticação:', error);
      return { success: false, error: 'Erro interno do sistema' };
    }
  };

  useEffect(() => {
    initializeServices();
  }, []);

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
      authenticateUser,
      initializeServices
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