# EmailJS Setup Guide - Get Real Emails Working in 5 Minutes

## Step 1: Create EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service
1. Go to "Email Services" in your dashboard
2. Click "Add New Service"
3. Choose "Gmail" (recommended)
4. Click "Connect Account" and sign in with your Gmail (qaswarhussain135@gmail.com)
5. Copy the **Service ID** (looks like: service_xxxxxxx)

## Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

**Subject:** New Contact from {{from_name}} - {{subject}}

**Content:**
```
Hi Qaswar,

You have a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from your portfolio website
```

4. Copy the **Template ID** (looks like: template_xxxxxxx)

## Step 4: Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key** (looks like: lgJNGqRjMkuHtQrFe)

## Step 5: Update Your Code
In `src/components/Contact.jsx`, replace these lines:

```javascript
// Replace these with your actual values:
'service_8x7mltp', // Your Service ID
'template_tpz2lzg', // Your Template ID  
'lgJNGqRjMkuHtQrFe' // Your Public Key
```

And also update the initialization:
```javascript
emailjs.init('YOUR_PUBLIC_KEY'); // Your actual public key
```

## Step 6: Test
1. Fill out your contact form
2. Submit it
3. Check your Gmail inbox - you should receive the email!

## Free Plan Limits:
- 200 emails per month
- EmailJS branding in emails
- All features included

That's it! Your contact form will now send real emails to your Gmail account.