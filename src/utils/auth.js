export const validateSession = async () => {
    try {
        // Get session token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            return { valid: false, message: 'No session token found' };
        }

        // Validate the session
        const response = await fetch('http://localhost:5001/session/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token })
        });

        const data = await response.json();
        
        if (!data.status) {
            // If user is banned, clear their session
            if (data.data?.banned) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                return { 
                    valid: false, 
                    message: 'This account has been banned',
                    banned: true 
                };
            }
            return { valid: false, message: data.message || 'Session validation failed' };
        }

        return { 
            valid: data.data.valid, 
            message: data.message,
            user_id: data.data.user_id
        };
    } catch (error) {
        console.error('Session validation error:', error);
        return { valid: false, message: 'Error validating session' };
    }
}; 