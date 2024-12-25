import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userName")) {
      navigate("/chatroom");
      return;
    }
  });

  function handleSignUp() {
    if (userName.trim() === "") {
      setUserName("");
      return;
    }
    if (password.trim() === "") {
      setPassword("");
      return;
    }
    if (email.trim() === "") {
      setEmail("");
      return;
    }
    localStorage.setItem("userName", userName);
    navigate("/chatroom", { replace: true });
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col p-0">
        <div className="text-center my-4">
          <h1 className="text-5xl font-bold">Sign Up</h1>
        </div>
        <div className="card shrink-0 w-96 max-w-[90%] shadow-2xl bg-base-100">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">User Name*</span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email*</span>
              </label>
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password*</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-4">
              <button className="btn btn-primary" onClick={handleSignUp}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
