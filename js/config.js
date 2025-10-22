// Mobitel Selfcare API Configuration
const API_CONFIG = {
    // Production API endpoints (Real Mobitel Selfcare API)
    PRODUCTION: {
        baseUrl: 'https://selfcare.mobitel.lk/api',
        endpoints: {
            login: '/auth/login',
            logout: '/auth/logout',
            userProfile: '/user/profile',
            accountBalance: '/account/balance',
            dataUsage: '/account/data-usage',
            recharge: '/services/recharge',
            dataPack: '/services/data-pack',
            billHistory: '/account/bills',
            transactions: '/account/transactions',
            validateOTP: '/auth/validate-otp',
            sendOTP: '/auth/send-otp',
            resetPassword: '/auth/reset-password'
        },
        timeout: 15000,
        retryAttempts: 3,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'MobitelSelfcareWeb/1.0',
            'X-Requested-With': 'XMLHttpRequest'
        }
    },
    
    // Development/Testing endpoints
    DEVELOPMENT: {
        baseUrl: 'http://localhost:3000/api',
        endpoints: {
            login: '/auth/login',
            logout: '/auth/logout',
            userProfile: '/user/profile',
            accountBalance: '/account/balance',
            dataUsage: '/account/data-usage',
            recharge: '/services/recharge',
            dataPack: '/services/data-pack',
            billHistory: '/account/bills',
            transactions: '/account/transactions'
        },
        timeout: 5000,
        retryAttempts: 2
    },
    
    // Mock endpoints for testing
    MOCK: {
        baseUrl: 'mock://api.mobitel.lk',
        endpoints: {
            login: '/auth/login',
            logout: '/auth/logout',
            userProfile: '/user/profile',
            accountBalance: '/account/balance',
            dataUsage: '/account/data-usage',
            recharge: '/services/recharge',
            dataPack: '/services/data-pack',
            billHistory: '/account/bills',
            transactions: '/account/transactions'
        },
        timeout: 1500,
        retryAttempts: 1
    }
};

// Environment detection
const getEnvironment = () => {
    const hostname = window.location.hostname;
    
    // Check for manual override in localStorage
    const manualOverride = localStorage.getItem('mobitel_api_mode');
    if (manualOverride && API_CONFIG[manualOverride]) {
        console.log(`Using manual API override: ${manualOverride}`);
        return manualOverride;
    }
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'DEVELOPMENT';
    } else if (hostname.includes('mobitel.lk') || hostname.includes('production')) {
        return 'PRODUCTION';
    } else {
        return 'MOCK'; // Default to mock for testing
    }
};

// Function to switch API mode (for testing)
const switchApiMode = (mode) => {
    if (API_CONFIG[mode]) {
        localStorage.setItem('mobitel_api_mode', mode);
        console.log(`Switched to ${mode} API mode`);
        location.reload(); // Reload to apply changes
    } else {
        console.error(`Invalid API mode: ${mode}`);
    }
};

// Get current API configuration
const getCurrentConfig = () => {
    const environment = getEnvironment();
    return API_CONFIG[environment];
};

// API Helper class
class APIHelper {
    constructor() {
        this.config = getCurrentConfig();
        this.authToken = localStorage.getItem('mobitel_token');
    }

    // Set authentication token
    setAuthToken(token) {
        this.authToken = token;
        localStorage.setItem('mobitel_token', token);
    }

    // Clear authentication token
    clearAuthToken() {
        this.authToken = null;
        localStorage.removeItem('mobitel_token');
    }

