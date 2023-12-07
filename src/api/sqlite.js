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
      assetName VARCHAR,
      modelNumber VARCHAR,
      tagId VARCHAR,
      category VARCHAR,
      manufacturers VARCHAR,
      suppliers VARCHAR,
      maintenance VARCHAR,
      department VARCHAR,
      company VARCHAR,
      location VARCHAR,
      description VARCHAR,
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
        assetName, modelNumber, tagId, category, manufacturers, suppliers, maintenance,
        department, company, location, description, imagepath, flag
      ) VALUES (
        '${data.assetName | null}',
        '${data.modelNumber | null}',
        '${data.tagId | null}',
        '${data.category | null}',
        '${data.manufacturers | null}',
        '${data.suppliers | null}',
        '${data.maintenance | null}',
        '${data.department | null}',
        '${data.company | null}',
        '${data.location | null}',
        '${data.description | null}',
        '${data.imagepath | null}',
        0
      )
    `;

  db.transaction((tx) => {
    tx.executeSql(insertQuery);
  });
};

export const saveDataToDrafts = async (db, data) => {
  const insertQuery = `
      INSERT OR REPLACE INTO ${tableName} (
        assetName, modelNumber, tagId, category, manufacturers, suppliers, maintenance,
        department, company, location, description, imagepath, flag
      ) VALUES (
        '${data.assetName || null}',
        '${data.modelNumber || null}',
        '${data.tagId || null}',
        '${data.category || null}',
        '${data.manufacturers || null}',
        '${data.suppliers || null}',
        '${data.maintenance || null}',
        '${data.department || null}',
        '${data.company || null}',
        '${data.location || null}',
        '${data.description || null}',
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
