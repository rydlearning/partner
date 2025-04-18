import AppLayout from "../../../../../components/layouts/AppLayout";
import arrow from "../../../../../assets/icons/rightArrorwHead.svg";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PartnerService from "../../../../../services/api/partner.service";
import { useParams } from "react-router-dom";
import { newFormatDate } from "../../../../../components/custom-hooks";

const ParentDetails = () => {
  const partnerService = new PartnerService();
  const [parent, setParent] = useState();
  const [cohort, setCohort] = useState();
  const [parentInfo, setparentInfo] = useState<TableData[] | undefined>([]);
  const [childrens, setChildrens] = useState([]);

  const { id, cid } = useParams();

  interface TableData {
    heading: string;
    details: { key: string; value: string }[];
  }

  useEffect(() => {
    getParents(id, cid);
  }, []);

  const getParents = async (id: any, cid: any) => {
    const response = await partnerService.partnerGetParent(id, cid);
    if (!response.status) {
      toast.error(response.message);
      return;
    }
    setParent(response.data.parent);
    setCohort(response.data.cohort);
    setChildrens(response.data.parent.children);
  };

  useEffect(() => {
    if (parent) {
      const parentData = info(parent, cohort);
      setparentInfo(parentData);
    }
  }, [parent]);

  const info = (parent: any, cohort: any) => {
    return [
      {
        heading: "Personal Information",
        details: [
          {
            key: "Name",
            value: `${parent.firstName} ${parent.lastName}`,
          },
          {
            key: "Email Address",
            value: `${parent.email}`,
          },
          {
            key: "Phone Number",
            value: `${parent.phone}`,
          },
        ],
      },
      {
        heading: "Cohort Details",
        details: [
          {
            key: "Cohort Joined",
            value: `${cohort ? cohort.title : " "}`,
          },
          {
            key: "Start Date",
            value: newFormatDate(cohort.startDate),
          },
          {
            key: "End Date",
            value: newFormatDate(cohort.endDate),
          },
        ],
      },
    ];
  };

  function getLastElement(array: any[]) {
    if (array.length === 0) {
      return null;
    }

    return array[array.length - 1].partner_package.title
  }

  return (
    <AppLayout>
      <section className="mt-5 w-[70%]">
        {parentInfo ? (
          <>
            <nav className="flex items-center space-x-2 text-[#858585] text-sm">
              <p>Parents List</p>
              <img src={arrow} alt="" />
              <p>Details</p>
            </nav>

            <div className="space-y-5 mt-14  text-sm">
              {parentInfo.map((info, i) => {
                return (
                  <div key={i} className="bg-white rounded-lg p-4">
                    <h4>{info.heading}</h4>
                    <ul className="grid grid-cols-3 gap-5 mt-4">
                      {info.details.map((d, i) => {
                        return (
                          <li key={i}>
                            <p>{d.key}</p>
                            <p className="text-[#5E5E5E] text-xs mt-1">
                              {d.value}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
              {childrens.length > 0 ? (
                <>
                  <div className="bg-white rounded-lg p-4">
                    <h4>Children’s Information</h4>
                    <ul className="grid grid-cols-3 gap-5 mt-4">
                      {childrens.map((d: any, i) => (
                        <>
                          <li key={i}>
                            <p>Child {i + 1}</p>
                            <p className="text-[#5E5E5E] text-xs mt-1">
                              {d.firstName + " " + d.lastName}
                            </p>
                          </li>
                          <li key={i}>
                            <p>Age</p>
                            <p className="text-[#5E5E5E] text-xs mt-1">
                              {d.age}
                            </p>
                          </li>
                          <li key={i}>
                            <p>Program</p>
                            <p className="text-[#5E5E5E] text-xs mt-1">
                              {getLastElement(d?.programs || [])}
                            </p>
                          </li>
                        </>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                " "
              )}
            </div>
          </>
        ) : (
          <>Loading.......</>
        )}
        <div className="flex justify-end mt-8">
          {/* <button className="text-white bg-black text-xs py-2 px-3 rounded-lg">
            Message Parent
          </button> */}
        </div>
      </section>
    </AppLayout>
  );
};

export default ParentDetails;
