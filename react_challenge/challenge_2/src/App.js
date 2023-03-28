import { useState, useEffect } from "react";
import Form from "./Form";
import Table from "./Table";

function App() {
  const API_URL = "https://jsonplaceholder.typicode.com/";
  const [reqType, setReqType] = useState();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_URL}${reqType}`);
        // check if response is bad (not 200)
        if (!response.ok) {
          throw Error("Did not recieve expected data!");
        }
        const data = await response.json();
        // console.log(data);
        setItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, [reqType]);

  return (
    <div className="App">
      <Form reqType={reqType} setReqType={setReqType} />
      <Table items={items}/>
    </div>
  );
}

export default App;
