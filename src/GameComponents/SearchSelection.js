import React, { useEffect, useState } from "react";
import Planets from "../planetComponents/Planets";
import Vehicles from "../vehicleComponents/Vehicles";
import TimeTaken from "./TimeTaken";
import GameDbOps from "./data/GameDbOps";

export default function SearchSelection() {
  const [planetSelected, setPlanetSelected] = useState({});

  const [timeTaken, setTimeTaken] = useState(0);

  useEffect(() => {
    console.log('invoked');
    GameDbOps().getTimeTaken(setTimeTaken);
  }, []);

  function handlePlanetSelection(planet) {
    setPlanetSelected(planet);
  }

  const component = planetSelected.name ? (
    <Vehicles planet={planetSelected} />
  ) : (
    <Planets onSelection={handlePlanetSelection} />
  );
  return (
    <React.Fragment>
      <TimeTaken timeTaken={timeTaken} />
      {component}
    </React.Fragment>
  );
}
