import axios from "axios";
import data from "./MOCK_DATA.json";

const seed = async () => {
  await Promise.all(
    data.map((row) => axios.post("http://localhost:4000/api/v1/products", row))
  );
};

seed();
