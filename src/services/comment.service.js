import axios from "axios";

const API_URL = "http://176.124.193.22/api/Comment";

 class CommentsService {
   getCommentsByPostID(id, start, end) {
     return axios
       .get(API_URL+`/${id}/${start}/${end}`)
       .then((response) => {
         return response.data;
       })
       .catch((err) => console.error(err));
   }
   getPostById(id) {
     return axios
       .get(API_URL + `/${id}`, {
       })
       .then((response) => {
         return response.data;
       })
       .catch((err) => console.error(err));
   }
   sendPost(tagName, start, end) {
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
const commentsService = new CommentsService();
export default commentsService;
