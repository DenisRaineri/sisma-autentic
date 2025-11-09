import { User } from '../types';

export const generateMockUsers = (count: number = 5): User[] => {
  const accessLevels: User['accessLevel'][] = [
    'Administrator', 
    'Supervisor', 
    'Operator', 
    'Guest'
  ];

  const mockUsers: User[] = [];

  // Always include one admin user
  mockUsers.push({
    id: 'user-admin',
    name: 'Admin User',
    username: 'admin',
    accessLevel: 'Administrator',
    fingerprintId: `fp-${Math.random().toString(36).substring(2, 10)}`,
    registered: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString() // 90 days ago
  });

  // Generate the rest randomly
  for (let i = 1; i < count; i++) {
    const accessLevel = accessLevels[Math.floor(Math.random() * accessLevels.length)];
    
    mockUsers.push({
      id: `user-${i}`,
      name: `User ${i}`,
      username: `user${i}`,
      accessLevel,
      fingerprintId: `fp-${Math.random().toString(36).substring(2, 10)}`,
      registered: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
    });
  }

  return mockUsers;
};

export const getRandomFingerprint = (): string => {
  return `fp-${Math.random().toString(36).substring(2, 10)}`;
};