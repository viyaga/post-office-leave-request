import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaBaby } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { PiFlagPennantFill } from "react-icons/pi";
import { MdCheckCircle, MdDateRange, MdLocalLibrary, MdOutlineMoneyOffCsred, MdOutlinePendingActions, MdPerson } from "react-icons/md";
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
        title: "Approved",
        url: "/dashboard/approved",
        icon: <MdCheckCircle size={20} />,
      },
      {
        id: 3,
        title: "Paid",
        url: "/dashboard/data-page?cat=paid leave",
        icon: <FaMoneyCheckDollar size={18} />,
      },
      {
        id: 4,
        title: "Training",
        url: "/dashboard/data-page?cat=training",
        icon: <MdLocalLibrary size={18} />,
      },
      {
        id: 5,
        title: "LWA",
        url: "/dashboard/data-page?cat=lwa",
        icon: <MdOutlineMoneyOffCsred size={20} />,
      },
      {
        id: 6,
        title: "Maternity",
        url: "/dashboard/data-page?cat=maternity",
        icon: <FaBaby size={18} />,
      },
      {
        id: 7,
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
  { field: "workStartDate", type: "Date", headerName: "Working From", width: 120, valueFormatter: params => params ? moment(params).format("DD/MM/YYYY") : "-" },
  { field: "workEndDate", type: "Date", headerName: "To", width: 120, valueFormatter: params => params ? moment(params).format("DD/MM/YYYY") : "-" },
  { field: "workingDays", type: "number", headerName: "CWD", width: 100, valueFormatter: params => params ? `${params} Days` : 0 },
];

const leaveDataColums = [
  { field: "id", headerName: "SL .No", width: 70, filterable: false },
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

const approvedLeaveDataColums = [
  { field: "id", headerName: "SL .No", width: 70, filterable: false },
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
  { field: "leaveType", type: "string", headerName: "Leave Type", width: 250, valueFormatter: params => textCapitalize(params) },
]

const stopGapArrangementColums = [
  { field: "id", headerName: "SL .No", width: 70, filterable: false },
  {
    field: "designation", type: "string", headerName: "Name Of The Vacant Post", width: 180,
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

const printData = [
  {
    leaveType: "lwa", title: "",
    TopContent: `
    <h2 class="underline center marginBottom">LWA STATEMENT FOR THE MONTH OF MARCH 2024- SUPPLEMENTARY</h2>
    <ol>
      <li>The following <span>Gramin Dak Sevaks</span> have been <span>permitted to proceed on leave without allowance (LWA)</span> as per the particulars noted against each.</li>
      <li>The <span>engagement of substitutes by the Gramin Dak Sevak approved on the clear understanding that the substitute may be discharged by the undersigned</span> or by the appointing authority in case of BPMs at any time without assigning any reason.</li>
      <li>The substitutes are entitled only to the <span>minimum of the TRCA applicable to GDS.</span></span></li>
    </ol>
    `,
    bottomContent: `
    <h3>Certified that the POSB account number of all the outsiders in this leave order has been verified and found correct.</h3>
    <h2 class="underline">No. IP (TMM)/GDS/Leave Orders/LWA/dlgs dated at Tirumangalam 625706 the ${moment(Date.now()).format('DD.MM.YYYY')}</h2>
    `
  },
  {
    leaveType: "paid leave", title: ``,
    TopContent: `
        <ol class="marginTop">
          <li>The following <span>Gramin Dak Sevaks</span> have been <span>permitted to proceed on leave with allowance (Paid Leave)</span> as per the particulars noted against each.</li>
          <li>The <span>engagement of substitutes by the Gramin Dak Sevak approved on the clear understanding that the substitute may be discharged by the undersigned</span> or by the appointing authority in case of BPMs at any time without assigning any reason.</li>
          <li>The substitutes are entitled only to the <span>minimum of the TRCA applicable to GDS.</span></li>
        </ol>
    `,
    bottomContent: `
        <h3>Certified that the POSB account number of all the outsiders in this leave order has been verified and found correct.</h3>
        <h2 class="underline">No. IP (TMM)/GDS/Paid leave/dlgs dated at Tirumangalam 625706 the ${moment(Date.now()).format('DD.MM.YYYY')}</h2>
    `
  },
  {
    leaveType: "training", title: ``,
    TopContent: `
      <ol class="marginTop">
        <li>The following <span>Gramin Dak Sevaks</span> have been <span>permitted to attend induction training at WTC, Madurai HO</span> as per the particulars noted against each.</li>
        <li>The <span>engagement of substitutes by the Gramin Dak Sevak approved on the clear understanding that the substitute may be discharged by the undersigned</span> or by the appointing authority in case of BPMs at any time without assigning any reason.</li>
        <li>The substitutes are entitled only to the <span>minimum of the TRCA applicable to GDS.</span></li>
      </ol>
    `,
    bottomContent: `
      <h3>Certified that the POSB account number of all the outsiders in this leave order has been verified and found correct.</h3>
      <h2 class="underline">No. IP (TMM)/GDS/Leave Orders/trg/dlgs dated at Tirumangalam 625706 the ${moment(Date.now()).format('DD.MM.YYYY')}</h2>
    `
  },
  {
    leaveType: "stop gap arrangement", title: ``,
    TopContent: `
      <ol class="marginTop">
        <li>The following <span>Outsiders</span> have been engaged on<span>Stop Gap Arrangement</span> in the vacant posts for the periods shown against each.</li>
        <li>The substitutes are entitled only to the <span>minimum of the TRCA applicable to GDS.</span></li>
      </ol>
      `,
    bottomContent: `
      <h3>Certified that the POSB account number of all the outsiders in this leave order has been verified and found correct.</h3>
      <h2 class="underline">No. IP (TMM)/Stop Gaparrangement/dlgs/${new Date(Date.now()).getFullYear()} dated at Tirumangalam 625706 the ${moment(Date.now()).format('DD.MM.YYYY')}</h2>
    `
  },
]
export {
  menu, regularEmployeeColumns, substituteEmployeeColums, leaveDataColums, approvedLeaveDataColums,
  stopGapArrangementColums, HolidayColums, designationOptions, subDivisionOptions, printData
}
