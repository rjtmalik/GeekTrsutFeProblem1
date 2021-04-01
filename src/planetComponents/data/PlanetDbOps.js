export default function PlanetDbOps() {
  const dbName = "searchDb";

  return {
    openConnection: openConnection,
    populateWithFreshData: populateWithFreshData,
  };

  function openConnection() {
    let request = window.indexedDB.open(dbName, 1);
    request.onerror = function (event) {
      console.log(
        `Db could not open and returned an error ${event.target.errorCode}`
      );
    };

    return request;
  }

  function populateWithFreshData(db, setPlanets) {
    let planetsObjectStore = db
      .transaction("planets", "readwrite")
      .objectStore("planets");
    let request = planetsObjectStore.getAll();
    request.onsuccess = function (event) {
      if (event.target.result.length > 0) {
        setPlanets({status:"success", data: event.target.result});
      } else {
        fetch("https://findfalcone.herokuapp.com/planets")
          .then((response) => {
            if (!response.ok) {
              throw new Error("failed to fetch planets");
            }
            return response.json();
          })
          .then((planetsData) => {
            let planetsObjectStore = db
              .transaction("planets", "readwrite")
              .objectStore("planets");
            planetsData.forEach((planet) => {
              planetsObjectStore.add(planet);
            });
            setPlanets({status:"success", data: planetsData});
          })
          .catch((error) => {
            console.log(error);
            setPlanets({status:"fail", data: []});
          });
      }
    };
  }
}
