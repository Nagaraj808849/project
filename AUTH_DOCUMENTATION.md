# Authentication & Authorization Implementation Guide

## 🎯 Overview
This project now includes a complete authentication and authorization system with the following features:

### Features Implemented:
✅ User Registration (Signup)
✅ User Login
✅ Admin Login (Default Admin: admin/admin123)
✅ Protected Routes (Authorization)
✅ User Profile Management
✅ Logout Functionality
✅ Anonymous User Access (Home Page)
✅ Dynamic Navigation Based on Auth Status
✅ Persistent Sessions (localStorage)

---

## 📁 Project Structure

```
src/
├── context/
│   ├── AuthContext.jsx      # Auth provider & context
│   ├── useAuth.js           # Custom hook for auth
│   └── ProtectedRoute.jsx   # Protected route component
├── App.jsx                  # Updated with AuthProvider & routes
└── ...

Login/
├── Login.jsx                # Updated with auth context
├── Signup.jsx               # Updated with auth context

Home/
├── HomePage1.jsx            # Updated dynamic navbar
├── Frontpage.jsx            # Landing page (no auth required)

UserDash/
└── UserDash.jsx             # User dashboard (protected)
```

---

## 🔐 Authentication Flow

### 1. **User Registration (Signup)**
```
User → Signup Page → Validate Input → Save to localStorage → Redirect to Login
```
- Located at: `/Signup`
- Validates: Username, Email, Password, Password Confirmation
- Stores user data in `localStorage` under key: `users`

### 2. **User Login**
```
User → Login Page → Verify Credentials → Set currentUser → Redirect to HomePage1
```
- Located at: `/Login`
- Checks both `users` and `admins` in localStorage
- Sets `currentUser` in localStorage on successful login

### 3. **Protected Routes**
```
User → Protected Route → Check Auth Status → Allow/Redirect to Login
```
- Wraps components that require authentication
- Automatically redirects unauthenticated users to `/Login`
- Admin routes require `role: "admin"`

---

## 🎯 Key Components

### AuthContext.jsx
Provides authentication state and methods globally:
```jsx
{
  user,              // Current logged-in user object
  loading,           // Loading state during initialization
  login,             // Function to login user
  logout,            // Function to logout user
  signup,            // Function to register new user
  updateProfile,     // Function to update user profile
  isAuthenticated,   // Boolean - user logged in?
  isAdmin            // Boolean - is admin?
}
```

### useAuth Hook
```jsx
const { user, logout, isAuthenticated } = useAuth();
```
Use this hook in any component to access auth state.

### ProtectedRoute Component
```jsx
<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>

<ProtectedRoute requireAdmin={true}>
  <AdminComponent />
</ProtectedRoute>
```

---

## 🗝️ Default Credentials

### Admin Account
- **Username:** admin
- **Email:** admin@gmail.com
- **Password:** admin123
- **Role:** admin
- **Access:** `/Admin` page

### Test User (Create via Signup)
- Create any account through the signup page
- Role defaults to: user
- Can access: Menu, Cart, Table Booking, User Dashboard

---

## 🛣️ Route Structure

### Public Routes (No Auth Required)
- `/` - Landing Page (Frontpage)
- `/Login` - Login Page
- `/Signup` - Signup Page

### Protected Routes (Auth Required)
- `/Homepage1` - Main Home Page
- `/Menu1` - Menu Page
- `/Cart` - Shopping Cart
- `/TableOrder` - Table Booking
- `/PaymentDetails` - Payment Page
- `/UserDash` - User Dashboard

### Admin Routes (Admin Auth Required)
- `/Admin` - Admin Dashboard

---

## 💾 localStorage Keys

| Key | Purpose | Example |
|-----|---------|---------|
| `currentUser` | Logged-in user data | `{username, email, role, id}` |
| `users` | All registered users | `[{...}, {...}]` |
| `admins` | Admin accounts | `[{...}]` |
| `profile` | User profile data | `{name, email, phone, address}` |

---

## 🎨 UI Updates

### Navigation Bar (HomePage1)
**For Anonymous Users:**
- Shows "Login" and "Signup" buttons

**For Logged-in Users:**
- Shows user profile icon with dropdown menu
- Menu items: Profile, Logout
- Displays username and email in dropdown

### User Dashboard (UserDash)
- **Home View:** Welcome message
- **Profile View:** Edit user information
- **Orders View:** View order history
- Header shows branded navigation

---

## 🔧 Usage Examples

### In a Component
```jsx
import { useAuth } from "../src/context/useAuth";

export default function MyComponent() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user.username}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Please login to continue</p>
      )}
    </div>
  );
}
```

### In App Routes
```jsx
<Route path="/dashboard" element={
  <ProtectedRoute>
    <UserDashboard />
  </ProtectedRoute>
} />

<Route path="/admin" element={
  <ProtectedRoute requireAdmin={true}>
    <AdminPanel />
  </ProtectedRoute>
} />
```

---

## 🔄 Session Persistence

- User sessions persist using localStorage
- On app reload, user remains logged in
- Sessions clear when user logs out
- Logout removes `currentUser` from localStorage

---

## 🚀 Testing the System

### Test User Registration
1. Visit `/Signup`
2. Fill in username, email, password
3. Confirm password
4. Submit → Redirects to login

### Test User Login
1. Visit `/Login`
2. Enter credentials (test or admin)
3. Submit → Redirects to `/Homepage1` (or `/Admin` for admin)

### Test Protected Routes
1. Try accessing `/UserDash` without login → Redirects to `/Login`
2. Login → Can access protected routes
3. Logout → Redirected to home page

### Test Anonymous Access
1. Visit `/` (Frontpage) → Works without login
2. Try to go to `/Menu1` → Redirected to login

---

## 📝 Security Notes

⚠️ **Important:** This implementation uses localStorage for demonstration purposes.

**For Production:**
- Use secure backend authentication
- Implement JWT tokens
- Use HTTP-only cookies
- Add password hashing (bcrypt)
- Implement refresh tokens
- Add CSRF protection
- Use HTTPS only

---

## 🎓 Learning Resources

- React Context API: https://react.dev/reference/react/useContext
- React Router v6: https://reactrouter.com/
- Authentication Best Practices: https://owasp.org/www-community/attacks/Authentication

---

## ✅ Checklist

- [x] User signup/registration
- [x] User login with credentials
- [x] Admin login with default account
- [x] Protected routes with authorization
- [x] Auth context and hooks
- [x] Dynamic navigation based on auth status
- [x] User profile management
- [x] Logout functionality
- [x] Session persistence
- [x] Anonymous user access to public pages
- [x] Error handling and validation

---

## 🆘 Troubleshooting

### Users can't login
- Check localStorage for "users" and "admins" keys
- Verify credentials are correct
- Clear localStorage and try signup again

### Protected routes not working
- Ensure AuthProvider wraps Router in App.jsx
- Check ProtectedRoute component is imported correctly
- Verify route path matches navigation links

### Session not persisting
- Check if browser supports localStorage
- Clear browser cache/cookies
- Check browser console for errors

---

**Happy Coding! 🚀**
