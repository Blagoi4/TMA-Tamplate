import { useState, useEffect } from "react";
import { HttpClient, Api } from "tonapi-sdk-js";
import { useTonConnect } from "./useTonConnect";

const useTonClientAddress = () => {
  const { address } = useTonConnect();
  const [client, setClient] = useState<Api<never> | null>(null); // Укажите тип данных безопасности

  useEffect(() => {
    const fetchData = async () => {
      const token = "AFFOSTQDZOETPHQAAAAJUQPLAAXFLUJ6KZA7GZHFOYCADVDZ5FRTXO35LCI3DZFDACDB4ZA";
      const httpClient = new HttpClient({
        baseUrl: "https://tonapi.io",
        baseApiParams: {
          headers: {
            "content-length": "104",
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=utf-8",
          },
        },
      });

      const newClient = new Api<never>(httpClient); // Укажите тип данных безопасности
      setClient(newClient);
    };

    fetchData();
  }, []);

  return { client, address };
};

export default useTonClientAddress;
