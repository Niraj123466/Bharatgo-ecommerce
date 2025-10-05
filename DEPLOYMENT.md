# Deployment Guide

This guide will help you deploy the E-Commerce React application to various cloud platforms.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git repository

## Build the Application

```bash
npm run build
```

This creates a `dist` folder with the production build.

## Deployment Options

### 1. Netlify (Recommended)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login
   - Click "New site from Git"
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Click "Deploy site"

3. **Configure redirects:**
   - The `public/_redirects` file is already included for SPA routing

### 2. Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Or connect GitHub:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration

### 3. GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json:**
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

### 4. AWS S3 + CloudFront

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload to S3:**
   - Create an S3 bucket
   - Enable static website hosting
   - Upload the `dist` folder contents

3. **Configure CloudFront:**
   - Create a CloudFront distribution
   - Set S3 bucket as origin
   - Configure custom error pages for SPA routing

## Environment Variables

No environment variables are required for this application as it uses public APIs.

## Post-Deployment

1. **Test the application:**
   - Verify all routes work correctly
   - Test authentication flow
   - Check cart functionality
   - Test responsive design

2. **Monitor performance:**
   - Check Core Web Vitals
   - Monitor API response times
   - Test on different devices

## Troubleshooting

### Common Issues

1. **404 errors on refresh:**
   - Ensure redirects are configured for SPA routing
   - Check that `_redirects` file is in the public folder

2. **API errors:**
   - Verify API endpoints are accessible
   - Check CORS settings if needed

3. **Build failures:**
   - Check Node.js version compatibility
   - Clear node_modules and reinstall dependencies

### Support

For deployment issues, check:
- Platform-specific documentation
- Browser console for errors
- Network tab for API issues

