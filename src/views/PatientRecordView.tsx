import type { FC } from "react";
import { Box, Button, Paper, Tab, Tabs } from "@mui/material";
import MedicalRecords from "@components/MedicalRecordsForm";
import TeethChart from "@views/TeethChartView";
import { useLocation, useNavigate, useParams } from "react-router";

const IdAndAria = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

// const STEPPER_STEPS = [
//   { label: "Medical Records", value: "medical-records" },
//   { label: "Teeth Chart", value: "teeth-chart" },
// ];

const PatientRecordView: FC = () => {
  const location = useLocation();
  const { id: patientId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const activeUrlView = location.pathname.split("/").pop();

  const navigateToMedicalRecords = () => {
    navigate(`/patients/${patientId}/medical-records`);
  };
  const navigateToTeethChart = () => {
    navigate(`/patients/${patientId}/teeth-chart`);
  };

  const isActive = (view: string) => {
    return activeUrlView === view;
  };

  const isActiveStyle = (isActive: boolean) => ({
    color: isActive ? "primary.main" : "text.secondary",
    backgroundColor: isActive ? "#e0e0e0" : "white",
    border: isActive ? "0.2px solid #dadadaff" : "none",
  });

  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: {
          xs: "column",
          sm: "column",
          md: "row",
          lg: "row",
          xl: "row",
        },
        gap: 2,
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: {
            md: "none",
            lg: "none",
            xl: "none",
          },
        }}
      >
        <Tabs value={activeUrlView} variant="fullWidth">
          <Tab
            value={"medical-records"}
            label="Medical Records"
            onClick={navigateToMedicalRecords}
            {...IdAndAria(0)}
          />
          <Tab
            value={"teeth-chart"}
            label="Teeth Chart"
            onClick={navigateToTeethChart}
            {...IdAndAria(1)}
          />
        </Tabs>
      </Box>
      <Paper elevation={0} sx={{ border: "1px solid #e0e0e0", padding: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Button
            size="small"
            variant="contained"
            sx={{
              ...isActiveStyle(isActive("medical-records")),
            }}
            onClick={navigateToMedicalRecords}
            disableElevation
          >
            Medical Records
          </Button>
          <Button
            size="small"
            variant="contained"
            sx={{
              ...isActiveStyle(isActive("teeth-chart")),
            }}
            onClick={navigateToTeethChart}
            disableElevation
          >
            Teeth Chart
          </Button>
        </Box>
      </Paper>
      <Box
        component={Paper}
        elevation={0}
        sx={{
          border: "1px solid #e0e0e0",
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
        {activeUrlView === "medical-records" && <MedicalRecords />}
        {activeUrlView === "teeth-chart" && <TeethChart />}
      </Box>
    </Box>
  );
};

export default PatientRecordView;
