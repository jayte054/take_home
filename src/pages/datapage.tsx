import axios from "axios"
import React, { useState } from "react"
import { Navbar } from "../component/navbar";
import { useAuth } from "../context/authContext";
import "./datapage.css"

interface InputField {
    company_name: string;
    number_of_products: number;
    number_of_users: number;
    percentage: number; // Change the type to number
  }

export const DataPage = () => {
    const {user} = useAuth()
    const [inputFields, setInputFields] = useState<InputField[]>([{
        company_name: "",
        number_of_products: 0,
        number_of_users:0, 
        percentage: 0
    }])
    const [percentage, setPercentage] = useState(0)

    const addFields: any = () => {
        return setInputFields([...inputFields, {company_name: "", 
                                                number_of_products: 0,
                                                number_of_users:0,
                                                percentage: 0
                                            }])
    }

    const removeFields: any = (index: number) => {
        if (index === inputFields.length - 1) {
            return
        }
        let data = [...inputFields]
        data.splice(index, 1)
        setInputFields(data)

    }

    const handleformChange = (index: number, event: any) => {
        let data: any = [...inputFields]
        data[index][event.target.name] = event.target.value 
        setInputFields(data)
        calculatePercentage(index)
    }


    const calculatePercentage = (index: number) => {
        const { number_of_users, number_of_products } = inputFields[index];
        const percentage = (number_of_users / number_of_products) * 100 || 0;
        setInputFields((prevInputFields) =>
          prevInputFields.map((field, i) =>
            i === index ? { ...field, percentage: parseFloat(percentage.toFixed(2)) } : field
          )
        );
      };

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            if(!user || !user.uid) {
                throw new Error("user not signed in")
            }
          // Convert inputFields to an array of data objects
          const dataArray = inputFields.map((field) => ({
            ...field,
            percentage: field.percentage / 100, // Convert percentage to a decimal value
            userId : user.uid
          }));
    
          // Send the dataArray to the backend
          const response = await axios.post("http://localhost:3003/create", dataArray);
    
          // Handle the response from the backend (if needed)
          console.log(response.data);
    
        } catch (error) {
          console.log("error saving data");
          throw Error("error saving data");
        }
      };

    return (
        <div>
            <Navbar />
        <div className="datapage_container">
            <h2>Data Entry page</h2>
      <form onSubmit={handleSubmit}>
        {inputFields.map((input, index) => {
            return(
                <div className="data container" key={index}>
                  <div className="datainput">
                    <label className="label">Company Name:</label>
                    <input type = "text"
                           name = "company_name"
                           placeholder="company name"
                           value={input.company_name|| ""}
                           onChange={event => handleformChange(index, event)}
                           className = "datapage-cm"
                           required
                           /><br />
                     <label className="label">Number of Products:</label>
                    <input type = "number"
                           name = "number_of_products"
                           placeholder="number of products"
                           value={input.number_of_products || ""}
                           onChange={event => handleformChange(index, event)}
                           className = "datapage-np"
                           required
                           /><br />
                      <label className="label">Number of Users:</label>
                        <input
                            type="number"
                            name="number_of_users"
                            placeholder="number of users"
                            value={input.number_of_users || ""}
                            onChange={(event) => handleformChange(index, event)}
                            className="datapage-nu"
                            required
                        /> <br />
                        <label className="label">Percentage</label>
                           <input
                            type="number"
                            placeholder="percentage"
                            value={inputFields[index].percentage || 0}
                            className="datapage_percentage"
                            readOnly
                            required
                        /><br />
                    </div>
                    <button type="button" onClick={() => addFields()}>Add set of fields</button><br />
                    <button type="button" onClick={() => removeFields(index)}>Remove set of fields</button><br />
                </div>
            )
        })}
                
                    
        
        <button type="submit">Submit</button>
      </form>
        </div>
        </div>
    )
}