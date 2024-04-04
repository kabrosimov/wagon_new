import { useHttp } from '../hooks/http.hooks';

const useLoginService = () => {
    const { loading, request, error, clearError } = useHttp();

    const appLogin = async body => {
        const res = await request(
            'http://172.17.32.22/login',
            // 'http://172.17.32.22/registration',
            'POST',
            body,
        );
        if (res) {
            // console.log(res.accessToken);
            return res;
            // return JSON.parse(res);
        }
    };
    const appRegister = async body => {
        const res = await request(
            'http://172.17.32.22/registration',
            'POST',
            body,
        );
        if (res) {
            // console.log(res.accessToken);
            return res;
            // return JSON.parse(res);
        }
    };
    const appLogout = async body => {
        const res = await request('http://172.17.32.22/logout', 'POST', body);
        if (res) {
            // console.log(res.accessToken);
            return res;
            // return JSON.parse(res);
        }
    };
    return {
        loading,
        error,
        clearError,
        appLogin,
        appRegister,
        appLogout,
    };
};

export default useLoginService;
