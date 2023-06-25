import { http } from 'api/http';

const getGstr1 = ({ queryKey }: any) => {
    let { limit, offset, query, type } = queryKey[1] || {};
    return http.get("/gstr", {
        params: {
            limit,
            offset,
            type,
            ...query,
        },
    });
};

const createGstrClient = (data: any) => {
    console.log('1');
    return http.post("/gstr", data);
};

const createGstrPromiseClient = (data: any) => {
    return http.post("/promise", data);
}

const clearPending = () => {
    return http.get('/promise/status')
}

export {
    getGstr1,
    createGstrClient,
    createGstrPromiseClient,
    clearPending
}



