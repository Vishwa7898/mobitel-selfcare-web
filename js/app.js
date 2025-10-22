// Mobitel Selfcare Web Application
class MobitelSelfcare {
    constructor() {
        this.isLoggedIn = false;
        this.userData = null;
        this.apiBaseUrl = 'https://api.mobitel.lk/selfcare'; // Mock API URL
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkAuthStatus();
        this.loadUserData();
    }

    setupEventListeners() {
        // Login form submission
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Phone number formatting
        const phoneInput = document.getElementById('phone-number');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => this.formatPhoneNumber(e));
        }

        // Auto-hide toast notifications
        this.setupToastAutoHide();
    }

    checkAuthStatus() {
        const token = localStorage.getItem('mobitel_token');
        const userData = localStorage.getItem('mobitel_user');
        
        if (token && userData) {
            this.isLoggedIn = true;
            this.userData = JSON.parse(userData);
            this.showDashboard();
        } else {
            this.showLogin();
        }
    }

    loadUserData() {
        if (this.isLoggedIn && this.userData) {
            this.updateUserInterface();
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const phoneNumber = formData.get('phone');
        const password = formData.get('password');
        const rememberMe = formData.get('remember-me');

        // Validate phone number
        if (!this.validatePhoneNumber(phoneNumber)) {
            this.showToast('Please enter a valid phone number', 'error');
            return;
        }

        // Show loading
        this.showLoading(true);

        try {
            // Simulate API call
            const loginData = await this.authenticateUser(phoneNumber, password);
            
            if (loginData.success) {
                this.isLoggedIn = true;
                this.userData = loginData.user;
                
                // Store authentication data
                localStorage.setItem('mobitel_token', loginData.token);
                localStorage.setItem('mobitel_user', JSON.stringify(loginData.user));
                
                if (rememberMe) {
                    localStorage.setItem('mobitel_remember', 'true');
                }

                this.showToast('Login successful!', 'success');
                this.showDashboard();
            } else {
                this.showToast(loginData.message || 'Login failed', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showToast('Network error. Please try again.', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async authenticateUser(phoneNumber, password) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock authentication logic
        const validCredentials = {
            '771234567': 'password123',
            '771111111': 'test123',
            '772222222': 'demo123'
        };

        const cleanPhone = phoneNumber.replace(/\s/g, '');
        
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
                message: 'Invalid phone number or password'
            };
        }
    }

    validatePhoneNumber(phoneNumber) {
        // Remove spaces and validate Sri Lankan mobile numbers
        const cleanPhone = phoneNumber.replace(/\s/g, '');
        const phoneRegex = /^(77|71|70|75|76|78)[0-9]{7}$/;
        return phoneRegex.test(cleanPhone);
    }

    formatPhoneNumber(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value.length <= 9) {
                value = value.replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3');
            } else {
                value = value.substring(0, 9).replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3');
            }
        }
        
        e.target.value = value;
    }

    showLogin() {
        document.getElementById('login-section').style.display = 'flex';
        document.getElementById('dashboard-section').style.display = 'none';
        this.updateNavigation('login');
    }

    showDashboard() {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('dashboard-section').style.display = 'block';
        this.updateNavigation('dashboard');
        this.updateUserInterface();
        this.animateDashboard();
    }

    updateUserInterface() {
        if (!this.userData) return;

        // Update user name
        const userNameElement = document.getElementById('user-name');
        if (userNameElement) {
            userNameElement.textContent = this.userData.name;
        }

        // Update phone number
        const userPhoneElement = document.getElementById('user-phone');
        if (userPhoneElement) {
            userPhoneElement.textContent = this.userData.phone;
        }

        // Update data usage
        this.updateDataUsage();
    }

    updateDataUsage() {
        if (!this.userData || !this.userData.dataUsage) return;

        const percentage = this.userData.dataUsage.percentage;
        const circleProgress = document.querySelector('.circle-progress');
        const percentageText = document.querySelector('.percentage');
        
        if (circleProgress && percentageText) {
            const degrees = (percentage / 100) * 360;
            circleProgress.style.background = `conic-gradient(#667eea 0deg ${degrees}deg, #e9ecef ${degrees}deg 360deg)`;
            percentageText.textContent = percentage + '%';
        }
    }

    animateDashboard() {
        const cards = document.querySelectorAll('.dashboard-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    updateNavigation(activeSection) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeSection}`) {
                link.classList.add('active');
            }
        });
    }

    handleNavigation(e) {
        e.preventDefault();
        const target = e.target.getAttribute('href');
        
        if (target === '#home') {
            if (this.isLoggedIn) {
                this.showDashboard();
            } else {
                this.showLogin();
            }
        } else if (target === '#account') {
            if (!this.isLoggedIn) {
                this.showToast('Please login to access your account', 'warning');
                return;
            }
            this.showDashboard();
        }
    }

    logout() {
        this.isLoggedIn = false;
        this.userData = null;
        
        // Clear stored data
        localStorage.removeItem('mobitel_token');
        localStorage.removeItem('mobitel_user');
        
        this.showToast('Logged out successfully', 'success');
        this.showLogin();
    }

    togglePassword() {
        const passwordInput = document.getElementById('password');
        const toggleButton = document.querySelector('.toggle-password i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleButton.classList.remove('fa-eye');
            toggleButton.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            toggleButton.classList.remove('fa-eye-slash');
            toggleButton.classList.add('fa-eye');
        }
    }

    showLoading(show) {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = show ? 'flex' : 'none';
        }
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        if (!toast) return;

        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');

        // Auto-hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    setupToastAutoHide() {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.addEventListener('click', () => {
                toast.classList.remove('show');
            });
        }
    }

    // Service methods
    showRecharge() {
        this.showToast('Recharge service coming soon!', 'info');
    }

    showDataPack() {
        this.showToast('Data pack service coming soon!', 'info');
    }

    showBill() {
        this.showToast('Bill service coming soon!', 'info');
    }

    showSupport() {
        this.showToast('Support service coming soon!', 'info');
    }
}

// Global functions for HTML onclick handlers
function togglePassword() {
    if (window.mobitelApp) {
        window.mobitelApp.togglePassword();
    }
}

function logout() {
    if (window.mobitelApp) {
        window.mobitelApp.logout();
    }
}

function showRecharge() {
    if (window.mobitelApp) {
        window.mobitelApp.showRecharge();
    }
}

function showDataPack() {
    if (window.mobitelApp) {
        window.mobitelApp.showDataPack();
    }
}

function showBill() {
    if (window.mobitelApp) {
        window.mobitelApp.showBill();
    }
}

function showSupport() {
    if (window.mobitelApp) {
        window.mobitelApp.showSupport();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.mobitelApp = new MobitelSelfcare();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && window.mobitelApp) {
        // Refresh user data when page becomes visible
        window.mobitelApp.loadUserData();
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    if (window.mobitelApp) {
        window.mobitelApp.showToast('Connection restored', 'success');
    }
});

window.addEventListener('offline', () => {
    if (window.mobitelApp) {
        window.mobitelApp.showToast('You are offline', 'warning');
    }
});

// Service Worker registration for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
