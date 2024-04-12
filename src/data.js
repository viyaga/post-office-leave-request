import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaBaby } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { PiFlagPennantFill } from "react-icons/pi";
import { MdLocalLibrary, MdOutlineMoneyOffCsred, MdOutlinePendingActions, MdPerson } from "react-icons/md";
import moment from "moment";

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
        url: "/dashboard/data-page?type=leaves&&cat=Paid Leave",
        icon: <FaMoneyCheckDollar size={18} />,
      },
      {
        id: 3,
        title: "Training",
        url: "/dashboard/data-page?type=leaves&&cat=Training",
        icon: <MdLocalLibrary size={18} />,
      },
      {
        id: 4,
        title: "LWA",
        url: "/dashboard/data-page?type=leaves&&cat=Lwa",
        icon: <MdOutlineMoneyOffCsred size={20} />,
      },
      {
        id: 5,
        title: "Maternity",
        url: "/dashboard/data-page?type=leaves&&cat=Maternity",
        icon: <FaBaby size={18} />,
      },
      {
        id: 6,
        title: "Vacant Place",
        url: "/dashboard/data-page?type=leaves&&cat=Stop Gap Arrangement",
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
        url: "/dashboard/employee/regular?type=employees&&cat=regular",
        icon: <MdPerson size={18} />,
      },
      {
        id: 2,
        title: "Substitute",
        url: "/dashboard/employee/substitute?type=employees&&cat=substitute",
        icon: <BsFillPersonLinesFill size={18} />,
      },
    ],
  },
];

const regularEmployeeColumns = [
  { field: "id", headerName: "ID", width: 90, filterable: false },
  { field: "name", type: "string", headerName: "Name", width: 250 },
  { field: "designation", type: "string", headerName: "Designation", width: 150 },
  { field: "officeName", type: "string", headerName: "Office Name", width: 180 },
];

const substituteEmployeeColums = [
  { field: "id", headerName: "ID", width: 90, filterable: false },
  { field: "name", type: "string", headerName: "Name", width: 250 },
  { field: "accountNo", type: "string", headerName: "Account Number", width: 250 },
];

const leaveDataColums = [
  { field: "id", headerName: "S.No.", width: 90, filterable: false },
  { field: "name", type: "string", headerName: "Name", width: 200 },
  { field: "designation", type: "string", headerName: "Designation", width: 120 },
  { field: "officeName", type: "string", headerName: "Office Name", width: 180 },
  { field: "from", type: "Date", headerName: "From", width: 120, valueFormatter: params => params ? moment(params).format("DD/MM/YYYY") : "-" },
  { field: "to", type: "Date", headerName: "To", width: 100, valueFormatter: params => params ? moment(params).format("DD/MM/YYYY") : "-" },
  { field: "days", type: "number", headerName: "Days", width: 100, valueFormatter: params => params ? params : '-' },
  { field: "substituteName", type: "string", headerName: "Substitute Name", width: 200, valueFormatter: params => params ? params : '-' },
  { field: "accountNo", type: "string", headerName: "Account Number", width: 160, valueFormatter: params => params ? params : '-' },
  { field: "remarks", type: "string", headerName: "Remarks", width: 200, valueFormatter: params => params ? params : '-' },
]
const subDivisionOptions = ['Tirumangalam']

export { menu, regularEmployeeColumns, substituteEmployeeColums, leaveDataColums, subDivisionOptions }
