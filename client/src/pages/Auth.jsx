import { useState, useEffect } from "react";
import { signupUser, loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

function Auth() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const [isLogin, setIsLogin] = useState(
    location.pathname === "/login"
  );
  useEffect(() => {
    setIsLogin(location.pathname === "/login");
  }, [location.pathname]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    try {
      // SIGNUP
      if (!isLogin) {
        if (!formData.name.trim()) {
          throw new Error("Please enter your name");
        }

        if (!formData.email.trim()) {
          throw new Error("Please enter your email");
        }

        if (!formData.password) {
          throw new Error("Please enter a password");
        }

        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }

        const data = await signupUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        // Store JWT and update authentication state
        login(data.token, data.user);

        console.log("Signup Successful", data);

        // Redirect authenticated user
        navigate("/dashboard");

        return;
      }

      // LOGIN

      if (!formData.email.trim()) {
        throw new Error("Please enter your email");
      }

      if (!formData.password) {
        throw new Error("Please enter your password");
      }

      const data = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      // Store JWT and update authentication state
      login(data.token, data.user);

      console.log("Login Successful", data);

      // Redirect authenticated user
      navigate("/dashboard");

    } catch (error) {
      setError(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const switchToLogin = () => {
    setError("");
    navigate("/login");
  };

  const switchToSignup = () => {
    setError("");
    navigate("/signup");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#fafafa] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-5xl items-center">
        {/* Auth Card */}
        <div className="w-full overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.07)]">
          <div className="grid lg:grid-cols-2">

            {/* FORM SIDE */}

            <div className="relative min-h-[680px] overflow-hidden">

              {/* SIGNUP */}

              <div
                className={`absolute inset-0 px-7 py-10 sm:px-12 sm:py-14 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isLogin
                    ? "-translate-x-8 opacity-0 pointer-events-none"
                    : "translate-x-0 opacity-100"
                }`}
              >
                <div className="flex h-full flex-col justify-center">

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#013364]">
                      Get started
                    </p>

                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                      Create your account
                    </h1>

                    <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
                      Start preparing smarter and build confidence before your
                      next interview.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-4">

                    {/* Name */}

                    <div>
                      <label
                        htmlFor="signup-name"
                        className="mb-2 block text-sm font-medium text-gray-800"
                      >
                        Full name
                      </label>

                      <input
                        id="signup-name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#013364] focus:ring-1 focus:ring-[#013364]/10"
                      />
                    </div>

                    {/* Email */}

                    <div>
                      <label
                        htmlFor="signup-email"
                        className="mb-2 block text-sm font-medium text-gray-800"
                      >
                        Email
                      </label>

                      <input
                        id="signup-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#013364] focus:ring-1 focus:ring-[#013364]/10"
                      />
                    </div>

                    {/* Password */}

                    <div>
                      <label
                        htmlFor="signup-password"
                        className="mb-2 block text-sm font-medium text-gray-800"
                      >
                        Password
                      </label>

                      <input
                        id="signup-password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#013364] focus:ring-1 focus:ring-[#013364]/10"
                      />
                    </div>

                    {/* Confirm Password */}

                    <div>
                      <label
                        htmlFor="signup-confirm-password"
                        className="mb-2 block text-sm font-medium text-gray-800"
                      >
                        Confirm password
                      </label>

                      <input
                        id="signup-confirm-password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#013364] focus:ring-1 focus:ring-[#013364]/10"
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-600">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-lg bg-[#013364] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#081f38] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading
                        ? "Creating account..."
                        : "Create Account"}
                    </button>

                  </form>

                  <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={switchToLogin}
                      className="font-medium text-[#013364] hover:underline"
                    >
                      Log in
                    </button>
                  </p>

                </div>
              </div>

              {/* LOGIN */}

              <div
                className={`absolute inset-0 px-7 py-10 sm:px-12 sm:py-14 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isLogin
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0 pointer-events-none"
                }`}
              >
                <div className="flex h-full flex-col justify-center">

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#013364]">
                      Welcome back
                    </p>

                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                      Log in to InterviewIQ
                    </h1>

                    <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
                      Continue preparing for your next interview.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">

                    {/* Email */}

                    <div>
                      <label
                        htmlFor="login-email"
                        className="mb-2 block text-sm font-medium text-gray-800"
                      >
                        Email
                      </label>

                      <input
                        id="login-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#013364] focus:ring-1 focus:ring-[#013364]/10"
                      />
                    </div>

                    {/* Password */}

                    <div>
                      <div className="mb-2 flex items-center justify-between">

                        <label
                          htmlFor="login-password"
                          className="block text-sm font-medium text-gray-800"
                        >
                          Password
                        </label>

                        <button
                          type="button"
                          className="text-xs font-medium text-[#013364] hover:underline"
                        >
                          Forgot password?
                        </button>

                      </div>

                      <input
                        id="login-password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#013364] focus:ring-1 focus:ring-[#013364]/10"
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-600">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-lg bg-[#013364] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#081f38] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading
                        ? "Logging in..."
                        : "Log In"}
                    </button>

                  </form>

                  <p className="mt-6 text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={switchToSignup}
                      className="font-medium text-[#013364] hover:underline"
                    >
                      Create one
                    </button>
                  </p>

                </div>
              </div>

            </div>

            {/* BRAND SIDE */}

            <div className="hidden bg-[#013364] px-10 py-25 text-white lg:flex lg:min-h-[610px] lg:flex-col lg:justify-between">

              <div>

                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">
                  InterviewIQ
                </p>

                <div className="mt-20 max-w-md">

                  <h2 className="text-4xl font-bold leading-[1.08] tracking-tight">
                    Prepare smarter.
                    <br />
                    Interview better.
                  </h2>

                  <p className="mt-8 text-sm leading-7 text-white/70">
                    Build confidence through personalised preparation,
                    realistic interview practice, and feedback that tells you
                    exactly where to improve.
                  </p>

                </div>

              </div>

              <div className="space-y-5">

                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-xs">
                    ✓
                  </span>

                  <span className="text-sm text-white/75">
                    Resume-based preparation
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-xs">
                    ✓
                  </span>

                  <span className="text-sm text-white/75">
                    Realistic AI interviews
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-xs">
                    ✓
                  </span>

                  <span className="text-sm text-white/75">
                    Personalised performance feedback
                  </span>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;