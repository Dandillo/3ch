import axios from "axios";

const API_URL = "http://176.124.193.22/api/Media";

class MediaService {
  SendImg(file) {
    return axios
        .post(API_URL, file)
      .then((response) => {
        return response.data;
      })
      .catch((err) => console.error(err));
  }
}
const mediaService = new MediaService();
export default mediaService;
