import React, { useEffect } from 'react';
import { Fingerprint } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Button from './common/Button';

interface FingerprintScannerProps {
  onScanComplete?: (success: boolean) => void;
  autoStart?: boolean;
  showInstructions?: boolean;
}

const FingerprintScanner: React.FC<FingerprintScannerProps> = ({ 
  onScanComplete,
  autoStart = false,
  showInstructions = true
}) => {
  const { scanStatus, startScan, resetScan, scanAttempts } = useApp();
  
  useEffect(() => {
    if (autoStart) {
      startScan();
    }
    
    return () => resetScan();
  }, [autoStart]);
  
  useEffect(() => {
    if (scanStatus.status === 'success' || scanStatus.status === 'error') {
      if (onScanComplete) {
        onScanComplete(scanStatus.status === 'success');
      }
    }
  }, [scanStatus.status, onScanComplete]);

  const getStatusColor = () => {
    switch (scanStatus.status) {
      case 'scanning': return 'text-blue-400';
      case 'success': return 'text-green-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getPulseAnimation = () => {
    return scanStatus.isScanning ? 'animate-pulse' : '';
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className={`w-48 h-64 bg-gray-800 border-2 border-gray-700 rounded-lg flex items-center justify-center mb-4 
                   relative overflow-hidden ${getPulseAnimation()}`}
      >
        {/* Scanner background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900 to-gray-900"></div>
        
        {/* Scanner light effect */}
        {scanStatus.isScanning && (
          <div 
            className="absolute top-0 left-0 w-full h-1 bg-blue-400 opacity-70"
            style={{ 
              transform: `translateY(${scanStatus.progress}%)`,
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.7), 0 0 20px rgba(59, 130, 246, 0.5)'
            }}
          ></div>
        )}
        
        <Fingerprint 
          className={`w-24 h-24 ${getStatusColor()}`} 
        />
        
        {/* Progress overlay */}
        {scanStatus.isScanning && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
            <div 
              className="h-full bg-blue-500"
              style={{ width: `${scanStatus.progress}%` }}
            ></div>
          </div>
        )}
      </div>
      
      {showInstructions && (
        <div className="text-center mb-4">
          <p className="text-gray-300">
            {scanStatus.isScanning 
              ? 'Place your finger on the scanner' 
              : scanStatus.message || 'Press the button to start scanning'}
          </p>
          {scanStatus.status === 'error' && scanAttempts > 0 && (
            <p className="text-yellow-400 text-sm mt-1">
              Attempt {scanAttempts} failed. Please try again.
            </p>
          )}
        </div>
      )}
      
      {!scanStatus.isScanning && scanStatus.status !== 'success' && (
        <Button 
          onClick={startScan}
          variant="primary"
          icon={<Fingerprint size={16} />}
        >
          {scanStatus.status === 'error' ? 'Try Again' : 'Start Scan'}
        </Button>
      )}
    </div>
  );
};

export default FingerprintScanner;