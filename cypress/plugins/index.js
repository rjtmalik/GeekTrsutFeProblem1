module.exports = (on, config) => {
  on("task", {
    deleteIndexedDb({ dbName }) {
      let request = window.indexedDB.deleteDatabase(dbName);
      return request.onsuccess;
    },
  });
};
