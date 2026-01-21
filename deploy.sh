#!/bin/bash

# AI API Playground Deployment Script
# This script helps you deploy to GitHub Pages quickly

echo "🚀 AI API Playground Deployment Script"
echo "=========================================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Ask for GitHub username
echo -n "Enter your GitHub username: "
read GITHUB_USERNAME

# Ask for repository name
echo -n "Enter your repository name (default: ai-api-playground): "
read REPO_NAME

if [ -z "$REPO_NAME" ]; then
    REPO_NAME="ai-api-playground"
fi

echo ""
echo "📋 Configuration Summary:"
echo "- GitHub Username: $GITHUB_USERNAME"
echo "- Repository Name: $REPO_NAME"
echo "- Homepage URL: https://$GITHUB_USERNAME.github.io/$REPO_NAME"
echo ""

# Update package.json
echo "📝 Updating package.json..."
sed -i "s|yourusername|$GITHUB_USERNAME|g" package.json
sed -i "s|ai-api-playground|$REPO_NAME|g" package.json

# Update vite.config.ts
echo "📝 Updating vite.config.ts..."
sed -i "s|ai-api-playground|$REPO_NAME|g" vite.config.ts

echo "✅ Configuration updated!"
echo ""
echo "📡 Next steps:"
echo "1. Create a new repository on GitHub: https://github.com/new"
echo "2. Name it: $REPO_NAME"
echo "3. Don't initialize with README"
echo "4. Run the following commands:"
echo ""
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial commit'"
echo "   git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "5. Go to GitHub → Settings → Pages → Source: GitHub Actions"
echo "6. Wait 2-3 minutes for deployment"
echo ""
echo "🎉 Your site will be live at: https://$GITHUB_USERNAME.github.io/$REPO_NAME"
