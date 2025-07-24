import { Box } from "@mui/material";
import "./App.css";
import Navigation from "@components/Navigation";
import PatientsView from "@views/PatientsRootView";
import PatientsList from "@views/Patients";
import NewPatientForm from "@views/NewPatientForm";
import { Link, BrowserRouter, Routes, Route } from "react-router";
import PatientRecordView from "@views/PatientRecordView";

function App() {
  return (
    <BrowserRouter>
      <Box
        component="main"
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <Navigation>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <Link to="/">NNCN Dental</Link>
            <ul>
              <li>
                <Link to="/patients">Patients</Link>
              </li>
            </ul>
          </Box>
        </Navigation>
        <Routes>
          <Route path="/" element={<h1>Welcome to NNCN Dental</h1>} />
          <Route path="/patients" element={<PatientsView />}>
            <Route index element={<PatientsList />} />
            <Route path="/patients/new" element={<NewPatientForm />} />
            <Route path=":id/*" element={<PatientRecordView />} />
          </Route>
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
