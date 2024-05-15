import { HttpClient, Api } from "tonapi-sdk-js";

const tonApiClient = () => {
  const token =
    "AFFOSTQDZOETPHQAAAAJUQPLAAXFLUJ6KZA7GZHFOYCADVDZ5FRTXO35LCI3DZFDACDB4ZA";

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

  const client = new Api(httpClient);
  return client;
};

export default tonApiClient;
