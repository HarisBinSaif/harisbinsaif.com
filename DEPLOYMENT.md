# Deployment Guide: GitHub Pages with Custom Domain

This guide will walk you through deploying your website to GitHub Pages and connecting your custom domain hosted on Wix.

## Quick Start

1. **Push code to GitHub** (see Step 1 below)
2. **Enable GitHub Pages** (see Step 2 below)
3. **Configure DNS on Wix** (see Step 4 below)
4. **Wait 10-30 minutes** for deployment

## Prerequisites

- ✅ A GitHub account
- ✅ A repository for your website (create one at https://github.com/new)
- ✅ A custom domain (harisbinsaif.com) registered with Wix

---

## Step 1: Push Your Code to GitHub

### 1.1 Create a GitHub Repository

1. Go to https://github.com/new
2. Name it (e.g., `harisbinsaif.com` or `portfolio`)
3. Set it to **Public** (required for free GitHub Pages)
4. **Don't** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

### 1.2 Push Your Code

Run these commands in your terminal:

```bash
cd /Users/harisbinsaif/harisbinsaif.com

# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Personal portfolio website"

# Rename branch to main (if needed)
git branch -M main

# Add your GitHub repository as remote
# REPLACE YOUR_USERNAME and YOUR_REPO_NAME with your actual values
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/harisbinsaif/harisbinsaif.com.git
```

---

## Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Source**, select **GitHub Actions** (important: NOT "Deploy from a branch")
5. Save - this enables the automated deployment workflow

**What happens:** GitHub will automatically detect the workflow file (`.github/workflows/deploy.yml`) and start deploying your site.

---

## Step 3: Configure Your Custom Domain

### 3.1 Set Domain in GitHub Repository

1. In your repository, go to **Settings** → **Pages**
2. Scroll to the **Custom domain** section
3. Enter your domain: `harisbinsaif.com`
4. Check **Enforce HTTPS** (recommended - SSL certificate will be generated)
5. Click **Save**

**Note:** The CNAME file at `public/CNAME` is already set to `harisbinsaif.com`. If your domain is different, update that file.

### 3.2 Verify CNAME File

Check that `public/CNAME` contains your exact domain:
```
harisbinsaif.com
```

---

## Step 4: Configure DNS on Wix

Since your domain is hosted on Wix, you need to point it to GitHub Pages.

### 4.1 Access DNS Settings on Wix

1. **Log into your Wix account**
2. Go to **Domains** → **Manage Domains**
3. Click on your domain (`harisbinsaif.com`)
4. Click **DNS Settings** or **Advanced DNS**

### 4.2 Update A Records

You need to add/update 4 A records pointing to GitHub Pages IP addresses:

**Delete any existing A records** pointing to Wix, then add these:

```
Record 1:
Type: A
Name: @ (or leave blank)
Value: 185.199.108.153
TTL: 3600 (or Auto)

Record 2:
Type: A
Name: @ (or leave blank)
Value: 185.199.109.153
TTL: 3600

Record 3:
Type: A
Name: @ (or leave blank)
Value: 185.199.110.153
TTL: 3600

Record 4:
Type: A
Name: @ (or leave blank)
Value: 185.199.111.153
TTL: 3600
```

### 4.3 Add CNAME for www (Optional)

If you want `www.harisbinsaif.com` to work:

```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
TTL: 3600
```

**Example:** If your GitHub username is `harisbinsaif`, the value would be `harisbinsaif.github.io`

### 4.4 Save DNS Settings

Click **Save** or **Apply** in Wix DNS settings.

---

## Step 5: Wait for Deployment

### 5.1 Check Deployment Status

1. Go to your GitHub repository
2. Click the **Actions** tab
3. You should see a workflow run called "Deploy to GitHub Pages"
4. Wait for it to show a green checkmark ✅ (usually takes 2-5 minutes)

### 5.2 DNS Propagation

**Important:** DNS changes can take **24-48 hours** to fully propagate, but often work within 30 minutes to 2 hours.

- Check DNS propagation: https://www.whatsmydns.net
- Test your domain: `nslookup harisbinsaif.com`

### 5.3 Your Site URLs

Once deployed, your site will be available at:

- **GitHub Pages URL** (immediate): `https://YOUR_USERNAME.github.io/REPO_NAME/`
- **Custom Domain** (after DNS propagates): `https://harisbinsaif.com`

---

## Step 6: Verify Everything Works

### 6.1 Test Your Site

Visit and test:
- ✅ Homepage: `https://harisbinsaif.com`
- ✅ Blog page: `https://harisbinsaif.com/blog`
- ✅ Blog posts: `https://harisbinsaif.com/blog/your-post-slug`
- ✅ RSS feed: `https://harisbinsaif.com/rss.xml`
- ✅ Sitemap: `https://harisbinsaif.com/sitemap.xml`

### 6.2 Test HTTPS

1. Go to your repository → **Settings** → **Pages**
2. Ensure **Enforce HTTPS** is checked
3. GitHub will automatically provision an SSL certificate (may take a few minutes after DNS resolves)

---

## Updating Your Site

Every time you push to the `main` branch, GitHub Actions will automatically:

1. ✅ Install dependencies
2. ✅ Generate blog manifest
3. ✅ Build your site
4. ✅ Generate RSS feed and sitemap
5. ✅ Deploy to GitHub Pages

**To update your site:**

```bash
git add .
git commit -m "Your update message"
git push
```

Then wait 2-5 minutes for the deployment to complete.

---

## Troubleshooting

### Site shows 404 after deployment

- ⏰ Wait 10-15 minutes after deployment (GitHub needs time to process)
- 🧹 Clear your browser cache
- ✅ Check GitHub Actions workflow completed successfully (green checkmark)
- 🔍 Verify DNS settings on Wix match Step 4

### Custom domain not working

- ✅ Verify `public/CNAME` file contains your exact domain
- 🌐 Check DNS propagation: https://www.whatsmydns.net
- 🔢 Ensure A records point to GitHub IPs (185.199.108.153, etc.)
- ⏳ Wait up to 48 hours for DNS propagation

### HTTPS not available / Certificate error

- ✅ Go to Settings → Pages → Custom domain
- ✅ Ensure "Enforce HTTPS" is checked
- ⏳ Wait a few minutes after DNS resolves (GitHub needs to provision SSL)
- 🔄 Try unchecking and rechecking "Enforce HTTPS"

### Routes not working (404 on `/blog` etc.)

- ✅ The `404.html` file should handle SPA routing
- ⏳ GitHub Pages may take a few minutes to recognize the 404.html
- 🔍 Try visiting the route directly after deployment
- 🧹 Clear browser cache

### Build fails in GitHub Actions

- ✅ Check the Actions tab for error details
- ✅ Ensure all dependencies are in `package.json`
- ✅ Verify the build works locally: `npm run build`
- ✅ Check that blog manifest generation works: `npm run generate-blog-manifest`

### DNS not resolving

- 🔍 Use `nslookup harisbinsaif.com` to check DNS
- ✅ Verify A records are correctly set in Wix
- ⏳ DNS changes can take 24-48 hours (though usually faster)
- 🔄 Try removing and re-adding DNS records in Wix

---

## Project Structure

Your deployment includes:

- ✅ **Main site**: React app with all components
- ✅ **Blog system**: MDX-based blog posts
- ✅ **RSS feed**: Auto-generated at `/rss.xml`
- ✅ **Sitemap**: Auto-generated at `/sitemap.xml`
- ✅ **404 handling**: SPA routing support
- ✅ **CNAME**: Custom domain configuration

---

## Security Note

**Important:** The GitHub token you shared is sensitive. Here's what to do:

1. **Don't share it publicly** (in code, screenshots, etc.)
2. **For GitHub Actions**: You don't need it - GitHub automatically provides permissions
3. **If compromised**: Revoke it at https://github.com/settings/tokens
4. **Best practice**: Use GitHub Actions (which we've set up) - no tokens needed!

---

## Additional Resources

- 📚 [GitHub Pages Documentation](https://docs.github.com/en/pages)
- 🌐 [Custom Domain Setup Guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- 🔧 [GitHub Actions for Pages](https://github.com/actions/deploy-pages)
- 🐛 [GitHub Pages Troubleshooting](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-github-pages)

---

## Support

If you encounter issues:

1. 📋 Check GitHub Actions logs (Actions tab in your repo)
2. 🌐 Verify DNS settings match this guide exactly
3. ⚙️ Check GitHub Pages settings (Settings → Pages)
4. 🔍 Ensure CNAME file matches your domain exactly
5. 🧪 Test build locally: `npm run build`

---

## Next Steps After Deployment

1. ✅ Test all pages and routes
2. ✅ Submit sitemap to Google Search Console
3. ✅ Verify RSS feed works with feed readers
4. ✅ Set up Google Analytics (optional)
5. ✅ Share your site! 🎉

---

**Good luck with your deployment!** 🚀

If you need help, check the troubleshooting section above or GitHub's documentation.
