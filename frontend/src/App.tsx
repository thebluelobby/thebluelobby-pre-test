import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

import "./App.css";
import FilterableTaskTable from "./components/FiterableTaskTable";
import PopUpContainer from "./components/PopupContainer";

function App() {
  return (
    <>
      <CssBaseline />
      <Container>
        <FilterableTaskTable />
        <PopUpContainer />
      </Container>
    </>
  );
}

export default App;
