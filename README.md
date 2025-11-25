# Only Remote - Waitlist Landing Page

A production-ready waitlist landing page for Only Remote, built with React, TypeScript, Tailwind CSS, and Lovable Cloud (Supabase).

## 🚀 Features

- **Beautiful Landing Page**: Modern, responsive design with smooth animations
- **Waitlist Form**: Comprehensive form with validation and error handling
- **Email Integration**: Automatic welcome emails via Resend
- **Database Storage**: Secure data storage with Supabase
- **Analytics Ready**: Includes tracking hooks for future analytics integration
- **Mobile-First**: Fully responsive design optimized for all devices
- **TypeScript**: Full type safety throughout the application

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account (integrated via Lovable Cloud)
- Resend account for transactional emails

## 🛠️ Local Development Setup

### 1. Clone the Repository

```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

The project uses Lovable Cloud for backend services. Environment variables are automatically configured:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase anon/public key
- `RESEND_API_KEY` - Your Resend API key (for edge functions)

**Note**: These are preconfigured in Lovable Cloud. If running locally, you'll need to set up your own Supabase project.

### 4. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:8080`

## 🗄️ Database Schema

The `waitlist_signups` table structure:

```sql
CREATE TABLE waitlist_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  current_status TEXT NOT NULL,
  role_interest TEXT NOT NULL,
  visa_need TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## 📧 Email Configuration

### Setting up Resend

1. Sign up at [resend.com](https://resend.com)
2. Verify your sending domain at [resend.com/domains](https://resend.com/domains)
3. Create an API key at [resend.com/api-keys](https://resend.com/api-keys)
4. Add the API key as a secret in your Lovable Cloud project

**Important**: Remember to verify your domain in Resend before sending emails in production.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Hero.tsx              # Hero section with CTA
│   ├── HowItWorks.tsx        # 3-step process explanation
│   ├── WhoItsFor.tsx         # Target audience section
│   ├── WaitlistForm.tsx      # Form with validation
│   └── ui/                   # shadcn/ui components
├── pages/
│   ├── Index.tsx             # Main landing page
│   └── NotFound.tsx          # 404 page
├── integrations/
│   └── supabase/
│       └── client.ts         # Supabase client (auto-generated)
└── index.css                 # Design system & global styles

supabase/
└── functions/
    └── submit-waitlist/      # Edge function for form submission
        └── index.ts
```

## 🎨 Design System

The project uses a custom design system defined in `src/index.css`:

- **Primary Color**: Professional teal-blue (#22b8cf)
- **Typography**: System font stack with excellent readability
- **Spacing**: Consistent spacing scale
- **Components**: Custom variants for buttons, cards, and forms

All styles use semantic tokens for easy theming and consistency.

## 🔒 Security Features

- **RLS Enabled**: Row Level Security on database tables
- **Input Validation**: Zod schema validation on both client and server
- **SQL Injection Protection**: Parameterized queries via Supabase client
- **XSS Prevention**: Proper input sanitization
- **Service Role Authentication**: Edge function uses service role for secure database access

## 📊 Analytics Integration

The codebase includes `console.log` analytics hooks that can be replaced with your preferred analytics service:

```typescript
// TODO: Replace with actual analytics
console.log("[ANALYTICS] Page view: Landing page");
console.log("[ANALYTICS] Waitlist form submitted");
```

Replace these with calls to Google Analytics, Mixpanel, Segment, or your chosen analytics platform.

## 🚀 Deployment

The project is deployed via Lovable:

1. **Frontend**: Automatically deployed when you click "Publish" in Lovable
2. **Backend**: Edge functions deploy automatically with frontend changes
3. **Database**: Managed through Lovable Cloud

## 📝 TODO: Future Enhancements

- [ ] Add real analytics integration (Google Analytics / Mixpanel)
- [ ] Implement A/B testing for different CTAs
- [ ] Add social proof counter (dynamic signup count)
- [ ] Create admin dashboard for viewing signups
- [ ] Add email marketing integration (Mailchimp / ConvertKit)
- [ ] Implement referral system
- [ ] Add internationalization (i18n)
- [ ] Create blog section for SEO
- [ ] Add testimonials section

## 🐛 Troubleshooting

### Email not sending?
- Verify your domain in Resend dashboard
- Check that RESEND_API_KEY is properly configured
- Review edge function logs in Lovable Cloud

### Form not submitting?
- Check browser console for errors
- Verify Supabase connection is active
- Ensure all required fields are filled

### Database errors?
- Verify RLS policies are correctly configured
- Check edge function has service role key access
- Review Supabase logs for detailed error messages

## 📞 Support

Need help? Contact us at hello@onlyremote.org

## 📄 License

Copyright © 2024 Only Remote. All rights reserved.
