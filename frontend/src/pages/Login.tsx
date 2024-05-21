import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userName, setUserName] = useState<string>("");
  const navigate = useNavigate();

  function handleLogin() {
    if (userName.trim() === "") {
      setUserName("");
      return
    }
    localStorage.setItem("userName", userName);
    navigate("/chatroom", {replace: true});    
  }

  useEffect(() => {
    if (localStorage.getItem("userName")) {
      navigate("/chatroom");
      return;
    }
  })

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center my-4">
          <h1 className="text-5xl font-bold">Enter Chatroom</h1>
        </div>
        <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">User Name</span>
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
            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={handleLogin}>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