    // Make API request with retry logic and CORS handling
    async makeRequest(endpoint, options = {}) {
        const url = this.config.baseUrl + this.config.endpoints[endpoint];
        
        const defaultOptions = {
            method: 'GET',
            headers: {
                ...this.config.headers,
                ...options.headers
            },
            timeout: this.config.timeout,
            mode: 'cors', // Enable CORS
            credentials: 'omit' // Don't send cookies
        };

        // Add authorization header if token exists
        if (this.authToken) {
            defaultOptions.headers['Authorization'] = `Bearer ${this.authToken}`;
        }

        const requestOptions = { ...defaultOptions, ...options };

        // Retry logic
        for (let attempt = 1; attempt <= this.config.retryAttempts; attempt++) {
            try {
                console.log(`API Request (Attempt ${attempt}):`, { url, options: requestOptions });
                
                if (this.config.baseUrl.startsWith('mock://')) {
                    // Mock API call
                    return await this.mockApiCall(endpoint, requestOptions);
                } else {
                    // Real API call with timeout
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
                    
                    const response = await fetch(url, {
                        ...requestOptions,
                        signal: controller.signal
                    });
                    
                    clearTimeout(timeoutId);
                    
                    // Handle different response types
                    if (!response.ok) {
                        const errorText = await response.text();
                        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
                        
                        try {
                            const errorData = JSON.parse(errorText);
                            errorMessage = errorData.message || errorData.error || errorMessage;
                        } catch (e) {
                            // Use text error message
                        }
                        
                        throw new Error(errorMessage);
                    }
                    
                    // Try to parse JSON response
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        const data = await response.json();
                        console.log('API Response:', data);
                        return data;
                    } else {
                        // Handle non-JSON responses
                        const text = await response.text();
                        console.log('API Response (text):', text);
                        return { success: true, data: text };
                    }
                }
            } catch (error) {
                console.error(`API Request failed (Attempt ${attempt}):`, error);
                
                // Handle specific error types
                if (error.name === 'AbortError') {
                    error.message = 'Request timeout - please check your connection';
                } else if (error.message.includes('CORS')) {
                    error.message = 'CORS error - API may not support web requests';
                } else if (error.message.includes('Failed to fetch')) {
                    error.message = 'Network error - please check your internet connection';
                }
                
                if (attempt === this.config.retryAttempts) {
                    throw error;
                }
                
                // Wait before retry
                await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            }
        }
    }

    // Mock API implementation
    async mockApiCall(endpoint, options) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, this.config.timeout));

        switch (endpoint) {
            case 'login':
                return this.mockLogin(options);
            case 'userProfile':
                return this.mockUserProfile();
            case 'accountBalance':
                return this.mockAccountBalance();
            case 'dataUsage':
                return this.mockDataUsage();
            case 'transactions':
                return this.mockTransactions();
            default:
                return { success: true, message: 'Mock API call successful' };
        }
    }

    mockLogin(options) {
        const body = JSON.parse(options.body || '{}');
        const { phone, password } = body;

        // Simulate real Mobitel authentication patterns
        const validCredentials = {
            '771234567': 'password123',
            '771111111': 'test123',
            '772222222': 'demo123',
            '773333333': 'mobile123',
            '774444444': 'selfcare123',
            '775555555': 'mobitel123'
        };

        const cleanPhone = phone.replace(/\s/g, '');
        
        // Validate phone number format (Sri Lankan mobile numbers)
        const phoneRegex = /^(77|71|70|75|76|78)[0-9]{7}$/;
        if (!phoneRegex.test(cleanPhone)) {
            return {
                success: false,
                error: 'INVALID_PHONE_FORMAT',
                message: 'Please enter a valid Sri Lankan mobile number'
            };
        }
        
        if (validCredentials[cleanPhone] && validCredentials[cleanPhone] === password) {
            return {
                success: true,
                token: 'mock_jwt_token_' + Date.now(),
                refreshToken: 'mock_refresh_token_' + Date.now(),
                expiresIn: 3600,
                user: {
                    phone: '+94 ' + cleanPhone,
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    accountStatus: 'Active',
                    plan: 'Unlimited Data',
                    dataUsage: {
                        used: 6.5,
                        total: 10,
                        percentage: 65
                    },
                    balance: 1250.50,
                    lastLogin: new Date().toISOString(),
                    customerId: 'CUST_' + cleanPhone,
                    accountType: 'POSTPAID'
                }
            };
        } else {
            return {
                success: false,
                error: 'INVALID_CREDENTIALS',
                message: 'Invalid phone number or password. Please check your credentials and try again.'
            };
        }
    }

    mockUserProfile() {
        return {
            success: true,
            user: {
                phone: '+94 771234567',
                name: 'John Doe',
                email: 'john.doe@example.com',
                accountStatus: 'Active',
                plan: 'Unlimited Data',
                balance: 1250.50,
                lastLogin: new Date().toISOString()
            }
        };
    }

    mockAccountBalance() {
        return {
            success: true,
            balance: 1250.50,
            currency: 'LKR',
            lastUpdated: new Date().toISOString()
        };
    }

    mockDataUsage() {
        return {
            success: true,
            dataUsage: {
                used: 6.5,
                total: 10,
                percentage: 65,
                unit: 'GB',
                resetDate: '2024-02-01'
            }
        };
    }

    mockTransactions() {
        return {
            success: true,
            transactions: [
                {
                    id: 'TXN001',
                    type: 'Data Pack Purchase',
                    amount: 500,
                    date: '2024-01-15',
                    status: 'Completed'
                },
                {
                    id: 'TXN002',
                    type: 'Account Recharge',
                    amount: 1000,
                    date: '2024-01-10',
                    status: 'Completed'
                }
            ]
        };
    }
}

// Export for use in other files
window.APIHelper = APIHelper;
window.getCurrentConfig = getCurrentConfig;
window.switchApiMode = switchApiMode;
window.getEnvironment = getEnvironment;
