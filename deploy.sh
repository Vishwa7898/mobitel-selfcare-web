#!/bin/bash

# Mobitel Selfcare Web App - Deployment Script
# This script helps deploy the web app to GitHub Pages

echo "🚀 Mobitel Selfcare Web App Deployment Script"
echo "=============================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not initialized. Please run 'git init' first."
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ index.html not found. Please run this script from the project root."
    exit 1
fi

echo "✅ Project structure verified"

# Add all files to git
echo "📁 Adding files to git..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "ℹ️  No changes to commit"
else
    echo "💾 Committing changes..."
    git commit -m "Update Mobitel Selfcare Web App - $(date '+%Y-%m-%d %H:%M:%S')"
fi

# Push to GitHub
echo "🌐 Pushing to GitHub..."
git push origin main

echo ""
echo "🎉 Deployment completed!"
echo ""
echo "📋 Next steps:"
echo "1. Go to your GitHub repository"
echo "2. Navigate to Settings > Pages"
echo "3. Select 'Deploy from a branch'"
echo "4. Choose 'main' branch and '/ (root)' folder"
echo "5. Save and wait for deployment"
echo ""
echo "🔗 Your app will be available at:"
echo "   https://[your-username].github.io/[repository-name]"
echo ""
echo "📱 Test the app with these credentials:"
echo "   Phone: 77 123 4567"
echo "   Password: password123"
