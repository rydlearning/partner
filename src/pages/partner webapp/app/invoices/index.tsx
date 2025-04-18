import AppLayout from "../../../../components/layouts/AppLayout";
import filter from "../../../../assets/icons/filter.svg";
import download from "../../../../assets/icons/download.svg";
import search from "../../../../assets/icons/search.svg";
import { useEffect, useState } from "react";
import Pagination from "../../../../components/ui/Pagination";
import PartnerService from "../../../../services/api/partner.service";
import { toast } from "react-toastify";
import {
  formatDate,
  generateInvoiceId,
  newFormatDate,
} from "../../../../components/custom-hooks";
import { useNavigate } from "react-router-dom";
import {
  calculateDiscountedAmount,
  getPlayerData,
  setInvoiceData, useRateCal,
  useThousand
} from "../../../../components/custom-hooks/userInfo";

const headingData = [
  "Invoice ID",
  "Cohort",
  "No. of Students",
  "Amount Due",
  "Payable Amount",
  "Due Date",
  "Status",
  "Action",
];

const Invoices = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 7;
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const navigate = useNavigate();
  const partnerService = new PartnerService();
  const [invoice, setInvoice] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const partner = getPlayerData()
  const discount = partner.discount

  useEffect(() => {
    getInvoice();
  }, []);

  const getInvoice = async () => {
    const response = await partnerService.allPartnerInvoice();
    if (!response.status) {
      toast.error(response.message);
      return;
    }
    setInvoice(response.data);
    setFilterData(response.data);
  };

  function filterTableData(data: any, searchTerm: any) {
    return data.filter((each: any) => {
      const searchText = searchTerm.toLowerCase();
      return (
        each.cohortId.includes(searchText) ||
        each.cohort.title.toLowerCase().includes(searchText) ||
        each.dueDate.includes(searchText) ||
        String(each.totalAmount).includes(searchText)
      );
    });
  }

  useEffect(() => {
    if (searchTerm) {
      setFilterData(filterTableData(invoice, searchTerm));
    } else {
      setFilterData(invoice);
    }
  }, [searchTerm]);

  // console.log(invoiceId);

  const handleView = (e: any, data: any) => {
    e.preventDefault();
    const invoiceData = {
      invoiceId: generateInvoiceId(data.cohortId),
      cohort: data.cohort.title,
      all: data.count,
      amount: data.totalAmount,
      dueDate: formatDate(data.dueDate),
      cohortId: data.cohortId,
      issuedDate: formatDate(data.programs[0].createdAt),
    };

    setInvoiceData(invoiceData);
    navigate(`/partner/invoices/${data.cohortId}`);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <AppLayout>
      <div className="flex items-center justify-between">
        <div className="mt-12">
          <p className="text-[#202020] font-semibold text-lg">All Invoices</p>
          <p className="text-[#5E5E5E] text-sm">A summary of all invoices</p>
        </div>
        {/* <button className="text-white bg-[#0B1B2B] rounded-md text-xs py-2 px-4">
          Message All Parents
        </button> */}
      </div>

      <div className="flex justify-between items-center mt-12">
        <div className="relative">
          <input
            type="search"
            placeholder="Search....."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-[#DADCE0] rounded-md outline-none text-xs pl-10 w-[250px] py-2"
          />
          <img src={search} alt="search" className="absolute top-2 left-3" />
        </div>

        <div className="flex space-x-2 items-center">
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
        </div>
      </div>

      <div className="mt-10">
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
                    {currentItems.map((data: any, i: number) => {
                      return (
                        <tr key={i} className="bg-white ">
                          <td className="px-5 py-5 font-light text-sm  bg-white border-b border-gray-200">
                            {generateInvoiceId(data?.cohortId)}
                          </td>
                          <td className="px-5 py-5 font-light text-sm bg-white border-b border-gray-200">
                            {data?.cohort?.title}
                          </td>
                          <td className="px-5 py-5 font-light text-sm bg-white border-b border-gray-200">
                            {data?.count}
                          </td>
                          <td className="px-5 py-5 font-light text-sm bg-white border-b border-gray-200">
                            {partner?.rate?.currencyCode}{useThousand(useRateCal(data.totalAmount,partner?.rate?.rate))}
                          </td>
                          <td className="px-5 py-5 font-light text-sm bg-white border-b border-gray-200">
                            {partner?.rate?.currencyCode}{useThousand(useRateCal(calculateDiscountedAmount(data?.totalAmount, discount),partner?.rate?.rate))}
                          </td>
                          <td className="px-5 py-5 font-light text-sm bg-white border-b border-gray-200">
                            {newFormatDate(data?.dueDate)}
                          </td>
                          <td className="px-5 py-5 font-light text-xs text-[#F3A218]  bg-white border-b border-gray-200">
                            <p className="text-[#F3A218] bg-[#FEF6E7] text-center py-1 rounded-2xl">
                              Not paid
                            </p>
                          </td>
                          <td
                            className="pl-5 pr-14 py-5 font-light text-xs bg-white border-b border-gray-200 text-[#1671D9] cursor-pointer"
                            onClick={(e) => handleView(e, data)}
                          >
                            View invoice
                          </td>
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

              <tfoot>
                <tr>
                  <td
                    colSpan={headingData.length}
                    className="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  >
                    <Pagination
                      totalItems={filterData.length}
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      paginate={paginate}
                      title="Invoices"
                    />
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Invoices;
