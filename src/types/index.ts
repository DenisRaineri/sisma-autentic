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
}

export type ErrorType = 'read_failure' | 'no_scanner' | 'timeout' | null;