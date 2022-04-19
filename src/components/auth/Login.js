import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";

// Import useMutation
import { useMutation } from "react-query";

// Import API config
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";
import { AlertFailed, AlertSuccess } from "./Alert";

export default function Login() {
  let navigate = useNavigate();
  let api = API();

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Data body
      const body = JSON.stringify(form);

      // Configuration
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      };

      // Insert data for login process
      const response = await api.post("/login", config);

      console.log(response);

      // Checking process
      if (response.status === "success") {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data,
        });

        // Status check
        if (response.data.status === "admin") {
          navigate("/complain-admin");
        } else {
          navigate("/");
        }

        const alert = <AlertSuccess />;
        setMessage(alert);
      } else {
        const alert = <AlertFailed />;
        setMessage(alert);
      }
    } catch (error) {
      const alert = <AlertFailed />;
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <div className="d-flex justify-content-center">
      <div className="card-auth p-4">
        <div
          style={{ fontSize: "36px", lineHeight: "49px", fontWeight: "700" }}
          className="mb-3"
        >
          Login
        </div>
        {message && message}
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="mt-3 form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleChange}
              className="px-3 py-2 mt-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleChange}
              className="px-3 py-2 mt-3"
            />
          </div>
          <div className="d-grid gap-2 mt-5">
            <button className="btn btn-login">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
