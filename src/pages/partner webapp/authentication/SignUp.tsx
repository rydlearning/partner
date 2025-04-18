import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../../../assets/images/logo.svg";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/api/auth.service";
import { toast } from "react-toastify";
import {useGetCountries} from "../../../services/query/useThirdParty.ts";

const SignUpPartner = () => {
  const { data: fetchedCountries } = useGetCountries();
  const navigate = useNavigate();
  const authService = new AuthService();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [country, setCountry] = useState("Canada")
  const countriesData = fetchedCountries?.data.data || [];

  const { handleSubmit, getFieldProps, touched, errors, setFieldValue } = useFormik({
    initialValues: {
      organizationName: "",
      address: "",
      country: "Canada",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: Yup.object({
      organizationName: Yup.string(),
      address: Yup.string(),
      country: Yup.string().required("Country is required"),
      firstName: Yup.string(),
      lastName: Yup.string(),
      email: Yup.string().email("Invalid email address"),
      phone: Yup.number(),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must not exceed 20 characters")
        .required("Password is required")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must contain at least one letter and one number"
        ),
    }),
    onSubmit: (values) => {
      registerPartner(values);
    },
  });

  const registerPartner = async (formData: any) => {
    setLoading(true);
    try {
      const response = await authService.partnerSignUp(formData);
      setLoading(false);
      if (!response.status) {
        toast.error(response?.message);
        return;
      } else {
        toast.success(response?.message);
        navigate('/partner/login');
      }
    } catch (err: any) {
      setLoading(false);
      toast.error(err.message);
      return;
    }
  };

  const handleCountryChange = (e) => {
    const countryName = e.target.value;
    setFieldValue("country", countryName)
  };

  return (
    <section className="mx-auto w-[90%] lg:w-[40%] max-w-[504px] my-12">
      <img src={logo} alt="" width={150} />
      <h3 className="text-2xl font-semibold mt-8">Join us today</h3>
      <p className="font-light mt-2">
        Create your account by suppling the information below
      </p>

      <form onSubmit={handleSubmit}>
        <div>
          <p className="font-medium text-lg mt-8">Organization Info</p>
          <label
            className="text-xs font-light block mt-4"
            htmlFor="organizationName"
          >
            Organization name*
          </label>
          <input
            id="organizationName"
            type="text"
            placeholder="Enter organization name"
            className="text-xs font-light border border-[#DADCE0] px-3 py-2 rounded-lg w-full mt-3"
            {...getFieldProps("organizationName")}
          />
        </div>

        <div>
          <label className="text-xs font-light block mt-4" htmlFor="address">
            Organization Address
          </label>
          <input
            id="address"
            type="text"
            placeholder="Enter organization address"
            className="text-xs font-light border border-[#DADCE0] px-3 py-2 rounded-lg w-full mt-3"
            {...getFieldProps("address")}
          />
        </div>

        <div>
          <div className="w-full">
            <label className="text-xs font-light block mt-4" htmlFor="address">
              Country Or Registration
            </label>
            <select
                value={country}
                id="country"
                className="text-xs font-light border border-[#DADCE0] px-3 py-3 rounded-lg w-full mt-3"
                {...getFieldProps("country")}
                onChange={handleCountryChange}>
              <option value="" label="Select country"/>
              {countriesData.map((country: any, i: number) => {
                return (
                    <option key={i} value={country?.name}>
                      {country?.name}
                    </option>
                );
              })}
            </select>
            {touched.country && errors.country ? (
                <div className="text-red-500 text-sm">{errors.country}</div>
            ) : null}
          </div>
        </div>

        <p className="font-medium text-lg mt-8">Personal Info</p>

        <div className="flex items-center justify-between space-x-10">
          <div className="w-full">
            <label
                htmlFor="firstName"
                className="text-xs font-light mt-4 block"
            >
              First Name*
            </label>
            <input
                id="firstName"
                type="text"
                placeholder="Enter first name"
                className="text-xs font-light border border-[#DADCE0] px-3 py-3 rounded-lg w-full mt-3"
                {...getFieldProps("firstName")}
            />
          </div>

          <div className="w-full">
            <label htmlFor="lastName" className="text-xs font-light mt-4 block">
              Last Name*
            </label>
            <input
                id="lastName"
                type="text"
                placeholder="Enter last name"
              className="text-xs font-light border border-[#DADCE0] px-3 py-3 rounded-lg w-full mt-3 "
              {...getFieldProps("lastName")}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="text-xs font-light block mt-4">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter email address"
            className="text-xs font-light border border-[#DADCE0] px-3 py-2 rounded-lg w-full mt-3"
            {...getFieldProps("email")}
          />
          {touched.email && errors.email ? (
            <div className="text-red-500 text-sm">{errors.email}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="phone" className="text-xs font-light block mt-4">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="Enter phone number"
            className="text-xs font-light border border-[#DADCE0] px-3 py-2 rounded-lg w-full mt-3"
            {...getFieldProps("phone")}
          />
        </div>

        <div className="relative">
          <label htmlFor="password" className="text-xs font-light block mt-4">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="text-xs font-light border border-[#DADCE0] px-3 py-3 rounded-lg w-full mt-3 "
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
          <div className="text-red-500 text-sm ">{errors.password}</div>
        ) : null}

        <div className="flex items-center text-sm justify-between mt-12">
          <p>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/partner/login")}
              className="text-[#454ADE] cursor-pointer"
            >
              Log in
            </span>
          </p>
          <button
            type="submit"
            className="text-white bg-black rounded-md px-10 text-xs py-2 font-light"
          >
              {loading ? 'Processing...' : ' Sign Up'}
          </button>
        </div>
      </form>
      {/* <ToastContainer position="top-center" /> */}
    </section>
  );
};

export default SignUpPartner;
