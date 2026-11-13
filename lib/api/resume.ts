import { API_BASE_URL } from "@/lib/api/config";
import axios from "axios";

const API = `${API_BASE_URL}`;

export async function uploadResume(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const { data } = await axios.post(
    `${API}/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
}