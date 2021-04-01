import PlanetDbOps from "../../planetComponents/data/PlanetDbOps";

export default function VehicleDbOps() {
  const dbName = "searchDb";

  return {
    openConnection: openConnection,
    populateWithFreshData: populateWithFreshData,
    storeSelection: storeSelection,
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

  function populateWithFreshData(db, predicate, setVehicles) {
    let vehiclesObjectStore = db
      .transaction("vehicles", "readwrite")
      .objectStore("vehicles");
    let request = vehiclesObjectStore.getAll();
    request.onsuccess = function (event) {
      if (event.target.result.length > 0) {
        setVehicles({
          status: "success",
          data: event.target.result.filter(predicate),
        });
      } else {
        fetch("https://findfalcone.herokuapp.com/vehicles")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Could not fetch vehicles");
            }
            return response.json();
          })
          .then((vehiclesData) => {
            let vehiclesObjectStore = db
              .transaction("vehicles", "readwrite")
              .objectStore("vehicles");
            vehiclesData.forEach((vehicle) => {
              vehiclesObjectStore.add(vehicle);
            });
            setVehicles({
              status: "success",
              data: vehiclesData.filter(predicate),
            });
          })
          .catch((error) => {
            console.log(error);
            setVehicles({ status: "fail", data: [] });
          });
      }
    };
  }

  function storeSelection(db, selection, callbackFn) {
    let planetsObjectStore = db
      .transaction("planets", "readwrite")
      .objectStore("planets");

    let deleteRequest = planetsObjectStore.delete(selection.planet.name);

    let vehiclesObjectStore = db
      .transaction("vehicles", "readwrite")
      .objectStore("vehicles");

    selection.vehicle.total_no -= 1;
    let updateRequest = vehiclesObjectStore.put(selection.vehicle);

    let selectionsObjectStore = db
      .transaction("selections", "readwrite")
      .objectStore("selections");

    let addSelectionRequest = selectionsObjectStore.add({
      vehicleName: selection.vehicle.name,
      planetName: selection.planet.name,
      timeTaken: selection.planet.distance / selection.vehicle.speed,
    });

    Promise.all([
      deleteRequest.onsuccess,
      updateRequest.onsuccess,
      addSelectionRequest.onsuccess,
    ]).then((values) => {
      callbackFn();
    });
  }
}
