import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaBaby } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { PiFlagPennantFill } from "react-icons/pi";
import { MdLocalLibrary, MdOutlineMoneyOffCsred, MdOutlinePendingActions, MdPerson } from "react-icons/md";

const menu = [
  {
    id: 1,
    title: "Leave Portal",
    listItems: [
      {
        id: 1,
        title: "Pending",
        url: "/dashboard/data-page/?type=leaves&&cat=pending",
        icon: <MdOutlinePendingActions size={18} />,
      },
      {
        id: 2,
        title: "Paid",
        url: "/dashboard/data-page/?type=leaves&&cat=Paid Leave",
        icon: <FaMoneyCheckDollar size={18} />,
      },
      {
        id: 3,
        title: "Training",
        url: "/dashboard/data-page/?type=leaves&&cat=Training",
        icon: <MdLocalLibrary size={18} />,
      },
      {
        id: 4,
        title: "LWA",
        url: "/dashboard/data-page/?type=leaves&&cat=Lwa",
        icon: <MdOutlineMoneyOffCsred size={20} />,
      },
      {
        id: 5,
        title: "Maternity",
        url: "/dashboard/data-page/?type=leaves&&cat=Maternity",
        icon: <FaBaby size={18} />,
      },
      {
        id: 6,
        title: "Vacant Place",
        url: "/dashboard/data-page/?type=leaves&&cat=Stop Gap Arrangement",
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
        url: "/dashboard/data-page/?type=employees&&cat=regular",
        icon: <MdPerson size={18} />,
      },
      {
        id: 2,
        title: "Substitute",
        url: "/dashboard/data-page/?type=employees&&cat=substitute",
        icon: <BsFillPersonLinesFill size={18} />,
      },
    ],
  },
];

const regularEmployeeColumns = [
  { field: "id", headerName: "ID", width: 90, filterable: false },
  { field: "name", type: "string", headerName: "Name", width: 250 },
  { field: "designation", type: "string", headerName: "Designation", width: 150 },
  { field: "officeName", type: "string", headerName: "Office Name", width: 250 },
];

const substituteEmployeeColums = [
  { field: "id", headerName: "ID", width: 90, filterable: false },
  { field: "name", type: "string", headerName: "Name", width: 250 },
  { field: "accountNo", type: "string", headerName: "Account Number", width: 250 },
];

const leaveDataColums = [
  { field: "id", headerName: "ID", width: 90, filterable: false },
  { field: "name", type: "string", headerName: "Name", width: 250 },
  { field: "designation", type: "string", headerName: "Designation", width: 250 },
  { field: "officeName", type: "string", headerName: "Office Name", width: 250 },
  { field: "from", type: "string", headerName: "From", width: 250 },
  { field: "to", type: "string", headerName: "To", width: 250 },
  { field: "days", type: "number", headerName: "Days", width: 250 },
  { field: "substituteName", type: "string", headerName: "Substitute Name", width: 250 },
  { field: "accountNo", type: "string", headerName: "Account Number", width: 250 },
  { field: "remarks", type: "string", headerName: "Remarks", width: 250 },
  { field: "postmanBeatNo", type: "string", headerName: "Postman Beat No", width: 250 },
  { field: "reference", type: "string", headerName: "Reference", width: 250 },
  { field: "sendToHoOn", type: "string", headerName: "Send To Ho On", width: 250 },
]

const products = [
  {
    id: 1,
    img: "https://store.sony.com.au/on/demandware.static/-/Sites-sony-master-catalog/default/dw1b537bbb/images/PLAYSTATION5W/PLAYSTATION5W.png",
    title: "Playstation 5 Digital Edition",
    color: "white",
    producer: "Sony",
    price: "$250.99",
    createdAt: "01.02.2023",
    inStock: true,
  },
  {
    id: 2,
    img: "https://www.pngmart.com/files/6/Dell-Laptop-PNG-Image.png",
    title: "Dell Laptop KR211822",
    color: "black",
    producer: "Dell",
    price: "$499.99",
    createdAt: "01.02.2023",
    inStock: true,
  },
  {
    id: 3,
    img: "http://images.samsung.com/is/image/samsung/uk-led-tv-hg40ed670ck-hg40ed670ckxxu-001-front",
    title: "Samsung TV 4K SmartTV",
    color: "gray",
    producer: "Samsung",
    price: "$999.49",
    createdAt: "01.02.2023",
    inStock: true,
  },
  {
    id: 4,
    img: "https://raylo.imgix.net/iphone-14-blue.png",
    title: "Apple Iphone 14 Pro Max",
    color: "white",
    producer: "Apple",
    price: "$799.49",
    createdAt: "01.02.2023",
    inStock: true,
  },
  {
    id: 5,
    img: "https://www.signify.com/b-dam/signify/en-aa/about/news/2020/20200903-movie-night-essentials-popcorn-ice-cream-and-the-new-philips-hue-play-gradient-lightstrip/packaging-lighstrip.png",
    title: "Philips Hue Play Gradient",
    color: "rainbow",
    producer: "Philips",
    price: "$39.99",
    createdAt: "01.02.2023",
  },
  {
    id: 6,
    img: "https://www.smartworld.it/wp-content/uploads/2019/09/High_Resolution_PNG-MX-Master-3-LEFT-GRAPHITE.png",
    title: "Logitech MX Master 3",
    color: "black",
    producer: "Logitech",
    price: "$59.49",
    createdAt: "01.02.2023",
    inStock: true,
  },
  {
    id: 7,
    img: "https://www.pngarts.com/files/7/Podcast-Mic-PNG-Picture.png",
    title: "Rode Podcast Microphone",
    color: "gray",
    producer: "Rode",
    price: "$119.49",
    createdAt: "01.02.2023",
  },
  {
    id: 8,
    img: "https://5.imimg.com/data5/SW/VM/MY-5774620/toshiba-split-ac-2-ton-3-star-rated-ras-24s3ks-500x500.png",
    title: "Toshiba Split AC 2",
    color: "white",
    producer: "Toshiba",
    price: "$899.99",
    createdAt: "01.02.2023",
    inStock: true,
  },
  {
    id: 9,
    img: "https://img.productz.com/review_image/102489/preview_sony-kdl-50w800b-50-inch-hdtv-review-superb-picture-102489.png",
    title: "Sony Bravia KDL-47W805A",
    color: "black",
    producer: "Sony",
    price: "$970.49",
    createdAt: "01.02.2023",
  },
  {
    id: 10,
    img: "https://venturebeat.com/wp-content/uploads/2015/07/As_AO1-131_gray_nonglare_win10_03.png?fit=1338%2C1055&strip=all",
    title: "Acer Laptop 16 KL-4804",
    color: "black",
    producer: "Acer",
    price: "$599.99",
    createdAt: "01.02.2023",
    inStock: true,
  },
];

export { menu, regularEmployeeColumns, substituteEmployeeColums, leaveDataColums, products }
