import React, { useState } from 'react';
import { Fingerprint, Check, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BiometricData } from '../types';
import Button from './common/Button';
import FingerprintScanner from './FingerprintScanner';

interface BiometricRegistrationProps {
  onComplete: (biometricData: BiometricData) => void;
  onCancel: () => void;
}

const BiometricRegistration: React.FC<BiometricRegistrationProps> = ({ 
  onComplete, 
  onCancel 
}) => {
  const { scanStatus } = useApp();
  const [capturedData, setCapturedData] = useState<BiometricData | null>(null);
  const [step, setStep] = useState<'capture' | 'verify' | 'complete'>('capture');

  const handleScanComplete = (success: boolean) => {
    if (success && scanStatus.quality && scanStatus.quality >= 70) {
      const biometricData: BiometricData = {
        template: new Uint8Array(256), // Em produção, usar dados reais do scanner
        quality: scanStatus.quality,
        capturedAt: new Date()
      };
      
      setCapturedData(biometricData);
      setStep('verify');
    }
  };

  const handleVerificationComplete = (success: boolean) => {
    if (success && capturedData) {
      setStep('complete');
      setTimeout(() => {
        onComplete(capturedData);
      }, 2000);
    } else {
      setStep('capture');
      setCapturedData(null);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'capture':
        return (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Captura Biométrica</h3>
            <p className="text-gray-400 mb-6">
              Coloque o dedo no leitor para capturar sua impressão digital
            </p>
            <FingerprintScanner 
              onScanComplete={handleScanComplete}
              showInstructions={true}
            />
          </div>
        );

      case 'verify':
        return (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Verificação Biométrica</h3>
            <p className="text-gray-400 mb-6">
              Coloque o mesmo dedo novamente para verificar a captura
            </p>
            <div className="mb-4">
              <div className="flex items-center justify-center mb-2">
                <Check className="w-6 h-6 text-green-400 mr-2" />
                <span className="text-green-400">
                  Primeira captura: {capturedData?.quality}% qualidade
                </span>
              </div>
            </div>
            <FingerprintScanner 
              onScanComplete={handleVerificationComplete}
              showInstructions={true}
            />
          </div>
        );

      case 'complete':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Registro Concluído!</h3>
            <p className="text-gray-400">
              Impressão digital registrada com sucesso
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      {renderStep()}
      
      {step === 'capture' && (
        <div className="flex justify-center mt-6">
          <Button onClick={onCancel} variant="secondary">
            Cancelar
          </Button>
        </div>
      )}
    </div>
  );
};

export default BiometricRegistration;