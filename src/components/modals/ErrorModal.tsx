import React from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { AlertOctagon, WifiOff, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose }) => {
  const { errorType } = useApp();
  
  const getErrorDetails = () => {
    switch (errorType) {
      case 'read_failure':
        return {
          title: 'Fingerprint Read Failure',
          icon: <AlertOctagon size={48} className="text-yellow-500" />,
          message: 'The system was unable to read your fingerprint properly. This could be due to poor placement or dirty sensor surface.',
          actions: [
            'Clean the scanner surface with the provided cloth',
            'Ensure your finger is clean and dry',
            'Place your finger flat on the center of the scanner',
            'Maintain gentle pressure throughout the scan'
          ]
        };
      case 'no_scanner':
        return {
          title: 'No Scanner Detected',
          icon: <WifiOff size={48} className="text-red-500" />,
          message: 'The system cannot detect a connected fingerprint scanner. The device may be disconnected or malfunctioning.',
          actions: [
            'Check that the scanner is properly connected',
            'Verify the scanner power indicator is lit',
            'Try reconnecting the scanner to a different port',
            'Contact system administrator if problem persists'
          ]
        };
      case 'timeout':
        return {
          title: 'Scan Timeout',
          icon: <Clock size={48} className="text-orange-500" />,
          message: 'The fingerprint scan took too long to complete. The system has timed out for security reasons.',
          actions: [
            'Ensure your finger remains still during scanning',
            'Try again with proper finger placement',
            'Avoid moving your finger during the scan process',
            'If the problem persists, contact technical support'
          ]
        };
      default:
        return {
          title: 'Unknown Error',
          icon: <AlertOctagon size={48} className="text-red-500" />,
          message: 'An unknown error has occurred with the fingerprint scanning system.',
          actions: [
            'Try again',
            'Restart the application',
            'Contact system administrator if problem persists'
          ]
        };
    }
  };
  
  const errorDetails = getErrorDetails();
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={errorDetails.title}
      size="md"
    >
      <div className="flex flex-col items-center text-center mb-6">
        {errorDetails.icon}
        <p className="mt-4 text-gray-300">{errorDetails.message}</p>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h4 className="text-blue-400 font-medium mb-2">Recommended Actions:</h4>
        <ul className="space-y-2">
          {errorDetails.actions.map((action, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-block h-5 w-5 rounded-full bg-blue-900 text-white text-xs flex items-center justify-center mr-2 mt-0.5">
                {index + 1}
              </span>
              <span className="text-gray-300">{action}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-gray-800/50 p-3 rounded-lg text-sm text-gray-400 mb-6">
        <p>Error code: {errorType === 'read_failure' ? 'E-RF001' : errorType === 'no_scanner' ? 'E-NS002' : 'E-TO003'}</p>
        <p>If this error persists, please contact your system administrator.</p>
      </div>
      
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onClose}>
          Try Again
        </Button>
      </div>
    </Modal>
  );
};

export default ErrorModal;