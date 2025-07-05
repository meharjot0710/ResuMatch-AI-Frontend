// Client-side authentication services

export async function login(target: any) {
    const email = target.email.value;
    const password = target.password.value;
    
    // Get API URL based on environment
    const getApiUrl = () => {
        if (typeof window !== 'undefined') {
            // Client-side: use current origin
            return window.location.origin;
        }
        // Server-side: use environment variable or default
        return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    };
    
    const response = await fetch(`${getApiUrl()}/api/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    return data;
}

export async function signup(target: any) {
    const name = target.name.value;
    const email = target.email.value;
    const password = target.password.value;
    
    // Get API URL based on environment
    const getApiUrl = () => {
        if (typeof window !== 'undefined') {
            // Client-side: use current origin
            return window.location.origin;
        }
        // Server-side: use environment variable or default
        return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    };
    
    const response = await fetch(`${getApiUrl()}/api/auth/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    });
    const data = await response.json();
    return data;
}

export const updateName = async (name: string, token: string) => {
    try {
        // Get API URL based on environment
        const getApiUrl = () => {
            if (typeof window !== 'undefined') {
                // Client-side: use current origin
                return window.location.origin;
            }
            // Server-side: use environment variable or default
            return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        };
        
        const response = await fetch(`${getApiUrl()}/api/auth/update-name`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update name');
        }

        return data;
    } catch (error) {
        console.error('Error updating name:', error);
        throw error;
    }
};

export const updatePassword = async (currentPassword: string, newPassword: string, token: string) => {
    try {
        // Get API URL based on environment
        const getApiUrl = () => {
            if (typeof window !== 'undefined') {
                // Client-side: use current origin
                return window.location.origin;
            }
            // Server-side: use environment variable or default
            return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        };
        
        const response = await fetch(`${getApiUrl()}/api/auth/update-password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ currentPassword, newPassword })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update password');
        }

        return data;
    } catch (error) {
        console.error('Error updating password:', error);
        throw error;
    }
};

export const deleteAccount = async (password: string, token: string) => {
    try {
        // Get API URL based on environment
        const getApiUrl = () => {
            if (typeof window !== 'undefined') {
                // Client-side: use current origin
                return window.location.origin;
            }
            // Server-side: use environment variable or default
            return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        };
        
        const response = await fetch(`${getApiUrl()}/api/auth/delete-account`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to delete account');
        }

        return data;
    } catch (error) {
        console.error('Error deleting account:', error);
        throw error;
    }
}; 