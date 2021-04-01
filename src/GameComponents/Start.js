import React, { useEffect, useState } from "react";
import BgImage from "./images/startbg.png";
import { Link } from "react-router-dom";
import styles from "./css/Start.module.css";
import GameDbOps from "./data/GameDbOps";

export default function Start() {
  const [startState, setStartSate] = useState('Starting');
  useEffect(() => {
    let request = GameDbOps().init();
    let db;
    request.onsuccess = function (event) {
      db = event.target.result;
      let oVehicles = db.transaction("vehicles", "readwrite").objectStore('vehicles').clear();
      let oPlanets = db.transaction("planets", "readwrite").objectStore('planets').clear();
      let oSelections = db.transaction("selections", "readwrite").objectStore('selections').clear();
      Promise.all([oVehicles.onsuccess, oPlanets.onsuccess, oSelections.onsuccess]).then((values)=>{
        setStartSate('Start Search')
      });
    };
  }, []);

  function highlightClickable() {
    let img = document.querySelector("#imgBg");
    let label = document.querySelector("#lblStart");
    img.classList.add(styles.imgHover);
    label.classList.add(styles.txtHover);
  }

  function stopHighlighting() {
    let img = document.querySelector("#imgBg");
    let label = document.querySelector("#lblStart");
    img.classList.remove(styles.imgHover);
    label.classList.remove(styles.txtHover);
  }

  return (
    <Link
      to="/selections/1"
      onMouseOver={highlightClickable}
      onMouseOut={stopHighlighting}
      style={{ cursor: "pointer" }}
    >
      <div style={{ overflow: "hidden", margin: "0", text_align: "center" }}>
        <img className={styles.imgNoMouseHover} src={BgImage} id="imgBg"></img>
        <div className={styles.centered}>
          <h3 style={{ color: "red" }} id="lblStart">
            {startState}
          </h3>
        </div>
      </div>
    </Link>
  );
}
