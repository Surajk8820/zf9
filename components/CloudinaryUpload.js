import axios from "axios";

export const uploadCloudinary = async (banner) => {
  const formdata = new FormData();
  formdata.append("file", banner);
  formdata.append("upload_preset", "zuraimages");
  formdata.append("cloud_name", "dddnxiqpq");

  const { data } = await axios.post(
    "https://api.cloudinary.com/v1_1/dddnxiqpq/image/upload",
    formdata
  );
  return { url: data?.secure_url };
};