import React, { useEffect, useState } from "react";
import GameDbOps from "./data/GameDbOps";
import TimeTaken from "./TimeTaken";

export default function Result() {
  const [searchResult, setSearchReult] = useState({});
  const [timeTaken, setTimeTaken] = useState(0);

  useEffect(() => {
    GameDbOps().getSelections(findPrincess, setTimeTaken);

    function findPrincess(payLoad) {
      var xhrToken = new XMLHttpRequest();
      xhrToken.open("POST", "https://findfalcone.herokuapp.com/token", true);
      xhrToken.setRequestHeader("accept", "application/json");
      xhrToken.send("");

      xhrToken.onreadystatechange = function () {
        if (
          xhrToken.readyState == XMLHttpRequest.DONE &&
          xhrToken.status === 200
        ) {
          let token = JSON.parse(xhrToken.responseText).token;

          var xhrFind = new XMLHttpRequest();
          xhrFind.open("POST", "https://findfalcone.herokuapp.com/find", true);
          xhrFind.setRequestHeader("accept", "application/json");
          xhrFind.send(JSON.stringify({ ...payLoad, token }));

          xhrFind.onreadystatechange = function () {
            if (
              xhrFind.readyState == XMLHttpRequest.DONE &&
              xhrFind.status === 200
            ) {
              setSearchReult(JSON.parse(xhrFind.responseText));
            } else {
              setSearchReult({ status: "error" });
            }
          };
        } else {
          setSearchReult({ status: "error" });
        }
      };
    }
  }, []);

  let component;
  if (searchResult.status == "false") {
    component = <h4>Could not find Falcon</h4>;
  } else if (searchResult.status == "error") {
    component = <a href="/">Oops, there was an error.Kindly restart</a>;
  } else {
    component = <h4>Falcon found on {searchResult.planet_name}</h4>;
  }

  return (
    <React.Fragment>
      <TimeTaken timeTaken={timeTaken} />
      {component}
    </React.Fragment>
  );
}
