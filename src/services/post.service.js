import axios from "axios";

const API_URL = "http://176.124.193.22/api/Post";

 class PostService {
   getPostsByTag(tagName, start, end) {
     return axios
       .get(API_URL, {
         params: {
           start: start,
           end: end,
           shortTagName: tagName,
         },
       })
       .then((response) => {
         return response.data;
       })
       .catch((err) => console.error(err));
   }
   sendPostz(tagName, start, end) {
     return axios
       .get(API_URL, {
         params: {
           start: start,
           end: end,
           shortTagName: tagName,
         },
       })
       .then((response) => {
         return response.data;
       })
       .catch((err) => console.error(err));
   }
 }
const postService = new PostService();
export default postService;
