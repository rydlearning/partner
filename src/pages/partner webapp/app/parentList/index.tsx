import AppLayout from "../../../../components/layouts/AppLayout";
// import { parentListData } from "../../../../utils/constants";
// import filter from "../../../../assets/icons/filter.svg";
// import download from "../../../../assets/icons/download.svg";
import search from "../../../../assets/icons/search.svg";
import { useEffect, useState } from "react";
import Pagination from "../../../../components/ui/Pagination";
import PartnerService from "../../../../services/api/partner.service";
import { toast } from "react-toastify";
import { newFormatDate } from "../../../../components/custom-hooks";
import { Link } from "react-router-dom";

const headingData = [
  "Parent Name",
  "Phone Number",
  "Email Address",
  "No. of Children",
  "Cohort Joined",
  "Date Joined",
  "Action",
];

const ParentList = () => {
  const partnerService = new PartnerService();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [parents, setParents] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const itemsPerPage = 10;
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getParents();
  }, []);

  const getParents = async () => {
    const response = await partnerService.allPartnerParent();
    if (!response.status) {
      toast.error(response.message);
      return;
    }
    setParents(response.data);
    setFilterData(response.data);
  };

  const disableParents = async (id:any) => {
    const response = await partnerService.disableParent(id);
    if (!response.status) {
      toast.error(response.message);
      return;
    }
    toast.success("Parent disabled successfully");
    getParents()
  };

  const enableParents = async (id:any) => {
    const response = await partnerService.enableParent(id);
    if (!response.status) {
      toast.error(response.message);
      return;
    }
    toast.success("Parent enabled successfully");
    getParents()
  };

  function filterTableData(data: any, searchTerm: string) {
    return data.filter((person: any) => {
      const searchText = searchTerm.toLowerCase();
      return (
        person.firstName.toLowerCase().includes(searchText) ||
        person.lastName.toLowerCase().includes(searchText) ||
        person.email.toLowerCase().includes(searchText)
      );
    });
  }

  useEffect(() => {
    if (searchTerm) {
      setFilterData(filterTableData(parents, searchTerm));
    } else {
      setFilterData(parents);
    }
  }, [searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <AppLayout>
      <div className="flex items-center justify-between">
        <div className="mt-12">
          <p className="text-[#202020] font-semibold text-lg">
            Registered Parents
          </p>
          <p className="text-[#5E5E5E] text-sm">
            This is a list of all parents under you
          </p>
        </div>
        {/* <button className="text-white bg-[#0B1B2B] rounded-lg text-xs py-2 px-4">
          Message All Parents
        </button> */}
      </div>

      <div className="flex justify-between items-center mt-12">
        <div className="relative">
          <input
            type="search"
            placeholder="Search..."
            className="border border-[#DADCE0] rounded-md outline-none text-xs pl-10 w-[250px] py-2"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={search} alt="search" className="absolute top-2 left-3" />
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

      {/* table  */}
      <div className="mt-12">
        <div className=" border rounded-lg">
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
              {filterData.length > 0 ? (
                <>
                  {" "}
                  {currentItems.map((data: any, i: number) => {
                    return (
                      <tr key={i} className="bg-white ">
                        <td className="px-5 py-5 font-light text-sm  bg-white border-b border-gray-200">
                          <p className="whitespace-nowrap">
                            {data.firstName + " " + data.lastName}
                          </p>
                        </td>
                        <td className="px-5 py-5 font-light text-sm  bg-white border-b border-gray-200">
                          {data.phone}
                        </td>
                        <td className="px-5 py-5 font-light text-sm  bg-white border-b border-gray-200 whitespace-nowrap">
                          {data.email}
                        </td>
                        <td className="px-5 py-5 font-light text-sm  bg-white border-b border-gray-200">
                          {data.children.length}
                        </td>
                        <td className="px-5 py-5 font-light text-sm  bg-white border-b border-gray-200">
                          {data?.children[data.children.length - 1]?.programs[0]
                            ?.partner_cohort?.title || "Not Joined"}
                        </td>
                        <td className="px-5 py-5 font-light text-sm  bg-white border-b border-gray-200">
                          {newFormatDate(data.createdAt)}
                        </td>
                        {data?.children?.length > 0 ? (
                          <>
                            <td className="px-3 py-5 bg-white  border-b border-gray-200 cursor-pointer">
                              <Link
                                to={`/partner/parent/${data.id}/${
                                  data?.children[data.children.length - 1]
                                    ?.programs[0]?.partner_cohort.id
                                }`}
                              >
                                <button className="text-sm text-[#1671D9] bg-white">
                                  View
                                </button>
                              </Link>
                                  {data.status ?
                                    <a
                                    href="#"
                                        className="px-4 text-sm text-[red] bg-white"
                                        onClick={() => {
                                          if (confirm("Do you really want to DISABLE " + data?.firstName+" "+data?.lastName + " ?")) {
                                            disableParents(data.id)
                                          }
                                        }}
                                        id="manage"
                                    >
                                      <span className="">Restrict Account</span>
                                    </a> : <a href="#"
                                                 className="px-4 text-sm text-[green] bg-white"
                                                 onClick={() => {
                                                   if (confirm("Do you really want to ENABLE " + data?.firstName +" "+data?.lastName + " ?")) {
                                                     enableParents(data.id)
                                                   }
                                                 }}>
                                      Remove Restriction</a>}
                            </td>
                          </>
                        ) : (
                          <td className="px-5 py-5 bg-white  border-b border-gray-200 cursor-pointer">
                            <button className="text-sm text-[red] bg-white">
                              No Programs
                            </button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </>
              ) : (
                <tr className="text-center">
                  <td className="py-4 px-4" colSpan={7}>
                    No data found
                  </td>
                </tr>
              )}
            </tbody>

            <tfoot className="bg-white ">
              <tr className="bg-white ">
                <td
                  colSpan={headingData.length}
                  className="px-5 py-5 text-sm bg-white border-b border-gray-200"
                >
                  <Pagination
                    totalItems={filterData.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    paginate={paginate}
                    title={"Parents"}
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default ParentList;
