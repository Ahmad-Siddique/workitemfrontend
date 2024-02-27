import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Bars from "../../components/Bar/Bars";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Button,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

// import { mainListItems, secondaryListItems } from "./listItems";
// import Chart from "./Chart";
// import Deposits from "./Deposits";
// import Orders from "./Orders";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Testing() {
  const [rows, setrows] = React.useState([]);
  const [item, setitem] = React.useState("");
  const [quantity, setquantity] = React.useState();
  const [data, setdata] = React.useState();
  const [material, setmaterial] = React.useState();
  const [labour, setlabour] = React.useState();
  const [generalitems, setgeneralitems] = React.useState();
  const [equipment, setequipment] = React.useState();
  const [totalmaterial, settotalmaterial] = React.useState();
  const [totalequipment, settotalequipment] = React.useState();
  const [totallabour, settotallabour] = React.useState();
  const [totalgeneralitems, settotalgeneralitems] = React.useState();
  const [grandtotal, setgrandtotal] = React.useState();
  const [loading, setloading] = React.useState(false);
  const getData = async () => {
    setloading(true);
    const response = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/workitem/allworkitem"
    );
    setrows(response.data);
    setloading(false);
  };

  const handleSubmit = async () => {
    setloading(true);
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/workitem/testing",
        {
          id: item,
          quantity,
        }
      );
      console.log(res.data);
      const workItemData = res.data.workItem;

      // Update states with new data
      setdata(workItemData); // Assuming you want to store the whole workItem object
      setequipment(workItemData.equipment);
      setlabour(workItemData.labour);
      setmaterial(workItemData.materials);
      setgeneralitems(workItemData.generalitems);

      // Calculate costs directly from the response
      const materialCost = workItemData.materials.reduce((acc, curr) => {
        return acc + curr.quantity * curr.material.rate;
      }, 0);

      const labourCost = workItemData.labour.reduce((acc, curr) => {
        return acc + curr.quantity * parseFloat(curr.labour.rate);
      }, 0);

      const equipmentCost = workItemData.equipment.reduce((acc, curr) => {
        return acc + curr.quantity * parseFloat(curr.equipment.rate);
      }, 0);

      const generalitemsCost = workItemData.generalitems.reduce((acc, curr) => {
        return acc + curr.quantity * parseFloat(curr.generalitems.rate);
      }, 0);

      settotalequipment(equipmentCost);
      settotallabour(labourCost);
      settotalmaterial(materialCost);
      settotalgeneralitems(generalitemsCost)
      setgrandtotal(
        equipmentCost * quantity +
          labourCost * quantity +
        materialCost * quantity +
        generalitemsCost * quantity
      );

      console.log("Cost calculations complete");

      // setsuccess(true); // Uncomment or modify as needed
    } catch (error) {
      console.error("Failed to load data", error);
      // seterror(true); // Uncomment or modify as needed
    }
    setloading(false);
  };

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <Bars />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <h2>Testing Area</h2>

            <Select
              labelId={`demo-simple-select-label`}
              id={`demo-simple-select`}
              value={item}
              onChange={(e) => {
                console.log(e.target.value);
                setitem(e.target.value);
              }}
              label="Work Item"
            >
              {rows.map((data) => (
                <MenuItem key={data._id} value={data._id}>
                  {data.name}
                </MenuItem>
              ))}
            </Select>

            <TextField
              style={{ marginLeft: 30 }}
              id={`outlined-basic`}
              label="Quantity"
              variant="outlined"
              type="number"
              value={quantity}
              onChange={(e) => setquantity(e.target.value)}
            />
            <br></br>
            <br></br>
            <Button type="submit" onClick={handleSubmit} variant="contained">
              Submit
            </Button>

            <br></br>
            <br></br>
            {loading && <LinearProgress />}
            <br></br>
            <br></br>

            {material && (
              <>
                <h4 style={{ marginTop: 20 }}>Materials</h4>

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Code</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Specs</TableCell>
                        <TableCell align="right">Unit Quantity</TableCell>
                        <TableCell align="right">Unit Rate</TableCell>

                        <TableCell align="right">Total Quantity</TableCell>
                        <TableCell align="right">Total Rate</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {material.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.material.code}
                          </TableCell>
                          <TableCell align="right">
                            {row.material.name}
                          </TableCell>
                          <TableCell align="right">
                            {row.material.specs}
                          </TableCell>
                          <TableCell align="right">{row.quantity}</TableCell>
                          <TableCell align="right">
                            {row.material.rate.toLocaleString()}
                          </TableCell>

                          <TableCell align="right">
                            {" "}
                            {(row.quantity * quantity).toLocaleString()}
                          </TableCell>
                          <TableCell align="right">
                            {(
                              row.material.rate *
                              (row.quantity * quantity)
                            ).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}

            {labour && (
              <>
                <h4 style={{ marginTop: 20 }}>Labours</h4>

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Code</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Specs</TableCell>
                        <TableCell align="right">Unit Quantity</TableCell>
                        <TableCell align="right">Unit Rate</TableCell>

                        <TableCell align="right">Total Quantity</TableCell>
                        <TableCell align="right">Total Rate</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {labour.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.labour.code}
                          </TableCell>
                          <TableCell align="right">{row.labour.name}</TableCell>
                          <TableCell align="right">
                            {row.labour.specs}
                          </TableCell>
                          <TableCell align="right">{row.quantity}</TableCell>
                          <TableCell align="right">
                            {Number(row.labour.rate).toLocaleString()}
                          </TableCell>

                          <TableCell align="right">
                            {row.quantity * quantity}
                          </TableCell>
                          <TableCell align="right">
                            {(
                              row.labour.rate *
                              (row.quantity * quantity)
                            ).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}

            {equipment && (
              <>
                <h4 style={{ marginTop: 20 }}>Equipments</h4>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Code</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Specs</TableCell>
                        <TableCell align="right">Unit Quantity</TableCell>
                        <TableCell align="right">Unit Rate</TableCell>

                        <TableCell align="right">Total Quantity </TableCell>
                        <TableCell align="right">Total Rate</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {equipment.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.equipment.code}
                          </TableCell>
                          <TableCell align="right">
                            {row.equipment.name}
                          </TableCell>
                          <TableCell align="right">
                            {row.equipment.specs}
                          </TableCell>
                          <TableCell align="right">{row.quantity}</TableCell>
                          <TableCell align="right">
                            {Number(row.equipment.rate).toLocaleString()}
                          </TableCell>

                          <TableCell align="right">
                            {row.quantity * quantity}
                          </TableCell>
                          <TableCell align="right">
                            {(
                              row.equipment.rate *
                              (row.quantity * quantity)
                            ).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}

            {generalitems && (
              <>
                <h4 style={{ marginTop: 20 }}>General Items</h4>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Code</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Specs</TableCell>
                        <TableCell align="right">Unit Quantity</TableCell>
                        <TableCell align="right">Unit Rate</TableCell>

                        <TableCell align="right">Total Quantity </TableCell>
                        <TableCell align="right">Total Rate</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {generalitems.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.generalitems.code}
                          </TableCell>
                          <TableCell align="right">
                            {row.generalitems.name}
                          </TableCell>
                          <TableCell align="right">
                            {row.generalitems.specs}
                          </TableCell>
                          <TableCell align="right">{row.quantity}</TableCell>
                          <TableCell align="right">
                            {Number(row.generalitems.rate).toLocaleString()}
                          </TableCell>

                          <TableCell align="right">
                            {row.quantity * quantity}
                          </TableCell>
                          <TableCell align="right">
                            {(
                              row.generalitems.rate *
                              (row.quantity * quantity)
                            ).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}

            {totalequipment && (
              <div>
                <h3>
                  Total Equipment Cost:{" "}
                  {(totalequipment * quantity).toLocaleString()}
                </h3>
              </div>
            )}

            {totallabour && (
              <div>
                <h3>
                  Total Labour Cost: {(totallabour * quantity).toLocaleString()}
                </h3>
              </div>
            )}

            {totalmaterial && (
              <div>
                <h3>
                  Total Material Cost:{" "}
                  {(totalmaterial * quantity).toLocaleString()}
                </h3>
              </div>
            )}

            {totalgeneralitems && (
              <div>
                <h3>
                  Total General Items Cost:{" "}
                  {(totalgeneralitems * quantity).toLocaleString()}
                </h3>
              </div>
            )}

            {totalequipment && (
              <div>
                <h3>Grand Total: {grandtotal.toLocaleString()}</h3>
              </div>
            )}

            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
