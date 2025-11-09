import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import FingerprintScanner from '../FingerprintScanner';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, XCircle, Fingerprint, ShieldAlert } from 'lucide-react';

interface FingerprintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FingerprintModal: React.FC<FingerprintModalProps> = ({ isOpen, onClose }) => {
  const { 
    scanStatus, 
    resetScan, 
    adminVerificationRequired, 
    setAdminVerificationRequired,
    scanAttempts
  } = useApp();
  
  const [scanPhase, setScanPhase] = useState<'initial' | 'admin-verification' | 'success' | 'failure'>('initial');
  
  useEffect(() => {
    if (isOpen) {
      setScanPhase('initial');
      resetScan();
    }
  }, [isOpen]);
  
  useEffect(() => {
    if (scanStatus.status === 'success' && scanPhase === 'admin-verification') {
      // Admin verification succeeded
      setTimeout(() => {
        setScanPhase('success');
      }, 1500);
    } else if (scanStatus.status === 'error' && scanAttempts >= 2) {
      // After second failure, simulate success
      setTimeout(() => {
        setScanPhase('success');
      }, 1500);
    } else if (scanStatus.status === 'error' && scanPhase === 'initial') {
      setScanPhase('failure');
    }
  }, [scanStatus, scanPhase, scanAttempts]);
  
  const handleInitialScanComplete = (success: boolean) => {
    if (!success) return;
    
    // After initial scan, require admin verification
    setTimeout(() => {
      setAdminVerificationRequired(true);
      setScanPhase('admin-verification');
    }, 1000);
  };
  
  const getModalContent = () => {
    switch (scanPhase) {
      case 'initial':
        return (
          <>
            <div className="text-center mb-6">
              <Fingerprint size={48} className="mx-auto text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Register Your Fingerprint</h3>
              <p className="text-gray-400">
                Place your finger on the scanner to register your biometric identity.
              </p>
            </div>
            
            <FingerprintScanner onScanComplete={handleInitialScanComplete} />
          </>
        );
        
      case 'admin-verification':
        return (
          <>
            <div className="text-center mb-6">
              <ShieldAlert size={48} className="mx-auto text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Administrator Verification Required</h3>
              <p className="text-gray-400">
                An administrator must scan their fingerprint to authorize this operation.
              </p>
            </div>
            
            <FingerprintScanner />
          </>
        );
        
      case 'failure':
        return (
          <>
            <div className="text-center mb-6">
              <XCircle size={48} className="mx-auto text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Fingerprints Do Not Match</h3>
              <p className="text-gray-400">
                The scanned fingerprint does not match the registered print in our system.
              </p>
            </div>
            
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button 
                variant="primary"
                onClick={() => {
                  resetScan();
                  setScanPhase('initial');
                }}
              >
                Try Again
              </Button>
            </div>
          </>
        );
        
      case 'success':
        return (
          <>
            <div className="text-center mb-6">
              <CheckCircle2 size={48} className="mx-auto text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Fingerprint Verified</h3>
              <p className="text-gray-400">
                Your fingerprint has been successfully verified. You now have access to the system.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Button 
                variant="primary"
                onClick={onClose}
              >
                Continue
              </Button>
            </div>
          </>
        );
    }
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={scanPhase === 'admin-verification' ? 'Administrator Verification' : 'Fingerprint Registration'}
      size="md"
    >
      {getModalContent()}
    </Modal>
  );
};

export default FingerprintModal;