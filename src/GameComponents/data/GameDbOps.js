export default function GameDbOps() {
  const dbName = "searchDb";

  return {
    init: init,
    getSelections: getSelections,
    getTimeTaken: getTimeTaken
  };

  function init() {
    let request = window.indexedDB.open(dbName, 1);
    request.onerror = function (event) {
      console.log(
        `Db could not open and returned an error ${event.target.errorCode}`
      );
    };

    request.onupgradeneeded = function (event) {
      let db = event.target.result;

      db.createObjectStore("planets", { keyPath: "name" });

      db.createObjectStore("selections", { keyPath: "planetName" });

      let objectStore = db.createObjectStore("vehicles", { keyPath: "name" });
      objectStore.createIndex("max_distance", "max_distance", {
        unique: false,
      });
    };
    return request;
  }

  function getSelections(findPrincess, setTimeTaken) {
    let request = window.indexedDB.open(dbName, 1);
    request.onsuccess = function (event) {
      let db = event.target.result;
      let selectionsObjectStore = db
        .transaction("selections", "readwrite")
        .objectStore("selections");
      let getAllSelectionsRequest = selectionsObjectStore.getAll();
      getAllSelectionsRequest.onsuccess = function (event) {
        let s = event.target.result;
        let totalTime = s.reduce((n, { timeTaken }) => n + timeTaken, 0);
        setTimeTaken(totalTime);
        let vehicle_names = [];
        let planet_names = [];
        for (let i = 0; i < s.length; i++) {
          planet_names.push(s[i].planetName);
          vehicle_names.push(s[i].vehicleName);
        }
        findPrincess({ planet_names, vehicle_names });
      };
    };
  }

  function getTimeTaken(setTimeTaken) {
    let request = window.indexedDB.open(dbName, 1);
    request.onsuccess = function (event) {
      let db = event.target.result;
      let selectionsObjectStore = db
        .transaction("selections", "readwrite")
        .objectStore("selections");
      let getAllSelectionsRequest = selectionsObjectStore.getAll();
      getAllSelectionsRequest.onsuccess = function (event) {
        let s = event.target.result;
        let totalTime = s.reduce((n, { timeTaken }) => n + timeTaken, 0);
        setTimeTaken(totalTime);
      };
    };
  }
}
