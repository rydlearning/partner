import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../../../assets/images/logo.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu"; // Assuming these icons are imported
import AuthService from "../../../services/api/auth.service";
import { toast } from "react-toastify";

const SetNewPassword = () => {
  const navigate = useNavigate();
  const authService = new AuthService();
  const { player, email } = useParams();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswords, setShowPasswords] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: {
      passwordOld: "",
      password1: "",
      email: "",
      password2: "",
    },
    validationSchema: Yup.object({
      passwordOld: Yup.string()
        .min(5, "Password must be at least 5 characters")
        .required("Password is required"),
      password1: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      password2: Yup.string()
        .oneOf([Yup.ref("password1")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      const data = { ...values, email };
      handleReset(data);
    },
  });

  const handleReset = async (formData: any) => {
    setLoading(true);
    try {
      const response =
        player === "partner"
          ? await authService.partnerUpdatePassword(formData)
          : await authService.parentUpdatePassword(formData);
      setLoading(false);
      if (!response.status) {
        toast.error(response?.message);
        return;
      }
      toast.success(`${response?.message}`);
      player === "partner"
        ? navigate("/partner/login")
        : navigate("/partner/parent/login");
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
        <h1 className="mt-8 text-2xl font-semibold">Set New Password</h1>
        <p className="font-light mt-2">
          Please use a password you’ll easily remember
        </p>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="relative mt-14">
            <label
              htmlFor="passwordOld"
              className="text-xs font-light block mt-4"
            >
              Old Password*
            </label>
            <input
              id="passwordOld"
              type={showPassword ? "text" : "password"}
              placeholder="*****"
              className="text-xs font-light border border-[#DADCE0] px-3 py-3 rounded-lg w-full mt-3"
              {...getFieldProps("passwordOld")}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 bottom-3 cursor-pointer"
            >
              {showPassword ? <LuEyeOff /> : <LuEye />}
            </div>
          </div>
          {touched.passwordOld && errors.passwordOld ? (
            <div className="text-red-500 text-sm">{errors.passwordOld}</div>
          ) : null}
          <div className="relative mt-5">
            <label
              htmlFor="password1"
              className="text-xs font-light block mt-4"
            >
              New Password*
            </label>
            <input
              id="password1"
              type={showPasswords ? "text" : "password"}
              placeholder="*****"
              className="text-xs font-light border border-[#DADCE0] px-3 py-3 rounded-lg w-full mt-3"
              {...getFieldProps("password1")}
            />
            <div
              onClick={() => setShowPasswords(!showPasswords)}
              className="absolute right-5 bottom-3 cursor-pointer"
            >
              {showPasswords ? <LuEyeOff /> : <LuEye />}
            </div>
          </div>
          {touched.password1 && errors.password1 ? (
            <div className="text-red-500 text-sm">{errors.password1}</div>
          ) : null}

          <div className="relative mt-5">
            <label
              htmlFor="password2"
              className="text-xs font-light block mt-4"
            >
              Confirm Password*
            </label>
            <input
              id="password2"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="******"
              className="text-xs font-light border border-[#DADCE0] px-3 py-3 rounded-lg w-full mt-3"
              {...getFieldProps("password2")}
            />
            <div
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-5 bottom-3 cursor-pointer"
            >
              {showConfirmPassword ? <LuEyeOff /> : <LuEye />}
            </div>
          </div>
          {touched.password2 && errors.password2 ? (
            <div className="text-red-500 text-sm">{errors.password2}</div>
          ) : null}

          <button
            type="submit"
            className="w-full text-white bg-[#0B1B2B] text-xs rounded-lg py-2 mt-12"
          >
            {loading ? "Processing..." : "Reset Password"}
          </button>

          <p
            onClick={() =>
              navigate(
                player === "parner" ? "/partner/login" : "/partner/parent/login"
              )
            }
            className="text-sm text-center mt-5 cursor-pointer"
          >
            Back to Login
          </p>
        </form>
      </div>
    </section>
  );
};

export default SetNewPassword;
