import React, { useState } from 'react';
import { Shield, Save, UserRoundCog, Fingerprint } from 'lucide-react';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Button from '../components/common/Button';
import FingerprintScanner from '../components/FingerprintScanner';
import { useApp } from '../context/AppContext';
import { getRandomFingerprint } from '../utils/mockData';

const AdminRegistration: React.FC = () => {
  const { scanStatus, resetScan, startScan } = useApp();
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    accessLevel: 'Administrator',
    fingerprintId: ''
  });
  
  const [isEditingFingerprint, setIsEditingFingerprint] = useState(false);
  const [isReplacing, setIsReplacing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleReplaceFingerprint = () => {
    setIsReplacing(true);
    setIsEditingFingerprint(true);
  };
  
  const handleScanComplete = (success: boolean) => {
    if (!success) return;
    
    // Simulate obtaining a new fingerprint ID
    const newFingerprintId = getRandomFingerprint();
    setFormData(prev => ({ ...prev, fingerprintId: newFingerprintId }));
    setIsEditingFingerprint(false);
    setIsReplacing(false);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };
  
  const accessLevelOptions = [
    { value: 'Administrator', label: 'Administrator' },
    { value: 'Supervisor', label: 'Supervisor' }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-900/20 p-2 rounded-lg">
            <UserRoundCog size={28} className="text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">Admin Registration</h1>
        </div>
        
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-400">
            <Shield size={20} />
            <span>Administrator Information</span>
          </h2>
          
          {showSuccess && (
            <div className="mb-6 p-3 bg-green-900/20 border border-green-800 rounded-lg text-green-400">
              Administrator profile updated successfully!
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Input
                label="Full Name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter admin's full name"
                required
              />
              
              <Input
                label="Username"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter username"
                required
              />
              
              <Select
                label="Access Level"
                id="accessLevel"
                value={formData.accessLevel}
                onChange={handleInputChange}
                options={accessLevelOptions}
                required
              />
            </div>
            
            <div className="border-t border-gray-800 pt-6 mb-6">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-white">
                <Fingerprint size={18} className="text-blue-400" />
                <span>Fingerprint Registration</span>
              </h3>
              
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/2">
                  {!isEditingFingerprint ? (
                    <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 text-center">
                      {formData.fingerprintId ? (
                        <>
                          <div className="mb-2">
                            <Fingerprint size={48} className="mx-auto text-green-400" />
                          </div>
                          <p className="text-white mb-2">Fingerprint Registered</p>
                          <p className="text-sm text-gray-400 mb-4">ID: {formData.fingerprintId}</p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={handleReplaceFingerprint}
                          >
                            Replace Fingerprint
                          </Button>
                        </>
                      ) : (
                        <>
                          <div className="mb-2">
                            <Fingerprint size={48} className="mx-auto text-gray-400" />
                          </div>
                          <p className="text-gray-300 mb-4">No fingerprint registered</p>
                          <Button 
                            variant="primary" 
                            size="sm" 
                            onClick={() => setIsEditingFingerprint(true)}
                          >
                            Register Fingerprint
                          </Button>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                      <h4 className="text-center text-lg mb-4">
                        {isReplacing ? 'Replace Fingerprint' : 'Register Fingerprint'}
                      </h4>
                      <FingerprintScanner onScanComplete={handleScanComplete} />
                    </div>
                  )}
                </div>
                
                <div className="w-full md:w-1/2">
                  <div className="bg-gray-800/50 p-4 rounded-lg text-sm text-gray-300">
                    <h4 className="font-medium text-blue-400 mb-2">Fingerprint Guidelines</h4>
                    <ul className="space-y-2">
                      <li>• Place your finger flat on the scanner</li>
                      <li>• Keep your finger centered and still</li>
                      <li>• Ensure your finger is clean and dry</li>
                      <li>• Maintain gentle pressure during scanning</li>
                      <li>• Follow on-screen instructions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                type="button"
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                icon={<Save size={16} />}
                disabled={!formData.name || !formData.username || !formData.fingerprintId}
              >
                Save Administrator
              </Button>
            </div>
          </form>
        </div>
        
        <div className="bg-blue-900/10 border border-blue-900/30 rounded-lg p-4 text-sm text-blue-300">
          <p className="flex items-center gap-1.5">
            <Shield size={16} />
            <span>Administrator accounts have full access to system functions and user management.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminRegistration;