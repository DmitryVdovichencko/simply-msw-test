/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import profile from "./api/profile";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!id.length || !password.length) {
      console.log("Wrong username/password. Please try again.");
      setLoading(false);
      return;
    }
    setLoading(true);
    profile.profile.login(id, password).then((res) => {
      // console.log(" Login Response", res);
      if (res.status === 200) {
        if (res.data) {
					console.log('Login Success');
					setId(id);
          // sessionStorage.setItem("username", JSON.stringify(id));
          // sessionStorage.setItem("isLogin", JSON.stringify(res.data));
          // console.log(id, typeof id);
          // setSoeid(id)
          // setIsLogin(!!res.data);
          // history("/");
        } else if (!res.data)
          console.log("Wrong username/password. Please try again.");
        // Internal server error
      } else console.log("Failed to login. Please try again.");
      setLoading(false);
    });
  };
  return (
    <div className="container">
        <h5>Sign in</h5>
        <input
          aria-label="Username"
          type="text"
          onChange={(e: any) => setId(e.target.value)}
        />
        <input
          aria-label="Password"
          type="password"
          onChange={(e: any) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
        {loading && <p>loading</p>}
				{id && <p id="username">{id}</p>}
    </div>
  );
}
