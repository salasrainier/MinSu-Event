# 🎨 XianFire Design System Quick Reference

## Colors & Themes

### Authentication Pages
```
Login:       Blue (#2563eb) + Cyan (#06b6d4)
Register:    Green (#16a34a) + Emerald (#10b981)
Admin:       Red (#dc2626) + Orange (#ea580c)
```

### Status Indicators
```
✅ Approved:  Green badge (bg-green-100, text-green-700)
⏳ Pending:   Yellow badge (bg-yellow-100, text-yellow-700)
❌ Denied:    Red badge (bg-red-100, text-red-700)
ℹ️ Info:      Blue badge (bg-blue-100, text-blue-700)
```

---

## Component Classes

### Cards
```html
<!-- Event Card -->
<div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all">
  <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
    Header content
  </div>
  <div class="p-5 space-y-3">
    Card content
  </div>
</div>

<!-- Stat Card -->
<div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
  <p class="text-gray-600 text-sm font-medium">Label</p>
  <p class="text-3xl font-bold text-gray-800 mt-1">{{value}}</p>
</div>
```

### Badges & Tags
```html
<!-- Status Badge -->
<span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
  ✅ Approved
</span>

<!-- Department Tag -->
<span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
  Marketing
</span>
```

### Buttons
```html
<!-- Primary Button -->
<button class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
               text-white font-bold py-3 rounded-lg transition-all 
               transform hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0">
  ✅ Approve
</button>

<!-- Secondary Button -->
<button class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 
               font-bold rounded-lg transition-all duration-200">
  Cancel
</button>

<!-- Danger Button -->
<button class="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white 
               rounded-lg text-xs font-bold transition-colors duration-150">
  ❌ Deny
</button>
```

### Forms
```html
<!-- Input Field with Icon -->
<div class="group">
  <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
  <div class="relative">
    <input type="email" placeholder="you@example.com"
           class="w-full px-4 py-3 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 
                  focus:border-transparent transition-all duration-200" />
    <span class="absolute right-4 top-3.5 text-gray-400">✉️</span>
  </div>
</div>

<!-- Textarea -->
<textarea class="w-full px-4 py-3 border border-gray-300 rounded-lg 
                 focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                 transition-all duration-200 bg-white placeholder-gray-400 resize-none"
          rows="4" placeholder="Enter description..."></textarea>
```

### Modals
```html
<!-- Success Modal -->
<div id="successModal" class="fixed inset-0 flex items-center justify-center 
                            bg-black/60 hidden z-50 backdrop-blur-sm">
  <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-sm mx-4 animate-slideUp">
    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center 
                justify-center text-3xl animate-bounce mx-auto mb-4">
      ✅
    </div>
    <h3 class="text-2xl font-bold text-center text-gray-800">Success!</h3>
  </div>
</div>

<!-- Error Alert -->
<div class="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg 
            flex items-start gap-3 animate-slideDown">
  <span class="text-xl">❌</span>
  <div>
    <p class="font-semibold">Error</p>
    <p class="text-sm">{{error_message}}</p>
  </div>
</div>
```

### Animations
```html
<!-- Apply animations to elements -->
<div class="animate-fadeIn">Fade in effect</div>
<div class="animate-slideUp">Slide up with bounce</div>
<div class="animate-slideDown">Slide down effect</div>
<div class="animate-bounce">Bouncing element</div>

<!-- Combined with transitions -->
<button class="transition-all duration-200 transform hover:-translate-y-0.5">
  Hover me
</button>
```

---

## Layout Patterns

### Responsive Grid
```html
<!-- Auto-responsive: 1 col mobile → 2 col tablet → 3 col desktop -->
<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>
```

### Sidebar Layout
```html
<div class="grid lg:grid-cols-3 gap-8">
  <div class="lg:col-span-2">
    Main content
  </div>
  <div class="lg:col-span-1">
    <div class="sticky top-8">
      Sidebar content
    </div>
  </div>
</div>
```

### Navigation Bar
```html
<nav class="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-40">
  <div class="container mx-auto px-4 py-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold text-blue-600">XianFire</h1>
    <div class="flex items-center gap-6">
      <!-- Nav items -->
    </div>
  </div>
</nav>
```

---

## Typography Scale

```
h1: text-4xl font-bold        (36px)
h2: text-2xl font-bold        (24px)
h3: text-xl font-bold         (20px)
body: text-base              (16px)
small: text-sm               (14px)
tiny: text-xs                (12px)
```

---

## Spacing System

```
Gap/Padding: 
- gap-1 / p-1  = 4px
- gap-2 / p-2  = 8px
- gap-3 / p-3  = 12px
- gap-4 / p-4  = 16px
- gap-6 / p-6  = 24px
- gap-8 / p-8  = 32px
- gap-12 / p-12 = 48px
```

---

## Gradient Examples

