import React from 'react';
import { GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { useGridApiContext } from '@mui/x-data-grid';
import handlePrint from './printFunction';
import './customToolbar.scss'
import { useSearchParams } from 'next/navigation';

const CustomToolbar = () => {
    const apiRef = useGridApiContext();
    const searchParams = useSearchParams()
    const leaveType = searchParams.get('cat')

    return (
        <GridToolbarContainer style={{ display: "flex", justifyContent: "space-between" }}>
            <button className='print-btn' onClick={() => handlePrint(apiRef, leaveType)}>Print</button>
            <GridToolbarQuickFilter debounceMs={300} />
        </GridToolbarContainer>
    );
};

export default CustomToolbar;
