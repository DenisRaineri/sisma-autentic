/**
 * Simulação do leitor DigitalPersona para desenvolvimento e demonstração.
 * Para integração real, consulte `README-INTEGRACAO.md` e substitua as implementações.
 */
const MOCK_DEVICE_CHECK_MS = 1000;
const MOCK_SCAN_MS = 3000;
const MOCK_VERIFY_MS = 1000;
const DEVICE_CONNECT_FAIL_RATE = 0.1;
const MIN_ACCEPT_QUALITY = 30;
const VERIFY_MATCH_THRESHOLD = 0.7;

export interface BiometricTemplate {
  id: string;
  template: Uint8Array;
  quality: number;
}

export interface ScanResult {
  success: boolean;
  template?: BiometricTemplate;
  error?: string;
  quality?: number;
}

export class BiometricService {
  private static instance: BiometricService;
  private isInitialized = false;
  private deviceConnected = false;

  static getInstance(): BiometricService {
    if (!BiometricService.instance) {
      BiometricService.instance = new BiometricService();
    }
    return BiometricService.instance;
  }

  async initialize(): Promise<boolean> {
    try {
      this.deviceConnected = await this.checkDeviceConnection();
      this.isInitialized = true;
      return this.deviceConnected;
    } catch (error) {
      console.error('Erro ao inicializar leitor biométrico:', error);
      return false;
    }
  }

  private async checkDeviceConnection(): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.random() > DEVICE_CONNECT_FAIL_RATE);
      }, MOCK_DEVICE_CHECK_MS);
    });
  }

  async scanFingerprint(): Promise<ScanResult> {
    if (!this.isInitialized || !this.deviceConnected) {
      return {
        success: false,
        error: 'Dispositivo não conectado ou não inicializado'
      };
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        const quality = Math.floor(Math.random() * 100);

        if (quality < MIN_ACCEPT_QUALITY) {
          resolve({
            success: false,
            error: 'Qualidade da impressão digital muito baixa',
            quality,
          });
        } else {
          const template = new Uint8Array(256);
          crypto.getRandomValues(template);

          resolve({
            success: true,
            template: {
              id: `template-${Date.now()}`,
              template,
              quality,
            },
            quality,
          });
        }
      }, MOCK_SCAN_MS);
    });
  }

  async verifyFingerprint(storedTemplate: Uint8Array, scannedTemplate: Uint8Array): Promise<boolean> {
    void storedTemplate;
    void scannedTemplate;
    return new Promise((resolve) => {
      setTimeout(() => {
        const similarity = Math.random();
        resolve(similarity > VERIFY_MATCH_THRESHOLD);
      }, MOCK_VERIFY_MS);
    });
  }

  isDeviceConnected(): boolean {
    return this.deviceConnected;
  }
}