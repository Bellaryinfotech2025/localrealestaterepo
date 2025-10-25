import axios from "axios";

const API_URL = "http://localhost:8080/api/files/upload";


//  inserting data into database 
export const addData = async (formData) => {
  try {
    // Make POST request with multipart/form-data
    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Error uploading data:", error);
    throw error; // throw to handle it in React
  }



};

//  fetch all data from database 
export const fetchRecords=async()=>{

       try{

                       const response=await axios.get("http://localhost:8080/api/files/all");

                       return response;
       }catch(error){

        console.log("Error fetching records:", error);
        throw error;
       }




}


// deleteing record from database through id

export const deleteRecordsById=async(id)=>{

    try{
               const response=await axios.delete("http://localhost:8080/api/files/delete"+"/"+id)

               return response;
    }catch(error){

      console.log("error while deleting file");
      throw error;

   }
}
