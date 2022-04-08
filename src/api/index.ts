import axios from "axios";

export let instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
});

export const imgApi = {
    getItemsImg() {
        return instance
            .get("/photos")
            .then((resp) => resp.data)
    }
}