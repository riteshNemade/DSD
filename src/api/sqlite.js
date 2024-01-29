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
      bay_info VARCHAR,
      asset_name VARCHAR,
      warranty INT,
      order_number VARCHAR,
      purchase_date TEXT,
      eol_date TEXT,
      supplier_id INT,
      supplier VARCHAR,
      purchase_cost REAL,
      company_id INT,
      company VARCHAR,
      notes VARCHAR,
      imagepath VARCHAR,
      flag VARCHAR,
      error VARCHAR
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

export const getLocalData = async (db) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * from ${tableName}`,
        [],
        (_, { rows }) => {
          // Assuming you want to return rows from the query
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
export const getOfflineSyncData = async (db) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * from ${tableName} where flag=0`,
        [],
        (_, { rows }) => {
          // Assuming you want to return rows from the query
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

/******************************************OFFLINE DATA****************************************************/
export const saveDataOffline = async (db, data) => {
  const insertQuery = `
      INSERT OR REPLACE INTO ${tableName} (
        asset_tag, serial, model_id, model, status_id, status, location_id, location, bay_info, asset_name, warranty, order_number, purchase_date, eol_date, supplier_id, supplier, purchase_cost, company_id, company, notes, imagepath, flag) VALUES (
          ${data.assetTag ? `'${data.assetTag}'` : null},
          ${data.serial ? `'${data.serial}'` : null},
          ${data.modelId ? `'${data.modelId}'` : null},
          ${data.model ? `'${data.model}'` : null},
          ${data.statusId ? `'${data.statusId}'` : null},
          ${data.status ? `'${data.status}'` : null},
          ${data.locationId ? `'${data.locationId}'` : null},
          ${data.location ? `'${data.location}'` : null},
          ${data.bay_info ? `'${data.bay_info}'` : null},
          ${data.assetName ? `'${data.assetName}'` : null},
          ${data.warranty ? `'${data.warranty}'` : null},
          ${data.orderNumber ? `'${data.orderNumber}'` : null},
          ${data.purchaseDate ? `'${data.purchaseDate}'` : null},
          ${data.eolDate ? `'${data.eolDate}'` : null},
          ${data.supplierId ? `'${data.supplierId}'` : null},
          ${data.supplier ? `'${data.supplier}'` : null},
          ${data.purchaseCost ? `'${data.purchaseCost}'` : null},
          ${data.company_id ? `'${data.company_id}'` : null},
          ${data.company ? `'${data.company}'` : null},
          ${data.notes ? `'${data.notes}'` : null},
          ${data.imagepath ? `'${data.imagepath}'` : null},
        0
      )
    `;

  db.transaction((tx) => {
    tx.executeSql(insertQuery);
  });
};

export const updateOfflineData = async (db, data) => {
  const updateQuery = `
  UPDATE ${tableName} SET
  asset_tag = '${data.assetTag || null}', 
  serial = '${data.serial || null}', 
  model_id = '${data.modelId || data.model_id || null}', 
  model = '${data.model || null}',  
  status_id = '${data.statusId || data.status_id || null}', 
  status = '${data.status || null}', 
  location_id = '${data.locationId || data.location_id || null}', 
  location = '${data.location || null}', 
  bay_info = '${data.bay_info || null}', 
  asset_name = '${data.assetName || null}',
  warranty = '${data.warranty || null}',
  order_number = '${data.orderNumber || null}',
  purchase_date = '${data.purchaseDate || null}',
  eol_date = '${data.eolDate || null}',
  supplier_id = '${data.supplierId || data.supplier_id || null}', 
  supplier = '${data.supplier || null}', 
  purchase_cost = '${data.purchaseCost || null}',
  company_id = '${data.company_id || null}',
  company = '${data.company || null}',
  notes = '${data.notes || null}',
  imagepath = '${data.imagepath || null}',
  flag = 0,
  error = '${data.error || null}'
  WHERE id = ${data.draftAssetId}
`;

  await db.transaction((tx) => {
    tx.executeSql(updateQuery);
  });
};
export const updateError = async (db, error, id) => {
  const updateQuery = `
  UPDATE ${tableName} SET
  error = '${error || null}'
  WHERE id = ${id};
`;

  await db.transaction((tx) => {
    tx.executeSql(updateQuery);
  });
};

/********************************DRAFT DATA*********************************************/
export const saveDataToDrafts = async (db, data) => {
  const insertQuery = `
      INSERT OR REPLACE INTO ${tableName} (
        asset_tag, serial, model_id, model, status_id, status, location_id, location, bay_info, asset_name, warranty, order_number, purchase_date, eol_date, supplier_id, supplier, purchase_cost, company_id, company, notes, imagepath, flag) VALUES (
          ${data.assetTag ? `'${data.assetTag}'` : null},
          ${data.serial ? `'${data.serial}'` : null},
          ${data.modelId ? `'${data.modelId}'` : null},
          ${data.model ? `'${data.model}'` : null},
          ${data.statusId ? `'${data.statusId}'` : null},
          ${data.status ? `'${data.status}'` : null},
          ${data.locationId ? `'${data.locationId}'` : null},
          ${data.location ? `'${data.location}'` : null},
          ${data.bay_info ? `'${data.bay_info}'` : null},
          ${data.assetName ? `'${data.assetName}'` : null},
          ${data.warranty ? `'${data.warranty}'` : null},
          ${data.orderNumber ? `'${data.orderNumber}'` : null},
          ${data.purchaseDate ? `'${data.purchaseDate}'` : null},
          ${data.eolDate ? `'${data.eolDate}'` : null},
          ${data.supplierId ? `'${data.supplierId}'` : null},
          ${data.supplier ? `'${data.supplier}'` : null},
          ${data.purchaseCost ? `'${data.purchaseCost}'` : null},
          ${data.company_id ? `'${data.company_id}'` : null},
          ${data.company ? `'${data.company}'` : null},
          ${data.notes ? `'${data.notes}'` : null},
          ${data.imagepath ? `'${data.imagepath}'` : null},
        1
      )
    `;

  db.transaction((tx) => {
    tx.executeSql(insertQuery);
  });
};

export const updateDraft = async (db, data) => {
  console.log('Saving: ',data)
  const updateQuery = `
  UPDATE ${tableName} SET
  asset_tag = ${data.assetTag ? `'${data.assetTag}'` : null}, 
  serial = ${data.serial ? `'${data.serial}'` : null}, 
  model_id = ${data.modelId ? `'${data.modelId}'` : null}, 
  model = ${data.model ? `'${data.model}'` : null},  
  status_id = ${data.statusId ? `'${data.statusId}'` : null}, 
  status = ${data.status ? `'${data.status}'` : null}, 
  location_id = ${data.locationId ? `'${data.locationId}'` : null}, 
  location = ${data.location ? `'${data.location}'` : null}, 
  bay_info = ${data.bay_info ? `'${data.bay_info}'` : null}, 
  asset_name = ${data.assetName ? `'${data.assetName}'` : null},
  warranty = ${data.warranty ? `'${data.warranty}'` : null},
  order_number = ${data.orderNumber ? `'${data.orderNumber}'` : null},
  purchase_date = ${data.purchaseDate ? `'${data.purchaseDate}'` : null},
  eol_date = ${data.eolDate ? `'${data.eolDate}'` : null},
  supplier_id = ${data.supplierId ? `'${data.supplierId}'` : null}, 
  supplier = ${data.supplier ? `'${data.supplier}'` : null}, 
  purchase_cost = ${data.purchaseCost ? `'${data.purchaseCost}'` : null},
  company_id = ${data.company_id ? `'${data.company_id}'` : null},
  company = ${data.company ? `'${data.company}'` : null},
  notes = ${data.notes ? `'${data.notes}'` : null},
  imagepath = ${data.imagepath ? `'${data.imagepath}'` : null},
  flag = 1
  WHERE id = ${data.draftAssetId}
`;

  db.transaction((tx) => {
    tx.executeSql(updateQuery);
  });
};
/*******************************************************************************/

export async function deleteById(db, id) {
  const deleteQuery = `DELETE from ${tableName} WHERE id=${id}`;

  db.transaction((tx) => {
    tx.executeSql(deleteQuery);
  });
}
