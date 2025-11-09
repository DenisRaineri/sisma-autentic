import { User } from '../types';

export interface DatabaseUser extends User {
  fingerprintTemplate: Uint8Array;
  createdAt: Date;
  lastAccess?: Date;
}

export class DatabaseService {
  private static instance: DatabaseService;
  private users: Map<string, DatabaseUser> = new Map();

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  async initialize(): Promise<void> {
    // Simular inicialização do banco de dados
    this.loadInitialData();
  }

  private loadInitialData(): void {
    const adminTemplate = new Uint8Array(256);
    crypto.getRandomValues(adminTemplate);

    const adminUser: DatabaseUser = {
      id: 'admin-001',
      name: 'Administrador Sistema',
      username: 'admin',
      accessLevel: 'Administrator',
      fingerprintId: 'fp-admin-001',
      registered: new Date().toISOString(),
      fingerprintTemplate: adminTemplate,
      createdAt: new Date()
    };

    this.users.set(adminUser.id, adminUser);
  }

  async createUser(userData: Omit<DatabaseUser, 'id' | 'createdAt' | 'registered'>): Promise<string> {
    const id = `user-${Date.now()}`;
    const user: DatabaseUser = {
      ...userData,
      id,
      registered: new Date().toISOString(),
      createdAt: new Date()
    };

    this.users.set(id, user);
    return id;
  }

  async getUserById(id: string): Promise<DatabaseUser | null> {
    return this.users.get(id) || null;
  }

  async getUserByUsername(username: string): Promise<DatabaseUser | null> {
    for (const user of this.users.values()) {
      if (user.username === username) {
        return user;
      }
    }
    return null;
  }

  async getAllUsers(): Promise<DatabaseUser[]> {
    return Array.from(this.users.values());
  }

  async updateUser(id: string, updates: Partial<DatabaseUser>): Promise<boolean> {
    const user = this.users.get(id);
    if (!user) return false;

    this.users.set(id, { ...user, ...updates });
    return true;
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.users.delete(id);
  }

  async updateLastAccess(id: string): Promise<void> {
    const user = this.users.get(id);
    if (user) {
      user.lastAccess = new Date();
      this.users.set(id, user);
    }
  }

  async findUserByFingerprintTemplate(template: Uint8Array): Promise<DatabaseUser | null> {
    // Simular busca por template biométrico
    for (const user of this.users.values()) {
      // Em produção, usar algoritmo de comparação real
      if (this.compareTemplates(user.fingerprintTemplate, template)) {
        return user;
      }
    }
    return null;
  }

  private compareTemplates(stored: Uint8Array, scanned: Uint8Array): boolean {
    // Simulação simples - em produção usar algoritmo do DigitalPersona
    return Math.random() > 0.3;
  }
}