
import axios from "axios";


const baseURL = "http://localhost:4000/";

export const validateUser = async (token) => {
  try {
    const res = await axios.get(`${baseURL}api/users/login`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return res.data;
  } catch (error) {}
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}api/users/getUsers`);
    return  res.data; // return { data: [...] }
  } catch (error) {
    console.error("getAllUsers failed", error);
    return null;
  }
};

export const getAllSongs = async () => {
  try {
    const res = await axios.get(`${baseURL}api/songs/getAll`);
    return res.data ;
  } catch (error) {
    return null;
  }
};
//api for the geting all the all artitst
export const getAllArtist = async () => {
  try {
    const res = await axios.get(`${baseURL}api/artist/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};
//api for getting all albums
export const getAllAlbums = async () => {
  try {
    const res = await axios.get(`${baseURL}api/album/getAll`);
    return  res.data;
  } catch (error) {
    return null;
  }
};

//api for deleting the member
export const changingUserRole =async (userId,role)=>{
try {
  const res =axios.put(`${baseURL}api/users/updateRole/${userId}`,{data: {role : role }});
  return res;
} catch (error) {
  return null
}

} ;

 export const removeUser = async (userId)=>{
  try {
    const res=axios.delete(`${baseURL}api/users/deleteUser/${userId}`);
    return res;
  } catch (error) {
    return null
  }
 }
