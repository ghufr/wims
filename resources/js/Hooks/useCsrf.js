import axios from "axios";
import { useEffect } from "react";

const useCsrf = () => {
  useEffect(() => {
    const fetch = async () => {
      await axios.get("/sanctum/csrf-cookie");
    };

    fetch();
  }, []);
};

export default useCsrf;
