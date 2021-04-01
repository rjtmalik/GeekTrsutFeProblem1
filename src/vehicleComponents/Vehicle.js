import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import VehicleDbOps from "./data/VehicleDbOps";
import { useHistory, useParams } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function Vehicle({ vehicle, planet }) {
  let history = useHistory();
  let { choiceNo } = useParams();

  function handleSelection(event) {
    function redirectAfterRecordingSelection() {
      let choice = parseInt(choiceNo);
      //only 4 selections can be made, and page is to be redirect to result screen after that
      if (choice == 4) {
        history.push(`/result`);
      } else {
        history.push(`/selections/${choice + 1}`);
      }
    }
    let selection = { vehicle, planet };

    let request = VehicleDbOps().openConnection();
    let db;
    request.onsuccess = function (event) {
      db = event.target.result;
      VehicleDbOps().storeSelection(
        db,
        selection,
        redirectAfterRecordingSelection
      );
    };
  }

  const classes = useStyles();
  let imgSrc = `/images/vehicles/${vehicle.name.replace(" ","-")}.jpg`;

  return (
    <Grid item key={vehicle.name} xs={12} sm={6} md={4}>
      <Card className={classes.root}>
        <CardActionArea onClick={handleSelection}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={imgSrc}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {vehicle.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Max Distance: {vehicle.max_distance}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Speed: {vehicle.speed}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Available: {vehicle.total_no}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
