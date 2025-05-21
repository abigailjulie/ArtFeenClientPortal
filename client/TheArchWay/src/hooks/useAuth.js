import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

export default function useAuth() {
  const token = useSelector(selectCurrentToken);
  let isAdmin = false;
  let isFounder = false;
  let status = "Client";

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles } = decoded.ClientInfo;

    isAdmin = roles.includes("Admin");
    isFounder = roles.includes("Founder");

    if (isAdmin) status = "Admin";
    if (isFounder) status = "Founder";

    return { username, roles, isAdmin, isFounder, status };
  }

  return { username: "", roles: [], isAdmin, isFounder, status };
}
