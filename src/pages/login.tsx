import bg from "@/assets/bg.png";
import LoginForm from "@/components/login-form";
import useAuth from "@/context/use-auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function LoginPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate, user]);

  if (user) {
    return null;
  }

  return (
    <main className="grid grid-cols-2 min-h-screen">
      <img src={bg} alt="" className="h-full object-cover" />
      <div className="p-4 grid">
        <h1 className="text-xl font-bold text-center">
          Seiwa Kaiun Philippines Inc.
        </h1>
        <div>
          <p className="text-center uppercase">Monitoring System Login</p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
export default LoginPage;
