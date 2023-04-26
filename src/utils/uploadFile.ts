import axios from "axios";
export const uploadFile = async (params: { file: File; url: string }) => {
  const { file, url } = params;

  const response = await axios.put(url, file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response);
  return response.status;
};
