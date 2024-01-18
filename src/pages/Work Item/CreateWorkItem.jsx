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
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

export default function CreateWorkItems() {
    const [name,setname] = React.useState('')
    const [materials, setMaterials] = React.useState([
      { material: '', quantity: "" },
    ]);
    const [labour, setlabour] = React.useState([
      { labour: "", quantity: "" },
    ]);
    const [equipment, setequipment] = React.useState([
      { equipment: "", quantity: "" },
    ]);



    const [allmaterials, setallmaterials] = React.useState([])
    const [allequipments,setallequipments]  = React.useState([])
    const [alllabours,setalllabours]  = React.useState([])

  const [rows, setrows] = React.useState([]);
  const getData = async () => {
    const response = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/workitem/allworkitem"
    );
    setrows(response.data);
  };

  React.useEffect(() => {
    getData();
  }, []);

  // const useStyles = makeStyles((theme) => ({
  //   container: {
  //     display: "flex",
  //     alignItems: "flex-end", // This aligns items to the end of the container
  //   },
  // }));

  // const classes = useStyles();
    const navigate = useNavigate();
    

     const addMaterial = () => {
       const newMaterial = { material: '', quantity: "" };
       setMaterials([...materials, newMaterial]);
    };

    const addEquipment = () => {
      const newMaterial = { equipment: "", quantity: "" };
      setequipment([...equipment, newMaterial]);
    };

    const addLabour = () => {
      const newMaterial = { labour: "", quantity: "" };
      setlabour([...labour, newMaterial]);
    };
    
    const handleMaterialChange = (index, field, value) => {
      const updatedMaterials = [...materials];
      updatedMaterials[index][field] = value;
        setMaterials(updatedMaterials);
        console.log(updatedMaterials)
    };


    const handleEquipmentChange = (index, field, value) => {
      const updatedMaterials = [...equipment];
      updatedMaterials[index][field] = value;
      setequipment(updatedMaterials);
      console.log(updatedMaterials);
    };

    const handleLabourChange = (index, field, value) => {
      const updatedMaterials = [...labour];
      updatedMaterials[index][field] = value;
      setlabour(updatedMaterials);
      console.log(updatedMaterials);
    };


    const getMaterial = async () => {
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL + "/material/allmaterial")
        setallmaterials(response.data)
    }

    const getEquipment = async () => {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/equipment/allequipment"
      );
      setallequipments(response.data);
    };

    const getLabour = async () => {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/labour/alllabour"
      );
      setalllabours(response.data);
    };


    React.useEffect(() => {
        getLabour();
        getEquipment();
        getMaterial();
    }, [])
    

    const [age, setAge] = React.useState("");

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    const handleSubmit = async () => {
        await axios.post(process.env.REACT_APP_BACKEND_URL + "/workitem/addworkitem", {
            name,
            equipment,
            materials,
            labour

        })
    }

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
            <h2>Create Work Items</h2>

            <h4>Name</h4>
            <TextField
              id="outlined-basic"
              label="Enter name of work item"
                          variant="outlined"
                          onChange={(e)=>setname(e.target.value)}
            />

            <br></br>

            {/* <h4>Add Materials</h4> */}

            {materials.map((material, index) => (
              <div key={index}>
                <h4>Add Material {index + 1}</h4>
                <Select
                  labelId={`demo-simple-select-label-${index}`}
                  id={`demo-simple-select-${index}`}
                  value={material.material}
                  onChange={(e) =>
                    handleMaterialChange(index, "material", e.target.value)
                  }
                  label="Material"
                >
                  {allmaterials.map((data) => (
                    <MenuItem key={data._id} value={data._id}>
                      {data.name}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  style={{ marginLeft: 30 }}
                  id={`outlined-basic-${index}`}
                  label="Quantity"
                  variant="outlined"
                  type="number"
                  value={material.quantity}
                  onChange={(e) =>
                    handleMaterialChange(index, "quantity", e.target.value)
                  }
                />
              </div>
            ))}
            <br></br>
            <Button variant="contained" color="primary" onClick={addMaterial}>
              Add Material
            </Button>
            <br></br>

            {equipment.map((equipment, index) => (
              <div key={index}>
                <h4>Add Equipment {index + 1}</h4>
                <Select
                  labelId={`demo-simple-select-label-${index}`}
                  id={`demo-simple-select-${index}`}
                  value={equipment.equipment}
                  onChange={(e) =>
                    handleEquipmentChange(index, "equipment", e.target.value)
                  }
                  label="Equipment"
                >
                  {allequipments.map((data) => (
                    <MenuItem key={data._id} value={data._id}>
                      {data.name}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  style={{ marginLeft: 30 }}
                  id={`outlined-basic-${index}`}
                  label="Quantity"
                  variant="outlined"
                  type="number"
                  value={equipment.quantity}
                  onChange={(e) =>
                    handleEquipmentChange(index, "quantity", e.target.value)
                  }
                />
              </div>
            ))}
            <br></br>
            <Button variant="contained" color="primary" onClick={addEquipment}>
              Add Equipment
            </Button>

            <br></br>

            {labour.map((material, index) => (
              <div key={index}>
                <h4>Add Labour {index + 1}</h4>
                <Select
                  labelId={`demo-simple-select-label-${index}`}
                  id={`demo-simple-select-${index}`}
                  value={labour.labour}
                  onChange={(e) =>
                    handleLabourChange(index, "labour", e.target.value)
                  }
                  label="Labour"
                >
                  {alllabours.map((data) => (
                    <MenuItem key={data._id} value={data._id}>
                      {data.name}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  style={{ marginLeft: 30 }}
                  id={`outlined-basic-${index}`}
                  label="Quantity"
                  variant="outlined"
                  type="number"
                  value={labour.quantity}
                  onChange={(e) =>
                    handleLabourChange(index, "quantity", e.target.value)
                  }
                />
              </div>
            ))}
            <br></br>
            <Button variant="contained" color="primary" onClick={addLabour}>
              Add Labour
            </Button>

                      <br></br>
                      <br></br>
            <Button
              onClick={() => handleSubmit()}
              variant="contained"
            >
              Submit
            </Button>

            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
