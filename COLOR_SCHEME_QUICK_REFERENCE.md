# 🎨 Color Scheme - Quick Implementation Guide

## Copy-Paste Ready Color Classes

### Navigation Bar
```jsx
<nav className="bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur">
  <a className="text-white hover:text-amber-400 transition duration-300">Link</a>
</nav>
```

### Primary Button (CTA)
```jsx
<button className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white px-6 py-2 rounded-lg transition duration-300 shadow-lg">
  Click Me
</button>
```

### Secondary Button
```jsx
<button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg transition duration-300">
  Cancel
</button>
```

### Dark Page Background
```jsx
<div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
  {/* Content */}
</div>
```

### Light Section
```jsx
<section className="bg-gradient-to-br from-slate-50 to-white py-16">
  <h2 className="text-slate-900">Heading</h2>
  <p className="text-slate-600">Content</p>
</section>
```

### Form Input
```jsx
<input
  className="w-full py-2 px-4 bg-transparent border-b border-slate-600 focus:border-amber-400 focus:outline-none text-white placeholder-slate-400 transition"
  placeholder="Enter text..."
/>
```

### Card (Dark)
```jsx
<div className="bg-slate-800 border border-amber-600 rounded-lg p-6 shadow-lg">
  <h3 className="text-white">Card Title</h3>
  <p className="text-slate-300">Card content</p>
</div>
```

### Card (Light)
```jsx
<div className="bg-slate-50 border border-amber-200 rounded-lg p-6 shadow-md">
  <h3 className="text-slate-900">Card Title</h3>
  <p className="text-slate-600">Card content</p>
</div>
```

### Dropdown Menu
```jsx
<div className="bg-slate-50 text-slate-900 rounded-lg shadow-lg">
  <div className="px-4 py-2 border-b border-amber-200">
    <p className="text-sm">User: {username}</p>
  </div>
  <button className="block w-full text-left px-4 py-2 text-slate-700 hover:bg-amber-50 transition">
    Profile
  </button>
</div>
```

### Error Message
```jsx
<p className="text-amber-300">Error: {message}</p>
```

### Success State
```jsx
<div className="bg-slate-800 border border-amber-600">
  <p className="text-amber-400">✓ Success!</p>
</div>
```

### Badge/Tag
```jsx
<span className="inline-block bg-amber-600 text-white px-3 py-1 rounded-full text-sm">
  Special
</span>
```

### Gradient Overlay (Dark)
```jsx
<div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-slate-800/70"></div>
```

### Gradient Overlay (Light)
```jsx
<div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
```

### Loader/Processing Animation
```jsx
<div className="inline-block w-6 h-6 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
```

### Icon Color (in Dark)
```jsx
<Icon className="text-amber-400" />
```

### Icon Color (in Light)
```jsx
<Icon className="text-amber-600" />
```

---

## Complete Component Examples

### Login Form
```jsx
<div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
  <div className="w-[850px] flex rounded-lg shadow-2xl border border-amber-500 overflow-hidden">
    <div className="w-1/2 bg-slate-900 p-10">
      <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
      <form className="space-y-4">
        <input className="w-full py-2 px-4 bg-transparent border-b border-slate-600 focus:border-amber-400 outline-none text-white" placeholder="Username" />
        <input type="password" className="w-full py-2 px-4 bg-transparent border-b border-slate-600 focus:border-amber-400 outline-none text-white" placeholder="Password" />
        <button className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white py-2 rounded-lg">Login</button>
      </form>
    </div>
    <div className="w-1/2 bg-gradient-to-br from-amber-600 to-amber-700 text-white flex flex-col justify-center items-center p-8">
      <h2 className="text-3xl font-bold">Welcome Back!</h2>
    </div>
  </div>
</div>
```

### Navbar
```jsx
<nav className="bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur px-6 py-4">
  <div className="max-w-7xl mx-auto flex justify-between items-center">
    <h1 className="text-2xl font-bold text-white">🍴 Golden Essence</h1>
    <ul className="flex space-x-8">
      <li><a href="#" className="text-white hover:text-amber-400 transition">Home</a></li>
      <li><a href="#" className="text-white hover:text-amber-400 transition">Menu</a></li>
      <li><a href="#" className="text-white hover:text-amber-400 transition">About</a></li>
    </ul>
    <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg">Login</button>
  </div>
</nav>
```

### Card Grid
```jsx
<div className="grid grid-cols-3 gap-6">
  {items.map(item => (
    <div key={item.id} className="bg-slate-50 border border-amber-200 rounded-lg p-6 hover:shadow-lg transition">
      <h3 className="text-slate-900 font-bold">{item.title}</h3>
      <p className="text-slate-600 text-sm mt-2">{item.description}</p>
      <button className="mt-4 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded transition">
        Learn More
      </button>
    </div>
  ))}
</div>
```

### Payment Card
```jsx
<div className="bg-slate-800 border border-amber-600 rounded-lg p-6">
  <h2 className="text-white text-xl font-bold mb-4">Order Summary</h2>
  <div className="space-y-2 text-slate-300 mb-4">
    <div className="flex justify-between">
      <span>Subtotal</span>
      <span className="text-amber-400">₹500</span>
    </div>
    <div className="flex justify-between">
      <span>Tax</span>
      <span className="text-amber-400">₹50</span>
    </div>
    <hr className="border-amber-600/30 my-2" />
    <div className="flex justify-between font-bold text-white">
      <span>Total</span>
      <span className="text-amber-400">₹550</span>
    </div>
  </div>
  <button className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white py-3 rounded-lg font-bold">
    Pay Now
  </button>
</div>
```

---

## Commonly Used Tailwind Classes

```
Navigation Colors:
- from-slate-900/90 to-slate-800/90
- text-white
- hover:text-amber-400

Button Colors:
- bg-gradient-to-r from-amber-600 to-amber-500
- hover:from-amber-700 hover:to-amber-600
- bg-slate-700 hover:bg-slate-600

Background Colors:
- bg-gradient-to-br from-slate-900 to-slate-800
- bg-gradient-to-br from-slate-50 to-white
- from-slate-900/70 to-slate-800/70 (overlay)

Text Colors:
- text-white (on dark)
- text-slate-900 (on light)
- text-slate-600 (secondary)
- text-amber-400 (accents)

Border Colors:
- border-amber-600 (dark theme)
- border-amber-200 (light theme)
- border-slate-600 (form inputs)

Shadow Classes:
- shadow-lg (buttons)
- shadow-xl (modals)

Transitions:
- transition duration-300 (smooth animations)
```

---

## Tips & Best Practices

1. **Always pair colors with transitions**: `transition duration-300`
2. **Use gradients for depth**: `from-X to-Y` creates visual hierarchy
3. **Maintain contrast**: Always ensure 4.5:1 ratio for text
4. **Focus states**: Always include `focus:border-amber-400` on inputs
5. **Hover states**: Add `hover:text-amber-400` to interactive elements
6. **Consistency**: Use the same color combinations across components
7. **Accessibility**: Add text labels alongside colored elements
8. **Mobile first**: Test colors on small screens too

---

**Last Updated**: February 3, 2026  
**Version**: 1.0  
**For detailed reference**: See COLOR_SCHEME.md
