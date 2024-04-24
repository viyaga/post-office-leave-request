import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaBaby } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { PiFlagPennantFill } from "react-icons/pi";
import { MdDateRange, MdLocalLibrary, MdOutlineMoneyOffCsred, MdOutlinePendingActions, MdPerson } from "react-icons/md";
import moment from "moment";
import { textCapitalize } from "./services";

const menu = [
  {
    id: 1,
    title: "Leave Portal",
    listItems: [
      {
        id: 1,
        title: "Pending",
        url: "/dashboard/",
        icon: <MdOutlinePendingActions size={18} />,
      },
      {
        id: 2,
        title: "Paid",
        url: "/dashboard/data-page?cat=paid leave",
        icon: <FaMoneyCheckDollar size={18} />,
      },
      {
        id: 3,
        title: "Training",
        url: "/dashboard/data-page?cat=training",
        icon: <MdLocalLibrary size={18} />,
      },
      {
        id: 4,
        title: "LWA",
        url: "/dashboard/data-page?cat=lwa",
        icon: <MdOutlineMoneyOffCsred size={20} />,
      },
      {
        id: 5,
        title: "Maternity",
        url: "/dashboard/data-page?cat=maternity",
        icon: <FaBaby size={18} />,
      },
      {
        id: 6,
        title: "SGA",
        url: "/dashboard/data-page?cat=stop gap arrangement",
        icon: <PiFlagPennantFill size={18} />,
      },
    ],
  },
  {
    id: 2,
    title: "Employees",
    listItems: [
      {
        id: 1,
        title: "Regular",
        url: "/dashboard/employee/regular",
        icon: <MdPerson size={18} />,
      },
      {
        id: 2,
        title: "Substitute",
        url: "/dashboard/employee/substitute",
        icon: <BsFillPersonLinesFill size={18} />,
      },
    ],
  },
  {
    id: 3,
    title: "Holidays",
    listItems: [
      {
        id: 1,
        title: "Holidays",
        url: "/dashboard/holidays",
        icon: <MdDateRange size={18} />,
      },
    ],
  },
];

const regularEmployeeColumns = [
  { field: "id", headerName: "S.No.", width: 90, filterable: false },
  { field: "name", type: "string", headerName: "Name", width: 250, valueFormatter: (params) => textCapitalize(params) },
  { field: "designation", type: "string", headerName: "Designation", width: 150, valueFormatter: (params) => params.toUpperCase() },
  { field: "officeName", type: "string", headerName: "Office Name", width: 180, valueFormatter: (params) => textCapitalize(params) },
];

const substituteEmployeeColums = [
  { field: "id", headerName: "S.No.", width: 90, filterable: false },
  { field: "name", type: "string", headerName: "Name", width: 250, valueFormatter: (params) => textCapitalize(params) },
  { field: "accountNo", type: "string", headerName: "Account Number", width: 250 },
];

const leaveDataColums = [
  { field: "id", headerName: "S.No.", width: 90, filterable: false },
  { field: "name", type: "string", headerName: "Name", width: 200, valueFormatter: (params) => textCapitalize(params) },
  {
    field: "designation", type: "string", headerName: "Designation", width: 120,
    valueFormatter: (params) => {
      let designation = params.toUpperCase()
      if (params.split(' ')[0] === 'dak') {
        designation = "DAK SEVAK"
      }
      return designation
    }
  },
  { field: "officeName", type: "string", headerName: "Office Name", width: 180, valueFormatter: (params) => textCapitalize(params) },
  { field: "from", type: "Date", headerName: "From", width: 120, valueFormatter: params => moment(params).format("DD/MM/YYYY") },
  { field: "to", type: "Date", headerName: "To", width: 100, valueFormatter: params => moment(params).format("DD/MM/YYYY") },
  { field: "days", type: "number", headerName: "Days", width: 100 },
  { field: "substituteName", type: "string", headerName: "Substitute Name", width: 200, valueFormatter: params => textCapitalize(params) },
  { field: "accountNo", type: "string", headerName: "Account Number", width: 160 },
  { field: "remarks", type: "string", headerName: "Remarks", width: 200, valueFormatter: params => textCapitalize(params) },
]

const HolidayColums = [
  { field: "id", headerName: "S.No.", width: 90, filterable: false },
  { field: "holiday", type: "string", headerName: "Holiday", width: 200, valueFormatter: (params) => textCapitalize(params) },
  { field: "date", type: "string", headerName: "Date", width: 100, valueFormatter: (params) => moment(params).format('DD/MM/YYYY') },
];

const designationOptions = ['BPM', 'ABPM', 'ABPM I', 'ABPM II', 'DAK SEVAK', 'DAK SEVAK I', 'DAK SEVAK II', 'DAK SEVAK III', 'DAK SEVAK IV', 'DAK SEVAK V', 'DAK SEVAK VI', 'DAK SEVAK VII', 'DAK SEVAK VIII', 'DAK SEVAK IX', 'DAK SEVAK X']

const subDivisionOptions = ['Tirumangalam']

export {
  menu, regularEmployeeColumns, substituteEmployeeColums, leaveDataColums,
  HolidayColums, designationOptions, subDivisionOptions
}
