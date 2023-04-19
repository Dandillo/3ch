import axios from "axios";

const API_URL = "http://176.124.193.22/api/Tag";

class TagService {
  getTags(start, end) {
    return axios
      .get(API_URL, {
        params: {
          startIndex: start,
          endIndex: end,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => console.error(err));
  }
  getTagByShortName(name) {
    return axios
      .get(API_URL, {
        params: {
          shortName: name,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => console.error(err));
  }
}
const tagService = new TagService();
export default tagService;
