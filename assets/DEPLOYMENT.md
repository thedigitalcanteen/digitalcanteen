# Deployment Guide

## Quick Deployment Options

This static website can be deployed to any web hosting service. Here are the most popular options:

## 🚀 Free Hosting Options

### 1. GitHub Pages (Recommended)

**Perfect for**: Public projects, personal websites, documentation

```bash
# 1. Create a new GitHub repository
# 2. Push your static-website folder to the repo
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main

# 3. Enable GitHub Pages
# Go to Settings > Pages > Source > Select "main" branch > Save

# Your site will be live at:
# https://YOUR_USERNAME.github.io/YOUR_REPO/
```

**Pros**:
- ✅ Free
- ✅ Automatic HTTPS
- ✅ Custom domain support
- ✅ Git-based workflow

**Cons**:
- ❌ Public repos only (for free tier)

---

### 2. Netlify

**Perfect for**: Production websites, CI/CD workflows

**Method 1: Drag & Drop**
1. Go to [netlify.com](https://netlify.com)
2. Sign up for free account
3. Drag the `static-website` folder to the upload area
4. Done! Your site is live at `random-name.netlify.app`

**Method 2: Git-based**
```bash
# 1. Push to GitHub (see above)
# 2. Connect Netlify to your GitHub repo
# 3. Netlify auto-deploys on every push
```

**Pros**:
- ✅ Free tier is generous
- ✅ Automatic HTTPS
- ✅ Custom domain support
- ✅ Form handling (can integrate with demo form)
- ✅ Instant cache invalidation
- ✅ Deploy previews

**Custom Domain**:
1. Settings > Domain management > Add custom domain
2. Update your DNS records

---

### 3. Vercel

**Perfect for**: Fast global deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd static-website
vercel

# Follow prompts, done!
```

**Or use web interface**:
1. Go to [vercel.com](https://vercel.com)
2. Import Git repository
3. Deploy

**Pros**:
- ✅ Extremely fast CDN
- ✅ Free tier
- ✅ Automatic HTTPS
- ✅ Zero configuration

---

### 4. Cloudflare Pages

**Perfect for**: Maximum performance, global CDN

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect GitHub repository
3. Deploy

**Pros**:
- ✅ Free unlimited bandwidth
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Built-in analytics

---

### 5. Surge

**Perfect for**: Quick prototypes, simple deploys

```bash
# Install Surge CLI
npm install -g surge

# Deploy
cd static-website
surge

# First time: create account
# Choose a subdomain or use custom domain
# Done!
```

**Your site**: `your-subdomain.surge.sh`

**Pros**:
- ✅ Fastest deployment (one command)
- ✅ Free
- ✅ Custom domain support

---

## 💰 Paid Hosting Options

### 1. AWS S3 + CloudFront

**Perfect for**: Enterprise, scalable solutions

**Cost**: ~$1-5/month (depending on traffic)

1. Create S3 bucket
2. Enable static website hosting
3. Upload files
4. Create CloudFront distribution
5. Configure DNS

**Pros**:
- ✅ Extremely scalable
- ✅ 99.99% uptime SLA
- ✅ Global CDN

---

### 2. DigitalOcean App Platform

**Perfect for**: Simple, predictable pricing

**Cost**: Free tier available, paid starts at $5/month

1. Connect GitHub repo
2. Select static site
3. Deploy

**Pros**:
- ✅ Simple pricing
- ✅ Good documentation
- ✅ Automatic SSL

---

### 3. Traditional Web Hosting

**Perfect for**: If you already have hosting

Most shared hosting providers (Bluehost, SiteGround, HostGator, etc.)

**FTP Upload**:
1. Connect via FTP
2. Upload all files to `public_html` or `www` folder
3. Done!

**File Manager**:
1. Login to cPanel
2. Use File Manager
3. Upload files

---

## 🌍 Custom Domain Setup

### After deploying to any platform:

1. **Buy a domain** (GoDaddy, Namecheap, Google Domains, etc.)

2. **Update DNS records**:

For Netlify/Vercel/Cloudflare:
```
Type: CNAME
Name: www
Value: [your-site].netlify.app (or vercel.app, pages.dev)

Type: A
Name: @
Value: [provided IP address]
```

For GitHub Pages:
```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io

Type: A
Name: @
Value: 185.199.108.153
        185.199.109.153
        185.199.110.153
        185.199.111.153
```

3. **Wait for DNS propagation** (5 minutes to 48 hours)

4. **Enable HTTPS** (automatic on most platforms)

---

## 📊 Performance Optimization

### Before deploying:

1. **Optimize Images**:
```bash
# Install imagemin
npm install -g imagemin-cli

# Optimize all images
imagemin assets/images/* --out-dir=assets/images-optimized
```

2. **Minify CSS**:
```bash
# Use online tool or:
npm install -g clean-css-cli
cleancss -o style.min.css style.css
```

3. **Minify JavaScript**:
```bash
# Use online tool or:
npm install -g terser
terser script.js -o script.min.js
```

4. **Update HTML** to reference minified files

---

## 🔒 Security Headers

Add these headers in your hosting platform:

```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self' https://unpkg.com; img-src 'self' data:;
```

**Netlify**: Add `netlify.toml`
**Vercel**: Add `vercel.json`
**Cloudflare**: Use dashboard

---

## ✅ Pre-Deployment Checklist

- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Optimize all images
- [ ] Update contact email/phone
- [ ] Remove console.log statements
- [ ] Test all forms
- [ ] Test all links
- [ ] Check for broken images
- [ ] Validate HTML
- [ ] Check page speed (PageSpeed Insights)
- [ ] Setup analytics (optional)
- [ ] Setup error tracking (optional)

---

## 📈 Post-Deployment

### 1. Add Analytics

**Google Analytics**:
```html
<!-- Add before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Add SEO Meta Tags

Already included in `index.html`:
- ✅ Title
- ✅ Description
- ✅ Viewport

Optionally add:
- Open Graph tags (for social sharing)
- Twitter Card tags
- Favicon
- robots.txt
- sitemap.xml

### 3. Setup Form Backend

For the demo request form, integrate with:
- **Formspree**: `action="https://formspree.io/f/YOUR_FORM_ID"`
- **Netlify Forms**: Add `netlify` attribute to form
- **EmailJS**: JavaScript-based email sending
- **Custom backend**: Build your own API

---

## 🔧 Troubleshooting

### Issue: 404 errors on refresh
**Solution**: Configure server for SPA-like routing (not needed for this static site)

### Issue: Images not loading
**Solution**: Check file paths are relative: `assets/images/...`

### Issue: HTTPS mixed content error
**Solution**: Use HTTPS for all external resources (already done)

### Issue: Slow loading
**Solution**: Optimize images, use CDN, enable gzip compression

---

## 🎯 Recommended Setup

For The Digital Canteen landing page:

1. **Deploy to**: Netlify or Vercel (free tier)
2. **Custom domain**: digitalcanteen.com
3. **Analytics**: Google Analytics
4. **Form backend**: Netlify Forms or Formspree
5. **Performance**: Enable all CDN features
6. **SSL**: Automatic (included)

**Total cost**: $0-15/year (domain name only)

---

## 📞 Support

After deployment, if you need help:

1. Check hosting provider documentation
2. Search Stack Overflow
3. Contact hosting support
4. Check browser console for errors

---

**Last Updated**: May 3, 2026
