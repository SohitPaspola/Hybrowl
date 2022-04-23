import { useState } from "react";
import axios from "axios";
import classes from "./App.module.css";
import Details from "./Components/Details";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const fetchDataHandler = async () => {
    let randomNumber = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
    setError("")

    try {
      let response = await axios.get(
        `https://swapi.dev/api/people/${randomNumber}/`
      );
      let responseData = await response.data;
      setData((prev) => [...prev, { id: Date.now(), name: responseData.name }]);
    } catch (error) {
      let errorMsg = await error.toJSON();
      setError(errorMsg.message);
    }
  };

  const deleteDataHandler = (id) => {
    let newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  return (
    <div className={classes.main}>
      {error && <p>{error}</p>}
      <div className={classes.btn}>
        <button onClick={fetchDataHandler}>Add Record</button>
      </div>
      <div>
        <h2>Name</h2>
        <Details data={data} deleteHandler={deleteDataHandler} />
      </div>
    </div>
  );
}

export default App;
