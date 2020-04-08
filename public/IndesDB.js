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
//   Creating a function called  in index.js for save Transaction when the app works offline
function saveRecord(record) {
    // create a transaction on the pending Transaction db with readwrite access
    const transaction = db.transaction(["pendingTransaction"], "readwrite");
  
    // access your pending Transaction object store
    const store = transaction.objectStore("pendingTransaction");
  
    // add record to your store with add method.
    store.add(record);
  }