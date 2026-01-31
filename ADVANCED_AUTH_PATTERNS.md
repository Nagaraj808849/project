# Advanced Authentication Patterns & Edge Cases

## 🎯 Advanced Usage Scenarios

---

## 1. Handling Multiple User Roles

### Current Implementation
```javascript
// Role check
const { isAdmin } = useAuth();
if (isAdmin) {
  // Show admin content
}
```

### Enhanced for Multiple Roles
```jsx
// In AuthContext, enhance user object with permissions
const [user, setUser] = useState({
  // ... existing user data
  role: "user", // "user", "admin", "moderator", "staff"
  permissions: ["read_menu", "place_order", "view_profile"]
});

// Create custom hook
export const useHasPermission = (permission) => {
  const { user } = useAuth();
  return user?.permissions?.includes(permission) || false;
};

// Usage in component
function EditButton() {
  const canEdit = useHasPermission("edit_orders");
  
  return (
    <>
      {canEdit ? (
        <button>Edit Order</button>
      ) : (
        <button disabled>Cannot Edit</button>
      )}
    </>
  );
}
```

---

## 2. Handling Authentication State Changes

### Listen to Auth State Changes
```jsx
import { useAuth } from "../src/context/useAuth";
import { useEffect } from "react";

function OrderConfirmation() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      // User logged out while viewing page
      window.location.href = "/Login";
    }
  }, [user]);

  return <div>Order Details for {user.email}</div>;
}
```

---

## 3. Pre-Login Data Handling

### Save Data Before Login
```jsx
function CartPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      // Save cart to sessionStorage
      sessionStorage.setItem("pendingCart", JSON.stringify(cartItems));
      // Redirect to login
      navigate("/Login", { state: { returnTo: "/checkout" } });
    } else {
      // Process checkout
    }
  };

  return <button onClick={handleCheckout}>Checkout</button>;
}
```

### Resume After Login
```jsx
function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (user) => {
    login(user);
    
    // Get pending data
    const pendingCart = sessionStorage.getItem("pendingCart");
    if (pendingCart) {
      sessionStorage.removeItem("pendingCart");
      // Restore cart
      dispatch({ type: 'RESTORE_CART', payload: JSON.parse(pendingCart) });
    }
    
    // Redirect to original destination or home
    const from = location.state?.returnTo || "/Homepage1";
    navigate(from);
  };

  return (
    // Login form...
  );
}
```

---

## 4. Timeout-Based Auto-Logout

### Add Session Timeout
```jsx
// Enhanced AuthContext.jsx
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const timeoutRef = useRef(null);
  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (user) {
      timeoutRef.current = setTimeout(() => {
        logout();
      }, SESSION_TIMEOUT);
    }
  }, [user]);

  useEffect(() => {
    // Reset timeout on user activity
    window.addEventListener('mousemove', resetTimeout);
    window.addEventListener('keypress', resetTimeout);

    return () => {
      window.removeEventListener('mousemove', resetTimeout);
      window.removeEventListener('keypress', resetTimeout);
    };
  }, [resetTimeout]);

  // ... rest of context
};
```

---

## 5. Social Login Integration

### Structure for OAuth
```jsx
function LoginWithGoogle() {
  const { login } = useAuth();

  const handleGoogleLogin = async (googleResponse) => {
    try {
      const userData = {
        username: googleResponse.profileObj.name,
        email: googleResponse.profileObj.email,
        role: "user",
        socialProvider: "google",
        socialId: googleResponse.profileObj.googleId
      };

      // In real app, verify token with backend
      login(userData);
      navigate("/Homepage1");
    } catch (error) {
      setError("Google login failed");
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleLogin}
      onError={() => setError("Login failed")}
    />
  );
}
```

---

## 6. Two-Factor Authentication (2FA)

### 2FA Flow
```jsx
// Enhanced AuthContext
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [requires2FA, setRequires2FA] = useState(false);
  const [tempUser, setTempUser] = useState(null);

  const login = useCallback((userData) => {
    // Check if user has 2FA enabled
    if (userData.has2FAEnabled) {
      setTempUser(userData);
      setRequires2FA(true);
      // Send OTP to email/phone
    } else {
      setUser(userData);
    }
  }, []);

  const verify2FA = useCallback((otp) => {
    // Verify OTP (in real app, call backend)
    if (isOTPValid(otp)) {
      setUser(tempUser);
      setRequires2FA(false);
      setTempUser(null);
    } else {
      throw new Error("Invalid OTP");
    }
  }, [tempUser]);

  return (
    <AuthContext.Provider value={{ ..., requires2FA, verify2FA }}>
      {children}
    </AuthContext.Provider>
  );
};

// 2FA Verification Component
function VerifyOTP() {
  const { requires2FA, verify2FA } = useAuth();
  const [otp, setOtp] = useState("");

  if (!requires2FA) return null;

  return (
    <div>
      <h2>Enter OTP sent to your email</h2>
      <input value={otp} onChange={(e) => setOtp(e.target.value)} />
      <button onClick={() => verify2FA(otp)}>Verify</button>
    </div>
  );
}
```

---

## 7. Role-Based Navigation

### Dynamic Sidebar Based on Role
```jsx
function Sidebar() {
  const { user, isAdmin } = useAuth();

  const baseMenu = [
    { label: "Home", path: "/Homepage1", icon: "home" },
    { label: "Menu", path: "/Menu1", icon: "menu" },
    { label: "Profile", path: "/UserDash", icon: "user" }
  ];

  const adminMenu = [
    { label: "Dashboard", path: "/Admin", icon: "dashboard" },
    { label: "Users", path: "/Admin/Users", icon: "users" },
    { label: "Orders", path: "/Admin/Orders", icon: "orders" },
    { label: "Reports", path: "/Admin/Reports", icon: "report" }
  ];

  const menu = isAdmin ? [...baseMenu, ...adminMenu] : baseMenu;

  return (
    <nav>
      {menu.map(item => (
        <Link key={item.path} to={item.path}>
          <Icon name={item.icon} /> {item.label}
        </Link>
      ))}
    </nav>
  );
}
```

