# 🚀 Voyager Station API Setup Guide

## 🎯 **Quick Start (5 Minutes Total)**

### **Step 1: NASA API (REQUIRED - 100% FREE)**
1. Go to: https://api.nasa.gov/
2. Click "Get Started"
3. Fill form: Name, Email, Use Case: "Educational/Personal Project"
4. Get instant API key
5. Copy to `.env.local` as `NEXT_PUBLIC_NASA_API_KEY=your_key_here`

### **Step 2: Choose ONE AI Provider (ALL FREE)**

#### **Option A: Groq (RECOMMENDED - FASTEST)**
- **Speed:** 500+ tokens/second (10x faster than OpenAI)
- **Free Tier:** 6,000 requests/day
- **Setup:**
  1. Go to: https://console.groq.com/
  2. Sign up with Google/GitHub
  3. Go to "API Keys" → Create new key
  4. Copy to `.env.local` as `NEXT_PUBLIC_GROQ_API_KEY=your_key_here`

#### **Option B: Google Gemini (GOOD QUALITY)**
- **Free Tier:** 60 requests/minute
- **Setup:**
  1. Go to: https://makersuite.google.com/app/apikey
  2. Sign in with Google account
  3. Create API key
  4. Copy to `.env.local` as `NEXT_PUBLIC_GEMINI_API_KEY=your_key_here`

#### **Option C: Hugging Face (100% FREE FOREVER)**
- **Free Tier:** Unlimited (with rate limits)
- **Setup:**
  1. Go to: https://huggingface.co/settings/tokens
  2. Sign up with email
  3. Create new token (Read access)
  4. Copy to `.env.local` as `NEXT_PUBLIC_HUGGINGFACE_API_KEY=your_key_here`

### **Step 3: Database (OPTIONAL)**

#### **Supabase (RECOMMENDED - Better than Firebase)**
- **Free Tier:** 500MB database, 2GB bandwidth
- **Setup:**
  1. Go to: https://supabase.com/
  2. Sign up with GitHub
  3. Create new project
  4. Go to Settings → API
  5. Copy URL and anon key to `.env.local`:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
     ```

---

## 🔧 **Your .env.local Should Look Like:**

```bash
# 🚀 NASA API (REQUIRED)
NEXT_PUBLIC_NASA_API_KEY=your_nasa_key_here

# 🤖 AI API (Choose ONE)
NEXT_PUBLIC_GROQ_API_KEY=your_groq_key_here
# OR
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key_here
# OR
NEXT_PUBLIC_HUGGINGFACE_API_KEY=your_hf_token_here

# 🗄️ Database (OPTIONAL)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

---

## 🎯 **What Each API Enables:**

### **🚀 NASA API:**
- ✅ Real ISS tracking
- ✅ Astronomy Picture of the Day
- ✅ Mars weather data
- ✅ People currently in space
- ✅ Earth imagery

### **🤖 AI APIs:**
- ✅ Interactive ARIA chat assistant
- ✅ Ship system diagnostics
- ✅ Mission planning help
- ✅ Technical support queries

### **🗄️ Database (Optional):**
- ✅ Save user preferences
- ✅ Mission logs storage
- ✅ Chat history
- ✅ Custom settings

---

## 🚀 **After Setup:**

1. **Restart your development server:**
   ```bash
   npm run dev
   ```

2. **Test the APIs:**
   - Go to Command Center → See real NASA data
   - Go to AI Assistant → Chat with ARIA
   - Go to Ship Tracking → See live ISS position

---

## 🆘 **Troubleshooting:**

### **API Not Working?**
- Check `.env.local` file exists in root directory
- Restart development server after adding keys
- Check browser console for error messages

### **Still Having Issues?**
- NASA API: Use `DEMO_KEY` for testing (limited requests)
- AI APIs: Try different provider if one fails
- Database: Skip if not needed - app works without it

---

## 💡 **Pro Tips:**

1. **Start with NASA + Groq** - Best combination for speed and features
2. **All APIs are FREE** - No credit card required
3. **Rate limits exist** - But generous for personal projects
4. **Database is optional** - App works great without it
5. **Multiple AI providers** - App automatically tries available ones

---

## 🎉 **You're Ready!**

With just NASA + one AI API, your Voyager Station will transform from static demo to fully interactive space command center! 🛰️
