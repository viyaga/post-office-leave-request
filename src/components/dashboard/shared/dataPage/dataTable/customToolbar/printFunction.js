import React from 'react';
import { useGridApiContext } from '@mui/x-data-grid';
import { printData } from '@/data';
import { textCapitalize } from '@/services';
import moment from 'moment';

const handlePrint = (apiRef, leaveType) => {
  const columns = apiRef.current.getAllColumns().filter((col) => col.field !== '__check__' && col.field !== '__detail_panel_toggle__');
  const rows = apiRef.current.getAllRowIds().map((id) => apiRef.current.getRow(id));
  const data = printData.find((d) => d.leaveType === leaveType)

  // Create an iframe element
  const iframe = document.createElement('iframe');
  document.body.appendChild(iframe);

  const printDocument = iframe.contentDocument || iframe.contentWindow.document;

  printDocument.write('<html><head>');
  printDocument.write('<style>');
  printDocument.write(`
    *{
      margin: 0;
      padding: 0;
      text-decoration: none;
    }
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }
    .center {
      text-align: center;
    }
    .underline {
      text-decoration: underline;
    }
    .marginBottom {
      margin-bottom: 20px;
    }
    .marginTop {
      margin-top: 20px;
    }
    p {
      font-size: 16px;
      margin-bottom: 20px;
    }
    ol li span{
      font-weight: bold;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    th, td {
      border: 1px solid black;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
    .copyMemo {
      margin-bottom: 10px;
    }
    ol li {
      margin-left: 40px;
      font-size: 19px;
      margin-bottom: 8px;
    }
    .ip li{
      text-align: right;
      font-weight: bold;
      font-size: 20px;
      list-style: none;
      margin-bottom: 5px;
    }
  `);
  printDocument.write('</style></head><body>');
  printDocument.write(`
    <h2 class="underline center">DEPARTMENT OF POSTS, INDIA</h2>
    <h2 class="underline center">Office of the Inspector Posts Tirumangalam Sub Division Tirumangalam 625706.</h2>
  `)
  printDocument.write(`${data.TopContent}`)
  printDocument.write('<table><thead><tr>');

  columns.forEach((col) => {
    printDocument.write(`<th>${col.headerName}</th>`);
  });

  printDocument.write('</tr></thead><tbody>');

  rows.forEach((row) => {
    printDocument.write('<tr>');
    columns.forEach((col) => {
      const field = col.field

      if (field === 'from' || field === 'to') {
        printDocument.write(`<td>${moment(row[field]).format('DD/MM/YYYY')}</td>`);
      } else if (field === 'name' || field === 'substituteName' || field === 'officeName' || field === 'remarks') {
        printDocument.write(`<td>${textCapitalize(row[field])}</td>`);
      } else if (field === 'designation') {
        let designation = row[field].toUpperCase()
        if (designation.split(' ')[0] === 'DAK') {
          designation = "Dak sevak"
        }
        printDocument.write(`<td>${designation}</td>`);
      } else {
        printDocument.write(`<td>${row[col.field]}</td>`);
      }
    });
    printDocument.write('</tr>');
  });

  printDocument.write('</tbody></table>');
  printDocument.write(`${data.bottomContent}`)
  printDocument.write(`</br></br></br></br></br>
    <ul class="ip">
      <li>Inspector Posts,</li>
      <li>Tirumangalam sub division,</li>
      <li>Tirumangalam-625 706.</li>
    </ul>  
    `);
  printDocument.write('<h3 class="underline copyMemo">Copy of this Memo is issued to:</h3>');
  printDocument.write(`
    <ol>
      <li>The Senior Postmaster Madurai HO - 625001</li>
      <li>The General Manager, PA & F Section, Chennai - 600008 thro S.No.1</li>
      <li>File</li>
    </ol>  
    `);
  printDocument.write('</body></html>');
  printDocument.close();

  // Wait for iframe content to load and then print
  iframe.contentWindow.focus();
  iframe.contentWindow.print();

  // Remove the iframe after printing
  document.body.removeChild(iframe);
};

export default handlePrint;
