/**
 * This file contains functions related to AsyncStorage(localStorage) data handling
 * like setting the data to redux.
 *
 * Also houses the JWT validator
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import initDatabase, { createTable, getLocalData } from "@api/sqlite";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob"; //this was necessary for jwt decode

export async function setLocalUserProfileData(user) {
  const localUserData = {
    firstName: user.first_name,
    lastName: user.last_name,
    username: user.username,
    phone: user.phone,
    email: user.email,
    avatar: user.avatar,
  };
  await AsyncStorage.setItem("userInfo", JSON.stringify(localUserData));
}

/**
 * superuser and admin are outliers so save them locally
 */
export async function setLocalUserRoleAndPermissions(user) {
  const userRole = {
    superuser: user.permissions.superuser === "0" ? false : true,
    admin: user.permissions.admin === "0" ? false : true,
  };
  const userPermissions = {
    createAsset: user.permissions["assets.create"] === "1" || userRole.superuser ? true : false,
  }
  await AsyncStorage.setItem("userRole", JSON.stringify(userRole));
  await AsyncStorage.setItem("userPermissions", JSON.stringify(userPermissions));
}


/**
 * SUPERADMIN will have null as location and secondary_locations
 * There might be a case where secondary location will be null i.e. user has only one location
 */
export async function setUserLocations(user) {
  const location = user.location;     //primary_location
  let secondary_locations = user.secondary_locations;

  if (location !== null) {
    if (secondary_locations !== null) {
      secondary_locations.push(location);
    } else {
      //gives us an array with only one item i.e. primary_location
      secondary_locations = [location];
    }
    await AsyncStorage.setItem(
      "secondary_locations",
      JSON.stringify(secondary_locations)
    );

    //primary location
    await AsyncStorage.setItem("primary_location", JSON.stringify(location));
  }
}
export async function setUserCompany(user) {
  const company = user.company;     //primary_location
  if(company !== null){
    await AsyncStorage.setItem("company", JSON.stringify(company));
  }
}

export async function dispatchLocalDataToRedux(dispatch) {
  //fetch the asyncstorage data
  let userInfo = await AsyncStorage.getItem("userInfo");
  let userRole = await AsyncStorage.getItem("userRole");
  let location = await AsyncStorage.getItem("primary_location");
  let company = await AsyncStorage.getItem("company");
  //parse them
  userInfo = JSON.parse(userInfo);
  userRole = JSON.parse(userRole);
  location = JSON.parse(location);
  company = JSON.parse(company);

  //dispatch them to redux
  if (userRole?.superuser) {
    dispatch({
      type: "SET_USER_TYPE",
      payload: "SUPER",
    });
  } else if (userRole?.admin) {
    dispatch({
      type: "SET_USER_TYPE",
      payload: "ADMIN",
    });
  }
  dispatch({
    type: "SET_LOCATION",
    payload: location || { id: "", name: "" },
  });
  dispatch({
    type: "SET_COMPANY",
    payload: company || { id: "", name: "" },
  });
}

export const wasUserAuthenticated = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      return false;
    } else {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp && decodedToken.exp > currentTime;
    }
  } catch (error) {
    console.error("Error checking token validity:", error);
    return false;
  }
};

//to display the offline data icon
export const setGlobalState = async (dispatch) => {
  const db = await initDatabase();
  await createTable(db);
  const isLocalDataAvailable = await getLocalData(db);
  dispatch({
    type: isLocalDataAvailable.length > 0 ? "ENABLE" : "DISABLE",
  });
};
