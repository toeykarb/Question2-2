import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const [searchterm, setInput] = useState("");
  const getData = async () => {
    const response = await axios.get("https://api.publicapis.org/categories");
    const body = response.data.categories;

    setData((prevState) => {
      return [...prevState, ...body];
    });
    setFilterData((prevState) => {
      return [...prevState, ...body];
    });
  };

  const searchArray = (str) => {
    console.log(str);
    if (!str) {
      setFilterData((prevState) => {
        return [...data];
      });
      return setInput("");
    }
    const result = data.filter((val, index) => {
      if (val.toLowerCase().includes(str.toLowerCase())) {
        return val;
      }
    });

    setFilterData((prevState) => {
      return [...result];
    });
    setInput(str);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log("filterdata1", filterdata);
  }, [filterdata]);
  return (
    <div className="App">
      <input
        style={{ margin: "20px" }}
        type="text"
        value={searchterm}
        placeholder={`Search`}
        onChange={(e) => searchArray(e.target.value || undefined)}
      />
      <table id="categories">
        <tbody>
          <tr>
            <th>categories</th>
          </tr>
          {filterdata.length != 0 &&
            filterdata.map((ele, index) => {
              return <TRComp ele={ele} index={index} />;
            })}
        </tbody>
      </table>
    </div>
  );
}

const TRComp = ({ ele, index }) => {
  useEffect(() => {
    console.log(ele);
  }, [ele]);
  return (
    <tr key={index}>
      <td key={index}>{ele}</td>
    </tr>
  );
};

export default App;
