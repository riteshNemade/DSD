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
      flag BOOLEAN
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

export const saveData = async (db, data) => {
  const insertQuery = `
      INSERT OR REPLACE INTO ${tableName} (
        assetName, modelNumber, tagId, category, manufacturers, suppliers, maintenance,
        department, company, location, description, imagepath, flag
      ) VALUES (
        '${data.assetName}',
        '${data.modelNumber}',
        '${data.tagId}',
        '${data.category}',
        '${data.manufacturers}',
        '${data.suppliers}',
        '${data.maintenance}',
        '${data.department}',
        '${data.company}',
        '${data.location}',
        '${data.description}',
        '${data.imagepath}',
        ${data.flag}
      )
    `;

  db.transaction((tx) => {
    tx.executeSql(insertQuery);
  });
};

export async function deleteData(db) {
  const deleteQuery = `DELETE FROM ${tableName} WHERE flag=0`;
  db.transaction((tx) => {
    tx.executeSql(deleteQuery);
  });
}