### Linear Gradients
```html
<!-- Blue gradient (Login) -->
<div class="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500">
</div>

<!-- Green gradient (Register) -->
<div class="bg-gradient-to-r from-green-600 via-emerald-500 to-cyan-500">
</div>

<!-- Red gradient (Admin) -->
<div class="bg-gradient-to-r from-red-600 to-red-700">
</div>

<!-- Background gradient -->
<body class="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
</body>
```

---

## Shadow System

```
shadow-sm:   0 1px 2px 0 rgb(0 0 0 / 0.05)
shadow-md:   0 4px 6px -1px rgb(0 0 0 / 0.1)     [Cards]
shadow-lg:   0 10px 15px -3px rgb(0 0 0 / 0.1)   [Hover states]
shadow-xl:   0 20px 25px -5px rgb(0 0 0 / 0.1)   [Modals]
shadow-2xl:  0 25px 50px -12px rgb(0 0 0 / 0.25) [Important]
```

---

## Border Radius System

```
rounded-lg:  8px    [Form inputs, buttons]
rounded-xl:  12px   [Cards, large components]
rounded-2xl: 16px   [Modals, premium elements]
rounded-full:∞      [Badges, avatars]
```

---

## Focus & Hover States

### Input Focus
```css
focus:outline-none 
focus:ring-2 
focus:ring-blue-500 
focus:border-transparent
box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1)
```

### Button Hover
```css
hover:-translate-y-0.5  /* Lift effect */
hover:shadow-lg         /* Shadow increase */
active:translate-y-0    /* Press effect */
transition-all duration-200
```

### Card Hover
```css
hover:shadow-2xl
transition-all duration-300
```

---

## Dark Mode Ready (Future)

All components are built with light-first approach. To add dark mode:

```html
<!-- Add dark: variants -->
<div class="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
</div>
```

---

## Accessibility Features

✅ Semantic HTML (button, form, nav, etc.)
✅ Proper label associations
✅ ARIA attributes where needed
✅ Sufficient color contrast
✅ Focus indicators on interactive elements
✅ Icon + text combinations
✅ Keyboard navigation support

---

## Performance Tips

💡 **CSS-first animations** - Faster than JavaScript
💡 **Tailwind utility classes** - Smaller bundle
💡 **Backdrop blur** - GPU accelerated
💡 **Transitions instead of @keyframes** - Better performance
💡 **lazy loading ready** - Prepare for image optimization
💡 **Minimal DOM manipulation** - Pre-render where possible

---

## Browser Support

✅ Chrome/Edge (Latest)
✅ Firefox (Latest)
✅ Safari (Latest)
✅ Mobile browsers
✅ IE11 (Graceful degradation)

---

## Creating New Components

### Template
```html
<!-- Card Component Template -->
<div class="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
  <!-- Header with gradient -->
  <div class="bg-gradient-to-r from-blue-500 to-blue-600 -m-6 p-4 mb-4 text-white rounded-t-xl">
    <h3 class="font-bold text-lg">Component Title</h3>
  </div>
  
  <!-- Content -->
  <div class="space-y-3">
    <p class="text-gray-600 text-sm">Content here</p>
  </div>
  
  <!-- Footer action -->
  <div class="mt-4 pt-4 border-t border-gray-200">
    <button class="text-blue-600 hover:text-blue-700 font-semibold text-sm">
      Action →
    </button>
  </div>
</div>
```

---

## Testing Checklist

- [ ] Responsive on mobile, tablet, desktop
- [ ] All animations smooth (60fps)
- [ ] Forms submit correctly
- [ ] Modals appear and dismiss
- [ ] Colors match brand guidelines
- [ ] Text readable and properly aligned
- [ ] Links and buttons clickable
- [ ] Error messages clear
- [ ] Success confirmations appear
- [ ] Loading states visible

---

## Quick Copy-Paste

### Success Notification
```html
<div class="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg 
            flex items-start gap-3 animate-slideDown">
  <span class="text-xl">✅</span>
  <div>
    <p class="font-semibold">Success!</p>
    <p class="text-sm">Action completed successfully</p>
  </div>
</div>
```

### Loading Spinner
```html
<div class="flex justify-center">
  <div class="inline-flex items-center gap-1.5">
    <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0s"></div>
    <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
    <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
  </div>
</div>
```

### Empty State
```html
<div class="bg-white rounded-xl shadow-md p-12 text-center">
  <div class="text-5xl mb-4">📭</div>
  <h3 class="text-xl font-semibold text-gray-800 mb-2">No Items</h3>
  <p class="text-gray-600 mb-6">You haven't added any items yet.</p>
  <a href="/add-item" class="inline-block px-6 py-2 bg-blue-600 text-white 
                            rounded-lg hover:bg-blue-700 transition font-medium">
    ➕ Add Item
  </a>
</div>
```

---

**Happy Designing! 🎨** 

For more info, see `UI_IMPROVEMENTS.md`

