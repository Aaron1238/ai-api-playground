# 🚀 Quick Deploy to GitHub Pages

## Easiest Method (3 Steps)

### Step 1: Run the setup script
```bash
./deploy.sh
```
Follow the prompts to configure your GitHub username and repository name.

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Create a new repository with the name you chose
3. **Don't** initialize with README

### Step 3: Push and Deploy
Run the commands shown by the setup script:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

Then:
1. Go to GitHub → Settings → Pages
2. Select **Source: GitHub Actions**
3. Wait 2-3 minutes

🎉 **Done!** Your site is live!

## Manual Method

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

## Your Files Are Ready!

✅ `package.json` - Updated with homepage and deploy scripts
✅ `vite.config.ts` - Configured for GitHub Pages
✅ `.github/workflows/deploy.yml` - GitHub Actions workflow
✅ `deploy.sh` - Automated setup script
✅ `README.md` - Project documentation
✅ `DEPLOYMENT_GUIDE.md` - Detailed deployment guide

## Website Features

- 🔐 Secure API key storage (local)
- 🤖 25+ AI models to choose from
- 💬 Real-time chat interface
- 📊 Model details and specifications
- 🎨 Modern responsive design
- ⚡ Fast and lightweight

## Need Help?

1. Check the detailed guide: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
2. Make sure your repository name matches the `base` path in `vite.config.ts`
3. Ensure your `homepage` URL in `package.json` is correct
4. Check the **Actions** tab on GitHub for build errors

Happy deploying! 🎉
