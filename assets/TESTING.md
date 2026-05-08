# Testing Guide

## How to Test the Static Website

### Method 1: Direct File Open (Simplest)

1. Navigate to the `static-website` folder
2. Double-click `index.html`
3. Your default browser will open the website

**Note**: Some features may have limited functionality when opened directly (file:// protocol)

### Method 2: Local HTTP Server (Recommended)

#### Using Python (Pre-installed on most systems)

```bash
# Navigate to the static-website folder
cd static-website

# Python 3
python3 -m http.server 8000

# Or Python 2
python -m SimpleHTTPServer 8000

# Open http://localhost:8000 in your browser
```

#### Using PHP

```bash
cd static-website
php -S localhost:8000

# Open http://localhost:8000 in your browser
```

#### Using Node.js (if installed)

```bash
# Install http-server globally (one time only)
npm install -g http-server

# Run server
cd static-website
http-server -p 8000

# Open http://localhost:8000 in your browser
```

#### Using VS Code Live Server Extension

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Features to Test

### ✅ Desktop View (1920x1080 or similar)

- [ ] Hero section displays correctly with badge and image
- [ ] About Us section is readable and well-spaced
- [ ] Dashboard icons grid shows 5 items in one row
- [ ] Showcase section shows 2 cards side by side
- [ ] Carousel shows 3 dashboards at once
- [ ] Carousel navigation arrows work (left/right)
- [ ] Carousel indicators update correctly
- [ ] Features section shows 3 columns
- [ ] Vision section shows 3 columns
- [ ] Footer shows 4 columns
- [ ] Request Demo button opens modal
- [ ] Modal form validation works
- [ ] Modal confirmation dialog appears
- [ ] Modal success message appears
- [ ] Modal closes on backdrop click
- [ ] Modal closes on X button
- [ ] Smooth scroll to sections works
- [ ] All icons render correctly

### ✅ Tablet View (768px - 1024px)

- [ ] Layout adjusts to 2 columns where appropriate
- [ ] Carousel shows 3 items
- [ ] Navigation remains functional
- [ ] Modal is properly sized

### ✅ Mobile View (320px - 767px)

- [ ] All sections stack vertically
- [ ] Hero image displays correctly
- [ ] Dashboard icons grid shows 2 columns
- [ ] Carousel shows 1 item at a time
- [ ] Carousel swipe works (touch devices)
- [ ] Only active carousel indicator visible
- [ ] Features stack in single column
- [ ] Vision cards stack vertically
- [ ] Footer stacks vertically
- [ ] Modal fits screen properly
- [ ] Form inputs are thumb-friendly
- [ ] Text remains readable (no horizontal scroll)

### ✅ Interactive Elements

#### Request Demo Modal
1. Click "Request Demo" button
2. Try submitting empty form (should show validation)
3. Fill in required fields
4. Submit form
5. Verify confirmation dialog appears
6. Click "Yes, Submit"
7. Verify success message appears
8. Verify modal auto-closes after 2 seconds

#### Carousel
1. Click left/right arrows
2. Verify slides change smoothly
3. Verify indicators update
4. On mobile, swipe left/right
5. Verify carousel wraps around (last → first)

#### Smooth Scrolling
1. Click footer links (About Us, Features, Dashboards)
2. Verify smooth scroll to sections
3. Verify scroll position is correct

## Browser Testing Checklist

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (Mac/iOS)
- [ ] Edge
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Common Issues & Solutions

### Issue: Icons not showing
**Solution**: Ensure you have internet connection (Lucide icons load from CDN)

### Issue: Fonts look different
**Solution**: Google Fonts require internet connection

### Issue: Carousel not working
**Solution**: Check browser console for JavaScript errors

### Issue: Images not loading
**Solution**: Verify all images exist in `assets/images/` folder

### Issue: Modal scroll issue on mobile
**Solution**: This is handled automatically with body scroll lock

## Performance Check

- [ ] Page loads in under 2 seconds
- [ ] Images are optimized and load quickly
- [ ] No layout shift during load
- [ ] Smooth animations and transitions
- [ ] No console errors

## Accessibility Check

- [ ] All images have alt text
- [ ] Form labels are properly associated
- [ ] Keyboard navigation works (Tab key)
- [ ] Modal can be closed with Escape key
- [ ] Focus indicators are visible
- [ ] Color contrast is sufficient

## Final Checklist

- [ ] All sections display correctly
- [ ] All interactive elements work
- [ ] Responsive on all screen sizes
- [ ] No broken images
- [ ] No JavaScript errors in console
- [ ] Works offline (except CDN resources)
- [ ] Page is production-ready

---

**Last Updated**: May 3, 2026
