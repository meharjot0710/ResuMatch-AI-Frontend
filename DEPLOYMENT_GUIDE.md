# Deployment Guide for ResuMatch AI

## Environment Configuration

### 1. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# API Base URL (optional - will auto-detect in production)
# For development: http://localhost:3000
# For production: https://your-domain.com
NEXT_PUBLIC_API_URL=http://localhost:3000

# JWT Secret (required)
JWT_SECRET=your-super-secret-jwt-key-here

# MongoDB Connection String (required)
MONGODB_URI=mongodb://localhost:27017/resumatch-ai

# Gemini AI API Key (required for resume analysis)
GEMINI_API_KEY=your-gemini-api-key-here

# AWS S3 Configuration (optional - for file uploads)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-s3-bucket-name
```

### 2. API URL Configuration

The application now automatically handles API URLs based on the environment:

- **Development**: Uses `http://localhost:3000`
- **Production**: Uses `NEXT_PUBLIC_API_URL` environment variable or auto-detects from `window.location.origin`

### 3. Deployment Platforms

#### Vercel
1. Set environment variables in Vercel dashboard
2. Set `NEXT_PUBLIC_API_URL` to your Vercel deployment URL
3. Deploy using `vercel --prod`

#### Netlify
1. Set environment variables in Netlify dashboard
2. Set `NEXT_PUBLIC_API_URL` to your Netlify deployment URL
3. Deploy using `netlify deploy --prod`

#### Railway
1. Set environment variables in Railway dashboard
2. Set `NEXT_PUBLIC_API_URL` to your Railway deployment URL
3. Deploy using Railway CLI or GitHub integration

### 4. Production Checklist

- [ ] Set all required environment variables
- [ ] Configure `NEXT_PUBLIC_API_URL` to your production domain
- [ ] Ensure MongoDB is accessible from production
- [ ] Verify Gemini AI API key is valid
- [ ] Test all API endpoints in production environment
- [ ] Check that file uploads work (if using S3)

### 5. API Endpoints

All API endpoints are now configured to work in both development and production:

- `/api/auth/login` - User login
- `/api/auth/signup` - User registration
- `/api/auth/update-password` - Password update
- `/api/auth/update-name` - Name update
- `/api/auth/delete-account` - Account deletion
- `/api/analyze/resumeupload` - Resume analysis
- `/api/analyze/resumeget` - Get resume

### 6. Troubleshooting

If you encounter issues:

1. **Check environment variables** are set correctly
2. **Verify API URLs** are accessible from your deployment
3. **Check browser console** for any fetch errors
4. **Verify CORS settings** if using separate frontend/backend
5. **Test API endpoints** directly using tools like Postman

### 7. Local Development

For local development, no additional configuration is needed. The app will automatically use `http://localhost:3000` for API calls. 