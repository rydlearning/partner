import AppLayout from "../../../../components/layouts/AppLayout";
import arrow from "../../../../assets/icons/rightArrorwHead.svg";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PartnerService from "../../../../services/api/partner.service";
import { useParams } from "react-router-dom";
import { newFormatDate } from "../../../../components/custom-hooks";
import Pagination from "../../../../components/ui/Pagination";
import search from "../../../../assets/icons/search.svg";
import {
  formatDay,
  formatTime,
} from "../../../../components/custom-hooks/fetchTimezoneInfo";

const headingData = [
  "#",
  "P.Name",
  "C.Name",
  "Age",
  "Gender",
  "T.Name",
  "P.Title",
  "Level",
  "Time",
  "Day",
  "Status",
];

const CohortDetails = () => {
  const partnerService = new PartnerService();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 7;
  const [cohort, setCohort] = useState();
  const [cohortInfo, setcohortInfo] = useState<TableData[] | undefined>([]);
  const [programs, setPrograms] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterData, setFilterData] = useState([]);
  const { id } = useParams();

  interface TableData {
    heading: string;
    details: { key: string; value: string }[];
  }

  useEffect(() => {
    getCohorts(id);
  }, []);

  const getCohorts = async (id: any) => {
    const response = await partnerService.partnerGetCohort(id);
    if (!response.status) {
      toast.error(response.message);
      return;
    }
    setCohort(response.data);
    setPrograms(response.data.partner_programs);
    setFilterData(response.data.partner_programs);
  };

  useEffect(() => {
    if (cohort) {
      const cohortData = info(cohort);
      setcohortInfo(cohortData);
    }
  }, [cohort]);

  const info = (cohort: any) => {
    return [
      {
        heading: "Cohort Details",
        details: [
          {
            key: "Cohort",
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

  function filterTableData(data: any, searchTerm: string) {
    return data.filter((person: any) => {
      const searchText = searchTerm.toLowerCase();
      return (
        person?.child?.parent?.firstName.toLowerCase().includes(searchText) ||
        person?.child?.parent?.lastName.toLowerCase().includes(searchText) ||
        person?.child?.firstName.toLowerCase().includes(searchText) ||
        person?.child?.lastName.toLowerCase().includes(searchText) ||
        person?.child?.gender.toLowerCase().includes(searchText) ||
        person?.partner_teacher?.firstName.toLowerCase().includes(searchText) ||
        person?.partner_package?.title.toLowerCase().includes(searchText) ||
        person?.child?.gender.toLowerCase().includes(searchText)
      );
    });
  }

  useEffect(() => {
    if (searchTerm) {
      setFilterData(filterTableData(programs, searchTerm));
    } else {
      setFilterData(programs);
    }
  }, [searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <AppLayout>
      <section>
        {cohortInfo ? (
          <>
            <nav className="flex items-center space-x-2 text-[#858585] text-sm">
              <p>Dashboard </p>
              <img src={arrow} alt="" />
              <p>Cohort Details</p>
            </nav>

            <div className="space-y-5 mt-14  text-sm">
              {cohortInfo.map((info, i) => {
                return (
                  <section className="mt-5 w-[70%]">
                    <div key={i} className="bg-white rounded-lg p-4">
                      <h4>
                        <b>{info.heading}</b>
                      </h4>
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
                  </section>
                );
              })}

              <div className="mt-12">
                {/* table  */}
                <div className="mt-12">
                  <h1>
                    <b>Cohort Programs</b>
                  </h1>
                  <div className="flex justify-between items-center mt-3  mb-6">
                    <div className="relative">
                      <input
                        type="search"
                        placeholder="Search..."
                        className="border border-[#DADCE0] rounded-md outline-none text-xs pl-10 w-[250px] py-2"
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <img
                        src={search}
                        alt="search"
                        className="absolute top-2 left-3"
                      />
                    </div>

                    {/* <div className="flex space-x-6 items-center">
          <img
            src={filter}
            alt="filter"
            className="border border-[#DADCE0] rounded-md p-1"
          />
          <img
            src={download}
            alt="filter"
            className="border border-[#DADCE0] rounded-md p-1"
          />
        </div> */}
                  </div>
                  <div className=" border rounded-lg mt-4">
                    <table className="min-w-full">
                      <thead>
                        <tr className="px-5 py-5 border-b">
                          {headingData.map((heading: any, i: number) => {
                            return (
                              <th
                                key={i}
                                className="px-5 py-4 text-sm text-left text-gray-800 font-medium capitalize bg-[#F9F9F9]  border-gray-200"
                              >
                                {heading}
                              </th>
                            );
                          })}
                        </tr>
                      </thead>

                      <tbody>
                        {currentItems.map((program: any, i: number) => {
                          return (
                            <tr key={i} className="bg-white">
                              <td className="px-5 py-5 font-light text-sm  bg-white border-b border-gray-200">
                                {i + 1}
                              </td>
                              <td className="px-5 py-5 font-light text-sm bg-white border-b border-gray-200">
                                {program?.child?.parent?.firstName +
                                  " " +
                                  program?.child?.parent?.lastName}
                              </td>
                              <td className="px-5 py-5 font-light text-sm bg-white border-b border-gray-200">
                                {program?.child?.firstName +
                                  " " +
                                  program?.child?.lastName}
                              </td>
                              <td className="px-5 py-5 font-light text-sm bg-white border-b border-gray-200">
                                {program?.child?.age}
                              </td>
                              <td className="px-5 py-5 font-light text-sm bg-white border-b border-gray-200">
                                {program?.child?.gender}
                              </td>
                              <td className="px-5 py-5 font-light text-sm bg-white border-b border-gray-200">
                                {program?.partner_teacher?.firstName}
                              </td>
                              <td className="px-5 py-5 font-light text-sm bg-white border-b border-gray-200">
                                {program?.partner_package?.title}
                              </td>
                              <td className="px-5 py-5 font-light text-sm bg-white border-b border-gray-200">
                                {program?.partner_package?.level}
                              </td>
                              <td className="px-5 py-5 font-light text-sm bg-white border-b border-gray-200">
                                {formatTime(program?.time)}
                              </td>
                              <td className="px-5 py-5 font-light text-sm bg-white border-b border-gray-200">
                                {formatDay(program?.day)}
                              </td>
                              <td className="px-5 py-5 font-light text-xs border-b border-gray-200 ">
                                {program?.isPaid ? "Paid" : "Unpaid"}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>

                      <tfoot>
                        <tr>
                          <td
                            colSpan={headingData.length}
                            className="px-5 py-5 text-sm bg-white border-b border-gray-200"
                          >
                            <Pagination
                              totalItems={programs.length}
                              itemsPerPage={itemsPerPage}
                              currentPage={currentPage}
                              paginate={paginate}
                              title="Children"
                            />
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>Loading.......</>
        )}
        <div className="flex justify-end mt-8">
          {/* <button className="text-white bg-black text-xs py-2 px-3 rounded-lg">
            Message Cohort
          </button> */}
        </div>
      </section>
    </AppLayout>
  );
};

export default CohortDetails;
