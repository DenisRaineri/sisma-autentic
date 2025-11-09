import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Fingerprint, ShieldCheck, Users, Activity } from 'lucide-react';
import Button from '../components/common/Button';
import { useApp } from '../context/AppContext';

const Home: React.FC = () => {
  const { setIsFingerprintModalOpen, users } = useApp();
  const navigate = useNavigate();
  
  const stats = [
    {
      title: 'Registered Users',
      value: users.length,
      icon: <Users size={20} className="text-blue-400" />,
      color: 'bg-blue-900/20 border-blue-800'
    },
    {
      title: 'Fingerprints Registered',
      value: users.length,
      icon: <Fingerprint size={20} className="text-green-400" />,
      color: 'bg-green-900/20 border-green-800'
    },
    {
      title: 'Security Level',
      value: 'AAA',
      icon: <ShieldCheck size={20} className="text-purple-400" />,
      color: 'bg-purple-900/20 border-purple-800'
    },
    {
      title: 'System Status',
      value: 'Online',
      icon: <Activity size={20} className="text-amber-400" />,
      color: 'bg-amber-900/20 border-amber-800'
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Secure Access Control <span className="text-blue-400">Biometric System</span>
            </h1>
            <p className="text-gray-300 mb-6 text-lg">
              Welcome to the SecurePrint biometric access control system. 
              Register and manage fingerprints for secure facility access with advanced authentication.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => setIsFingerprintModalOpen(true)}
                variant="primary"
                size="lg"
                icon={<Fingerprint size={18} />}
              >
                Register Your Fingerprint
              </Button>
              <Button 
                onClick={() => navigate('/user-registration')}
                variant="outline"
                size="lg"
                icon={<Users size={18} />}
              >
                Manage Users
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-64 h-80 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl border border-gray-700 flex items-center justify-center shadow-lg">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
              <Fingerprint className="w-32 h-32 text-blue-500 opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 bg-gray-900 text-center p-4 rounded-b-xl border-t border-gray-800">
                <div className="text-sm text-gray-400">System Ready</div>
                <div className="text-blue-400 text-lg font-medium">Place Finger to Scan</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border ${stat.color} flex items-center`}
            >
              <div className="mr-4">{stat.icon}</div>
              <div>
                <h3 className="text-gray-400 text-sm">{stat.title}</h3>
                <div className="text-white text-xl font-medium">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="bg-blue-900/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Fingerprint size={24} className="text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Biometric Registration</h3>
            <p className="text-gray-400">
              Register fingerprints with our advanced biometric scanner for secure access control.
            </p>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="bg-green-900/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Users size={24} className="text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">User Management</h3>
            <p className="text-gray-400">
              Add, edit, and manage user accounts with different access levels and permissions.
            </p>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="bg-purple-900/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <ShieldCheck size={24} className="text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Access Control</h3>
            <p className="text-gray-400">
              Maintain strict access control with different security levels and authentication factors.
            </p>
          </div>
        </div>
        
        {/* System Status */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-white">System Status</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-800">
              <span className="text-gray-300">Scanner Status</span>
              <span className="flex items-center text-green-400">
                <span className="h-2 w-2 rounded-full bg-green-400 mr-2"></span>
                Connected
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-800">
              <span className="text-gray-300">Database Status</span>
              <span className="flex items-center text-green-400">
                <span className="h-2 w-2 rounded-full bg-green-400 mr-2"></span>
                Online
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-800">
              <span className="text-gray-300">Last System Update</span>
              <span className="text-gray-300">April 10, 2025</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Security Level</span>
              <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-sm">
                Maximum
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;