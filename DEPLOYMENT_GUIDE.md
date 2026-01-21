# Deploy AI API Playground to GitHub Pages 🚀

This guide will walk you through deploying your AI API Playground to GitHub Pages using two different methods.

## Method 1: GitHub Actions (Recommended) 🤖

This method uses GitHub's official Pages deployment system and is the most reliable.

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `ai-api-playground` (or any name you prefer)
3. **Don't** initialize with README (we'll push our own)

### Step 2: Update Configuration

1. **Update `package.json`** with your GitHub username:
   ```json
   "homepage": "https://yourusername.github.io/ai-api-playground"
   ```
   Replace `yourusername` with your actual GitHub username.

2. **Update `vite.config.ts`** (already done for you):
   ```typescript
   base: '/ai-api-playground/',
   ```
   This should match your repository name.

### Step 3: Push to GitHub

In your terminal, navigate to the project folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - AI API Playground"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/ai-api-playground.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `yourusername` with your GitHub username.

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. The workflow file (`.github/workflows/deploy.yml`) is already included in your project

### Step 5: Wait for Deployment

1. Go to **Actions** tab in your repository
2. You should see the deployment workflow running
3. Wait for it to complete (usually 2-3 minutes)
4. Your site will be live at: `https://yourusername.github.io/ai-api-playground`

## Method 2: gh-pages Package 📦

This method uses the `gh-pages` npm package and is simpler for manual deployment.

### Step 1: Install gh-pages

```bash
npm install --save-dev gh-pages
```

(Already included in your package.json)

### Step 2: Update package.json

The scripts are already configured:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

### Step 3: Deploy

```bash
npm run deploy
```

This will:
1. Build the project
2. Create a `gh-pages` branch
3. Deploy to GitHub Pages

### Step 4: Enable GitHub Pages

1. Go to **Settings** → **Pages** in your repository
2. Under **Source**, select **Deploy from a branch**
3. Select **gh-pages** branch
4. Click **Save**

## Troubleshooting 🔧

### 404 Error After Deployment

1. Make sure the `base` path in `vite.config.ts` matches your repository name
2. Check that `homepage` in `package.json` is correct
3. Wait a few minutes for GitHub Pages to propagate

### Build Failures

1. Check the **Actions** tab for error messages
2. Make sure all dependencies are installed: `npm install`
3. Try building locally: `npm run build`

### Custom Domain (Optional)

To use a custom domain:

1. Go to **Settings** → **Pages**
2. Under **Custom domain**, enter your domain
3. Add a `CNAME` file to your `public` folder with your domain name
4. Configure DNS according to GitHub's instructions

## Verification ✅

Once deployed, you should see:

- ✅ Your AI API Playground loading at the GitHub Pages URL
- ✅ All 25+ AI models listed in the dropdown
- ✅ Working chat interface
- ✅ Responsive design on mobile and desktop

## Next Steps 🎯

1. **Customize the design** - Modify colors, fonts, or layout
2. **Add real API integration** - Connect to actual AI providers
3. **Add more models** - Update `src/types/models.ts`
4. **Add features** - Chat history, export, themes, etc.

## Support 💬

If you encounter issues:
- Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
- Look at the build logs in **Actions** tab
- Make sure your repository is public (private repos need GitHub Pro for Pages)

Happy deploying! 🎉
