import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../../../assets/images/logo.svg";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../services/api/auth.service";
import { toast } from "react-toastify";
import { setPlayerData } from "../../../components/custom-hooks";

const Login = () => {
  const navigate = useNavigate();
  // const { setPartner } = ContextProvider();
  const authService = new AuthService();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const handleLogin = async (values: any) => {
    // e.preventDefault();
    setLoading(true);
    setError("")
    try {
      const response = await authService.partnerSignIn(values);
      setLoading(false);

      if (response.data === false) {
        setError(response?.message);
        return;
      }
      if (!response.status) {
        toast.error(response?.message);
        return;
      }
      toast.success(response?.message);
      setPlayerData(response?.data);
      localStorage.setItem("ryd-partner-token", response?.data?.token);
      navigate("/partner/dashboard");
    } catch (err: any) {
      setLoading(false);
      toast.error(err.message);
      return;
    }
  };

  return (
    <section className="mx-auto w-[90%] lg:w-[30%] max-w-[504px] my-24">
      <img src={logo} alt="" width={150} className="mx-5" />
      <div className="w-full h-[1px] bg-[#DADCE0] my-10"></div>

      <div className="mx-5">
        <h1 className="mt-8 text-2xl font-semibold ">Login</h1>
        <p className="font-light mt-2">Sign-in to your Partner Account</p>
        {error ? <p className="text-[red] mt-3">{error}</p> : null}
        <form onSubmit={handleSubmit} className="mt-8">
          <div>
            <label htmlFor="email" className="text-xs font-light block mt-4">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="user@gmail.com"
              className="text-xs font-light border border-[#DADCE0] px-3 py-2 rounded-lg w-full mt-3"
              {...getFieldProps("email")}
            />
            {touched.email && errors.email ? (
              <div className="text-red-500 text-sm">{errors.email}</div>
            ) : null}
          </div>

          <div className="relative mt-14">
            <label htmlFor="password" className="text-xs font-light block mt-4">
              Password*
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="text-xs font-light border border-[#DADCE0] px-3 py-3 rounded-lg w-full mt-3"
              {...getFieldProps("password")}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 bottom-3 cursor-pointer"
            >
              {showPassword ? <LuEyeOff /> : <LuEye />}
            </div>
          </div>
          {touched.password && errors.password ? (
            <div className="text-red-500 text-sm">{errors.password}</div>
          ) : null}
          <Link
            to="/partner/forgot-password"
            className="text-[12px] font-[400] text-blue-600 leading-[26px] flex justify-end mt-3 "
          >
            Forgot password?
          </Link>
          <button
            type="submit"
            className="w-full text-white bg-[#0B1B2B] text-xs rounded-lg py-2 mt-6 "
          >
              {loading ? 'Processing...' : ' Log In'}
          </button>

          <p className="text-sm text-center mt-5">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/partner/signup")}
              className="text-[#454ADE] cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};
export default Login;
