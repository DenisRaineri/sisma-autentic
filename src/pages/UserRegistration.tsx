import React, { useState, useEffect } from 'react';
import { 
  Users, UserPlus, Pencil, Trash2, Check, X, ChevronDown, Fingerprint, Filter, Search,
  ArrowUpDown, Shield, Save, AlertCircle
} from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import FingerprintScanner from '../components/FingerprintScanner';
import { useApp } from '../context/AppContext';
import { User } from '../types';
import { getRandomFingerprint } from '../utils/mockData';

const UserRegistration: React.FC = () => {
  const { users, addUser, updateUser, deleteUser } = useApp();
  
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAccessLevel, setFilterAccessLevel] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'accessLevel' | 'registered'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    accessLevel: 'Operator',
    fingerprintId: ''
  });
  
  const [isScanning, setIsScanning] = useState(false);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);
  
  const resetForm = () => {
    setFormData({
      name: '',
      username: '',
      accessLevel: 'Operator',
      fingerprintId: ''
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleScanStart = () => {
    setIsScanning(true);
  };
  
  const handleScanComplete = (success: boolean) => {
    if (!success) return;
    
    // Simulate obtaining a new fingerprint ID
    const newFingerprintId = getRandomFingerprint();
    setFormData(prev => ({ ...prev, fingerprintId: newFingerprintId }));
    setIsScanning(false);
  };
  
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addUser({
      name: formData.name,
      username: formData.username,
      accessLevel: formData.accessLevel as User['accessLevel'],
      fingerprintId: formData.fingerprintId
    });
    
    setShowSuccess('User added successfully!');
    setTimeout(() => setShowSuccess(null), 3000);
    
    setIsAddingUser(false);
    resetForm();
  };
  
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingUserId) {
      updateUser(editingUserId, {
        name: formData.name,
        username: formData.username,
        accessLevel: formData.accessLevel as User['accessLevel'],
        fingerprintId: formData.fingerprintId
      });
      
      setShowSuccess('User updated successfully!');
      setTimeout(() => setShowSuccess(null), 3000);
      
      setEditingUserId(null);
      resetForm();
    }
  };
  
  const handleEditClick = (user: User) => {
    setFormData({
      name: user.name,
      username: user.username,
      accessLevel: user.accessLevel,
      fingerprintId: user.fingerprintId
    });
    setEditingUserId(user.id);
    setIsAddingUser(false);
  };
  
  const handleDeleteClick = (userId: string) => {
    setDeletingUserId(userId);
  };
  
  const confirmDelete = () => {
    if (deletingUserId) {
      deleteUser(deletingUserId);
      setDeletingUserId(null);
      
      setShowSuccess('User deleted successfully!');
      setTimeout(() => setShowSuccess(null), 3000);
    }
  };
  
  const cancelDelete = () => {
    setDeletingUserId(null);
  };
  
  const cancelEdit = () => {
    setEditingUserId(null);
    resetForm();
  };
  
  const handleAddNewClick = () => {
    setIsAddingUser(true);
    setEditingUserId(null);
    resetForm();
  };
  
  const cancelAdd = () => {
    setIsAddingUser(false);
    resetForm();
  };
  
  // Sort and filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterAccessLevel ? 
      user.accessLevel === filterAccessLevel : true;
    
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'accessLevel') {
      comparison = a.accessLevel.localeCompare(b.accessLevel);
    } else if (sortBy === 'registered') {
      comparison = new Date(a.registered).getTime() - new Date(b.registered).getTime();
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });
  
  const accessLevelOptions = [
    { value: 'Administrator', label: 'Administrator' },
    { value: 'Supervisor', label: 'Supervisor' },
    { value: 'Operator', label: 'Operator' },
    { value: 'Guest', label: 'Guest' }
  ];
  
  const accessLevelColors: Record<User['accessLevel'], string> = {
    'Administrator': 'bg-red-900/20 text-red-400 border-red-900/50',
    'Supervisor': 'bg-amber-900/20 text-amber-400 border-amber-900/50',
    'Operator': 'bg-blue-900/20 text-blue-400 border-blue-900/50',
    'Guest': 'bg-green-900/20 text-green-400 border-green-900/50'
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-900/20 p-2 rounded-lg">
              <Users size={28} className="text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold text-white">User Registration</h1>
          </div>
          
          {!isAddingUser && !editingUserId && (
            <Button 
              onClick={handleAddNewClick} 
              variant="primary"
              icon={<UserPlus size={16} />}
            >
              Add New User
            </Button>
          )}
        </div>
        
        {showSuccess && (
          <div className="mb-6 p-3 bg-green-900/20 border border-green-800 rounded-lg text-green-400 flex items-center gap-2">
            <Check size={16} />
            <span>{showSuccess}</span>
          </div>
        )}
        
        {/* User Form (Add/Edit) */}
        {(isAddingUser || editingUserId) && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-400">
              {editingUserId ? (
                <>
                  <Pencil size={20} />
                  <span>Edit User</span>
                </>
              ) : (
                <>
                  <UserPlus size={20} />
                  <span>Add New User</span>
                </>
              )}
            </h2>
            
            <form onSubmit={editingUserId ? handleEditSubmit : handleAddSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Input
                  label="Full Name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter user's full name"
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
                    {!isScanning ? (
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
                              onClick={handleScanStart}
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
                              onClick={handleScanStart}
                            >
                              Register Fingerprint
                            </Button>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                        <h4 className="text-center text-lg mb-4">
                          {formData.fingerprintId ? 'Replace Fingerprint' : 'Register Fingerprint'}
                        </h4>
                        <FingerprintScanner onScanComplete={handleScanComplete} />
                      </div>
                    )}
                  </div>
                  
                  <div className="w-full md:w-1/2">
                    <div className="bg-gray-800/50 p-4 rounded-lg text-sm text-gray-300">
                      <h4 className="font-medium text-blue-400 mb-2">Access Level Information</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <span className="inline-block h-5 w-5 rounded-full bg-red-900/50 text-red-400 text-xs flex items-center justify-center">A</span>
                          <span><strong className="text-red-400">Administrator:</strong> Full system access</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="inline-block h-5 w-5 rounded-full bg-amber-900/50 text-amber-400 text-xs flex items-center justify-center">S</span>
                          <span><strong className="text-amber-400">Supervisor:</strong> User management and reports</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="inline-block h-5 w-5 rounded-full bg-blue-900/50 text-blue-400 text-xs flex items-center justify-center">O</span>
                          <span><strong className="text-blue-400">Operator:</strong> Standard system operations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="inline-block h-5 w-5 rounded-full bg-green-900/50 text-green-400 text-xs flex items-center justify-center">G</span>
                          <span><strong className="text-green-400">Guest:</strong> Limited, read-only access</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  type="button"
                  onClick={editingUserId ? cancelEdit : cancelAdd}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  type="submit"
                  icon={<Save size={16} />}
                  disabled={!formData.name || !formData.username || !formData.fingerprintId}
                >
                  {editingUserId ? 'Update User' : 'Add User'}
                </Button>
              </div>
            </form>
          </div>
        )}
        
        {/* Users List */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-800 flex flex-col sm:flex-row gap-3 justify-between">
            <div className="flex items-center gap-3 relative flex-grow">
              <Search size={18} className="absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 w-full
                          text-white focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            
            <div className="flex gap-3">
              <div className="relative">
                <Select
                  label=""
                  id="filterAccessLevel"
                  value={filterAccessLevel}
                  onChange={(e) => setFilterAccessLevel(e.target.value)}
                  options={[
                    { value: '', label: 'All Access Levels' },
                    ...accessLevelOptions
                  ]}
                  placeholder="Filter by access level"
                />
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-800 text-gray-400 text-sm">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Username</th>
                  <th className="px-4 py-3">
                    <button 
                      className="flex items-center gap-1 hover:text-white"
                      onClick={() => {
                        if (sortBy === 'accessLevel') {
                          setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortBy('accessLevel');
                          setSortDirection('asc');
                        }
                      }}
                    >
                      Access Level
                      <ArrowUpDown size={14} />
                    </button>
                  </th>
                  <th className="px-4 py-3">
                    <button 
                      className="flex items-center gap-1 hover:text-white"
                      onClick={() => {
                        if (sortBy === 'registered') {
                          setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortBy('registered');
                          setSortDirection('asc');
                        }
                      }}
                    >
                      Registered
                      <ArrowUpDown size={14} />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                      <div className="flex flex-col items-center">
                        <AlertCircle size={24} className="mb-2" />
                        <p>No users found matching your criteria</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-gray-800/50">
                      <td className="px-4 py-3 text-white">{user.name}</td>
                      <td className="px-4 py-3 text-gray-300">{user.username}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs border ${accessLevelColors[user.accessLevel]}`}>
                          {user.accessLevel}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400">
                        {new Date(user.registered).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {deletingUserId === user.id ? (
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-sm text-gray-400">Confirm delete?</span>
                            <Button
                              variant="danger"
                              size="sm"
                              icon={<Check size={14} />}
                              onClick={confirmDelete}
                            >
                              Yes
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              icon={<X size={14} />}
                              onClick={cancelDelete}
                            >
                              No
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="secondary"
                              size="sm"
                              icon={<Pencil size={14} />}
                              onClick={() => handleEditClick(user)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              icon={<Trash2 size={14} />}
                              onClick={() => handleDeleteClick(user.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-gray-800 text-sm text-gray-400">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </div>
        
        <div className="mt-6 bg-blue-900/10 border border-blue-900/30 rounded-lg p-4 text-sm text-blue-300">
          <p className="flex items-center gap-1.5">
            <Shield size={16} />
            <span>User management requires administrator privileges. All operations are logged for security purposes.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;