
import axios from "axios";
import React, { useState } from "react";
import { Navbar } from "../component/navbar";
import { useAuth } from "../context/authContext";
import { getAllData, getAllUsers } from "../services/dataServices";
import "./admin.css"

export const AdminPage = () => {
  const { user } = useAuth();
  const [allData, setAllData] = useState<any[]>([]);
  const [users, setAllUsers] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<any>("")

  const recordsPerPage = 15;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const nPage = Math.ceil(allData.length / recordsPerPage);
  const records = allData.slice(firstIndex, lastIndex);

  const changeCurrentPage = (id: number) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFetchAllData = async (e: any) => {
    console.log("it")
    try {
    console.log("it")
      await fetchAllData(e);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const fetchAllData = async (e: any) => {
    e.preventDefault();
    
    try {
      const data = await getAllData();
      console.log(data)
      const extractedData: any = {};

      // Iterate through the data and extract company_name and number_of_products
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const item = data[key];
          if (item) {
            if (item.company_name !== undefined && item.number_of_products !== undefined) {
              extractedData[key] = { company_name: item.company_name, number_of_products: item.number_of_products };
            } else {
              console.log(`Missing company_name or number_of_products for key ${key}`);
            }
          } else {
            console.log(`Invalid data for key ${key}`);
          }
        }
      }
      
      console.log(extractedData);
      // for(const key in response) {
      //   if(response.hasOwnProperty(key)) {
      //     const {company_name} = response[key]
      //     myResponse[key] = {company_name}
      //   }
      // }

      // console.log(myResponse)
      // if (!response || typeof response !== "object") {
      //   throw new Error("Data is not in object format");
      // }
      // const formattedData = Object.keys(response).map((key) => {
      //   const user = response[key];
      //   return {
      //     id: key,
      //     company_name: user?.company_name || "",
      //     number_of_users: user?.number_of_users || 0,
      //     number_of_products: user?.number_of_products || 0,
      //     percentage: user?.percentage || 0,
      //   };
      // });
      // console.log(formattedData)
      // setAllData(formattedData)
    } catch (error:any) {
      throw new Error(error.message);
    }
  };

  

  const fetchAllUsers = async(e: any) => {
    e.preventDefault()
    try{
        const response = await getAllUsers()
        console.log(typeof response)
        if (!response || typeof response !== "object") {
            throw new Error("Data is not in object format");
          }
          const formattedData = Object.keys(response).map((key) => {
            const user = response[key];
            return {
              id: key,
              email: user?.email || "",
              image: user?.image || null
            };
          });
      console.log(formattedData)
          
        setAllUsers(formattedData)
    }catch(error: any){
        console.log(error.message)
        throw new Error( error.message)
    }
  }

  const handleFetchAllUsers = (e: any) => {
    try{
    return fetchAllUsers(e)
    }catch(error){
        throw new Error("no users")
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, userId: string) => {
    try {
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("No image selected");
      }
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      // Replace 'your-upload-url' with the actual URL to upload the image to your backend server
      const uploadResponse = await axios.post("your-upload-url", formData);

      if (uploadResponse.status === 200) {
        // Image upload successful, update the user's image in the state
        setAllUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, image: uploadResponse.data.imageUrl } : user
          )
        );
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <h1>Admin Page</h1>
        <div>
          <button type="button" onClick={ handleFetchAllData}>
            Fetch All Data
          </button>
          
          <button>Compare</button>
        </div>
        <div>
          <table className="table-container">
            <thead className= "table-header">
              <tr>
                <th>ID</th>
                <th>Company Name</th>
                <th>Number of Products</th>
                <th>Number of Users</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {records.map((data: any, index: number) => (
                <tr key={data.id}>
                  <td>{index + 1}</td>
                  <td>{data.company_name}</td>
                  <td>{data.number_of_products}</td>
                  <td>{data.number_of_users}</td>
                  <td>{data.percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="button" onClick={handleFetchAllUsers}>
            Fetch Users
         </button>
        <div>
            <table className="table-container">
            <thead className="table-header">
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
            {users.map((user: any, index: number) => (
            <tr key={user.id}>
              <td> {index + 1}</td>
              <td> {user.email}</td>
              <td><input type="file" onChange={(e) => handleImageUpload(e, user.id)} /></td>
              {/* Display user's current image */}
              {user.image && <img src={user.image} alt="User Image" />}
            </tr>
        ))}
            </tbody>
            </table>
       
        </div>
        <div className="pagination-container">
          <button onClick={prevPage}>Previous</button>
          {Array.from({ length: nPage }, (_, i) => (
            <button key={i} onClick={() => changeCurrentPage(i + 1)}>
              {i + 1}
            </button>
          ))}
          <button onClick={nextPage}>Next</button>
        </div>
      </div>
    </div>
  );
};

