import * as React from "react";
import { useEffect, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

import Link from "@mui/material/Link";

import Bars from "../../components/Bar/Bars";

import axios from "axios";
import {
  Button,
  Fab,
  FormControl,
  FormGroup,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
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

export default function AddLabour() {
  const [code, setcode] = useState();
  const [name, setname] = useState();
  const [specs, setspecs] = useState();
  const [unit, setunit] = useState();
  const [rate, setrate] = useState();
  const [success, setsuccess] = useState(false);
  const [error, seterror] = useState(false);

  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();

    await axios
      .post(process.env.REACT_APP_BACKEND_URL + "/labour/addlabour/", {
        code,
        name,
        specs,
        unit,
        rate,
      })
      .then(() => {
        seterror(false);
        setsuccess(true);
      })
      .catch(() => {
        setsuccess(false);
        seterror(true);
      });
  };

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
            <h2>Add Labour</h2>
            {success && (
              <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                Labour has been Added
              </Alert>
            )}

            {error && (
              <Alert icon={<CloseIcon fontSize="inherit" />} severity="error">
                Error Occured while Adding labour
              </Alert>
            )}
            <form>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Code
                </InputLabel>
                <OutlinedInput
                  value={code}
                  onChange={(e) => setcode(e.target.value)}
                  id="outlined-adornment-amount"
                  label="Amount"
                  type="text"
                  required
                />
              </FormControl>

              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Name
                </InputLabel>
                <OutlinedInput
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  id="outlined-adornment-amount"
                  label="Amount"
                />
              </FormControl>

              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Specs
                </InputLabel>
                <OutlinedInput
                  required
                  type="text"
                  value={specs}
                  onChange={(e) => setspecs(e.target.value)}
                  id="outlined-adornment-amount"
                  label="Amount"
                />
              </FormControl>

              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Unit
                </InputLabel>
                <OutlinedInput
                  required
                  type="text"
                  value={unit}
                  onChange={(e) => setunit(e.target.value)}
                  id="outlined-adornment-amount"
                  label="Amount"
                />
              </FormControl>

              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Rate
                </InputLabel>
                <OutlinedInput
                  required
                  type="number"
                  value={rate}
                  onChange={(e) => setrate(e.target.value)}
                  id="outlined-adornment-amount"
                  label="Amount"
                />
              </FormControl>

              <Fab
                onClick={handleAdd}
                type="submit"
                color="primary"
                aria-label="add"
                variant="extended"
              >
                <AddIcon /> Add Labour
              </Fab>
            </form>

            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
