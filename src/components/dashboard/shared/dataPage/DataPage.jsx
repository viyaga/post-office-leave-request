"use client"

import { useEffect, useState } from "react";
import toast from 'react-hot-toast'
import './data-page.scss'
import DataTable from "./dataTable/DataTable";
import { getLeaveDataByCategory } from "@/services";
import { leaveDataColums, stopGapArrangementColums } from '@/data'
import FilterByDate from "./filterByDate/FilterByDate";
import { MdFilterList } from "react-icons/md";
import jsPDF from "jspdf";
import DashboardLoading from "@/components/shared/dashboardLoading/DashboardLoading";

const DataPage = (props) => {
  const { substitutes, employees, category, rows } = props
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  let columns = leaveDataColums
  if (category === 'stop gap arrangement') {
    columns = stopGapArrangementColums
  }

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add Title
    doc.setFontSize(20);
    doc.text('Your PDF Title', 10, 20);

    // Add Description
    doc.setFontSize(12);
    doc.text('Your PDF Description', 10, 30);

    const pdfColumns = columns.map(item => item.headerName)
    doc.autoTable({
      head: [pdfColumns], // Replace with your column headers
      body: rows,
    });

    // Add Footer Signature
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text('Your Footer Signature', doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
    }

    doc.save('data.pdf');
  };


  return (
    <div className="leave-requests">
      <div className="info">
        <div className="title-and-filter">
          <h2>{category}</h2>
          <div onClick={() => setIsFilterOpen(true)}><MdFilterList size={24} /></div>
        </div>
        <button className="pdf-btn" onClick={() => handleDownloadPDF()}>Download PDF</button>
      </div>
      {(rows?.length > 0)
        ? < DataTable columns={columns} rows={rows} />
        : (rows?.length === 0)
          ? <p>No Data Found</p>
          : <DashboardLoading />
      }
      {isFilterOpen && <FilterByDate setIsFilterOpen={setIsFilterOpen} substitutes={substitutes} employees={employees} />}
    </div>
  )
}

export default DataPage
