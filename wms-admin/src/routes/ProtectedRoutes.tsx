import { Navigate } from "react-router-dom";
import { useFrappeAuth } from "frappe-react-sdk";


const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, isLoading } = useFrappeAuth()
  if (!currentUser && !isLoading) {
    return (<Navigate to="/login" replace />);
  }

  return children;
};

export default ProtectedRoutes;