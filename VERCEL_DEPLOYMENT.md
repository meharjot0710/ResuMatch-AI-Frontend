# Vercel Deployment Guide for ResuMatch AI

## 🚀 Quick Deploy to Vercel

### 1. Connect Your Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository containing ResuMatch AI

### 2. Configure Environment Variables

In your Vercel project dashboard → Settings → Environment Variables, add:

```bash
# Required Environment Variables
JWT_SECRET=your-super-secret-jwt-key-here
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resumatch-ai?retryWrites=true&w=majority
GEMINI_API_KEY=your-gemini-api-key-here

# Optional - Vercel will auto-detect this
NEXT_PUBLIC_API_URL=https://your-project-name.vercel.app
```

### 3. MongoDB Atlas Setup (Required)

Since Vercel serverless functions can't connect to local MongoDB:

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for free account

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select cloud provider (AWS/Google Cloud/Azure)
   - Choose region closest to your users
   - Click "Create"

3. **Set Up Database Access**
   - Go to "Database Access" → "Add New Database User"
   - Create username and password
   - Select "Read and write to any database"
   - Click "Add User"

4. **Set Up Network Access**
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `resumatch-ai`

### 4. Gemini AI API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key and add to Vercel environment variables

### 5. Deploy

1. **Automatic Deployment**
   - Vercel will automatically deploy when you push to main branch
   - Or click "Deploy" in Vercel dashboard

2. **Manual Deployment**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy
   vercel --prod
   ```

### 6. Post-Deployment Setup

1. **Test Your Application**
   - Visit your Vercel URL
   - Test signup/login functionality
   - Test resume upload and analysis

2. **Monitor Logs**
   - Go to Vercel dashboard → Functions
   - Check for any errors in API routes

3. **Set Up Custom Domain (Optional)**
   - Go to Settings → Domains
   - Add your custom domain

## 🔧 Vercel-Specific Configurations

### File Upload Limits
- Vercel has a 4.5MB limit for serverless functions
- For larger files, consider using S3 or similar service

### Cold Starts
- First API call might be slow (cold start)
- Subsequent calls will be faster

### Environment Variables
- All environment variables are automatically available to your app
- No need to create `.env.local` file in production

## 🐛 Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**
   - Check MONGODB_URI is correct
   - Ensure MongoDB Atlas network access allows all IPs
   - Verify database user has correct permissions

2. **API Routes Not Working**
   - Check Vercel function logs
   - Verify environment variables are set
   - Ensure all dependencies are in package.json

3. **File Upload Issues**
   - Check file size limits
   - Verify S3 configuration (if using)

4. **Build Errors**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are properly installed

### Debug Steps:

1. **Check Function Logs**
   - Go to Vercel dashboard → Functions
   - Click on any function to see logs

2. **Test API Endpoints**
   - Use Postman or curl to test API endpoints
   - Check response status and body

3. **Verify Environment Variables**
   - Go to Settings → Environment Variables
   - Ensure all required variables are set

## 📊 Monitoring

### Vercel Analytics
- Enable Vercel Analytics for performance monitoring
- Track API usage and errors

### Function Monitoring
- Monitor serverless function performance
- Check for cold start issues

## 🔄 Continuous Deployment

### Automatic Deployments
- Push to main branch triggers automatic deployment
- Preview deployments for pull requests

### Manual Deployments
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## 🎯 Success Checklist

- [ ] Repository connected to Vercel
- [ ] All environment variables set
- [ ] MongoDB Atlas configured and connected
- [ ] Gemini AI API key configured
- [ ] Application deployed successfully
- [ ] Signup/login functionality working
- [ ] Resume upload and analysis working
- [ ] Custom domain configured (optional)
- [ ] Monitoring and analytics enabled (optional)

Your ResuMatch AI application should now be live on Vercel! 🎉 