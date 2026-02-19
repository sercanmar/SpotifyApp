import { authLogin, authCheckStatus, authRegister } from "@/core/auth/actions/auth-actions";
import { User } from "@/core/auth/interface/user";
import { create } from 'zustand';
import { SecureStorageAdapter } from "@/helpers/adapters/secure-storage.adapter";

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking';

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;

    login: (email: string, password: string) => Promise<boolean>;
    register: (email: string, password: string, username: string, fechaNacimiento: string) => Promise<boolean>; 
    changeStatus: (token?: string, user?: User) => Promise<boolean>;
    checkStatus: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    // Properties
    status: 'unauthenticated',
    token: undefined,
    user: undefined,

    // Actions
    login: async (email: string, password: string) => {
        const resp = await authLogin(email, password);
        return get().changeStatus(resp?.token, resp?.user);
    },

    register: async (email: string, password: string, username: string, fechaNacimiento: string) => {
        const resp = await authRegister(email, password, username, fechaNacimiento);
        return get().changeStatus(resp?.token, resp?.user);
    },

    changeStatus: async (token?: string, user?: User) => {
        if (!token || !user) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });

            await SecureStorageAdapter.deleteItem('token');
            return false;
        }

        set({ status: 'authenticated', token: token, user: user });

        await SecureStorageAdapter.setItem('token', token);

        return true;
    },

    checkStatus: async () => {
        const token = await SecureStorageAdapter.getItem('token');

        if (!token) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            return;
        }

        set({
            status: 'authenticated',
            token: token,
            user: { email: token, username: 'Usuario' } as any
        });
    },

    logout: async () => {
        await SecureStorageAdapter.deleteItem('token');
        set({ status: 'unauthenticated', token: undefined, user: undefined });
    },

}))