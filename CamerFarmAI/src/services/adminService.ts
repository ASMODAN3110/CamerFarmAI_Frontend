// src/services/adminService.ts
import { api } from './api';

// Types
export type UserRole = 'farmer' | 'technician' | 'admin';

export interface UserListItem {
  id: string;
  phone: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  role: 'farmer' | 'technician';
  twoFactorEnabled: boolean;
  isActive: boolean;
  createdAt: string;
  plantationsCount: number;
}

export interface Plantation {
  id: string;
  name: string;
  location: string | null;
  cropType: string;
}

export interface UserDetails {
  id: string;
  phone: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  role: 'farmer' | 'technician';
  twoFactorEnabled: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  plantations: Plantation[];
}

export interface CreateTechnicianDto {
  phone: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface CreateTechnicianResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    phone: string;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    role: 'technician';
  };
}

export interface ValidationError {
  type: string;
  msg: string;
  path: string;
  location: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: ValidationError[];
}

export interface UpdateStatusResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    isActive: boolean;
  };
}

// Service functions
export const adminService = {
  /**
   * Récupère tous les utilisateurs (agriculteurs et techniciens)
   */
  async getAllUsers(): Promise<UserListItem[]> {
    const response = await api.get<ApiResponse<UserListItem[]>>('/admin/users');
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error('Erreur lors de la récupération des utilisateurs');
  },

  /**
   * Récupère les détails d'un utilisateur avec ses plantations
   */
  async getUserById(userId: string): Promise<UserDetails> {
    const response = await api.get<ApiResponse<UserDetails>>(`/admin/users/${userId}`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    if (response.status === 404) {
      throw new Error('Utilisateur non trouvé');
    }
    throw new Error('Erreur lors de la récupération de l\'utilisateur');
  },

  /**
   * Crée un nouveau compte technicien
   */
  async createTechnician(dto: CreateTechnicianDto): Promise<CreateTechnicianResponse> {
    try {
      const response = await api.post<CreateTechnicianResponse>(
        '/admin/users/technicians',
        dto
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 400) {
        const errors: ValidationError[] = error.response.data?.errors || [];
        const errorMessage = errors.map((e) => `${e.path}: ${e.msg}`).join(', ');
        throw new Error(errorMessage || 'Données invalides');
      }
      if (error.response?.status === 409) {
        throw new Error('Ce numéro de téléphone ou email est déjà utilisé');
      }
      throw new Error(
        error.response?.data?.message || 'Erreur lors de la création du technicien'
      );
    }
  },

  /**
   * Supprime un utilisateur
   */
  async deleteUser(userId: string): Promise<void> {
    try {
      await api.delete<ApiResponse>(`/admin/users/${userId}`);
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error('Impossible de supprimer un compte administrateur');
      }
      if (error.response?.status === 404) {
        throw new Error('Utilisateur non trouvé');
      }
      throw new Error(
        error.response?.data?.message || 'Erreur lors de la suppression'
      );
    }
  },

  /**
   * Active ou désactive un compte utilisateur
   */
  async updateUserStatus(
    userId: string,
    isActive: boolean
  ): Promise<UpdateStatusResponse> {
    try {
      const response = await api.patch<UpdateStatusResponse>(
        `/admin/users/${userId}/status`,
        { isActive }
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error('Impossible de modifier le statut d\'un compte administrateur');
      }
      if (error.response?.status === 404) {
        throw new Error('Utilisateur non trouvé');
      }
      throw new Error(
        error.response?.data?.message || 'Erreur lors de la mise à jour'
      );
    }
  },
};

