import { useState, useEffect } from "react";
import axios from "axios";

// create a function for fetching that takes the URL neede to fetch
const useAxiosFetch = (dataUrl) => {
  // create the useState hooks needed for the fetching
  const [data, setData] = useState([]);
  const [fetchErr, setFetchErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // create the use Effect hook
  // this will run when page is loaded only (dependecy is empty [])
  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    // function to get the data
    const fecthData = async (url) => {
      // now data is loading
      setIsLoading(true);
      try {
        // we will try to get the data from the provided URL
        const response = await axios.get(url, {
          cancelToken: source.token,
        });
        if (isMounted) {
          // set the data with the response we got
          setData(response.data);
          // set the fetch error to null (no error)
          setFetchErr(null);
        }
        // if error found, get the error message
      } catch (error) {
        if (isMounted) {
          setFetchErr(error.message);
          setData([]);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // calling the fetchData
    fecthData(dataUrl);

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    };

    // return the cleanUp function to clear all things
    return cleanUp;
  }, [dataUrl]);

  // return the 3 useState values set before
  return { data, fetchErr, isLoading };
};

export default useAxiosFetch;
