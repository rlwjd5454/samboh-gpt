import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const nav = useNavigate();
  useEffect(() => {
    localStorage.removeItem("auth");
    nav("/", { replace: true });
  }, [nav]);
  return null;
}
