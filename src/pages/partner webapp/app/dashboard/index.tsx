import AppLayout from "../../../../components/layouts/AppLayout";
// import rightArrow from "../../../../assets/icons/rightArrow.svg";
import copy from "../../../../assets/icons/Copy.svg";
import Pagination from "../../../../components/ui/Pagination";
import {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import PartnerService from "../../../../services/api/partner.service";
import {
    getPlayerData,
    newFormatDate,
} from "../../../../components/custom-hooks";
import totalStudents from "../../../../assets/icons/totalStudents.svg";
import totalDebt from "../../../../assets/icons/totalDebt.svg";
import inactiveStudents from "../../../../assets/icons/inactiveStudents.svg";
import activeStudents from "../../../../assets/icons/activeStudents.svg";
import {
    calculateDiscountedAmount,
    totalCohortChild,
    totalCohortParent, useRateCal, useThousand,
} from "../../../../components/custom-hooks/userInfo";
import webBaseUrl from "../../../../hook/WebNetwork";
import {Link} from "react-router-dom";

const Dashboard = () => {
    const headingData = [
        "Cohort Name",
        "Start Date",
        "End  Date",
        "Enrolled Students",
        "No of parents",
        "Status",
        "Action",
    ];
    const partnerService = new PartnerService();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentCohortData, setCurrentCohortData] = useState([]);
    const [data, setData] = useState<any>([]);
    const itemsPerPage = 10;
    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
    const partner = getPlayerData();

    const getCohort = async () => {
        const response = await partnerService.allPartnerCohort();
        if (!response.status) {
            toast.error(response.message);
            return;
        }
        //filter cohort before my account
        const pDate = new Date(partner.createdAt)
        pDate.setHours(0, 0, 0, 0)
        pDate.setDate(1)
        //filter cohorts
        const cd = response.data.cohort
        .filter((f:any) => {
            const dd = new Date(f.createdAt)
            dd.setDate(1)
            dd.setHours(0, 0, 0, 0)
            return dd>=pDate
        })
        setCurrentCohortData(cd);
        setData(response.data);
    };

    useEffect(() => {
        getCohort();
    }, []);

    const inputRef = useRef<HTMLInputElement>(null);

    const keyMetrics = [
        {
            icon: totalStudents,
            info: "Total Students Enrolled",
            value: data.totalStudent ? data.totalStudent : 0,
        },
        {
            icon: activeStudents,
            info: "Active Enrolled  Students",
            value: data.activeStudent ? data.activeStudent : 0,
        },
        {
            icon: inactiveStudents,
            info: "Inactive Students",
            value: data.inActiveStudent ? data.inActiveStudent : 0,
        },
        {
            icon: totalDebt,
            info: "Total Debt",
            value: data.debt ? partner?.rate?.currencyCode + useThousand(useRateCal(calculateDiscountedAmount(data?.debt, partner.discount), partner?.rate?.rate)) : 0,
        },
    ];

    const handleCopy = () => {
        if (inputRef.current) {
            inputRef.current.select();
            document.execCommand("copy");
        }
        toast.success("Partner invite link copied successfully!");
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = currentCohortData?.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    return (
        <AppLayout>
            <section className="mt-10">
                <div className="flex items-center justify-between text-xs">
                    <p className="text-[#344054] text-base font-light">
                        Welcome, {partner.firstName + " " + partner.lastName}!
                    </p>
                    <div className="flex items-center space-x-4">
                        {/* <button className="text-[#0B1B2B] bg-white rounded-md border border-[#0B1B2B] py-2 px-4 ">
              Manage Cohorts
            </button> */}
                        <a href="/partner/invite-parent">
                            <button className="text-white bg-[#0B1B2B] rounded-md py-2 px-4">
                                Invite Parents
                            </button>
                        </a>
                    </div>
                </div>
                <div className="mt-10">
                    <p>Key Metrics and Information</p>
                    <ul className="mt-7 flex items-center justify-between">
                        {keyMetrics.map((metric, i) => {
                            return (
                                <li key={i} className="flex items-center space-x-3">
                                    <img src={metric.icon} alt={metric.info}/>
                                    <div>
                                        <p className="text-[#5E5E5E] text-xs">{metric.info}</p>
                                        <p className="text-[#202020] text-lg font-medium mt-1">
                                            {metric.value}
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="flex justify-between items-center mt-16">
                    <div>
                        <p className="text-xl font-medium">Current Cohorts</p>
                        <p className="mt-2 font-light text-[#5E5E5E] text-sm">
                            A list of all available cohort
                        </p>
                    </div>

                    {/*<div className="flex items-center space-x-2">*/}
                    {/*  <p className="font-light"></p>*/}
                    {/*  <img src={rightArrow} alt="" />*/}
                    {/*</div>*/}
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
                            {currentItems.map((data: any, i: number) => {
                                return (
                                    <tr key={i} className="bg-white ">
                                        <td className="px-5 py-5 font-light text-sm  bg-white border-b border-gray-200">
                                            {data.title}
                                        </td>
                                        <td className="px-5 py-5 font-light text-sm bg-white border-b border-gray-200">
                                            {newFormatDate(data.startDate)}
                                        </td>
                                        <td className="px-5 py-5 font-light text-sm bg-white border-b border-gray-200">
                                            {newFormatDate(data.endDate)}
                                        </td>
                                        <td className="px-5 py-5 font-light text-sm bg-white border-b border-gray-200">
                                            {totalCohortChild(data.partner_programs,partner.id)}
                                        </td>
                                        <td className="px-5 py-5 font-light text-sm bg-white border-b border-gray-200">
                                            {totalCohortParent(data.partner_programs,partner.id)}
                                        </td>
                                        <td className="pl-5 pr-14 py-5 font-light text-xs border-b border-gray-200 ">
                                            {data.status ? (
                                                <p className=" bg-custom-yellow  font-normal text-yellow-600 text-center p-1 rounded-2xl">
                                                    Ongoing
                                                </p>
                                            ) : (
                                                <p className=" bg-[#E7F6EC] font-normal text-[#0F973D] text-center p-1 rounded-2xl">
                                                    Completed
                                                </p>
                                            )}
                                        </td>
                                        {data?.partner_programs?.length > 0 ? (
                                            <>
                                                <Link
                                                    to={`/partner/cohort/${data.id}`}
                                                >
                                                    <td className="px-5 py-5 bg-white  border-b border-gray-200 cursor-pointer">
                                                        <button className="text-sm text-[#1671D9] bg-white">
                                                            View
                                                        </button>
                                                    </td>
                                                </Link>
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
                            </tbody>

                            <tfoot>
                            <tr>
                                <td
                                    colSpan={headingData.length}
                                    className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <Pagination
                                        totalItems={currentCohortData.length}
                                        itemsPerPage={10}
                                        currentPage={currentPage}
                                        paginate={paginate}
                                        title="Cohorts"
                                    />
                                </td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div className="mt-16">
                    <p>Partner Link</p>
                    <form className="mt-3">
                        <div className="inline relative">
                            <input
                                type="text"
                                readOnly
                                ref={inputRef}
                                value={`${webBaseUrl()}/partner/parent/register?partnerID=${
                                    partner ? partner.id + 100 : ""
                                }`}
                                className="text-[#A8518A] bg-[#FFF5FB] placeholder:text-[#A8518A] border-[0.5px] border-[#A8518A] rounded-md mr-2 px-2 w-[500px] text-xs py-2"
                            />
                            <img
                                src={copy}
                                alt="copy"
                                className="absolute right-3 top-[0.1px] cursor-pointer"
                                onClick={handleCopy}
                            />
                        </div>
                        <button
                            className="text-[#0B1B2B] text-xs bg-white rounded-md border border-[#0B1B2B] py-2 px-3 ">
                            Disable Link
                        </button>
                    </form>
                </div>
            </section>
        </AppLayout>
    );
};

export default Dashboard;
