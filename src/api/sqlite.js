import * as SQLite from "expo-sqlite";
const tableName = "pending_asset_data";

export default async function initDatabase() {
  try {
    const db = SQLite.openDatabase("dsd.db");
    return db;
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

export async function createTable(db) {
  const query = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      asset_tag VARCHAR,
      serial VARCHAR,
      model_id INT,
      model VARCHAR,
      status_id INT,
      status VARCHAR,
      location_id INT,
      location VARCHAR,
      asset_name VARCHAR,
      warranty INT,
      purchase_date TEXT,
      eol_date TEXT,
      supplier_id INT,
      supplier VARCHAR,
      purchase_cost REAL,
      company VARCHAR,
      notes VARCHAR,
      imagepath VARCHAR,
      flag VARCHAR
    );
  `;
  await db.transaction((tx) => {
    tx.executeSql(query);
  });
}
export async function dropTable(db) {
  const query = `
    DROP TABLE IF EXISTS ${tableName}
  `;
  await db.transaction((tx) => {
    tx.executeSql(query);
  });
}

export const getSyncData = async (db) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * from ${tableName}`,
        [],
        (_, { rows }) => {
          // Assuming you want to return rows from the query
          console.log(rows);
          resolve(rows);
        },
        (_, error) => {
          console.error(error);
          reject(new Error("Error executing SQL query"));
          return true; // Return true to stop the transaction on error
        }
      );
    });
  });
};

export const saveData = async (db, data) => {
  const insertQuery = `
      INSERT OR REPLACE INTO ${tableName} (
        asset_tag, serial, model_id, model, status_id, status, location_id, location, asset_name, warranty, purchase_date, eol_date, supplier_id, supplier, purchase_cost, company, notes, imagepath, flag) VALUES (
        '${data.assetTag || null}',
        '${data.serial || null}',
        '${data.modelId || null}',
        '${data.model || null}',
        '${data.statusId || null}',
        '${data.status || null}',
        '${data.locationId || null}',
        '${data.location || null}',
        '${data.assetName || null}',
        '${data.warranty || null}',
        '${data.purchaseDate || null}',
        '${data.eolDate || null}',
        '${data.supplierId || null}',
        '${data.supplier || null}',
        '${data.purchaseCost || null}',
        '${data.company || null}',
        '${data.notes || null}',
        '${data.imagepath || null}',
        0
      )
    `;

  db.transaction((tx) => {
    tx.executeSql(insertQuery);
  });
};

export const saveDataToDrafts = async (db, data) => {
  const insertQuery = `
      INSERT OR REPLACE INTO ${tableName}  (
        asset_tag, serial, model_id, model, status_id, status, location_id, location, asset_name, warranty, purchase_date, eol_date, supplier_id, supplier, purchase_cost, company, notes, imagepath, flag) VALUES (
        '${data.assetTag || null}',
        '${data.serial || null}',
        '${data.modelId || null}',
        '${data.model || null}',
        '${data.statusId || null}',
        '${data.status || null}',
        '${data.locationId || null}',
        '${data.location || null}',
        '${data.assetName || null}',
        '${data.warranty || null}',
        '${data.purchaseDate || null}',
        '${data.eolDate || null}',
        '${data.supplierId || null}',
        '${data.supplier || null}',
        '${data.purchaseCost || null}',
        '${data.company || null}',
        '${data.notes || null}',
        '${data.imagepath || null}',
        1
      )
    `;

  db.transaction((tx) => {
    tx.executeSql(insertQuery);
  });
};

export const updateDraft = async (db, data) => {
  const updateQuery = `
  UPDATE ${tableName} SET
    assetName = '${data.assetName || null}',
    modelNumber = '${data.modelNumber || null}',
    tagId = '${data.tagId || null}',
    category = '${data.category || null}',
    manufacturers = '${data.manufacturers || null}',
    suppliers = '${data.suppliers || null}',
    maintenance = '${data.maintenance || null}',
    department = '${data.department || null}',
    company = '${data.company || null}',
    location = '${data.location || null}',
    description = '${data.description || null}',
    imagepath = '${data.imagepath || null}',
    flag = 1
  WHERE id = ${data.id}
`;

  db.transaction((tx) => {
    tx.executeSql(updateQuery);
  });
};

export async function deleteData(db) {
  const deleteQuery = `DELETE FROM ${tableName} WHERE flag=0`;
  db.transaction((tx) => {
    tx.executeSql(deleteQuery);
  });
}

export async function deleteById(db, id) {
  const deleteQuery = `DELETE from ${tableName} WHERE id=${id}`;

  db.transaction((tx) => {
    tx.executeSql(deleteQuery);
  });
}
