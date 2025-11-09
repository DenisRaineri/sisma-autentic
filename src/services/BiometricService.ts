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
        resolve(Math.random() > 0.1);
      }, 1000);
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
        
        if (quality < 30) {
          resolve({
            success: false,
            error: 'Qualidade da impressão digital muito baixa',
            quality
          });
        } else {
          const template = new Uint8Array(256);
          crypto.getRandomValues(template);
          
          resolve({
            success: true,
            template: {
              id: `template-${Date.now()}`,
              template,
              quality
            },
            quality
          });
        }
      }, 3000);
    });
  }

  async verifyFingerprint(storedTemplate: Uint8Array, scannedTemplate: Uint8Array): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const similarity = Math.random();
        resolve(similarity > 0.7);
      }, 1000);
    });
  }

  isDeviceConnected(): boolean {
    return this.deviceConnected;
  }
}