import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/Auth";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfimPassword] = useState("");
  const [error, setError] = useState({ status: false, message: "" });
  const navigate = useNavigate();
  const { signInWithEmail } = useAuth();

  const formSubmit = async (e) => {
    e.preventDefault();
    const validateEmail = email?.trim().split("@")[1]?.split(".")[0];
    if (validateEmail !== "gmail") {
      setError({ status: true, message: "Email is Invalid" });
      throw new Error("Email invalid");
    }
    if (password !== confirmPassword) {
      setError({ status: true, message: "Password didn't match" });
      throw new Error("Password didn't match");
    }
    try {
      // eslint-disable-next-line no-unused-vars
      const user = await signInWithEmail(email, password);
      navigate("/");
    } catch (err) {
      setError({ status: true, message: `Something went wrong. ${err}` });
      throw new Error(`Something went wrong. ${err}`);
    }
  };

  return (
    <>
      <div className="w-[100vw] min-h-[100vh] bg-[#272727] flex justify-center items-center text-[#e0e0e0] overflow-x-hidden py-10">
        <div className="max-w-[1200px] ">
          <h1 className="text-5xl font-medium text-[#39b2ad] tracking-wide mb-8 px-2">
            Login
          </h1>
          <form className="pt-2 pb-8 login" onSubmit={formSubmit}>
            <div className="flex flex-col items-start justify-center w-full h-full gap-4 px-4 py-6 sm:flex-row sm:items-center">
              <label
                htmlFor="email"
                className="text-lg text-[#e0e0e0] px-3 pt-2 sm:basis-[30%] sm:text-right text-center"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                placeholder="E.g. abc@gmail.com"
                autoComplete="off"
                value={email}
                required
                className="bg-transparent outline-none border-b border-transparent hover:border-[#39b2ad] focus:border-[#39b2ad] transition-all duration-500 ease-in-out px-5 pt-2 "
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col items-start justify-center w-full h-full gap-4 px-4 py-6 sm:flex-row sm:items-center">
              <label
                htmlFor="password"
                className="text-lg text-[#e0e0e0] px-3 pt-2 sm:basis-[30%] sm:text-right text-center"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                placeholder="min 8 character"
                minLength={8}
                required
                value={password}
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent outline-none border-b border-transparent hover:border-[#39b2ad] focus:border-[#39b2ad] transition-all duration-500 ease-in-out px-5 pt-2 "
              />
            </div>

            <div className="flex flex-col items-start justify-center w-full h-full gap-4 px-4 py-6 sm:flex-row sm:items-center">
              <label
                htmlFor="confirm_password"
                className="text-lg text-[#e0e0e0] px-3 pt-2 sm:basis-[30%] sm:text-right text-center"
              >
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirm_password"
                placeholder="min 8 character"
                minLength={8}
                value={confirmPassword}
                autoComplete="off"
                required
                onChange={(e) => setConfimPassword(e.target.value)}
                className="bg-transparent outline-none border-b border-transparent hover:border-[#39b2ad] focus:border-[#39b2ad] transition-all duration-500 ease-in-out px-5 pt-2 "
              />
            </div>
            <div className="flex items-center justify-center w-full h-full">
              <button
                type="submit"
                className="px-3 py-4  rounded-lg basis-1/2  my-4 bg-[#39b2ad] hover:bg-[#1c5e5c] text-xl font-bold tracking-wider transition-all duration-500 ease-in-out"
              >
                Login
              </button>
            </div>
            <p className="text-[#8d8c8c] px-5 text-center">
              Dont have an account?
              <Link
                to={"/register"}
                className="hover:underline hover:text-[#39b2ad]"
              >
                Click Here
              </Link>
            </p>
          </form>
        </div>
      </div>
      {error.status === true && (
        <>
          <ErrorComponent message={error.message} />
          {setTimeout(() => {
            setError({ status: false, message: "" });
            setEmail("");
            setPassword("");
            setConfimPassword("");
            navigate("/login");
          }, 2000)}
        </>
      )}
    </>
  );
};

// eslint-disable-next-line react/prop-types
export const ErrorComponent = ({ message }) => {
  return (
    <div className="errorBox absolute top-[20px] left-[40%] w-[200px]  bg-[#ec4141] px-2 py-2 rounded-xl">
      {message}
    </div>
  );
};
