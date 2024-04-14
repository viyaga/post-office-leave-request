import {
  DataGrid,
  GridToolbar,
} from "@mui/x-data-grid";
import "./dataTableWithActions.scss";
import Link from "next/link";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deletePendingLeaveData } from "@/services";
import toast from "react-hot-toast";
import { deletePendingLeave } from "@/redux/slices/commonSlice";
import { useState } from "react";

const DataTableWithActions = ({ columns, rows, setDeleteData}) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    disableExport: true,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link href={`/${params.row.id}`}>
            <MdEdit size={20} />
          </Link>
          <div className="delete" onClick={() => setDeleteData(params.row)}>
            <MdDelete size={20} />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={rows}
        columns={[...columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 300 },
            printOptions: { disableToolbarButton: true }
          },
        }}
        //rowCount={100}
        // paginationMode="server"
        loading={isLoading}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTableWithActions;