---

## 8. Protected API Calls

### Add Auth Token to API Requests
```jsx
// Custom fetch hook
export const useAuthAPI = () => {
  const { user } = useAuth();

  const fetchWithAuth = useCallback(async (url, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    // Add auth token if user is logged in
    if (user?.token) {
      headers['Authorization'] = `Bearer ${user.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      // Handle 401 - token expired
      if (response.status === 401) {
        logout();
        window.location.href = "/Login";
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  }, [user]);

  return { fetchWithAuth };
};

// Usage
function UserOrders() {
  const { fetchWithAuth } = useAuthAPI();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchWithAuth('/api/orders')
      .then(data => setOrders(data))
      .catch(err => console.error(err));
  }, []);

  return (
    // Display orders
  );
}
```

---

## 9. Conditional Route Rendering

### Advanced Route Protection
```jsx
// Route guard with fallback
const ConditionalRoute = ({ path, element, condition, fallback = null }) => {
  return (
    <Route
      path={path}
      element={condition ? element : fallback}
    />
  );
};

// Usage
<ConditionalRoute
  path="/OrderHistory"
  element={<OrderHistory />}
  condition={isAuthenticated && !isGuest}
  fallback={<Navigate to="/Login" />}
/>
```

---

## 10. Error Boundary for Auth

### Catch Auth-Related Errors
```jsx
class AuthErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Auth error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Authentication Error</h1>
          <p>Something went wrong. Please try logging in again.</p>
          <Link to="/Login">Go to Login</Link>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrap AuthProvider with error boundary
<AuthErrorBoundary>
  <AuthProvider>
    <App />
  </AuthProvider>
</AuthErrorBoundary>
```

---

## 11. User Activity Tracking

### Track Last Active Time
```jsx
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [lastActive, setLastActive] = useState(Date.now());

  const updateActivity = useCallback(() => {
    setLastActive(Date.now());
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keypress', updateActivity);

    return () => {
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keypress', updateActivity);
    };
  }, [updateActivity]);

  const value = {
    // ... other values
    lastActive,
    isActive: Date.now() - lastActive < 5 * 60 * 1000 // 5 minutes
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## 12. Handling Concurrent Logins

### Prevent Concurrent Sessions
```jsx
const login = useCallback((userData) => {
  // Check if user is already logged in elsewhere
  const existingSession = localStorage.getItem("userSessions");
  const sessions = existingSession ? JSON.parse(existingSession) : [];

  const hasConcurrentSession = sessions.some(
    session => session.userId === userData.id && 
    Date.now() - session.timestamp < 60000 // Less than 1 minute old
  );

  if (hasConcurrentSession) {
    throw new Error("You are already logged in elsewhere");
  }

  // Clear old sessions and add new one
  const newSession = {
    userId: userData.id,
    timestamp: Date.now(),
    device: navigator.userAgent
  };

  const updatedSessions = sessions.filter(
    s => s.userId !== userData.id
  );
  localStorage.setItem("userSessions", JSON.stringify([...updatedSessions, newSession]));

  setUser(userData);
}, []);
```

---

## 13. Mobile App Authentication

### Store Auth Token Securely
```jsx
// For React Native (secure storage)
import * as SecureStore from 'expo-secure-store';

export const AuthProvider = ({ children }) => {
  const login = useCallback(async (userData) => {
    // Store token securely
    if (userData.token) {
      await SecureStore.setItemAsync('userToken', userData.token);
    }
    setUser(userData);
  }, []);

  const logout = useCallback(async () => {
    await SecureStore.deleteItemAsync('userToken');
    setUser(null);
  }, []);

  // ... rest of context
};
```

---

## 14. Handling Auth Redirects

### Smart Redirect System
```jsx
function useAuthRedirect() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirect logic based on auth state
    if (!isAuthenticated && location.pathname !== '/') {
      navigate('/Login', { state: { from: location.pathname } });
    }
  }, [isAuthenticated, location, navigate]);
}

// Usage
function ProtectedComponent() {
  useAuthRedirect();
  return <div>Protected Content</div>;
}
```

---

## 15. Logout with Cleanup

### Complete Cleanup on Logout
```jsx
const logout = useCallback(() => {
  // Clear user data
  setUser(null);

  // Clear sensitive data from localStorage
  localStorage.removeItem("currentUser");
  localStorage.removeItem("profile");
  localStorage.removeItem("userSessions");

  // Clear sessionStorage
  sessionStorage.clear();

  // Clear auth token
  if (window.localStorage.getItem("token")) {
    localStorage.removeItem("token");
  }

  // Redirect to home
  window.location.href = "/";
}, []);
```

---

## 🚀 Best Practices Summary

✅ Always validate auth state before rendering protected content
✅ Handle auth errors gracefully
✅ Clear sensitive data on logout
✅ Implement proper error boundaries
✅ Use secure storage for sensitive tokens
✅ Implement session timeout
✅ Track user activity
✅ Prevent concurrent sessions (optional)
✅ Validate tokens with backend
✅ Implement proper redirect flows
✅ Log auth events for security
✅ Rate limit login attempts

---

## 📚 Related Files

- `src/context/AuthContext.jsx` - Main implementation
- `src/context/useAuth.js` - Custom hook
- `AUTHENTICATION_TECHNICAL.md` - Technical details
- `AUTH_DOCUMENTATION.md` - User guide
- `QUICKSTART.md` - Testing guide

**Continue building secure applications!** 🔐
