# Authentication System - Technical Implementation

## 🔑 Core Files Overview

### 1. AuthContext.jsx
The heart of the authentication system. Provides global state management for user authentication.

**Key Features:**
- Manages user state globally
- Persists user sessions to localStorage
- Provides login, logout, signup functions
- Auto-loads user on app startup

**Exported Functions:**
- `login(userData)` - Set user as logged in
- `logout()` - Clear user session
- `signup(userData)` - Register new user
- `updateProfile(updatedProfile)` - Update user info

**Exported State:**
- `user` - Current user object
- `isAuthenticated` - Boolean flag
- `isAdmin` - Boolean flag
- `loading` - Loading state

---

### 2. useAuth.js
Custom React hook for accessing auth context in components.

```jsx
// Usage in any component:
import { useAuth } from "../src/context/useAuth";

export default function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();
  // Now you can use auth state and functions
}
```

---

### 3. ProtectedRoute.jsx
Higher-order component that protects routes from unauthorized access.

**Features:**
- Redirects unauthenticated users to login
- Redirects non-admin users from admin routes
- Shows loading state while checking auth
- Seamless redirection without page refresh

**Usage:**
```jsx
<Route path="/dashboard" element={
  <ProtectedRoute>
    <UserDashboard />
  </ProtectedRoute>
} />

// For admin-only routes:
<Route path="/admin" element={
  <ProtectedRoute requireAdmin={true}>
    <AdminPanel />
  </ProtectedRoute>
} />
```

---

## 📊 Authentication Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    App Startup                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
         ┌─────────────────────────┐
         │ AuthProvider Wraps App  │
         └────────────┬────────────┘
                      │
                      ▼
        ┌──────────────────────────┐
        │ Check localStorage for   │
        │ currentUser              │
        └──────────┬───────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
    Found User         No User Found
        │                     │
        ▼                     ▼
    setUser()          setUser(null)
    isAuth=true        isAuth=false
        │                     │
        └──────────┬──────────┘
                   │
                   ▼
          Ready for Route Check
```

---

## 🔐 Login Process

```javascript
// User fills login form
const handleSubmit = (e) => {
  e.preventDefault();

  // 1. Check admin credentials
  const admin = admins.find(a => a.email === loginData.username);
  if (admin) {
    login(admin);           // Set user in context
    navigate("/Admin");     // Redirect to admin dashboard
    return;
  }

  // 2. Check user credentials
  const user = users.find(u => u.email === loginData.username);
  if (user) {
    login({ ...user, role: "user" });
    navigate("/Homepage1");  // Redirect to main page
    return;
  }

  // 3. Invalid credentials
  setError("Invalid credentials");
};
```

---

## 📝 Signup Process

```javascript
const handleSubmit = (e) => {
  e.preventDefault();

  // 1. Validation
  if (formData.password !== formData.confirmPassword) {
    setError("Passwords don't match");
    return;
  }

  // 2. Check if email exists
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find(u => u.email === formData.email)) {
    setError("Email already registered");
    return;
  }

  // 3. Create new user
  const newUser = {
    username: formData.username,
    email: formData.email,
    password: formData.password,
    role: "user",
    id: Date.now()
  };

  // 4. Save to localStorage
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  // 5. Redirect to login
  navigate("/Login");
};
```

---

## 🛡️ Protected Route Logic

```javascript
export const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  // 1. Show loading while checking auth status
  if (loading) {
    return <LoadingScreen />;
  }

  // 2. Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/Login" replace />;
  }

  // 3. Redirect if admin-only route and not admin
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // 4. User is authorized - render component
  return children;
};
```

---

## 🎯 State Management Pattern

### User Object Structure
```javascript
{
  username: "john_doe",
  email: "john@example.com",
  password: "hashed_password",
  role: "user" or "admin",
  id: 1234567890,
  // Optional profile fields
  name: "John Doe",
  phone: "+1234567890",
  address: "123 Main St"
}
```

### Auth Context State
```javascript
{
  user: {
    username: "john_doe",
    email: "john@example.com",
    role: "user"
  },
  isAuthenticated: true,
  isAdmin: false,
  loading: false,
  login: (userData) => {...},
  logout: () => {...},
  signup: (userData) => {...},
  updateProfile: (updatedProfile) => {...}
}
```

---

## 🔄 Session Persistence

**localStorage Keys Used:**
```javascript
// Current logged-in user
localStorage.getItem("currentUser")
// Returns: {"username": "...", "email": "...", "role": "..."}

