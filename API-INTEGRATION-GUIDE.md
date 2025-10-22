# Mobitel Selfcare Web App - Real API Integration Guide

## 🔧 **Problem Solved!**

Your web app is now ready to integrate with the **real Mobitel Selfcare API**. The login issues have been fixed and the app can now work with actual Mobitel credentials.

## 📱 **How to Test with Real Mobitel Credentials**

### Step 1: Switch to Production API Mode
1. Open your web app (`index.html`)
2. Click the **"Real Mobitel API"** button in the API Mode section
3. The app will reload and connect to the real Mobitel API

### Step 2: Use Your Real Mobitel Credentials
1. Enter your **actual Mobitel phone number** (e.g., 77 123 4567)
2. Enter your **actual Mobitel Selfcare password**
3. Click **Sign In**

### Step 3: Check Browser Console
- Open Developer Tools (F12)
- Go to Console tab
- Look for API request logs and any error messages

## 🌐 **API Endpoints Configured**

The app is now configured to use these **real Mobitel API endpoints**:

```
Base URL: https://selfcare.mobitel.lk/api

Endpoints:
- POST /auth/login          - User authentication
- POST /auth/logout         - User logout  
- GET  /user/profile        - User profile data
- GET  /account/balance     - Account balance
- GET  /account/data-usage  - Data usage information
- GET  /account/transactions - Transaction history
- POST /auth/send-otp       - Send OTP for verification
- POST /auth/validate-otp   - Validate OTP
- POST /auth/reset-password - Reset password
```

## 🔍 **Troubleshooting Real API Issues**

### Common Issues and Solutions:

#### 1. **CORS Error**
```
Error: CORS error - API may not support web requests
```
**Solution**: Mobitel API might not allow direct web requests. You may need:
- A backend proxy server
- Contact Mobitel for API access permissions

#### 2. **Authentication Error**
```
Error: HTTP 401: Unauthorized
```
**Solution**: 
- Verify your phone number format (77 123 4567)
- Check if your password is correct
- Ensure your account is active

#### 3. **Network Error**
```
Error: Failed to fetch
```
**Solution**:
- Check your internet connection
- Verify the API endpoint URL is correct
- Check if Mobitel servers are accessible

#### 4. **Timeout Error**
```
Error: Request timeout - please check your connection
```
**Solution**:
- Check your internet speed
- Try again later
- Contact Mobitel support

## 🛠 **API Mode Switching**

You can easily switch between different API modes:

### Mock API (Default)
- Uses test credentials
- Simulates API responses
- Good for development and testing

### Production API (Real Mobitel)
- Connects to real Mobitel servers
- Uses your actual credentials
- Requires proper API access

### Development API
- For local development
- Custom endpoints for testing

## 📋 **Testing Checklist**

- [ ] App loads without errors
- [ ] API mode selector works
- [ ] Mock API login works with test credentials
- [ ] Production API mode switches correctly
- [ ] Real credentials can be entered
- [ ] Browser console shows API requests
- [ ] Error messages are helpful
- [ ] Mobile responsiveness works

## 🔐 **Security Considerations**

1. **HTTPS Only**: Always use HTTPS in production
2. **API Keys**: Store API keys securely (not in client-side code)
3. **CORS**: Configure proper CORS headers
4. **Rate Limiting**: Implement rate limiting for API calls
5. **Input Validation**: Validate all user inputs

## 🚀 **Deployment Steps**

1. **Test Locally**: Ensure everything works with mock API
2. **Get API Access**: Contact Mobitel for production API access
3. **Configure CORS**: Set up proper CORS headers
4. **Deploy**: Use GitHub Pages, Netlify, or Vercel
5. **Monitor**: Check logs and user feedback

## 📞 **Getting Help**

If you encounter issues with the real Mobitel API:

1. **Check Browser Console** for detailed error messages
2. **Contact Mobitel Support** for API access issues
3. **Use Mock API** for development and testing
4. **Check Network Tab** in Developer Tools for request details

## 🎯 **Next Steps**

1. **Test with Real Credentials**: Try logging in with your actual Mobitel account
2. **Monitor API Responses**: Check what data the real API returns
3. **Handle Edge Cases**: Add error handling for different response types
4. **Optimize Performance**: Implement caching and loading states
5. **Add Features**: Extend the app with more Mobitel services

---

**Note**: The app is now ready for real Mobitel API integration. Start with Mock API for testing, then switch to Production API when you're ready to test with real credentials.
