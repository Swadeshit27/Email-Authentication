import axios from "axios"


type props = {
    method: "get" | 'post' | 'delete' | 'patch'
    value: any
}


export const ResponseHandel = async ({ method, value }: props) => {
    try {
        const { data } = await axios[method]("get", value);
        return data;
    } catch (error) {

    }
}