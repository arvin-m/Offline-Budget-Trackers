// check if the browser support IndexDB
if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
    return;
  };
  let db;
  // create a new db request for a "budget" database.
  const request = indexedDB.open("budget", 1);
  
  request.onupgradeneeded = function(event) {
     // create object store called "pending" and set autoIncrement to true
    const db = event.target.result;
    db.createObjectStore("pendingTransaction", { autoIncrement: true });
  };
  
  request.onsuccess = function(event) {
    db = event.target.result;
  
    // check if app is online before reading from db
    if (navigator.onLine) {
      checkDatabase();
    }
  };
  
  request.onerror = function(event) {
    console.log("ERROR ! " + event.target.errorCode);
  };