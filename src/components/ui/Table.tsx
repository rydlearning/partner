import { useState } from "react";
import Pagination from "./Pagination";

const Table = ({ headingData, bodyData }: any) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalItems = 100;
  const itemsPerPage = 7;
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className=" border rounded-lg">
      <table className="min-w-full">
        <thead>
          <tr className="px-5 py-5 text-sm">
            {headingData.map((heading: any, i: number) => {
              return (
                <th
                  key={i}
                  className="px-5 py-[24px] text-sm text-left text-gray-800 capitalize bg-[#F9F9F9] border-b border-gray-200"
                >
                  {heading}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {bodyData.map((data: any, i: number) => {
            return (
              <tr key={i}>
                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <p className="whitespace-wrap text-[#5E5E5E]">{data.data1}</p>
                </td>
                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  {data.data2}
                </td>
                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  {data.data3}
                </td>
                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  {data.data4}
                </td>
                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  {data.data5}
                </td>
                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  {data.data6}
                </td>
                {data.data7 && (
                  <td className="px-5 py-5 text-sm text-[#1671D9] bg-white border-b border-gray-200">
                    {data.data7}
                  </td>
                )}
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
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                paginate={paginate}
                title=""
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
