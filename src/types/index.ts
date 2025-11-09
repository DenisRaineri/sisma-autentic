export interface User {
  id: string;
  name: string;
  username: string;
  accessLevel: 'Administrator' | 'Supervisor' | 'Operator' | 'Guest';
  fingerprintId: string;
  registered: string; // ISO date string
}

export interface ScanStatus {
  isScanning: boolean;
  progress: number;
  status: 'idle' | 'scanning' | 'success' | 'error';
  message?: string;
  deviceConnected?: boolean;
  quality?: number;
}

export interface BiometricData {
  template: Uint8Array;
  quality: number;
  capturedAt: Date;
}

export type ErrorType = 'read_failure' | 'no_scanner' | 'timeout' | 'device_disconnected' | 'poor_quality' | null;

export interface AuthenticationResult {
  success: boolean;
  user?: User;
  error?: string;
  attempts?: number;
}