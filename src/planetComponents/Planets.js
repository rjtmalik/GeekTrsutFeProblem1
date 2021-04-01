import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Planet from "./Planet";
import PlanetDbOps from "./data/PlanetDbOps";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export default function Planets({ onSelection }) {
  const [planets, setPlanets] = useState({ status: "loading", data: [] });

  useEffect(() => {
    let request = PlanetDbOps().openConnection();
    let db;

    request.onsuccess = function (event) {
      db = event.target.result;
      PlanetDbOps().populateWithFreshData(db, setPlanets);
    };
  }, []);

  const classes = useStyles();

  if (planets.status == "fail") {
    return <a href="/">Oops, there was an error.Kindly restart</a>;
  } else {
    return (
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {planets.data.map((planet) => (
            <Planet onClick={onSelection} planet={planet} key={planet.name} />
          ))}
        </Grid>
      </Container>
    );
  }
}
