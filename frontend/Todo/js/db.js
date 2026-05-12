const DB_NAME = 'todo-app-db';
const DB_VERSION = 1;
const STORE_NAME = 'todos';

let db;

/* ==================
    OPEN DATABASE
===================== */

export function initDB() {
    
    return new Promise((resolve, reject) => {

        const request = indexedDB.open(
            DB_NAME,
            DB_VERSION
        );

        request.onerror = () => {
            reject(request.error);
        };

        request.onsuccess = () => {
            db = request.result;
            resolve(db);
        };

        request.onupgradeneeded = e => {

            db = e.target.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {

                const store = db.createObjectStore(
                    STORE_NAME,
                    {
                        keyPath: "id"
                    }
                );

                store.createIndex(
                    "completed",
                    "completed"
                );

                store.createIndex(
                    "priority",
                    "priority"
                );
            }
        };
    });
}

export function saveTodos(todos) {

    return new Promise((resolve, reject) => {

        const tx = db.transaction(
            STORE_NAME,
            "readwrite"
        );

        const store = tx.objectStore(STORE_NAME);

        store.clear();

        todos.forEach(todo => {
            store.put(todo);
        });

        tx.oncomplete = () => resolve();

        tx.onerror = () => reject(tx.error);
    });
}

export function loadTodos() {

    return new Promise((resolve, reject) => {

        const tx = db.transaction(
            STORE_NAME,
            'readonly'
        );

        const store = tx.objectStore(STORE_NAME);

        const request = store.getAll();

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}