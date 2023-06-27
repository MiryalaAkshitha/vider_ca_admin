import { http } from "api/http";

const createPromise = (data: any) => {
    return http.post("/promise", data);
};

export {
    createPromise,
};