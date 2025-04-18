import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../../../assets/images/logo.svg";
import { useNavigate, useParams } from "react-router-dom";
import AuthService from "../../../services/api/auth.service";
import { toast } from "react-toastify";
import { useState } from "react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const authService = new AuthService();
  const {player}=useParams()
  const [loading, setLoading] = useState(false);
  
  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      handleReset(values);
    },
  });

  const handleReset = async (formData:any) => {
    setLoading(true);
    try {
      const response = player === "partner" ? await authService.partnerForgotPassword(formData) : await  authService.parentForgotPassword(formData)
      setLoading(false);
      if (!response.status) {
        toast.error(response?.message);
        return;
      }
      toast.success(
        `${response?.message}: a new password has been sent to your email.`
      );
      navigate(`/${player}/${formData.email}/set-password`)
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
        <h1 className="mt-8 text-2xl font-semibold ">Forgot Password?</h1>
        <p className="font-light mt-2">
          No worries, it happens to the best of us
        </p>
        <form onSubmit={handleSubmit} className="mt-8">
          <div>
            <label htmlFor="email" className="text-xs font-light block mt-4">
              Email Address*
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="text-xs font-light border border-[#DADCE0] px-3 py-3 rounded-lg w-full mt-3"
              {...getFieldProps("email")}
            />
            {touched.email && errors.email ? (
              <div className="text-red-500 text-sm">{errors.email}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full text-white bg-[#0B1B2B] text-xs rounded-lg py-2 mt-12 "
          >
            {loading ? 'Processing...' : 'Reset Password'}
          </button>

          <p
            onClick={() => navigate("/partner/parent/login")}
            className="text-sm text-center mt-5 cursor-pointer"
          >
            Back to Login
          </p>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
