import { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [receiptId, setReceiptId] = useState(0);
  const [price1, setPrice1] = useState(0);
  const [price2, setPrice2] = useState(0);

  const handleChange = ({ target: { value, name } }) => {
    switch (name) {
      case "name":
        setName(value);
        break;
      case "receiptId":
        setReceiptId(value);
        break;
      case "price1":
        setPrice1(value);
        break;
      case "price2":
        setPrice2(value);
        break;
      default:
        break;
    }
  };

  const createAndDownloadPdf = () => {
    axios
      .post("/create-pdf", { name, receiptId, price1, price2 })
      .then(() => axios.get("fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "newPdf.pdf");
      });
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Name"
        name="name"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Receipt ID"
        name="receiptId"
        onChange={handleChange}
      />{" "}
      <input
        type="number"
        placeholder="Price 1"
        name="price1"
        onChange={handleChange}
      />{" "}
      <input
        type="number"
        placeholder="Price 2"
        name="price2"
        onChange={handleChange}
      />
      <button onClick={createAndDownloadPdf}>Download PDF</button>
    </div>
  );
}

export default App;
