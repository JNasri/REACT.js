// we will import one function (fetch) that will help us do all CRUD operations
// based on the options we provide to it

// url=ling to db, optionsObj= craete/update/read/delete
const apiRequest = async (url = "", optionsObj = null, errMsg = null) => {
  try {
    // try this
    const response = await fetch(url, optionsObj);
    // if response is not ok that means there is a conflect between the DB and app
    if (!response.ok) {
      throw Error("Error! Please Reload the App");
    }
  } catch (error) {
    // catch error
    errMsg = error.message;
  } finally {
    // do this either way
    // return weather its null (no error) or has a value (error found )
    return errMsg;
  }
};

// exporting it like its a component
export default apiRequest;
