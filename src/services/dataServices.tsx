import axios from "axios"
import { BASE_URL } from "./authService"

// export const getAllData = async () => {
//     try{
//         await axios.get(`${BASE_URL}/get`)
//     }catch(error){
//         throw new Error("database empty")
//     }
// }

export const getAllData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get`);
      return response.data.data; 
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Error fetching data");
    }
  };

  export const getAllUsers = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/getusers`)
        console.log(response.data.users)
        return response.data.users
    } catch(error) {
        console.log("error fetchting data")
        throw new Error("Error fetciing data")
    }
  }

  export const handleImageUpload = async (email: string, imageFile: File) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("image", imageFile);
  
      const response = await axios.post(`${BASE_URL}/uploadimage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };