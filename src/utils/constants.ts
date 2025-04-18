import dashboard from "../assets/icons/dashboard.svg";
import onDashboard from "../assets/icons/on.dashboard.svg";
import invoices from "../assets/icons/invoices.svg";
import onInvoices from "../assets/icons/on.invoices.svg";
import parentList from "../assets/icons/parentlist.svg";
import onParentList from "../assets/icons/on.parentlist.svg";
import { ParentListDataProps } from "./types";
import totalStudents from "../assets/icons/totalStudents.svg";
import totalDebt from "../assets/icons/totalDebt.svg";
import inactiveStudents from "../assets/icons/inactiveStudents.svg";
import activeStudents from "../assets/icons/activeStudents.svg";
import classesAttended from "../assets/icons/classesAttended.svg";
import classesMixed from "../assets/icons/classesMixed.svg";
import activeCohorts from "../assets/icons/activeCohorts.svg";

export const AppLinks = [
  {
    id: 0,
    name: "Dashboard",
    route: "/partner/dashboard",
    img: dashboard,
    activeImg: onDashboard,
  },
  {
    id: 1,
    name: "Parent List",
    route: "/partner/parent-list",
    img: parentList,
    activeImg: onParentList,
  },
  {
    id: 2,
    name: "Invoices",
    route: "/partner/invoices",
    img: invoices,
    activeImg: onInvoices,
  },
];

export const currentCohortData = [
  {
    data1: "Spring 2024 Scholarship Cohort",
    data2: "03/09/2024",
    data3: "01/09/2024",
    data4: "321",
    data5: "50",
    data6: "Ongoing",
  },
];

export const parentListData: ParentListDataProps[] = [
  {
    data1: "Black Berrie",
    data2: "08147511234",
    data3: "6lackberry@gmail.com",
    data4: "Spring 2024 School",
    data5: " 4",
    data6: "23/08/2024",
    data7: "view",
  },
  {
    data1: "Black Berrie",
    data2: "08147511234",
    data3: "6lackberry@gmail.com",
    data4: "Spring 2024 School",
    data5: "4",
    data6: "23/08/2024",
    data7: "view",
  },
  {
    data1: "Black Berrie",
    data2: "08147511234",
    data3: "6lackberry@gmail.com",
    data4: "Spring 2024 School",
    data5: "4",
    data6: "23/08/2024",
    data7: "view",
  },
  {
    data1: "Black Berrie",
    data2: "08147511234",
    data3: "6lackberry@gmail.com",
    data4: "Spring 2024 School",
    data5: "4",
    data6: "23/08/2024",
    data7: "view",
  },
  {
    data1: "Black Berrie",
    data2: "08147511234",
    data3: "6lackberry@gmail.com",
    data4: "Spring 2024 School",
    data5: "4",
    data6: "23/08/2024",
    data7: "view",
  },
  {
    data1: "Black Berrie",
    data2: "08147511234",
    data3: "6lackberry@gmail.com",
    data4: "Spring 2024 School",
    data5: "4",
    data6: "23/08/2024",
    data7: "view",
  },
  {
    data1: "Black Berrie",
    data2: "08147511234",
    data3: "6lackberry@gmail.com",
    data4: "Spring 2024 School",
    data5: "4",
    data6: "23/08/2024",
    data7: "view",
  },
];

export const allInvoices = [
  {
    data1: "INV-2024",
    data2: "Spring 2024 Sc...",
    data3: "304",
    data4: "$4,500",
    data5: "April 15, 2024",
    data6: "Not Paid",
    data7: "View Invoice",
  },
  {
    data1: "INV-2024",
    data2: "Spring 2024 Sc...",
    data3: "304",
    data4: "$4,500",
    data5: "April 15, 2024",
    data6: "Not Paid",
    data7: "View Invoice",
  },
  {
    data1: "INV-2024",
    data2: "Spring 2024 Sc...",
    data3: "304",
    data4: "$4,500",
    data5: "April 15, 2024",
    data6: "Not Paid",
    data7: "View Invoice",
  },
  {
    data1: "INV-2024",
    data2: "Spring 2024 Sc...",
    data3: "304",
    data4: "$4,500",
    data5: "April 15, 2024",
    data6: "Not Paid",
    data7: "View Invoice",
  },
];

export const parentDashboard = [
  {
    data1: "Ruth",
    data2: "Berry",
    data3: "12",
    data4: "23/08/2024",
    data5: "Completed",
    data6: "Go to Class",
  },
  {
    data1: "Mercy",
    data2: "Berry",
    data3: "8",
    data4: "23/08/2024",
    data5: "Completed",
    data6: "Go to Class",
  },
  {
    data1: "Ruth",
    data2: "Berry",
    data3: "12",
    data4: "23/08/2024",
    data5: "Completed",
    data6: "Go to Class",
  },
  {
    data1: "Mercy",
    data2: "Berry",
    data3: "8",
    data4: "23/08/2024",
    data5: "Completed",
    data6: "Go to Class",
  },
  {
    data1: "Ruth",
    data2: "Berry",
    data3: "12",
    data4: "23/08/2024",
    data5: "Completed",
    data6: "Go to Class",
  },
  {
    data1: "Mercy",
    data2: "Berry",
    data3: "8",
    data4: "23/08/2024",
    data5: "Completed",
    data6: "Go to Class",
  },
  {
    data1: "Ruth",
    data2: "Berry",
    data3: "12",
    data4: "23/08/2024",
    data5: "Completed",
    data6: "Go to Class",
  },
  {
    data1: "Mercy",
    data2: "Berry",
    data3: "8",
    data4: "23/08/2024",
    data5: "Completed",
    data6: "Go to Class",
  },
];

export const keyMetrics = [
  {
    icon: totalStudents,
    info: "Total Students Enrolled",
    value: "3,209",
  },
  {
    icon: activeStudents,
    info: "Active Enrolled  Students",
    value: "2,320",
  },
  {
    icon: inactiveStudents,
    info: "Inactive Students",
    value: "1,300",
  },
  {
    icon: totalDebt,
    info: "Total Debt",
    value: "₦810,774.00",
  },
];

export const parentKeyMetrics = [
  {
    icon: totalStudents,
    info: "Total Children Enrolled",
    value: "3,209",
  },
  {
    icon: classesAttended,
    info: "Total Classes Attended",
    value: "23",
  },
  {
    icon: classesMixed,
    info: "Total Classes Missed",
    value: "6",
  },
  {
    icon: activeCohorts,
    info: "Active Cohorts",
    value: "2",
  },
];

export const parentInfo = [
  {
    heading: "Personal Information",
    details: [
      {
        key: "Name",
        value: "Amara Onyeabuchi",
      },
      {
        key: "Email Address",
        value: "talktoasuquo@gmail.com",
      },
      {
        key: "Phone Number",
        value: "+234 (81) 47511 481",
      },
    ],
  },
  {
    heading: "Cohort Details",
    details: [
      {
        key: "Cohort Joined",
        value: "Spring Scholarship Cohort",
      },
      {
        key: "Start Date",
        value: "13/04/2024",
      },
      {
        key: "End Date",
        value: "13/04/2024",
      },
    ],
  },
  {
    heading: "Children’s Information",
    details: [
      {
        key: "Child 1",
        value: "Godwin Onyeabuchi",
      },
      {
        key: "Age",
        value: "10",
      },
      {
        key: "Grade",
        value: "5",
      },
    ],
  },
];

export const invoiceDetails = [
  {
    key: "Invoice Number",
    value: "INV-2024-0001",
  },
  {
    key: "Date Issued",
    value: "April 1, 2024",
  },
  {
    key: "Cohort",
    value: "Spring 2024 ",
  },
  {
    key: "No. of Students",
    value: "368",
  },
  {
    key: "Amount Due",
    value: "$4,500",
  },
  {
    key: "Due Date",
    value: "April 15, 2024",
  },
  {
    key: "Status",
    value: "Not Paid",
  },
];

export const availableProgram = [
  {
    key: "Scheme",
    value: "Basic Learning",
  },
  {
    key: "Age Range",
    value: "7 years - 11 years",
  },
  {
    key: "Duration",
    value: "8 Weeks",
  },
];
