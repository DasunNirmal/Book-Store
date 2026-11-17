import { createContext, useContext, useEffect, useRef, useState } from "react";
import dataService, { User } from "../services/DataServices";

interface AuthResult {
    ok: boolean;
    message?: string;
    user?: User;
}

interface AuthContextType {
    currentUser: User | null;
    isAuthOpen: boolean;
    openAuthModal: (onSuccess?: (user: User) => void) => void;
    closeAuthModal: () => void;
    completeAuth: (user: User) => void;
    login: (email: string, password: string) => Promise<AuthResult>;
    signup: (name: string, email: string, password: string) => Promise<AuthResult>;
    logout: () => void;
    updateProfile: (updates: Partial<Pick<User, 'name' | 'email' | 'phone' | 'address'>>) => AuthResult;
    deleteAccount: () => AuthResult;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Demo-only hashing. Replace with real backend auth later.
const hashPassword = async (password: string) => {
    const data = new TextEncoder().encode(password);
    const buffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
};

// Never keep the hash in the session copy
const toSafeUser = (user: User): User => {
    const safe = { ...user };
    delete safe.passwordHash;
    return safe;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(() => dataService.getCurrentUser());
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const pendingCallback = useRef<((user: User) => void) | null>(null);

    // Keep the session in sync when admin edits/deletes the user (same tab or another tab)
    useEffect(() => {
        const sync = () => {
            const stored = dataService.getCurrentUser();
            if (!stored) {
                setCurrentUser(null);
                return;
            }
            const fresh = dataService.getUserById(stored.id);
            if (!fresh) {
                dataService.setCurrentUser(null);
                setCurrentUser(null);
                return;
            }
            setCurrentUser(toSafeUser(fresh));
        };

        window.addEventListener('usersUpdated', sync);
        window.addEventListener('storage', sync);
        return () => {
            window.removeEventListener('usersUpdated', sync);
            window.removeEventListener('storage', sync);
        };
    }, []);

    const applySession = (user: User) => {
        const safe = toSafeUser(user);
        dataService.setCurrentUser(safe);
        setCurrentUser(safe);
        return safe;
    };

    const openAuthModal = (onSuccess?: (user: User) => void) => {
        pendingCallback.current = onSuccess || null;
        setIsAuthOpen(true);
    };

    const closeAuthModal = () => {
        pendingCallback.current = null;
        setIsAuthOpen(false);
    };

    const completeAuth = (user: User) => {
        const callback = pendingCallback.current;
        pendingCallback.current = null;
        setIsAuthOpen(false);
        callback?.(user);
    };

    const findByEmail = (email: string) =>
        dataService.getUsers().find(u => u.email.toLowerCase() === email.trim().toLowerCase());

    const login = async (email: string, password: string): Promise<AuthResult> => {
        const user = findByEmail(email);
        if (!user) return { ok: false, message: 'No account found with this email' };
        if (!user.passwordHash) {
            return { ok: false, message: 'This account has no password yet. Use "Sign up" with the same email to set one.' };
        }
        const hash = await hashPassword(password);
        if (hash !== user.passwordHash) return { ok: false, message: 'Incorrect password' };
        return { ok: true, user: applySession(user) };
    };

    const signup = async (name: string, email: string, password: string): Promise<AuthResult> => {
        if (password.length < 6) return { ok: false, message: 'Password must be at least 6 characters' };

        const hash = await hashPassword(password);
        const existing = findByEmail(email);

        if (existing) {
            // Account created by admin without a password: let the owner claim it
            if (!existing.passwordHash) {
                const updated = dataService.updateUser(existing.id, {
                    name: name.trim() || existing.name,
                    passwordHash: hash
                });
                if (updated) return { ok: true, user: applySession(updated) };
            }
            return { ok: false, message: 'An account with this email already exists' };
        }

        const created = dataService.addUser({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            role: 'user',
            phone: '',
            address: '',
            passwordHash: hash
        });
        return { ok: true, user: applySession(created) };
    };

    const logout = () => {
        dataService.setCurrentUser(null);
        setCurrentUser(null);
    };

    const updateProfile: AuthContextType['updateProfile'] = (updates) => {
        if (!currentUser) return { ok: false, message: 'You are not signed in' };

        if (updates.email) {
            const duplicate = dataService.getUsers().some(
                u => u.email.toLowerCase() === updates.email!.trim().toLowerCase() && u.id !== currentUser.id
            );
            if (duplicate) return { ok: false, message: 'This email is already used by another account' };
        }

        const updated = dataService.updateUser(currentUser.id, updates);
        if (!updated) return { ok: false, message: 'Could not update profile' };
        return { ok: true, user: applySession(updated) };
    };

    const deleteAccount = (): AuthResult => {
        if (!currentUser) return { ok: false, message: 'You are not signed in' };
        if (currentUser.role === 'admin') {
            return { ok: false, message: 'Admin accounts cannot be deleted from here' };
        }
        dataService.deleteUser(currentUser.id);
        logout();
        return { ok: true };
    };

    return (
        <AuthContext.Provider value={{
            currentUser, isAuthOpen,
            openAuthModal, closeAuthModal, completeAuth,
            login, signup, logout,
            updateProfile, deleteAccount
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);