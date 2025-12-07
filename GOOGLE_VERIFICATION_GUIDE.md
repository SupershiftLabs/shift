# Google Search Console Verification Guide

## Method 1: HTML Meta Tag (RECOMMENDED - Easiest)

1. **Get your verification code from Google Search Console:**
   - Go to https://search.google.com/search-console
   - Click "Add Property"
   - Enter your domain: supershiftlabs.com
   - Choose "HTML tag" method
   - Copy the code that looks like: `google-site-verification=abc123...`

2. **Update the verification in `/app/layout.tsx`:**
   - Find line 74: `google: 'your-google-verification-code',`
   - Replace `'your-google-verification-code'` with your actual code
   - Example: `google: 'abc123xyz789',`

3. **Rebuild and deploy:**
   ```bash
   npm run build
   git add -A
   git commit -m "Add Google Search Console verification"
   git push origin main
   vercel --prod --yes
   ```

4. **Verify in Google Search Console:**
   - Click "Verify" button
   - Google will check for the meta tag

---

## Method 2: HTML File Upload

If Google gave you a file like `google1234567890abcdef.html`:

1. **Create the file in `/public/` directory:**
   - The file should contain exactly what Google provided
   - Usually looks like: `google-site-verification: google1234567890abcdef.html`

2. **File location:**
   ```
   /public/google1234567890abcdef.html
   ```

3. **File should be accessible at:**
   ```
   https://supershiftlabs.com/google1234567890abcdef.html
   ```

4. **Rebuild and deploy:**
   ```bash
   npm run build
   git add -A
   git commit -m "Add Google verification HTML file"
   git push origin main
   vercel --prod --yes
   ```

---

## Method 3: DNS Verification (Alternative)

1. **Get your TXT record from Google Search Console**
2. **Add to your domain DNS settings** (at your domain registrar)
3. **Wait for DNS propagation** (can take up to 48 hours)

---

## Current Status

Your site is ready for verification. You just need to:

1. Get your verification code/file from Google Search Console
2. Add it using one of the methods above
3. Redeploy the site
4. Click "Verify" in Google Search Console

---

## Troubleshooting

**"Verification file not found"**
- Make sure the file is in the `/public/` directory
- Verify the filename matches exactly what Google expects
- Rebuild and redeploy after adding the file
- Wait 1-2 minutes after deployment before verifying
- Check the file is accessible by visiting the URL directly

**"Meta tag not found"**
- Check that layout.tsx has been updated
- Verify the code is correct (no extra quotes or spaces)
- Rebuild and redeploy
- View page source to confirm the meta tag is present

---

## Quick Steps to Get Your Verification Code

1. Go to: https://search.google.com/search-console
2. Click "Add Property" or "Add a property"
3. Select "URL prefix" and enter: https://supershiftlabs.com
4. Choose verification method:
   - **HTML tag** (easiest - copy the content value)
   - **HTML file** (download the file)
5. Let me know which method you chose and I'll help you implement it!

---

## After Verification

Once verified, you can:
- Submit your sitemap: https://supershiftlabs.com/sitemap.xml
- Monitor indexing status
- See search performance
- Fix any crawl errors
- Request indexing for new pages
