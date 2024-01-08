import spanishWords from './assets/words.json';
import * as SQLite from 'expo-sqlite';

let favorieSpanishWords = [];
let knownSpanishWords = [];
let db = undefined;
const debugStatus = false;
const MAX_WORDS = 30;
// get a list of 30 object ids
let tempSpanishWords = [];
let prevSpanishWords = [];

let rnum = Math.floor(Math.random() * (spanishWords.length - 0) + 0);
for (let i = 0; i < MAX_WORDS; i++) {
    tempSpanishWords.unshift(spanishWords.find(element => element.id === rnum));
    rnum = Math.floor(Math.random() * (spanishWords.length - 0) + 0);
}

let spanishWordObject = {};

export async function openDB() {
    db = SQLite.openDatabase('db.pruebaDb') // returns Database object
    if (db) {
        readDB().then((res) => {
            readFavs().then((res) => {
                readKnowns().then((res) => {
                    debugStatus ? console.log('finished!') : null;
                }).catch('readKnowns error:', debugStatus ? console.error : null);
            }).catch('readFavs error:', debugStatus ? console.error : null);
        }).catch('readDB error:', debugStatus ? console.error : null);
    }
}

function dropDB() {
    tx.executeSql(
        'DROP DATABASE db.pruebaDb', []);
}

export async function readDB() {
    let response = await db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, favorieSpanishWordID int, knownSpanishWordID int, UNIQUE(favorieSpanishWordID, knownSpanishWordID))', [], (txObj, resultSet) => {
                debugStatus ? console.log('readDB resultSet:', resultSet) : null;
            }, (txObj, error) => debugStatus ? console.log('readDB Error', error) : null
        )
    });

};

export async function readFavs() {
    favorieSpanishWords = [];
    const response = await db.transaction(tx => {
        tx.executeSql(
            'SELECT favorieSpanishWordID FROM items', [], (txObj, { rows: { _array } }) => {
                for (let i = 0; i < _array.length; i++) {
                    _array[i]['favorieSpanishWordID'] != null ? favorieSpanishWords.push(_array[i]['favorieSpanishWordID']) : null;
                }
                debugStatus ? console.log('favorieSpanishWords:', favorieSpanishWords) : null
            }, (txObj, error) => debugStatus ? console.log('readFavs Error', error) : null
        )
    });
};

export async function readKnowns() {
    knownSpanishWords = [];
    let response = await db.transaction(tx => {
        tx.executeSql(
            'SELECT knownSpanishWordID FROM items', [], (txObj, { rows: { _array } }) => {
                for (let i = 0; i < _array.length; i++) {
                    _array[i]['knownSpanishWordID'] != null ? knownSpanishWords.push(_array[i]['knownSpanishWordID']) : null;
                }
                debugStatus ? console.log('knownSpanishWords:', knownSpanishWords) : null
            }, (txObj, error) => debugStatus ? console.log('readKnowns Error', error) : null
        )
    });
};


export function getDictionarySize() {
    return tempSpanishWords.length;
}

export function generateRandomNumber(arr) {
    Math.floor(Math.random() * arr.length)
}

export function getWordObject() {
    if (getDictionarySize === 0)
        return;
    if (!db)
        return;

    let add = false;
    if (spanishWordObject) {
        add = true;
    }
    if (spanishWordObject['id'] === tempSpanishWords[0]['id']) {
        prevSpanishWords.unshift(tempSpanishWords.shift());
    }
    spanishWordObject = tempSpanishWords.shift();
    spanishWordObject['arraySize'] = tempSpanishWords.length;
    spanishWordObject['prevArraySize'] = prevSpanishWords.length;

    add ? prevSpanishWords.unshift(spanishWordObject) : null;
    debugStatus ? console.log('getWordObject:', spanishWordObject) : null;
    return spanishWordObject;
}

export function getPrevWordObject() {
    if (getDictionarySize === 0)
        return;

    if (!db)
        return;

    if (prevSpanishWords.length === 0)
        return spanishWordObject;

    if (spanishWordObject['id'] === prevSpanishWords[0]['id']) {
        tempSpanishWords.unshift(prevSpanishWords.shift());
    }
    spanishWordObject = prevSpanishWords.shift();

    spanishWordObject['arraySize'] = tempSpanishWords.length;
    spanishWordObject['prevArraySize'] = prevSpanishWords.length;

    tempSpanishWords.unshift(spanishWordObject);
    debugStatus ? console.log('getPrevWordObject:', spanishWordObject) : null;
    return spanishWordObject;
}

export function updateWordObject() {
    if (!db)
        return;

    spanishWordObject = {
        "arraySize": spanishWordObject['arraySize'],
        "id": spanishWordObject['id'],
        "isReflexive": spanishWordObject['isReflexive'],
        "isVerb": spanishWordObject['isVerb'],
        "prevArraySize": spanishWordObject['prevArraySize'],
        "spanishWord": spanishWordObject['spanishWord'],
        "translations": spanishWordObject['translations']
    }

    return spanishWordObject;
}

export function isFavorite() {
    if (!db)
        return;

    if (!spanishWordObject)
        return false;

    let id = spanishWordObject['id'];

    return favorieSpanishWords.indexOf(id) >= 0;
}

export function addToFavorites() {
    if (!db)
        return;

    let id = spanishWordObject['id'];
    favorieSpanishWords.indexOf(id) === -1 ? favorieSpanishWords.push(id) : null;

    db.transaction(tx => {
        let sql = `INSERT OR IGNORE INTO items (favorieSpanishWordID) VALUES (?)`;
        tx.executeSql(sql, [id], (txObj, resultSet) => {
            debugStatus ? console.log('addToFavorites resultSet:', resultSet) : null
        }, (txObj, error) => {
            debugStatus ? console.log('addToFavorites Error', error) : null
        })
    });

    return true;
}

export function removeFromFavorites() {
    if (!db)
        return;

    let id = spanishWordObject['id'];
    favorieSpanishWords.indexOf(id) >= 0 ? favorieSpanishWords.pop(id) : null;
    return false;
}


export function isKnown() {
    if (!db)
        return;

    if (!spanishWordObject)
        return false;

    let id = spanishWordObject['id'];
    debugStatus ? console.log(`${id} known:`, knownSpanishWords.indexOf(id) >= 0) : null
    return knownSpanishWords.indexOf(id) >= 0;
}

export function addToKnowns() {
    if (!db)
        return;

    let id = spanishWordObject['id'];
    knownSpanishWords.indexOf(id) === -1 ? knownSpanishWords.push(id) : null;

    db.transaction(tx => {
        let sql = `INSERT OR IGNORE INTO items (knownSpanishWordID) VALUES (?)`;
        tx.executeSql(sql, [id], (txObj, resultSet) => {
            debugStatus ? console.log('addToKnowns resultSet:', resultSet) : null
        }, (txObj, error) => {
            debugStatus ? console.log('addToKnowns Error', error) : null
        })
    });

    return true;
}

export function removeFromKnowns() {
    if (!db)
        return;

    let id = spanishWordObject['id'];
    knownSpanishWords.indexOf(id) >= 0 ? knownSpanishWords.ppopsh(id) : null;
    return false;
}