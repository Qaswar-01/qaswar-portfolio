# Contact Form Setup with Formspree

The contact form is now configured to send real emails using Formspree (a free email service).

## Quick Setup (5 minutes):

### 1. Create Formspree Account
1. Go to [formspree.io](https://formspree.io)
2. Sign up for a free account
3. Create a new form
4. Copy your form endpoint URL

### 2. Update the Code
In `src/components/Contact.jsx`, replace this line:
```javascript
const response = await fetch('https://formspree.io/f/xdkogqpb', {
```

With your actual Formspree endpoint:
```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
```

### 3. Test the Form
- Fill out the contact form on your website
- Submit it
- Check your email - you should receive the message!

## Current Features:
✅ **Real email sending** via Formspree
✅ **Form validation** with error messages
✅ **Loading states** and success feedback
✅ **Professional styling** and animations
✅ **Responsive design**
✅ **No demo mode** - fully functional

## Formspree Free Plan:
- 50 submissions per month
- Email notifications
- Spam filtering
- No setup required

The form will work immediately once you update the endpoint URL!