const idb = window.indexedDB

export function setData(databaseName: string, storeName: string, values: any[]) {
  const request = idb.open(databaseName, 2)

  // Set up an event listener for the upgradeneeded event
  request.onupgradeneeded = function (event: any) {
    const db = event.target.result

    // Create a new object store with the given name
    if (!db.objectStoreNames.contains(storeName)) {
      db.createObjectStore(storeName, { keyPath: 'id' })
    }
  }

  // Set up an event listener for the success event
  request.onsuccess = function (event: any) {
    const db = event.target.result

    // Check if the store exists before opening a transaction
    if (db.objectStoreNames.contains(storeName)) {
      const transaction = db.transaction(storeName, 'readwrite')
      const objectStore = transaction.objectStore(storeName)
      for (const value of values) {
        objectStore.put(value)
      }
      transaction.oncomplete = function () {
        console.log('All values saved to IndexedDB!')
      }
    } else {
      console.error(`Object store ${storeName} does not exist`)
    }
  }

  // Set up an event listener for the error event
  request.onerror = function (event: any) {
    console.error('Error opening IndexedDB database:', event.target.error)
  }
}

export function getData(databaseName: string, storeName: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    // Open a connection to the database
    const request = idb.open(databaseName, 2)

    // Set up an event listener for the error event
    request.onerror = function (event: any) {
      reject(event.target.error)
    }

    // Set up an event listener for the success event
    request.onsuccess = function (event: any) {
      const db = event.target.result

      // Check if the store exists before opening a transaction
      if (db.objectStoreNames.contains(storeName)) {
        const transaction = db.transaction(storeName, 'readonly')
        const objectStore = transaction.objectStore(storeName)
        const request = objectStore.getAll()

        // Set up an event listener for the success event
        request.onsuccess = function (event: any) {
          resolve(event.target.result)
        }

        // Set up an event listener for the error event
        request.onerror = function (event: any) {
          reject(event.target.error)
        }
      } else {
        reject(`Object store ${storeName} does not exist please retrive data`)
      }
    }
  })
}
