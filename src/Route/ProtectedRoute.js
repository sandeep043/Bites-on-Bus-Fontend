import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { navigationLinks } from "../utils/constants";

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useSelector((state) => state.auth.isAuthenticated);

    return isAuthenticated ? (
        children
    ) : (
        <Navigate to={navigationLinks.login.path} replace />
    );
}

export default ProtectedRoute;