import { parse } from 'json2csv';
import moment from 'moment';
import { textCapitalize } from '@/services'; // Adjust the import path as necessary
import { printData } from '@/data';

const csvDownload = (apiRef, leaveType) => {
  const columns = apiRef.current.getAllColumns().filter((col) => col.field !== '__check__' && col.field !== '__detail_panel_toggle__');
  const rows = apiRef.current.getAllRowIds().map((id) => apiRef.current.getRow(id));
  const data = printData.find((d) => d.leaveType === leaveType); // Adjust this to your data structure

  const csvData = rows.map(row => {
    const rowData = {};

    columns.forEach(col => {
      const field = col.field;

      if (field === 'from' || field === 'to') {
        rowData[col.headerName] = moment(row[field]).format('DD/MM/YYYY');
      } else if (field === 'name' || field === 'substituteName' || field === 'officeName' || field === 'remarks') {
        rowData[col.headerName] = textCapitalize(row[field]);
      } else if (field === 'designation') {
        let designation = row[field].toUpperCase();
        if (designation.split(' ')[0] === 'DAK') {
          designation = "Dak sevak";
        }
        rowData[col.headerName] = designation;
      } else if (field === 'accountNo') {
        rowData[col.headerName] = `="${row[field]}"`;
      } else {
        rowData[col.headerName] = row[field];
      }
    });
    return rowData;
  });

  const csvString = parse(csvData);

  // Create a link to download the CSV file
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${leaveType}-data.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default csvDownload;
