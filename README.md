# SISMA-AUTENTIC

## Sistema de Identificação e Autenticação Biométrica

Interface web (SPA) para demonstrar controle de acesso com **níveis hierárquicos** e fluxo de **captura biométrica simulada**, no contexto de proteção de dados sensíveis (por exemplo, informações ambientais e propriedades rurais).

---

### Informações acadêmicas

| Campo | Valor |
|--------|--------|
| **Instituição** | Universidade Paulista (UNIP) |
| **Autor** | Denis Raineri |
| **Curso** | Ciência da Computação / Engenharia de Software |
| **Semestre** | 6º |

---

## Objetivo

Modelar um sistema de identificação e autenticação biométrica com interface gráfica, restringindo o acesso por perfil (**Administrator**, **Supervisor**, **Operator**, **Guest**), como base para integração futura com leitor **DigitalPersona U.are.U 4000** e persistência em banco relacional.

---

## O que o repositório entrega hoje

| Área | Implementação atual |
|------|---------------------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, React Router |
| **Estado global** | `AppContext` (usuários, leitura biométrica, modais) |
| **Biometria** | `BiometricService` com **simulação** (latência, qualidade aleatória, templates aleatórios). Substituição por SDK real descrita em [`README-INTEGRACAO.md`](./README-INTEGRACAO.md) |
| **Dados** | `DatabaseService` com **`Map` em memória** e usuário `admin` inicial; dados não sobrevivem ao recarregar a página |
| **Cadastro de usuários** | Formulário que exige leitura biométrica bem-sucedida; o template da última captura é enviado a `addUser` |

Ou seja: o projeto é um **protótipo executável** focado em arquitetura e UX, não um produto com hardware e SQLite ligados no código atual.

---

## Níveis de permissão

- **Administrator** — gestão completa e cadastros sensíveis (conceito no domínio do trabalho).
- **Supervisor** — relatórios e dados específicos, sem funções administrativas totais.
- **Operator** — operações corriqueiras de consulta.
- **Guest** — acesso mínimo / leitura.

---

## Tecnologias

- **React** 18.3 + **TypeScript**
- **Vite** 5
- **Tailwind CSS** 3, **PostCSS**, **Autoprefixer**
- **React Router** 6
- **Lucide React** (ícones)
- **ESLint** 9 + **typescript-eslint**

---

## Arquitetura e padrões

- **Singleton** — `BiometricService.getInstance()`, `DatabaseService.getInstance()`.
- **Context API** — `AppProvider` / `useApp()` centralizam usuários, escaneamento e última captura biométrica (`lastBiometricCapture`) usada no cadastro.
- **Camada de serviços** — isolamento da lógica de “hardware” e persistência.

Estrutura principal:

```
sisma-autentic/
├── src/
│   ├── components/       # UI, modais, FingerprintScanner
│   ├── context/          # AppContext.tsx
│   ├── pages/            # Home, AdminRegistration, UserRegistration
│   ├── services/         # BiometricService, DatabaseService
│   ├── types/
│   └── utils/
├── README-INTEGRACAO.md  # Roteiro para DigitalPersona + SQLite (exemplo)
└── public/
```

---

## Como executar

**Requisitos:** Node.js 18 ou superior.

```bash
git clone <url-do-repositório>
cd sisma-autentic
npm install
npm run dev
```

Outros scripts:

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento (Vite) |
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Pré-visualização do build |
| `npm run lint` | ESLint no projeto |

Não há `db:init` nem arquivo `.env` obrigatório nesta versão — a persistência é em memória.

---

## Integração futura (hardware e banco)

Passos conceituais e exemplos de código para trocar a simulação pelo SDK DigitalPersona e por **SQLite** (ou outro SGBD) estão em **[README-INTEGRACAO.md](./README-INTEGRACAO.md)**.

---

## Testes automatizados

Não há suíte de testes (Jest/Vitest) configurada no momento. A validação é manual via interface. Incluir testes de serviços e fluxos críticos é uma evolução recomendada para trabalhos futuros.

---

## Documentação de APIs (serviços)

### `BiometricService`

- `initialize()` — detecta (simulado) o leitor.
- `scanFingerprint()` — retorna template e qualidade simulados.
- `verifyFingerprint(stored, scanned)` — comparação simulada (não criptográfica).
- `isDeviceConnected()` — estado após `initialize()`.

### `DatabaseService`

- `createUser(payload)` — inclui `capturedAt` opcional para data da captura.
- `getUserByUsername`, `getAllUsers`, `updateUser`, `deleteUser`, `updateLastAccess`
- `findUserByFingerprintTemplate` — busca simulada.


---

## Licença e uso

Projeto acadêmico desenvolvido para a UNIP. Uso comercial ou redistribuição ampla exige autorização e respeito à licença indicada pela instituição/autor.

---

## Créditos

- **UNIP** — orientação e contexto acadêmico.
- Comunidade **open source** das ferramentas listadas acima.

---

_Documentação revisada em março de 2026 — alinhada ao código da branch atual._
