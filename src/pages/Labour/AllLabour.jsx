import * as React from "react";
import { useEffect, useState } from "react";
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

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { Button, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

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
        HERO
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function AllLabour() {
  const [rows, setrows] = useState([]);
  const [removalid, setremovalid] = useState();
  const [success, setsuccess] = useState(false);
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);
  const [deletion,setdeletion] = useState(false)

  const navigate = useNavigate();

  const getData = async () => {
    setloading(true);
    const response = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/labour/alllabour"
    );
    setrows(response.data);
    setloading(false);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    setremovalid(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    handleClose();
    await axios
      .delete(
        process.env.REACT_APP_BACKEND_URL +
          "/labour/deletelabour/" +
          removalid
      )
      .then(() => {
        setdeletion(!deletion)
        seterror(false);
        setsuccess(true);
      })
      .catch(() => {
        setsuccess(false);
        seterror(true);
      });
    
  };

  useEffect(() => {
    getData();
  }, [deletion]);
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
            <h2>Labours</h2>

            {success && (
              <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                Labour has been Deleted
              </Alert>
            )}

            {error && (
              <Alert icon={<CloseIcon fontSize="inherit" />} severity="error">
                Error Occured while deleting labour
              </Alert>
            )}
            <Fab
              onClick={() => navigate("/addlabour")}
              variant="extended"
              color="primary"
              aria-label="add"
            >
              <AddIcon /> Add Labour
            </Fab>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Code</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Specs</TableCell>
                    <TableCell align="right">Unit</TableCell>
                    <TableCell align="right">Rate</TableCell>
                    <TableCell align="center">Update</TableCell>
                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.code}
                      </TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.specs}</TableCell>
                      <TableCell align="right">{row.unit}</TableCell>
                      <TableCell align="right">{row.rate}</TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() => navigate("/updatelabour/" + row._id)}
                          variant="contained"
                        >
                          Update
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() => handleClickOpen(row._id)}
                          variant="contained"
                          color="error"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {loading && (
              <>
                <Skeleton height={70} animation="wave" />
                <Skeleton height={70} animation="wave" />
                <Skeleton height={70} animation="wave" />
                <Skeleton height={70} animation="wave" />
              </>
            )}

            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete Equipment"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure to delete this Labour?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}
