# SISMA-AUTENTIC

## Sistema de Identificação e Autenticação Biométrica

---

### 📋 Informações do Projeto

**Instituição:** Universidade Paulista (UNIP)  
**Desenvolvedor:** Denis Raineri  
**Semestre:** 6º Semestre  
**Ano:** 2024  
**Curso:** Ciência da Computação / Engenharia de Software

---

## 🎯 Objetivo

Desenvolver um sistema de identificação e autenticação biométrica com interface gráfica para restringir o acesso de usuários a um banco de dados sensível contendo informações sobre propriedades rurais que utilizam agrotóxicos proibidos, conforme dados do Ministério do Meio Ambiente.

## 🔐 Níveis de Segurança

O sistema implementa **três níveis de permissão** hierárquicos:

### 🔴 Administrator

- Acesso completo ao sistema
- Gerenciamento de usuários
- Configurações avançadas
- Acesso a todos os dados sensíveis

### 🟡 Supervisor

- Visualização de relatórios completos
- Acesso a dados específicos
- Sem permissões administrativas

### 🟢 Operator

- Operações básicas de consulta
- Relatórios limitados
- Acesso restrito

### ⚪ Guest

- Visualização apenas de dados públicos
- Acesso mínimo ao sistema

---

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React.js** 18.3.1 - Framework principal
- **TypeScript** - Type safety e desenvolvimento robusto
- **Tailwind CSS** - Estilização responsiva
- **Lucide React** - Ícones modernos
- **React Router DOM** - Navegação SPA

### Hardware Biométrico

- **DigitalPersona U.are.U 4000** - Leitor de impressões digitais
- Precisão e confiabilidade reconhecidas no mercado
- SDK proprietário para integração

### Banco de Dados

- **SQLite** - Dados relacionais dos usuários
- **Sistema Proprietário DigitalPersona** - Templates biométricos criptografados
- Arquitetura híbrida para máxima segurança

### Ferramentas de Desenvolvimento

- **Vite** - Build tool e desenvolvimento
- **ESLint** - Qualidade de código
- **PostCSS** - Processamento CSS

---

## 🏗️ Arquitetura do Sistema

### Padrões de Projeto Implementados

#### Singleton Pattern

```typescript
// BiometricService e DatabaseService
static getInstance(): BiometricService {
  if (!BiometricService.instance) {
    BiometricService.instance = new BiometricService();
  }
  return BiometricService.instance;
}
```

#### Context Pattern (React)

```typescript
// AppContext para gerenciamento de estado global
const AppContext = createContext<AppContextType | undefined>(undefined);
```

#### Service Layer Pattern

- `BiometricService` - Comunicação com hardware
- `DatabaseService` - Persistência de dados

### Estrutura de Diretórios

```
sisma-autentic/
├── src/
│   ├── components/          # Componentes React
│   │   ├── common/         # Componentes reutilizáveis
│   │   ├── layout/         # Layout da aplicação
│   │   ├── modals/         # Modais do sistema
│   │   └── FingerprintScanner.tsx
│   ├── context/            # Context API
│   ├── pages/              # Páginas principais
│   ├── services/           # Serviços de negócio
│   ├── types/              # Definições TypeScript
│   └── utils/              # Utilitários
├── public/                 # Arquivos estáticos
└── docs/                   # Documentação
```

---

## 🔧 Funcionalidades Principais

### 1. Autenticação Biométrica

- Captura de impressões digitais em tempo real
- Verificação de qualidade automática
- Feedback visual durante o processo
- Detecção automática do dispositivo

### 2. Gerenciamento de Usuários

- Cadastro com verificação biométrica dupla
- Edição de perfis e permissões
- Exclusão segura de usuários
- Histórico de acessos

### 3. Controle de Acesso

- Autenticação de dois fatores (usuário + biometria)
- Níveis hierárquicos de permissão
- Timeout automático de sessão
- Log de auditoria completo

### 4. Interface Responsiva

- Design moderno e intuitivo
- Feedback visual em tempo real
- Indicadores de status do dispositivo
- Mensagens de erro contextuais

---

## 📊 Especificações Técnicas

### Requisitos de Hardware

- **Leitor Biométrico:** DigitalPersona U.are.U 4000
- **Conexão:** USB 2.0 ou superior
- **Sistema Operacional:** Windows 10/11
- **RAM:** Mínimo 4GB
- **Armazenamento:** 500MB livres

### Métricas de Performance

- **Tempo de Autenticação:** < 3 segundos
- **Taxa de Falsa Aceitação (FAR):** < 0,001%
- **Taxa de Falsa Rejeição (FRR):** < 1%
- **Qualidade Mínima:** 70% para aceitar template

### Segurança Implementada

- Templates biométricos criptografados
- Dados não reversíveis (impossível reconstruir impressão)
- Logs de auditoria com timestamp
- Backup automático de dados críticos
- Timeout de sessão configurável

