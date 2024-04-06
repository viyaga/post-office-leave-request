import {
  DataGrid,
  GridToolbar,
} from "@mui/x-data-grid";
import "./dataTable.scss";
import Link from "next/link";
import { MdDelete, MdEdit } from "react-icons/md";

const DataTable = (props) => {

  const handleDelete = (id) => {
    console.log(id)
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link href={`/${props.slug}/${params.row.id}`}>
            <MdEdit size={20} />
          </Link>
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
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
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
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
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
