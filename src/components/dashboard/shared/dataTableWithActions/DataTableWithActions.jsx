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

const DataTableWithActions = ({ columns, rows}) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async (id) => {
    setIsLoading(true)
    const res = await deletePendingLeaveData(id)

    if (res.error) {
      setIsLoading(false)
      return toast.error(res.error)
    }

    if (res.success) {
      dispatch(deletePendingLeave(id))
      setIsLoading(false)
    }
    
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link href={`/${params.row.id}`}>
            <MdEdit size={20} />
          </Link>
          <div className="delete" onClick={() => handleDelete(params.row._id)}>
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
