import { useEffect } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function OAuthRedirect() {
  const { signIn } = useSignIn();
  const navigate = useNavigate();

  useEffect(() => {
    signIn
      .authenticateFromRedirect()
      .then(() => navigate("/dashboard"))
      .catch((err) => console.error("OAuth Redirect Error:", err));
  }, []);

  return <p>Loading...</p>;
}