---

## 🚀 Instalação e Configuração

### Pré-requisitos

1. Node.js 18+ instalado
2. DigitalPersona U.are.U 4000 conectado
3. Drivers do dispositivo instalados
4. SDK DigitalPersona configurado

### Passos de Instalação

```bash
# 1. Clonar o repositório
git clone [repositorio-do-projeto]
cd sisma-autentic

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env

# 4. Inicializar banco de dados
npm run db:init

# 5. Executar em modo desenvolvimento
npm run dev

# 6. Build para produção
npm run build
```

### Configuração do Dispositivo

1. Conectar DigitalPersona U.are.U 4000 via USB
2. Instalar drivers oficiais do fabricante
3. Verificar detecção no Gerenciador de Dispositivos
4. Testar captura através da aplicação

---

## 📈 Dados Protegidos

### Informações Sensíveis Gerenciadas

- Propriedades rurais com uso de agrotóxicos proibidos
- Dados do Ministério do Meio Ambiente
- Relatórios de conformidade ambiental
- Histórico de infrações e penalidades
- Coordenadas geográficas de propriedades
- Informações de proprietários e responsáveis

### Conformidade Legal

- LGPD (Lei Geral de Proteção de Dados)
- Regulamentações do Ministério do Meio Ambiente
- Normas ISO 27001 para segurança da informação
- Padrões internacionais de biometria (ISO/IEC 24745)

---

## 🧪 Testes e Validação

### Testes Implementados

- **Unitários:** Serviços e utilitários
- **Integração:** Comunicação com hardware
- **Usabilidade:** Interface e experiência do usuário
- **Segurança:** Tentativas de acesso não autorizado
- **Performance:** Tempos de resposta e throughput

### Cenários de Teste

1. Autenticação com usuário válido
2. Tentativas de acesso com credenciais inválidas
3. Falhas de hardware (dispositivo desconectado)
4. Qualidade insuficiente de impressão digital
5. Timeout de sessão
6. Múltiplas tentativas consecutivas

---

## 📚 Documentação Técnica

### APIs Principais

#### BiometricService

```typescript
class BiometricService {
  async initialize(): Promise<boolean>;
  async scanFingerprint(): Promise<ScanResult>;
  async verifyFingerprint(
    stored: Uint8Array,
    scanned: Uint8Array,
  ): Promise<boolean>;
  isDeviceConnected(): boolean;
}
```

#### DatabaseService

```typescript
class DatabaseService {
  async createUser(userData: UserData): Promise<string>;
  async getUserByUsername(username: string): Promise<DatabaseUser | null>;
  async updateLastAccess(id: string): Promise<void>;
  async findUserByFingerprintTemplate(
    template: Uint8Array,
  ): Promise<DatabaseUser | null>;
}
```

### Fluxo de Autenticação

1. Usuário insere nome de usuário
2. Sistema solicita impressão digital
3. Captura e validação de qualidade
4. Comparação com template armazenado
5. Concessão ou negação de acesso
6. Log da tentativa de autenticação

---

## 🔮 Trabalhos Futuros

### Melhorias Planejadas

- Integração com Active Directory
- Autenticação multimodal (face + impressão digital)
- Dashboard de analytics e relatórios
- API REST para integração externa
- Aplicativo mobile para administradores
- Backup automático em nuvem
- Algoritmos de ML para detecção de fraude

### Escalabilidade

- Suporte a múltiplos dispositivos biométricos
- Arquitetura distribuída para múltiplas estações
- Sincronização de dados em tempo real
- Load balancing para alta disponibilidade

---

## 📞 Suporte e Contato

**Desenvolvedor:** Denis Raineri  
**Instituição:** UNIP - Universidade Paulista  
**Email:** [email-do-desenvolvedor]  
**LinkedIn:** [perfil-linkedin]

### Suporte Técnico

- Documentação oficial DigitalPersona
- Comunidade de desenvolvedores React
- Fóruns especializados em biometria
- Suporte acadêmico UNIP

---

## 📄 Licença e Direitos Autorais

Este projeto foi desenvolvido como trabalho acadêmico para a Universidade Paulista (UNIP) por Denis Raineri. Todos os direitos reservados conforme legislação acadêmica vigente.

**Uso Acadêmico:** Permitido para fins educacionais  
**Uso Comercial:** Requer autorização expressa  
**Modificações:** Permitidas com devida atribuição

---

## 🏆 Reconhecimentos

- **UNIP** - Pela infraestrutura e orientação acadêmica
- **DigitalPersona** - Pela tecnologia biométrica confiável
- **Comunidade Open Source** - Pelas ferramentas e bibliotecas utilizadas
- **Ministério do Meio Ambiente** - Pela relevância dos dados protegidos

---

_Documentação gerada em 2024 - Versão 1.0_  
_Sistema SISMA-AUTENTIC - Denis Raineri - UNIP_
