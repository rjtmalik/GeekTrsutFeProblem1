import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function Planet({ planet, onClick }) {
  let history = useHistory();
  const classes = useStyles();

  function handleSelection(event) {
    let node = event.target;
    while (node.nodeName !== "BUTTON") {
      node = node.parentElement;
    }
    let nodeIdSplitted = node.id.split("-");
    onClick({ name: nodeIdSplitted[0], distance: nodeIdSplitted[1] });
  }

  let imgSrc = `/images/planets/${planet.name}.jpg`;

  return (
    <Grid item key={planet.name} xs={12} sm={6} md={4}>
      <Card className={classes.root}>
        <CardActionArea
          id={`${planet.name}-${planet.distance}`}
          onClick={handleSelection}
        >
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={imgSrc}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {planet.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Distance: {planet.distance}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
