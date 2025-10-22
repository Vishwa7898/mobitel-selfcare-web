# Mobitel Selfcare Web Application

A modern, responsive web application for Mobitel Selfcare services, built with HTML5, CSS3, and JavaScript. This application provides a user-friendly interface for managing mobile accounts, viewing data usage, and accessing various selfcare services.

## Features

### 🔐 Authentication
- Phone number-based login system
- Password authentication
- Remember me functionality
- Secure session management

### 📊 Dashboard
- Account overview with user information
- Real-time data usage visualization
- Account status and plan details
- Recent transaction history

### 🚀 Quick Actions
- Account recharge
- Data pack purchases
- Bill viewing
- Customer support access

### 📱 Responsive Design
- Mobile-first approach
- Cross-platform compatibility
- Modern UI/UX design
- Progressive Web App (PWA) support

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with modern design patterns
- **Icons**: Font Awesome 6.0
- **PWA**: Service Worker, Web App Manifest
- **Storage**: LocalStorage for session management

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Web server (for PWA features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mobitel-selfcare-web.git
cd mobitel-selfcare-web
```

2. Serve the files using a web server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

3. Open your browser and navigate to `http://localhost:8000`

### Demo Credentials

For testing purposes, use these demo credentials:

| Phone Number | Password |
|-------------|----------|
| 77 123 4567 | password123 |
| 77 111 1111 | test123 |
| 77 222 2222 | demo123 |

## Project Structure

```
mobitel-selfcare-web/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   └── app.js          # Main JavaScript application
├── images/             # Image assets
├── sw.js               # Service Worker
├── manifest.json       # PWA manifest
└── README.md           # Project documentation
```

## Key Components

### Authentication System
- Phone number validation (Sri Lankan mobile numbers)
- Password-based authentication
- Session persistence
- Automatic logout on token expiry

### Dashboard Interface
- Real-time data usage visualization
- Account information display
- Quick action buttons
- Transaction history

### Responsive Design
- Mobile-first CSS approach
- Flexible grid layouts
- Touch-friendly interface
- Cross-device compatibility

## API Integration

The application is designed to integrate with Mobitel's selfcare API endpoints:

- **Authentication**: `/api/auth/login`
- **User Data**: `/api/user/profile`
- **Data Usage**: `/api/user/usage`
- **Transactions**: `/api/user/transactions`

*Note: Currently using mock data for demonstration purposes.*

## PWA Features

- **Offline Support**: Service Worker caches essential resources
- **Installable**: Can be installed on mobile devices
- **App-like Experience**: Standalone display mode
- **Push Notifications**: Ready for implementation

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security Considerations

- All sensitive data is handled client-side only
- No actual API credentials are stored
- Session tokens are managed securely
- Input validation on all forms

## Future Enhancements

- [ ] Real API integration
- [ ] Push notifications
- [ ] Biometric authentication
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Advanced analytics
- [ ] Social login options

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact:
- Email: support@mobitel.lk
- Website: https://selfcare.mobitel.lk

## Acknowledgments

- Mobitel Sri Lanka for the inspiration
- Font Awesome for the icon library
- Modern CSS techniques and best practices
- Progressive Web App community

---

**Note**: This is a demonstration project created for educational purposes. It is not affiliated with or endorsed by Mobitel Sri Lanka.
