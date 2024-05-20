import React from 'react';
import { GridToolbarExport, gridFilteredSortedRowIdsSelector, useGridApiContext } from '@mui/x-data-grid';

const CustomCsvExport = (props) => {
    const apiRef = useGridApiContext();

    const handleExport = () => {
        const columns = apiRef.current.getAllColumns();
        const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);

        const rows = filteredSortedRowIds.map((id) => {
            const row = apiRef.current.getRow(id);
            return columns.reduce((acc, col) => {
                if (col.field === 'accountNumber') {
                    acc[col.field] = `"${row[col.field]}"`;
                } else {
                    acc[col.field] = row[col.field];
                }
                return acc;
            }, {});
        });

        const csvContent = rows.map(row => columns.map(col => row[col.field]).join(',')).join('\n');
        const csvHeader = columns.map(col => col.field).join(',');

        const csvFile = new Blob([csvHeader + '\n' + csvContent], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(csvFile);
        link.download = 'export.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePrint = () => {
        const title = "Hello"
        const description = "Description"
        const columns = apiRef.current.getAllColumns().filter((col) => col.field !== '__check__' && col.field !== '__detail_panel_toggle__');
        const rows = apiRef.current.getAllRowIds().map((id) => apiRef.current.getRow(id));

        const printWindow = window.open('', '_blank');
        const printDocument = printWindow.document;
        printDocument.write('<html><head><title>Print</title>');
        printDocument.write('<style>table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid black; padding: 8px; text-align: left; }</style>');
        printDocument.write('</head><body>');
        printDocument.write(`<h1>${title}</h1>`);
        printDocument.write(`<p>${description}</p>`);
        printDocument.write('<table><thead><tr>');

        columns.forEach((col) => {
            printDocument.write(`<th>${col.headerName}</th>`);
        });

        printDocument.write('</tr></thead><tbody>');

        rows.forEach((row) => {
            printDocument.write('<tr>');
            columns.forEach((col) => {
                printDocument.write(`<td>${row[col.field]}</td>`);
            });
            printDocument.write('</tr>');
        });

        printDocument.write('</tbody></table>');
        printDocument.write('</body></html>');
        printDocument.close();
        printWindow.print();
        printWindow.close();
    };

    return (
        <GridToolbarExport
            {...props}
            csvOptions={{
                fileName: 'export.csv',
                utf8WithBom: true,
                getRowsToExport: handleExport,
            }}
            printOptions={{
                hideToolbar: true,
                print: handlePrint,
            }}
        />
    );
};

export default CustomCsvExport;
