import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../features/Authentication/useUser";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading } = useSelector((store) => store.budget);

  const { isAuthenticated } = useUser();

  useEffect(() => {
    // If not authenticated and not loading, redirect to login
    if (
      !isAuthenticated &&
      !isLoading &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup"
    ) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate, location.pathname]);

  // Render children if authenticated
  if (isAuthenticated) {
    return children;
  }

  // Prevent rendering anything if not authenticated and the user is being redirected
  if (
    !isAuthenticated &&
    location.pathname !== "/login" &&
    location.pathname !== "/signup"
  ) {
    return null;
  }

  // Allow rendering children if we are on a page meant for unauthenticated users
  return children;
}

export default ProtectedRoute;
