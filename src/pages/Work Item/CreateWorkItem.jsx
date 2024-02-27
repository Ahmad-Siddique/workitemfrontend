import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

import Link from "@mui/material/Link";

import Bars from "../../components/Bar/Bars";
import axios from "axios";

import { Alert, Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

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
  
  const [generalitems, setgeneralitems] = React.useState([
    { generalitems: "", quantity: "" },
  ]);



    const [allmaterials, setallmaterials] = React.useState([])
    const [allequipments,setallequipments]  = React.useState([])
  const [alllabours, setalllabours] = React.useState([])
  const [allgeneralitems, setallgeneralitems] = React.useState([]);
  const [success, setsuccess] = React.useState(false);
  const [error, seterror] = React.useState(false);

 
  

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
  

  const addGeneralItems = () => {
    const newGeneralItem = { generalitems: "", quantity: "" };
    setgeneralitems([...generalitems, newGeneralItem]);
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
  
  const handleGeneralItemsChange = (index, field, value) => {
    const updatedGeneralItems = [...generalitems];
    updatedGeneralItems[index][field] = value;
    setgeneralitems(updatedGeneralItems);
    console.log(updatedGeneralItems);
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
  
   const getGeneralItem = async () => {
     const response = await axios.get(
       process.env.REACT_APP_BACKEND_URL + "/generalitems/allgeneralitems"
     );
     setallgeneralitems(response.data);
   };


    React.useEffect(() => {
        getLabour();
        getEquipment();
      getMaterial();
      getGeneralItem();
    }, [])
    

    const [age, setAge] = React.useState("");

    const handleChange = (event) => {
      setAge(event.target.value);
    };

  const handleSubmit = async (e) => {
      e.preventDefault();
      
        await axios
          .post(process.env.REACT_APP_BACKEND_URL + "/workitem/addworkitem", {
            name,
            equipment,
            materials,
            labour,
            generalitems
          })
          .then(() => {
            seterror(false);
            setsuccess(true);
          })
          .catch(() => {
            setsuccess(false);
            seterror(true);
          });
  }
  
  const removeMaterial = (index) => {
    const newMaterials = materials.filter((_, i) => i !== index);
    setMaterials(newMaterials);
  };

  const removeEquipment = (index) => {
    const newEquipment = equipment.filter((_, i) => i !== index);
    setequipment(newEquipment);
  };

  const removeLabour = (index) => {
    const newLabour = labour.filter((_, i) => i !== index);
    setlabour(newLabour);
  };


  const removeGeneralItem = (index) => {
    const newGeneralItem = generalitems.filter((_, i) => i !== index);
    setgeneralitems(newGeneralItem);
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
          <form>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <h2>Create Work Items</h2>
              {success && (
                <Alert
                  icon={<CheckIcon fontSize="inherit" />}
                  severity="success"
                >
                  Work Item has been Added
                </Alert>
              )}

              {error && (
                <Alert icon={<CloseIcon fontSize="inherit" />} severity="error">
                  Error Occured while Adding Work Item
                </Alert>
              )}
              <h4>Name</h4>
              <TextField
                id="outlined-basic"
                label="Enter name of work item"
                variant="outlined"
                onChange={(e) => setname(e.target.value)}
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
                    required
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
                    required
                    value={material.quantity}
                    onChange={(e) =>
                      handleMaterialChange(index, "quantity", e.target.value)
                    }
                  />
                  <Button onClick={() => removeMaterial(index)}>
                    Remove Material
                  </Button>
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
                    required
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
                    required
                    value={equipment.quantity}
                    onChange={(e) =>
                      handleEquipmentChange(index, "quantity", e.target.value)
                    }
                  />
                  <Button onClick={() => removeEquipment(index)}>
                    Remove Equipment
                  </Button>
                </div>
              ))}
              <br></br>
              <Button
                variant="contained"
                color="primary"
                onClick={addEquipment}
              >
                Add Equipment
              </Button>

              <br></br>

              {labour.map((labour, index) => (
                <div key={index}>
                  <h4>Add Labour {index + 1}</h4>
                  <Select
                    labelId={`demo-simple-select-label-${index}`}
                    id={`demo-simple-select-${index}`}
                    value={labour.labour}
                    required
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
                    required
                    value={labour.quantity}
                    onChange={(e) =>
                      handleLabourChange(index, "quantity", e.target.value)
                    }
                  />
                  <Button onClick={() => removeLabour(index)}>
                    Remove Labour
                  </Button>
                </div>
              ))}
              <br></br>
              <Button variant="contained" color="primary" onClick={addLabour}>
                Add Labour
              </Button>

              <br></br>

              {generalitems.map((generalitems, index) => (
                <div key={index}>
                  <h4>Add General Item {index + 1}</h4>
                  <Select
                    labelId={`demo-simple-select-label-${index}`}
                    id={`demo-simple-select-${index}`}
                    value={generalitems.generalitems}
                    required
                    onChange={(e) =>
                      handleGeneralItemsChange(
                        index,
                        "generalitems",
                        e.target.value
                      )
                    }
                    label="Labour"
                  >
                    {allgeneralitems.map((data) => (
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
                    required
                    value={generalitems.quantity}
                    onChange={(e) =>
                      handleGeneralItemsChange(
                        index,
                        "quantity",
                        e.target.value
                      )
                    }
                  />
                  <Button onClick={() => removeGeneralItem(index)}>
                    Remove General Item
                  </Button>
                </div>
              ))}

              <br></br>
              <Button
                variant="contained"
                color="primary"
                onClick={addGeneralItems}
              >
                Add General Item
              </Button>

              <br></br>
              <br></br>
              <Button type="submit" onClick={handleSubmit} variant="contained">
                Submit
              </Button>

              <Copyright sx={{ pt: 4 }} />
            </Container>
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
