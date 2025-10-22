# Mobitel Selfcare Web Application

A modern, responsive web application for Mobitel mobile selfcare services built with HTML, CSS, and JavaScript.

## Features

- 🔐 **Secure Login System** - Phone number based authentication
- 📱 **Mobile Responsive** - Optimized for mobile devices
- 🎨 **Modern UI/UX** - Beautiful gradient design with smooth animations
- 🔄 **Real-time Data** - Live account information and usage tracking
- 📊 **Dashboard** - Comprehensive account overview
- 🚀 **PWA Ready** - Progressive Web App capabilities
- 🌐 **API Integration** - Ready for real API endpoints

## Test Credentials

For testing purposes, use these credentials:

| Phone Number | Password |
|-------------|----------|
| 77 123 4567 | password123 |
| 77 111 1111 | test123 |
| 77 222 2222 | demo123 |
| 77 333 3333 | mobile123 |
| 77 444 4444 | selfcare123 |
| 77 555 5555 | mobitel123 |

## Quick Start

### Option 1: Direct File Opening
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start testing with the provided credentials

### Option 2: Local Server (Recommended)
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or use serve
npm start
```

The application will be available at `http://localhost:3000`

## API Configuration

The application supports multiple API configurations:

### Production API
```javascript
// Update js/config.js
PRODUCTION: {
    baseUrl: 'https://api.mobitel.lk/selfcare/v1',
    endpoints: {
        login: '/auth/login',
        // ... other endpoints
    }
}
```

### Development API
```javascript
DEVELOPMENT: {
    baseUrl: 'http://localhost:3000/api',
    endpoints: {
        login: '/auth/login',
        // ... other endpoints
    }
}
```

### Mock API (Default)
The application uses mock API responses for testing and development.

## Mobile App Integration

To integrate with your mobile app:

1. **Update API Endpoints**: Modify `js/config.js` with your actual API endpoints
2. **Authentication**: The app uses JWT tokens for authentication
3. **CORS**: Ensure your API supports CORS for web requests
4. **SSL**: Use HTTPS in production for security

### API Endpoints Expected

- `POST /auth/login` - User authentication
- `POST /auth/logout` - User logout
- `GET /user/profile` - User profile data
- `GET /account/balance` - Account balance
- `GET /account/data-usage` - Data usage information
- `GET /account/transactions` - Transaction history

## File Structure

```
mobitel-selfcare-web/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # Main stylesheet
├── js/
│   ├── app.js         # Main application logic
│   └── config.js      # API configuration
├── images/
│   ├── mobitel-logo.svg
│   ├── icon-192x192.svg
│   └── icon-512x512.svg
├── manifest.json      # PWA manifest
├── sw.js             # Service worker
└── package.json      # Dependencies
```

## Deployment

### GitHub Pages
1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Select source branch
4. Your app will be available at `https://username.github.io/repository-name`

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build` (or leave empty for static files)
3. Set publish directory: `.` (root)
4. Deploy

### Vercel
1. Import your GitHub repository
2. Vercel will auto-detect it's a static site
3. Deploy with zero configuration

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features in Detail

### Login System
- Phone number validation for Sri Lankan mobile numbers
- Password strength requirements
- Remember me functionality
- Secure token-based authentication

### Dashboard
- Account overview with real-time data
- Data usage visualization with circular progress
- Quick action buttons for common tasks
- Recent transaction history
- Responsive grid layout

### Mobile Optimization
- Touch-friendly interface
- Responsive design for all screen sizes
- PWA capabilities for app-like experience
- Offline support with service worker

## Customization

### Styling
Modify `css/style.css` to change:
- Color scheme (update CSS variables)
- Layout and spacing
- Typography
- Animations

### Functionality
Update `js/app.js` to:
- Add new features
- Modify existing behavior
- Integrate additional APIs

### API Integration
Update `js/config.js` to:
- Change API endpoints
- Modify request/response handling
- Add new API calls

## Troubleshooting

### Login Issues
1. Check browser console for errors
2. Verify phone number format (77 123 4567)
3. Use exact passwords from test credentials
4. Clear browser cache and localStorage

### API Issues
1. Check network connectivity
2. Verify API endpoint URLs
3. Check CORS settings
4. Review browser developer tools

### Mobile Issues
1. Test on actual mobile device
2. Check viewport meta tag
3. Verify touch interactions
4. Test PWA installation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Create an issue on GitHub
- Contact: [your-email@example.com]
- Documentation: [your-docs-url]

---

**Note**: This is a demo application. For production use, ensure proper security measures, API authentication, and data validation are implemented.