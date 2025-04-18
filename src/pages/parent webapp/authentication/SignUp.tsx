import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import {
  useGetCountries,
  useGetDialCodes,
  useGetTimezones,
} from "../../../services/query/useThirdParty";
import { CountryObject } from "../../../utils/types";
import logo from "../../../assets/images/logo.svg";
import { LuEye, LuEyeOff } from "react-icons/lu";
import AuthService from "../../../services/api/auth.service";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const SignUpParent = () => {
  const navigate = useNavigate();
  const authService = new AuthService();
  const [showPassword, setShowPassword] = useState(false);
  const [countryObject, setCountryObject] = useState<CountryObject | null>(
    null
  );
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [dialCode, setDialCode] = useState<string | null>(null);
  const [partnerId, setPartnerId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { data: fetchedCountries } = useGetCountries();
  const { data: fetchedTimezones } = useGetTimezones(countryCode);
  const { data: fetchedDialCodes } = useGetDialCodes();

  const countriesData = fetchedCountries?.data.data || [];
  const timeZonesArray = fetchedTimezones?.data.zones || [];
  const dialCodesArray = fetchedDialCodes?.data.data || [];

  const gmtArray = timeZonesArray.map((item: any) => {
    const gmtOffsetHours = (Math.round(item.gmtOffset / 3600) * 2) / 2;
    //rounding to nearest half or nearest whole number
    return `${item?.zoneName} GMT${
      gmtOffsetHours > 0 ? "+" : ""
    }${gmtOffsetHours}`;
  });

  // const { partnerID } = useParams();
  const [searchParam] = useSearchParams()
  const partnerID = searchParam.get("partnerID")

  useEffect(() => {
    if (partnerID) {
      setPartnerId(parseInt(partnerID, 10) - 100 );
    }else{
      toast.error("Invalid partner ID");
    }
  }, [partnerID]);

  const { handleSubmit, getFieldProps, touched, errors, setFieldValue } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        country: "",
        state: "",
        phone: "",
        timezone: "",
      },
      validationSchema: Yup.object({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email address is required"),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .max(20, "Password must not exceed 20 characters")
          .required("Password is required")
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must contain at least one letter and one number"
          ),
        country: Yup.string().required("Country is required"),
        state: Yup.string().required("Province/State is required"),
        phone: Yup.string().required("Phone number is required"),
        timezone: Yup.string().required("Study timezone is required"),
      }),
      onSubmit: (values) => {
        const phone = values.phone;
        const formValues = {
          ...values,
          phone: dialCode + phone,
          partnerId: partnerId,
        };
        //console.log(formValues)
        registerParent(formValues);
      },
    });

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryName = e.target.value;
    const selectedCountryObject = countriesData.find(
      (country: any) => country.name === countryName
    );
    const dialCodeObject = dialCodesArray.find(
      (d: any) => d.name === countryName
    );
    setCountryObject(selectedCountryObject);
    setCountryCode(selectedCountryObject.iso2);
    setFieldValue("country", countryName);
    setDialCode(dialCodeObject?.dial_code);
  };

  const registerParent = async (formData: any) => {
    setLoading(true);
    try {
      const response = await authService.parentSignUp(formData);
      setLoading(false);
      if (!response.status) {
        toast.error(response?.message);
        return;
      } else {
        toast.success(response?.message);
        navigate("/partner/parent/login");
      }
    } catch (err: any) {
      setLoading(false);
      toast.error(err.message);
      return;
    }
  };

  return (
    <section className="mx-auto w-[90%] lg:w-[35%] max-w-[504px] my-12">
      <img src={logo} alt="logo" width={150} />
      <h3 className="text-2xl font-semibold mt-8">Join us today</h3>
      <p className="font-light mt-2">
        Create your account by suppling the information below
      </p>

      <form onSubmit={handleSubmit}>
        <p className="font-medium text-lg mt-8">Personal Info</p>
        <div className="flex items-center justify-between space-x-8">
          <div className="w-full">
            <label
              htmlFor="firstName"
              className="text-xs font-light block mt-4"
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
            {touched.firstName && errors.firstName ? (
              <div className="text-red-500 text-sm">{errors.firstName}</div>
            ) : null}
          </div>

          <div className="w-full">
            <label htmlFor="lastName" className="text-xs font-light block mt-4">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Enter last name"
              className="text-xs font-light border border-[#DADCE0] px-3 py-3 rounded-lg w-full mt-3"
              {...getFieldProps("lastName")}
            />
            {touched.lastName && errors.lastName ? (
              <div className="text-red-500 text-sm">{errors.lastName}</div>
            ) : null}
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-xs font-light block mt-4"
          >
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

        <div className="relative">
          <label htmlFor="password" className="text-xs font-light block mt-4">
            Set your password
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

        <div className="flex items-center justify-between space-x-8">
          <div className="w-full">
            <label htmlFor="country" className="text-xs font-light block mt-4">
              Country
            </label>
            <select
              id="country"
              className="text-xs font-light border border-[#DADCE0] px-3 py-3 rounded-lg w-full mt-3"
              {...getFieldProps("country")}
              onChange={handleCountryChange}
            >
              <option value="" label="Select country" />
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

          <div className="w-full">
            <label
              htmlFor="state"
              className="text-xs font-light block mt-4">
              Province/State
            </label>
            <select
              id="state"
              className="text-xs font-light border border-[#DADCE0] px-3 py-2 rounded-lg w-full mt-3"
              {...getFieldProps("state")}>
              <option value="" label="Select province/state" />
              {countryObject?.states.map((state) => (
                <option key={state.state_code} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
            {touched.state && errors.state ? (
              <div className="text-red-500 text-sm">{errors.state}</div>
            ) : null}
          </div>
        </div>

        <div>
          <label
            htmlFor="phone"
            className="text-xs font-light block mt-4"
          >
            Phone Number
          </label>
          <div className="flex items-center">
            <div className="mr-2 mt-3">{dialCode}</div>
            <input
              id="phone"
              type="tel"
              placeholder="Enter phone number"
              className="text-xs  font-light border border-[#DADCE0] px-3 py-2 rounded-lg w-full mt-3"
              {...getFieldProps("phone")}
            />
          </div>

          {touched.phone && errors.phone ? (
            <div className="text-red-500 text-sm">{errors.phone}</div>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="timezone"
            className="text-xs font-light block mt-4"
          >
            Study Timezone
          </label>
          <select
            id="timezone"
            className="text-xs font-light border border-[#DADCE0] px-3 py-2 rounded-lg w-full mt-3"
            {...getFieldProps("timezone")}
          >
            <option value="" label="Select timezone" />
            {gmtArray.map((timezone: string, i: number) => (
              <option key={i} value={timezone.split("GMT")[0].trim()}>
                {timezone}
              </option>
            ))}
          </select>
          {touched.timezone && errors.timezone ? (
            <div className="text-red-500 text-sm">{errors.timezone}</div>
          ) : null}
        </div>

        <div className="flex items-center justify-between mt-12">
          <p>
            Already have an account?{" "}
            <span
              className="text-[#454ADE] cursor-pointer"
              onClick={() => navigate("/partner/parent/login")}
            >
              Log in
            </span>
          </p>
          <button
            type="submit"
            className="text-white bg-black rounded-md px-10 text-sm py-2 font-light"
          >
             {loading ? 'Processing...' : 'Sign Up'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignUpParent;
