import { useState } from "react";
import { BiLoader } from "react-icons/bi";
import { FaCircleCheck, FaExclamation } from "react-icons/fa6";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [submitStatus, setSubmitStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Integration of Signup API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Input validation
    if (!name || !email || !password) {
      setStatus("error");
      setErrorMessage("Please fill out all fields.");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    setStatus("processing");
    setSubmitStatus(true);
    setErrorMessage("");

    try {
      const signupResponse = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await signupResponse.json();

      if (!signupResponse.ok) {
        // Handle API errors (e.g., email already registered)
        setStatus("error");
        setErrorMessage(data.error || "Registration failed. Please try again.");
        setTimeout(() => setStatus("idle"), 3000);
        return;
      }

      if (data.token) {
        setStatus("success");
        setTimeout(() => {
          // Redirect to login page or dashboard
          window.location.href = "/login";
        }, 1000);
      } else {
        setStatus("error");
        setErrorMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    } finally {
      setTimeout(() => setSubmitStatus(false), 3000);
    }
  };

  return (
    <>
      <section className="flex justify-center items-center h-screen p-4">
        {/* Status Message */}
        <span
          className={`bg-gray-100 py-2 px-4 rounded text-sm text-gray-400 absolute top-6 ${
            submitStatus ? "block" : "hidden"
          }`}
        >
          {status === "processing" ? (
            <span className="flex items-center gap-2">
              <BiLoader className="animate-spin duration-700" /> Signing up...
            </span>
          ) : status === "success" ? (
            <span className="flex items-center gap-2">
              <FaCircleCheck className="text-green-500 text-xl" /> Signup Successful!
            </span>
          ) : status === "error" ? (
            <span className="flex items-center gap-2">
              <FaExclamation className="text-red-500 text-xl" /> {errorMessage}
            </span>
          ) : (
            ""
          )}
        </span>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="w-full md:w-1/4">
          <div className="text-center space-y-1 mb-6">
            <h1 className="text-center text-xl font-semibold">Signup</h1>
            <p className="text-gray-400 text-sm">Signup for an account</p>
          </div>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border rounded"
              required
            />
            <button
              type="submit"
              className="p-2 bg-blue-800 text-white rounded flex justify-center items-center gap-1 disabled:opacity-50"
              disabled={status === "processing"}
            >
              {status === "processing" ? (
                <BiLoader className="text-2xl animate-spin duration-700" />
              ) : (
                "Sign up"
              )}
              {status === "success" && <FaCircleCheck className="text-green-500 text-2xl" />}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Signup;