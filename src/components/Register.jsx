import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorComponent } from "./Login";
import { useAuth } from "../firebase/Auth";
import { db } from "../firebase/base";
import { collection, addDoc } from "firebase/firestore";

export const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfimPassword] = useState("");
  const [error, setError] = useState({ status: false, message: "" });
  const navigate = useNavigate();
  const { signUpWithEmail } = useAuth();

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
      const user = await signUpWithEmail(email, password);
      // eslint-disable-next-line no-unused-vars
      const docRef = await addDoc(collection(db, "users"), {
        uid: user.user.uid,
        firstName: firstName,
        lastName: lastName,
        email: email,
      });
      navigate("/");
    } catch (err) {
      setError({ status: true, message: `Something went wrong. ${err}` });
      throw new Error(`Something went wrong. ${err}`);
    }
  };
  return (
    <>
      <div className="w-[100vw] min-h-[100vh] bg-[#272727] flex justify-center items-center text-[#e0e0e0] overflow-x-hidden py-10">
        <div className="max-w-[1200px]">
          <h1 className="text-5xl font-medium text-[#39b2ad] tracking-wide mb-8 px-2">
            Register
          </h1>
          <form className="pt-2 pb-8 login" onSubmit={formSubmit}>
            <div className="flex flex-col items-start justify-center w-full h-full gap-4 px-4 py-6 mt-4 sm:flex-row sm:items-center">
              <label
                htmlFor="firstName"
                className="text-lg text-[#e0e0e0] px-3 pt-2 sm:basis-[30%] sm:text-right text-center"
              >
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="E.g. Aayush"
                minLength={7}
                autoComplete="off"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="bg-transparent outline-none border-b border-transparent hover:border-[#39b2ad] focus:border-[#39b2ad] transition-all duration-500 ease-in-out px-5 pt-2 "
              />
            </div>

            <div className="flex flex-col items-start justify-center w-full h-full gap-4 px-4 py-6 sm:flex-row sm:items-center">
              <label
                htmlFor="lastName"
                className="text-lg text-[#e0e0e0] px-3 pt-2 sm:basis-[30%] sm:text-right text-center"
              >
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="E.g. Lamichhane"
                autoComplete="off"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-transparent outline-none border-b border-transparent hover:border-[#39b2ad] focus:border-[#39b2ad] transition-all duration-500 ease-in-out px-5 pt-2 "
              />
            </div>

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
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent outline-none border-b border-transparent hover:border-[#39b2ad] focus:border-[#39b2ad] transition-all duration-500 ease-in-out px-5 pt-2 "
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
                autoComplete="off"
                required
                value={password}
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
                autoComplete="off"
                value={confirmPassword}
                onChange={(e) => setConfimPassword(e.target.value)}
                required
                className="bg-transparent outline-none border-b border-transparent hover:border-[#39b2ad] focus:border-[#39b2ad] transition-all duration-500 ease-in-out px-5 pt-2 "
              />
            </div>
            <div className="flex items-center justify-center w-full h-full">
              <button
                type="submit"
                className="px-3 py-4  rounded-lg basis-1/2  my-4 bg-[#39b2ad] hover:bg-[#1c5e5c] text-xl font-bold tracking-wider transition-all duration-500 ease-in-out"
              >
                Register
              </button>
            </div>
            <p className="text-[#8d8c8c] px-5 text-center">
              Already have an account?
              <Link
                to={"/login"}
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
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setConfimPassword("");
            navigate("/register");
          }, 2000)}
        </>
      )}
    </>
  );
};
