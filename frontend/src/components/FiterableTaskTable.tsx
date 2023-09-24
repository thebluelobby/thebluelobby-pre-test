import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

const FilterableTaskTable = () => {
  const tasks = [
    {
      uuid: "1",
      description: "hello",
      isCompleted: true,
    },
    {
      uuid: "2",
      description: "hello",
      isCompleted: true,
    },
  ];
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="Task Lists">
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.uuid}>
                <TableCell>{task.description}</TableCell>
                <TableCell align="right">
                  <Checkbox
                    inputProps={{ "aria-label": "Task Checkbox" }}
                    checked={task.isCompleted}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FilterableTaskTable;
