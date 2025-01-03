import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userName")) {
      navigate("/chatroom");
      return;
    }
  });

  function handleLogin() {
    if (email.trim() === "") {
      setEmail("");
      return;
    }
    if (password.trim() === "") {
      setPassword("");
      return;
    }
    localStorage.setItem("userName", email);
    navigate("/chatroom", { replace: true });
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col p-0">
        <div className="text-center my-4">
          <h1 className="text-5xl font-bold">Login</h1>
        </div>
        <div className="card shrink-0 w-96 max-w-[90%] shadow-2xl bg-base-100">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered"
                required
              />
              <label className="label justify-end">
                <a href="findPassword" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            </div>
            <p className="text-sm">
              Need an account? <a href="signUp" className="link link-primary link-hover">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
