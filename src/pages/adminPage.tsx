
import axios from "axios";
import React, { useState } from "react";
import { Navbar } from "../component/navbar";
import { useAuth } from "../context/authContext";
import { getAllData, getAllUsers } from "../services/dataServices";

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
    // if (user?.role !== "admin") {
    //   throw new Error("user not admin");
    // }
    try {
      const response: any = await getAllData();
      if (!response || typeof response !== "object") {
        throw new Error("Data not available");
      }
      console.log(response)
      const formattedData = Object.keys(response).map((key) => {
        const company = response[key];
        return {
          id: key,
          company_name: company?.company_name || "",
          number_of_products: company?.number_of_products || 0,
          number_of_users: company?.number_of_users || 0,
          percentage: company?.percentage
        };
      });
      setAllData(formattedData);
      console.log(formattedData)
      setCurrentPage(1);
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
          <table>
            <thead>
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
            <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Image</th>
              </tr>
            </thead>
            </table>
            <tbody>
            {users.map((user: any, index: number) => (
            <tr key={user.id}>
              <td> {index + 1}</td>
              <td> {user.email}</td>
              <input type="file" onChange={(e) => handleImageUpload(e, user.id)} />
              {/* Display user's current image */}
              {user.image && <img src={user.image} alt="User Image" />}
            </tr>
        ))}
            </tbody>
       
        </div>
        <div>
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

