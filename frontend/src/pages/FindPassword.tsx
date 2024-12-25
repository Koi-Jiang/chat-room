import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FindPassword() {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userName")) {
      navigate("/chatroom");
      return;
    }
  });

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col p-0">
        <div className="text-center my-4">
          <h1 className="text-5xl font-bold">Find Password</h1>
        </div>
        <div className="card shrink-0 w-96 max-w-[90%] shadow-2xl bg-base-100">
          <form className="card-body">
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
            <div className="form-control mt-2">
              <button className="btn btn-primary" >
                Send verification
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FindPassword;
