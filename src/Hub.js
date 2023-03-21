import { signalR } from signalR
export default class Hub{

    Hub(url = "http://http://176.124.193.22/CommentHub"){
        this.connection = new signalR.HubConnectionBuilder().withUrl(url).build();
        connection.start().then().catch(function (err) {
            return console.error(err.toString());
        });
    }

    initRecieveComment(func){
        this.connection.on("RecieveComment", func);
    }

    initDeleteComment(func){
        this.connection.on("DeleteComment", func);
    }

    SendComment(postId, comment, mediaId = null){
        this.connection.invoke("SendComment", postId, comment, mediaId).catch(function (err) {
            return console.error(err.toString());
        });
    }

    AddToGroup(groupName){
        this.connection.invoke("AddToGroup", groupName).catch(function (err) {
            return console.error(err.toString());
        });
    }

    RemoveFromGroup(groupName){
        this.connection.invoke("RemoveFromGroup", groupName).catch(function (err) {
            return console.error(err.toString());
        });
    }
}