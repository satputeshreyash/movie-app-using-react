//this page basically deals with the fetching of data for the detail page

import { useEffect, useState } from "react"
import axios from "axios"

const useFetchDetails = (endpoint) => 
    
{
    const [data,setData] = useState()
     const [loading,setLoading] = useState(false)

    const fetchData = async () => {
        try {
          setLoading(true)
          const response = await axios.get(endpoint);
          setLoading(false)
          setData(response.data)
          //console.log(response.data)
        } catch (error) {
          console.log("error",error);
        }
      };

      useEffect(()=>{
        fetchData()
      },[endpoint])

      return {data,loading}
}

export default useFetchDetails