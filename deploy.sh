#!/bin/bash

# RAG Prompt Library - Initial Deployment Script
# This script will initialize git and push to GitHub

set -e

echo "🎯 RAG Prompt Library - Deployment Script"
echo "=========================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Error: git is not installed"
    echo "Please install git first: https://git-scm.com/downloads"
    exit 1
fi

# Check if we're already in a git repository
if [ -d .git ]; then
    echo "⚠️  Git repository already exists"
    echo "This script is for initial setup only."
    echo ""
    read -p "Do you want to add and push changes anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "📦 Initializing git repository..."
    git init
    echo "✅ Git initialized"
fi

echo ""
echo "📝 Adding files to git..."
git add .

echo ""
echo "💾 Creating commit..."
git commit -m "Initial commit: RAG Prompt Library with 10 production prompts

- 10 production-ready RAG prompt templates
- 3 categories: General, Technical, Domain-Specific
- Marketing page with responsive design
- Complete documentation (README, CONTRIBUTING, QUICKSTART)
- GitHub Actions for auto-deployment
- Issue templates for community feedback
- MIT License"

echo "✅ Commit created"

echo ""
echo "🔗 Setting remote repository..."
git remote add origin https://github.com/itsumida/rag-prompt-library.git 2>/dev/null || git remote set-url origin https://github.com/itsumida/rag-prompt-library.git
echo "✅ Remote set"

echo ""
echo "📤 Pushing to GitHub..."
git branch -M main

# Try to push
if git push -u origin main; then
    echo ""
    echo "🎉 Success! Your repository has been pushed to GitHub!"
    echo ""
    echo "Next steps:"
    echo "1. Go to https://github.com/itsumida/rag-prompt-library"
    echo "2. Enable GitHub Pages:"
    echo "   - Settings → Pages → Source: GitHub Actions"
    echo "3. Wait 2-3 minutes for deployment"
    echo "4. Visit https://itsumida.github.io/rag-prompt-library/"
    echo ""
    echo "Optional:"
    echo "- Enable Discussions in repository Settings"
    echo "- Add topics/tags to your repository"
    echo "- Share your library on social media!"
else
    echo ""
    echo "⚠️  Push failed. This might be because:"
    echo "1. You need to authenticate with GitHub"
    echo "2. The repository doesn't exist yet"
    echo "3. You don't have push permissions"
    echo ""
    echo "To fix:"
    echo "1. Make sure the repository exists: https://github.com/itsumida/rag-prompt-library"
    echo "2. Try authenticating with: gh auth login"
    echo "3. Or manually push: git push -u origin main"
    exit 1
fi
