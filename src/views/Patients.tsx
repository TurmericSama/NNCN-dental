import { useCallback, type FC } from "react";
import { Box, Button, Typography } from "@mui/material";
import NewPatientDialog from "@components/NewPatientDialog";
import {
  DataGrid,
  type GridColDef,
  type GridRowParams,
} from "@mui/x-data-grid";
import useToggle from "@lib/useToggle";
import { useNavigate, Link } from "react-router";
import AddIcon from "@mui/icons-material/Add";

const GridColumns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
  { field: "physician", headerName: "Physician", flex: 1, minWidth: 150 },
  { field: "birthday", headerName: "Birthday", flex: 1, minWidth: 150 },

  { field: "age", headerName: "Age", flex: 1, minWidth: 110 },
  { field: "address", headerName: "Address", flex: 1, minWidth: 250 },
  { field: "phone", headerName: "Phone", flex: 1, minWidth: 150 },
  {
    field: "civilStatus",
    headerName: "Civil Status",
    flex: 1,
  },
  { field: "occupation", headerName: "Occupation", flex: 1 },
  { field: "referredBy", headerName: "Referred By", flex: 1 },
];

const DUMMY_PATIENTS = [
  {
    id: 1,
    name: "John Doe",
    physician: "Dr. Smith",
    birthday: "1990-01-01",
    age: 33,
    address: "123 Main St",
    phone: "555-1234",
    civilStatus: "Single",
    occupation: "Software Engineer",
    referredBy: "Self",
  },
];

const columnVisibilityModel = {
  id: false,
  address: false,
  occupation: false,
  civilStatus: false,
};

const PatientsView: FC = () => {
  const [open, toggleOpen] = useToggle();
  const onSave = (data: any) => {
    // Handle save logic here
    console.log("New patient data:", data);
  };

  const navigate = useNavigate();

  const handleRowClick = useCallback(
    (row: GridRowParams) => {
      navigate(`/patients/${row.id}/medical-records`);
    },
    [navigate]
  );
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: {
            xs: 2,
            sm: 2,
            md: 2,
            lg: 2,
            xl: 2,
          },
        }}
      >
        <Typography
          fontWeight="bold"
          variant="h4"
          fontSize={{
            xs: "1.5rem",
            sm: "2rem",
            md: "2.5rem",
          }}
          sx={{}}
        >
          Patients List
        </Typography>
        <Button
          component={Link}
          to="/patients/new"
          variant="contained"
          endIcon={<AddIcon />}
        >
          Add New Patient
        </Button>
      </Box>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <DataGrid
          showToolbar
          columns={GridColumns}
          columnVisibilityModel={columnVisibilityModel}
          onRowClick={handleRowClick}
          rows={DUMMY_PATIENTS}
          hideFooter
          hideFooterPagination
        />
      </Box>
      <NewPatientDialog open={open} onClose={toggleOpen} onSave={onSave} />
    </Box>
  );
};

export default PatientsView;
