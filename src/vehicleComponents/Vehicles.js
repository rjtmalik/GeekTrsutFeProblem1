import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Vehicle from "./Vehicle";
import VehicleDbOps from "./data/VehicleDbOps";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export default function Vehicles({ planet }) {
  const [vehicles, setVehicles] = useState({ status: "loading", data: [] });

  useEffect(() => {
    let request = VehicleDbOps().openConnection();
    let db;

    request.onsuccess = function (event) {
      db = event.target.result;
      function isVehicleAvailable(vehicle) {
        return vehicle.total_no > 0 && vehicle.max_distance >= planet.distance;
      }
      VehicleDbOps().populateWithFreshData(db, isVehicleAvailable, setVehicles);
    };
  }, []);

  const classes = useStyles();

  console.log(vehicles);
  if (vehicles.status == "fail") {
    return <a href="/">Oops, there was an error.Kindly restart</a>;
  } else {
    return (
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {vehicles.data.map((vehicle) => (
            <Vehicle vehicle={vehicle} key={vehicle.name} planet={planet} />
          ))}
        </Grid>
      </Container>
    );
  }
}
