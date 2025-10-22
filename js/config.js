// Mobitel Selfcare API Configuration
const API_CONFIG = {
    // Production API endpoints (replace with actual Mobitel API endpoints)
    PRODUCTION: {
        baseUrl: 'https://api.mobitel.lk/selfcare/v1',
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
        timeout: 10000,
        retryAttempts: 3
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
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'DEVELOPMENT';
    } else if (hostname.includes('mobitel.lk') || hostname.includes('production')) {
        return 'PRODUCTION';
    } else {
        return 'MOCK'; // Default to mock for testing
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

    // Make API request with retry logic
    async makeRequest(endpoint, options = {}) {
        const url = this.config.baseUrl + this.config.endpoints[endpoint];
        
        const defaultOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            timeout: this.config.timeout
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
                    // Real API call
                    const response = await fetch(url, requestOptions);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }
                    
                    const data = await response.json();
                    console.log('API Response:', data);
                    return data;
                }
            } catch (error) {
                console.error(`API Request failed (Attempt ${attempt}):`, error);
                
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

        const validCredentials = {
            '771234567': 'password123',
            '771111111': 'test123',
            '772222222': 'demo123',
            '773333333': 'mobile123',
            '774444444': 'selfcare123',
            '775555555': 'mobitel123'
        };

        const cleanPhone = phone.replace(/\s/g, '');
        
        if (validCredentials[cleanPhone] && validCredentials[cleanPhone] === password) {
            return {
                success: true,
                token: 'mock_jwt_token_' + Date.now(),
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
                    lastLogin: new Date().toISOString()
                }
            };
        } else {
            return {
                success: false,
                message: 'Invalid phone number or password. Try: 771234567 / password123'
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