// All registered users
localStorage.getItem("users")
// Returns: [{"username": "...", "email": "...", ...}, ...]

// Admin accounts
localStorage.getItem("admins")
// Returns: [{"username": "admin", ...}]

// User profile data
localStorage.getItem("profile")
// Returns: {"name": "...", "email": "...", "phone": "..."}
```

---

## 🎨 Component Integration Examples

### Example 1: Conditional Navigation
```jsx
function Navigation() {
  const { user, logout } = useAuth();

  if (user) {
    return (
      <>
        <span>Welcome {user.username}</span>
        <button onClick={logout}>Logout</button>
      </>
    );
  } else {
    return (
      <>
        <Link to="/Login">Login</Link>
        <Link to="/Signup">Signup</Link>
      </>
    );
  }
}
```

### Example 2: Protected Component Content
```jsx
function Dashboard() {
  const { user, isAdmin } = useAuth();

  return (
    <div>
      <h1>Welcome {user.username}</h1>
      
      {isAdmin && (
        <AdminPanel />
      )}
      
      <UserContent />
    </div>
  );
}
```

### Example 3: Form with Auth
```jsx
function OrderForm() {
  const { user } = useAuth();

  return (
    <form>
      <input value={user.email} disabled />
      <input placeholder="Address" />
      <button type="submit">Place Order</button>
    </form>
  );
}
```

---

## ⚙️ Error Handling

**Implemented in Auth Context:**
```javascript
// During user initialization
try {
  setUser(JSON.parse(storedUser));
} catch (error) {
  console.error("Error parsing stored user:", error);
  localStorage.removeItem("currentUser");
}

// During signup
try {
  signup(userData);
  navigate("/Login");
} catch (err) {
  setError(err.message || "Signup failed");
}
```

---

## 🚀 Best Practices Followed

✅ **Security:**
- User data isolated in context
- Proper logout clearing data
- Admin routes protected
- Input validation in signup

✅ **Performance:**
- useCallback for memoization
- Lazy loading with ProtectedRoute
- Session persistence to avoid re-auth

✅ **User Experience:**
- Auto-redirect based on auth status
- Loading states during auth check
- Clear error messages
- Persistent sessions

✅ **Code Quality:**
- Custom hooks for reusability
- Context for global state
- Separation of concerns
- Clean component structure

---

## 📱 Mobile Responsiveness

The authentication system is fully responsive:
- Login/Signup forms adapt to screen size
- Navigation menu works on mobile
- User dropdown menu is mobile-friendly

---

## 🧪 Testing the Auth System

### Test Cases:
```javascript
// 1. Test signup with new email
// 2. Test signup with existing email (should fail)
// 3. Test login with correct credentials
// 4. Test login with wrong credentials
// 5. Test logout (should clear session)
// 6. Test protected route access (should redirect)
// 7. Test admin login (should have admin role)
// 8. Test accessing admin route as regular user (should redirect)
// 9. Test session persistence (reload page)
```

---

## 🔗 Integration with Existing Pages

### HomePage1 (Updated)
- Profile icon shows/hides based on auth
- Logout button available for logged-in users
- Login/Signup buttons for anonymous users

### UserDash (Updated)
- Integrated with auth context
- Profile data persists
- Logout functionality connected
- User info displayed from auth state

### Login/Signup (Updated)
- Uses useAuth hook
- Auto-redirects if already logged in
- Proper error handling
- Form validation

---

**For more details, refer to AUTH_DOCUMENTATION.md**
