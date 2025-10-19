import { Navigate } from "react-router-dom";
import { useAppState } from "../../overmind";


const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppState()
//   console.log(user)
//  if (!user?.loggedIn) {
//    return (<Navigate to="/login" replace />);
//  }
 
  return children;
};

export default ProtectedRoutes;