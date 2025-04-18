import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import PartnerService from "../../../services/api/partner.service";

const InviteParent = () => {
  const navigate = useNavigate();
  const partnerService = new PartnerService();
  const [loading, setLoading] = useState<boolean>(false);

  const { handleSubmit, getFieldProps, touched, errors } = useFormik({
    initialValues: {
      emails: "",
      kidsNum: ""
    },
    validationSchema: Yup.object({
      emails: Yup.string(),
      kidsNum: Yup.number()
    }),
    onSubmit: (values) => {
      inviteParent(values);
    },
  });

  const inviteParent = async (formData: any) => {
    setLoading(true);
    try {
      const response = await partnerService.partnerInvite(formData);
      setLoading(false);
      if (!response.status) {
        toast.error(response?.message);
        return;
      } else {
        toast.success(response?.message);
        navigate('/partner/dashboard');
      }
    } catch (err: any) {
      setLoading(false);
      toast.error(err.message);
      return;
    }
  };

  return (
    <section className="mx-auto w-[40%] max-w-[504px] my-24">
      <h1 className="mt-8 text-2xl font-semibold ">Invite Parents</h1>
      <p className="font-light mt-2">
        Enter the email and number of kids for this invite
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="emails"
            className="text-xs font-light block mt-4"
          >
            Email Address
          </label>
          <input
            id="emails"
            type="text"
            placeholder="example@email.com"
            {...getFieldProps("emails")}
            className="text-xs font-light border border-[#DADCE0] px-3 py-2 rounded-lg w-full mt-3"
          />
          {touched.emails && errors.emails ? (
            <div className="text-red-500 text-sm">{errors.emails}</div>
          ) : null}
          <p className="bg-[#F1F7FF] text-[#1671D9] border border-[#1671D9] text-xs rounded-lg px-3 py-2 mt-2">
            Invite Multiple parents by separating their email address with a
            comma “,”
          </p>
        </div>

        <div>
          <label
            htmlFor="kidsNum"
            className="text-xs font-light block mt-4"
          >
            Number of Kids
          </label>
          <input
            id="kidsNum"
            type="number"
            placeholder="How many kids can each parents add?"
            {...getFieldProps("kidsNum")}
            className="text-xs font-light border border-[#DADCE0] px-3 py-2 rounded-lg w-full mt-3"
          />
        </div>

        <button
          type="submit"
          className="w-full text-white bg-[#0B1B2B] text-xs rounded-lg py-4 mt-12 "
        >
           {loading ? 'Processing...' : 'Send Invite '}
        </button>
      </form>
    </section>
  );
};

export default InviteParent;
