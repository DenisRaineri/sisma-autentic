import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Fingerprint, ShieldCheck, Users, Activity } from 'lucide-react';
import Button from '../components/common/Button';
import { useApp } from '../context/AppContext';

const Home: React.FC = () => {
  const { setIsFingerprintModalOpen, users, scanStatus } = useApp();
  const navigate = useNavigate();
  
  const scannerOk = scanStatus.deviceConnected === true;

  const stats = [
    {
      title: 'Usuários cadastrados',
      value: users.length,
      icon: <Users size={20} className="text-blue-400" />,
      color: 'bg-blue-900/20 border-blue-800',
    },
    {
      title: 'Biometrias registradas',
      value: users.length,
      icon: <Fingerprint size={20} className="text-green-400" />,
      color: 'bg-green-900/20 border-green-800',
    },
    {
      title: 'Nível de segurança',
      value: 'AAA',
      icon: <ShieldCheck size={20} className="text-purple-400" />,
      color: 'bg-purple-900/20 border-purple-800',
    },
    {
      title: 'Status do sistema',
      value: scannerOk ? 'Operacional' : 'Leitor indisponível',
      icon: <Activity size={20} className="text-amber-400" />,
      color: 'bg-amber-900/20 border-amber-800',
    },
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              SISMA-AUTENTIC — <span className="text-blue-400">controle de acesso biométrico</span>
            </h1>
            <p className="text-gray-300 mb-6 text-lg">
              Sistema de identificação e autenticação para proteção de dados sensíveis. Cadastre biometrias e
              gerencie usuários com níveis hierárquicos de permissão.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => setIsFingerprintModalOpen(true)}
                variant="primary"
                size="lg"
                icon={<Fingerprint size={18} />}
              >
                Registrar biometria
              </Button>
              <Button 
                onClick={() => navigate('/user-registration')}
                variant="outline"
                size="lg"
                icon={<Users size={18} />}
              >
                Gerenciar usuários
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-64 h-80 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl border border-gray-700 flex items-center justify-center shadow-lg">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
              <Fingerprint className="w-32 h-32 text-blue-500 opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 bg-gray-900 text-center p-4 rounded-b-xl border-t border-gray-800">
                <div className="text-sm text-gray-400">{scannerOk ? 'Sistema pronto' : 'Aguardando leitor'}</div>
                <div className="text-blue-400 text-lg font-medium">
                  {scannerOk ? 'Apoie o dedo no leitor' : 'Conecte o DigitalPersona U.are.U'}
                </div>
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
            <h3 className="text-xl font-semibold mb-2 text-white">Registro biométrico</h3>
            <p className="text-gray-400">
              Captura simulada ou real (via SDK) para associar templates seguros aos usuários.
            </p>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="bg-green-900/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Users size={24} className="text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Gestão de usuários</h3>
            <p className="text-gray-400">
              Inclusão, edição e exclusão de contas com níveis Administrator, Supervisor, Operator e Guest.
            </p>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="bg-purple-900/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <ShieldCheck size={24} className="text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Controle de acesso</h3>
            <p className="text-gray-400">
              Autenticação combinando identificação e biometria, com estado global centralizado na aplicação.
            </p>
          </div>
        </div>
        
        {/* System Status */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-white">Status do sistema</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-800">
              <span className="text-gray-300">Leitor biométrico</span>
              <span
                className={`flex items-center ${scannerOk ? 'text-green-400' : 'text-amber-400'}`}
              >
                <span
                  className={`h-2 w-2 rounded-full mr-2 ${scannerOk ? 'bg-green-400' : 'bg-amber-400'}`}
                ></span>
                {scannerOk ? 'Conectado (simulado)' : 'Não detectado'}
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-800">
              <span className="text-gray-300">Persistência</span>
              <span className="flex items-center text-green-400">
                <span className="h-2 w-2 rounded-full bg-green-400 mr-2"></span>
                Em memória (Map)
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-800">
              <span className="text-gray-300">Documentação de integração</span>
              <span className="text-gray-300">README-INTEGRACAO.md</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Nível de segurança</span>
              <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-sm">
                Demonstração
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;