import Pagination from "../../../../components/ui/Pagination";
import { useEffect, useState } from "react";
import GenderDropdown from "../../../../components/ui/GenderDroptown";
import ParentService from "../../../../services/api/parent.service";
import { toast } from "react-toastify";
import CustomDropdown from "../../../../components/ui/CustomDropdown";
import {
  getPPlayerData,
  newFormatDate,
} from "../../../../components/custom-hooks";
import totalStudents from "../../../../assets/icons/totalStudents.svg";
import classesAttended from "../../../../assets/icons/classesAttended.svg";
import classesMixed from "../../../../assets/icons/classesMixed.svg";
import activeCohorts from "../../../../assets/icons/activeCohorts.svg";
import AgeDropdown from "../../../../components/ui/AgeDropdown";

const headingData = [
  "First Name",
  "Last Name",
  "Age",
  "Cohort",
  "Program",
  "Date Added",
  "Reg. Status",
  "Action",
];

const ParentDashboard = () => {
  // const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [check, setCheck] = useState<boolean>(false);
  const itemsPerPage = 7;
  const parentService = new ParentService();
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    age: 0,
    gender: "male",
  };

  type Item = {
    key: string;
    value: any;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [title, setTitle] = useState<any>(null);
  const [program, setProgram] = useState<Item[]>([]);
  const [dayTime, setDayTime] = useState<any>([]);
  const [invite, setInvite] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [children, setChildren] = useState<any>([]);
  const [childInfo, setChildInfo] = useState<any>([]);
  const [formData, setFormData] = useState(initialValues);
  const [dayArr, setDayArr] = useState<{ name: string; value: number }[] | []>(
    []
  );
  const [selectedDay, setSelectedDay] = useState<{
    name: string;
    value: number;
  } | null>(null);
  const [timeArr, setTimeArr] = useState<
    { name: string; value: number }[] | []
  >([]);
  const [selectedTime, setSelectedTime] = useState<{
    name: string;
    value: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [cohortId, setCohortId] = useState(0);
  const [cohortArr, setCohortArr] = useState<
    { name: string; value: number }[] | []
  >([]);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
  };

  const parent = getPPlayerData();

  // load all available days and their corresponding time for BE
  const getDayTime = async () => {
    try {
      const response = await parentService.getDayTime();
      if (!response.status) {
        toast.error(response.message);
        return;
      }
      setDayTime(response.data);
      // dispatch(setDayTimeInfo(response.data))

      const responseCohort = await parentService.getCohort();
      if (!responseCohort.status) {
        toast.error(responseCohort.message);
        return;
      }
      setCohortArr(responseCohort.data);

      let xdayArr = [];
      if (response?.data?.length > 0) {
        // extracted dayText and day values and saved them as 'name' and 'value' respectively for ease of use in the custom dropdown component
        for (let i = 0; i < response.data.length; i++) {
          let name = response.data[i].dayText;
          let value = response.data[i].day;
          let dx = { name, value };
          xdayArr.push(dx);
        }
        setDayArr(xdayArr);
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
    return false;
  };

  const getDashboardData = async () => {
    const response = await parentService.getParentDashboardData();
    if (!response.status) {
      toast.error(response.message);
      return;
    }
    setChildren(response.data.children);
    setData(response.data);
  };

  const getInvite = async () => {
    const response = await parentService.getParentInvite();
    if (!response.status) {
      toast.error(response.message);
      return;
    }
    setInvite(response.data);
  };

  useEffect(() => {
    if (invite?.kidsNum > data?.totalChild) {
      if (!check) {
        setCheck(true);
        setIsModalOpen(true);
      }
    }
  }, [invite, data]);

  useEffect(() => {
    getDayTime();
    getDashboardData();
    getInvite();
  }, []);

  useEffect(() => {
    if (childInfo.age) {
      getPackages();
    }
  }, [childInfo.age]);

  useEffect(() => {
    if (selectedDay) {
      const timeX = dayTime?.filter(
        (item: any) => item.dayText === selectedDay.name
      );
      const tdx = timeX[0].times;
      // extracted timeText and time values and saved them as 'name' and 'value' respectively for ease of use in the custom dropdown component
      let arr = [];
      for (let i = 0; i < tdx.length; i++) {
        let name = tdx[i].timeText;
        let value = tdx[i].time;
        let _dy = { name, value };
        arr.push(_dy);
      }
      setTimeArr(arr);
    }
  }, [selectedDay]);

  const getPackages = async () => {
    setLoading(true);
    try {
      const response = await parentService.getAllPackages();
      setLoading(false);
      if (!response.status) {
        toast.error(response.message);
        return;
      }
      const programFilter = response?.data?.filter(
        (item: any) =>
          item.minAge <= childInfo.age &&
          item.maxAge >= childInfo.age &&
          item?.level === 1
      );
      //const programFilter = response?.data?.filter((item: any) => (item.minAge <= childInfo.age) && (item.maxAge >= childInfo.age) && (item?.level === 1));
      if (programFilter?.length > 0) {
        setSelected(programFilter[0]?.id);
      }
      setTitle(programFilter[0]?.title);
      const availableProgram: Item[] = [
        {
          key: "Scheme",
          value: programFilter[0]?.description,
        },
        {
          key: "Age Range",
          value: `${programFilter[0]?.minAge} years - ${programFilter[0]?.maxAge} years`,
        },
        {
          key: "Duration",
          value: `${programFilter[0]?.weekDuration} Weeks`,
        },
      ];

      setProgram(availableProgram);
    } catch (err: any) {
      setLoading(false);
      toast.error(err?.message);
      return;
    }
    return false;
  };

  const handleNext = async (e: any) => {
    e.preventDefault();
    if (
      !selectedDay ||
      !selectedTime ||
      !selectedTime ||
      !formData.age ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.gender
    ) {
      toast.error("All input field is required!");
    } else {
      setIsFadingOut(true);

      setTimeout(() => {
        setIsSubmitted(true);
        setIsFadingOut(false);
      }, 300);

      const childData = {
        ...formData,
        selectedDay,
        selectedTime,
        cohortId,
      };
      setChildInfo(childData);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    handleAddChild();
  };

  const handleAddChild = async () => {
    if (!selectedDay || !selectedTime || !cohortId) {
      toast.error("Date, time, and cohort is required!");
      return;
    }
    setLoading(true);
    try {
      const response = await parentService.addChild(formData);
      setLoading(false);
      if (!response.status) {
        toast.error(response.message);
        return;
      } else {
        handleAddProgram(response?.data.id);
      }
    } catch (err: any) {
      setLoading(false);
      toast.error(err.mesage);
    }

    // return false;
  };

  const handleAddProgram = async (childId: any) => {
    //console.log(selected);
    if (selected) {
      const packageId = selected;
      const timeOffset = 1;
      const payload = {
        packageId,
        timeOffset,
        day: selectedDay?.value,
        time: selectedTime?.value,
        level: 1,
        cohortId: childInfo?.cohortId,
      };
      try {
        const response = await parentService.addProgram(
          payload,
          childId,
          parent?.partnerData.id
        );

        if (!response.status) {
          toast.error(response.message);
          return;
        }
        toast.success("Child added successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (err: any) {
        toast.error(err.message);
      }
    }
    // return false;
  };

  const parentKeyMetrics = [
    {
      icon: totalStudents,
      info: "All Program",
      value: data.allPrograms ? data.allPrograms : 0,
    },
    {
      icon: classesAttended,
      info: "Total Child Enrolled",
      value: data.totalChild ? data.totalChild + "/" + invite?.kidsNum : 0,
    },
    {
      icon: classesMixed,
      info: "Ongoing Class",
      value: data.allOngoingClass ? data.allOngoingClass : 0,
    },
    {
      icon: activeCohorts,
      info: "Completed Programs",
      value: data.completedPrograms ? data.completedPrograms : 0,
    },
    {
      icon: activeCohorts,
      info: "Total Child (Allowed)",
      value: invite.kidsNum ? invite.kidsNum : 0,
    },
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = children?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section className="my-20 mx-32">
      <div className="flex items-center justify-between text-xs">
        <p className="text-[#344054] text-base font-light">
          Welcome, {parent.parent.firstName + " " + parent.parent.lastName} ({" "}
          {parent.partnerData.organizationName} )!
        </p>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleClick}
            disabled={data.totalChild < invite.kidsNum ? false : true}
            className="text-white bg-[#0B1B2B] rounded-md py-2 px-8"
          >
            Add Child
          </button>

          <button
            onClick={() => {
              //clear session
              if (confirm("Do you really want to logout ?")) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="text-white bg-[red] rounded-md py-2 px-8"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mt-10">
        <p>Key Metrics and Information</p>
        <ul className="mt-5 flex items-center justify-between">
          {parentKeyMetrics.map((metric, i) => {
            return (
              <li key={i} className="flex items-center space-x-3">
                <img src={metric.icon} alt={metric.info} />
                <div>
                  <p className="text-[#5E5E5E] text-xs">{metric.info}</p>
                  <p className="text-[#202020] text-lg  mt-1 ">
                    {metric.value}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-12">
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
                    <tr key={i} className="">
                      <td className="px-5 py-5 font-light text-sm  bg-white border-b border-gray-200">
                        {data.firstName}
                      </td>
                      <td className="px-5 py-5 font-light text-sm bg-white border-b border-gray-200">
                        {data.lastName}
                      </td>
                      <td className="px-5 py-5 font-light text-sm bg-white border-b border-gray-200">
                        {data.age}
                      </td>
                      <td className="px-5 py-5 font-light text-sm bg-white border-b border-gray-200">
                        {data?.programs[0]?.partner_cohort?.title}
                      </td>
                      <td className="px-5 py-5 font-light text-sm bg-white border-b border-gray-200">
                        {data?.programs[0]?.partner_package?.title}
                      </td>
                      <td className="px-5 py-5 font-light text-sm bg-white border-b border-gray-200">
                        {newFormatDate(data.createdAt)}
                      </td>
                      <td className="px-5 py-5 font-light text-sm bg-white border-b border-gray-200">
                        {data.status ? "Completed" : "Pending"}
                      </td>
                      <td className="px-5 py-5 font-light text-xs border-b border-gray-200 text-[#1671D9] ">
                        <a href="http://google.com" target="blank">
                          Go to Class
                        </a>
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
                      totalItems={children.length}
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

      {/* Modal */}
      {/* Modal Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-40"
          onClick={closeModal}
        ></div>
      )}

      {/* Modal */}
      <div
        className={`fixed top-0 right-0 h-full  bg-white z-50 transform transition-transform duration-300 ${
          isModalOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-4 text-black font-bold"
          onClick={closeModal}
        >
          X
        </button>

        {/* Modal Content */}
        <section className="my-20 mx-16 w-[346px]">
          <h3 className="text-2xl font-semibold mt-8">
            Register Child ({data.totalChild + " / " + invite.kidsNum})
          </h3>
          <p className="font-light mt-2">
            Fill the form below to register your child
          </p>

          {!isSubmitted ? (
            <form
              onSubmit={handleNext}
              className={`transition-opacity duration-300 ${
                isFadingOut ? "opacity-0" : "opacity-100"
              }`}
            >
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
                    onChange={(e: any) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="lastName"
                    className="text-xs font-light block mt-4"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Enter last name"
                    className="text-xs font-light border border-[#DADCE0] px-3 py-3 rounded-lg w-full mt-3"
                    onChange={(e: any) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex items-center justify-between space-x-8">
                <div className="w-full">
                  <label
                    htmlFor="gender"
                    className="text-xs font-light block mt-4"
                  >
                    Gender*
                  </label>
                  <GenderDropdown
                    defaultValue="male"
                    onChange={(e: any) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="childAge"
                    className="text-xs font-light block mt-4"
                  >
                    Child Age*
                  </label>
                  <AgeDropdown
                    defaultValue="7"
                    onChange={(v: any) => setFormData({ ...formData, age: v })}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lessonDay"
                  className="text-xs font-light block mt-4"
                >
                  Lesson Day*
                </label>
                <CustomDropdown
                  handleChange={(data: { name: string; value: number }) =>
                    setSelectedDay(data)
                  }
                  data={dayArr}
                />
              </div>
              <div>
                <label
                  htmlFor="lessonTime"
                  className="text-xs font-light block mt-4"
                >
                  Lesson Time*
                </label>
                <CustomDropdown
                  handleChange={(data: { name: string; value: number }) =>
                    setSelectedTime(data)
                  }
                  data={timeArr}
                />
              </div>

              {/* available cohort  */}
              <div>
                <div>
                  <label className="text-xs font-light block mt-4">
                    Choose Cohort
                  </label>
                  <select
                    className="text-xs font-light border border-[#DADCE0] px-3 py-3 rounded-lg w-full mt-3"
                    onChange={(e: any) => {
                      setCohortId(Number(e.target.value));
                    }}
                  >
                    <option value={0}>--Choose Cohort--</option>
                    {cohortArr &&
                      cohortArr.map((d: any, i: number) => (
                        <option key={i} value={d.id}>
                          {d.title}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <button
                className="w-full text-xs rounded-lg text-white bg-[#0B1B2B] py-4 mt-9"
                type="submit"
              >
                Next
              </button>
            </form>
          ) : (
            <section className="my-20 text-[#202020]">
              <p className="font-light mt-2 text-[#667185]">
                Available Program
              </p>
              <h1 className="text-3xl font-semibold mt-2">{title}</h1>

              <div className="grid grid-cols-3 gap-8 mt-10">
                {program.map((each, i) => {
                  return (
                    <div key={i}>
                      <p>{each.key}</p>
                      <p className="text-[#5E5E5E] text-sm">{each.value}</p>
                    </div>
                  );
                })}
              </div>

              <div className="w-full flex items-center justify-between space-x-5 mt-24">
                <button
                  onClick={closeModal}
                  className="w-full bg-white border border-[#202020] rounded-lg text-sm py-3"
                >
                  Cancel
                </button>
                <button
                  className=" w-full bg-[#202020] text-sm rounded-lg text-white py-3"
                  onClick={handleSubmit}
                >
                  {loading ? "Processing..." : "Submit"}
                </button>
              </div>
            </section>
          )}
        </section>
      </div>
    </section>
  );
};

export default ParentDashboard;
