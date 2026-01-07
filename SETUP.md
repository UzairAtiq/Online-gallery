# Backend Setup Guide for Vercel Deployment

This guide will help you set up the backend using Supabase for image storage.

## 🚀 Quick Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in your project details:
   - **Name**: Photo Library (or any name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to you
4. Wait for the project to be created (~2 minutes)

### 2. Set Up Database

1. In your Supabase project, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the contents of `supabase-setup.sql`
4. Click **Run** (or press Cmd/Ctrl + Enter)
5. You should see "Success. No rows returned"

### 3. Set Up Storage Bucket

1. Go to **Storage** in your Supabase dashboard
2. You should see a bucket named `photo-library` (created by the SQL script)
3. If not, create it manually:
   - Click **New bucket**
   - Name: `photo-library`
   - Public bucket: **Enabled** (toggle ON)
   - Click **Create bucket**

### 4. Get Your API Keys

1. Go to **Project Settings** → **API**
2. You'll need these values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")
   - **service_role key** (under "Project API keys") - Keep this secret!

### 5. Configure Environment Variables

#### For Local Development:

1. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

#### For Vercel Deployment:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:
   - `VITE_SUPABASE_URL` = Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = Your Supabase anon key
   - `SUPABASE_URL` = Your Supabase project URL (same as above)
   - `SUPABASE_SERVICE_ROLE_KEY` = Your Supabase service role key
4. Make sure to add them for **Production**, **Preview**, and **Development** environments
5. Redeploy your application

### 6. Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Vercel will automatically detect it's a Vite project
4. Add the environment variables (step 5)
5. Deploy!

## 📁 Project Structure

```
├── api/
│   └── photos.js          # Vercel serverless function
├── src/
│   ├── lib/
│   │   └── supabase.js    # Supabase client (not used in current setup)
│   └── App.jsx            # Main app (uses API routes)
└── supabase-setup.sql     # Database setup script
```

## 🔍 How It Works

1. **Frontend** → Makes API calls to `/api/photos`
2. **Vercel Serverless Function** (`api/photos.js`) → Handles requests
3. **Supabase Storage** → Stores actual image files
4. **Supabase Database** → Stores photo metadata (name, URL, etc.)

## 🧪 Testing Locally

1. Make sure your `.env` file is set up
2. Run `npm run dev`
3. The API routes will work at `http://localhost:5173/api/photos`

## ⚠️ Important Notes

- **Service Role Key**: Never expose this in client-side code! It's only used in serverless functions.
- **Storage Limits**: Supabase free tier includes 1GB storage
- **Rate Limits**: Be aware of Supabase rate limits on free tier
- **CORS**: The API includes CORS headers for cross-origin requests

## 🐛 Troubleshooting

### "Missing Supabase configuration" error
- Check that all environment variables are set in Vercel
- Make sure variable names match exactly (case-sensitive)

### Images not uploading
- Check Supabase Storage bucket exists and is public
- Verify storage policies are set correctly
- Check browser console for errors

### "Failed to fetch photos"
- Verify Supabase database table exists
- Check RLS policies are set correctly
- Verify API route is accessible

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Supabase Storage](https://supabase.com/docs/guides/storage)

