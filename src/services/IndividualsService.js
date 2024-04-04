// import { useHttp } from '../hooks/http.hook';
// import { compileAsync } from 'sass';
import { useHttp } from '../hooks/http.hooks';
import dateFormat from 'dateformat';

const useIndividualsService = () => {
    const { loading, request, error, clearError } = useHttp();

    const getAllIndividuals = async () => {
        const res = await request(
            'http://172.17.32.22/pg/view/individual',
            'GET',
            null,
            {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.accessToken}`,
                'Identity-Server-Token': 'false',
            },
        );

        if (res) {
            return res.map(_transformIndividuals);
        }
    };
    const postIndividuals = async body => {
        // console.log(body);
        const body1 = {
            surname: body.surname,
            first_name: body.first_name,
            patronymic: body.patronymic,
            start_date: body.start_date,
            end_date: body.end_date,
            sfp: body.sfp,
            sex: body.sex == 'Мужской' ? 0 : 1,
        };
        console.log(body1);
        const res = await request(
            'http://172.17.32.22/pg/individual',
            'POST',
            JSON.stringify(body1),
            {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.accessToken}`,
            },
        );
        if (res) {
            return JSON.parse(res);
        }
    };
    const deleteIndividual = async id => {
        const res = await request(
            `http://172.17.32.22/pg/individual/${id}`,
            'DELETE',
            null,
            {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.accessToken}`,
            },
        );
        return JSON.parse(res);
    };
    const updateIndividual = body => {
        const body1 = {
            surname: body.surname,
            first_name: body.first_name,
            patronymic: body.patronymic,
            start_date: body.start_date,
            end_date: body.end_date,
            sfp: body.sfp,
            sex: body.sex == 'Мужской' ? 0 : 1,
        };
        const id = body.id;
        const res = request(
            `http://172.17.32.22/pg/individual/${id}`,
            'PUT',
            JSON.stringify(body1),
            {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.accessToken}`,
                'Identity-Server-Token': true,
            },
        );
        return res;
    };
    const getIndividual = async id => {
        const res = await request(`http://172.17.32.22/pg/individual/${id}`);

        if (res) {
            return res.map(_transformIndividual);
        }
    };
    // const setFormatDate = datetime => {
    //     console.log(datetime);
    //     const newDate = new Date();
    //     const d = datetime?.getDate();
    //     newDate.setDate(d);
    //     newDate.setMonth(datetime.getMonth());
    //     newDate.setFullYear(datetime.getFullYear());
    //     return newDate;
    // };

    const getEmplHartman = async () => {
        const res = await request(
            'https://172.17.34.40:44320/api',
            'GET',
            null,
            {
                // 'Content-Type': 'application/json',
                Version: '1.0',
                Authorization: `Bearer ${sessionStorage.accessToken}`,
                'x-fetch-all-individuals': '',
            },
        );

        if (res) {
            return res.map(_transformIndividuals);
        }
    };

    const _transformIndividuals = item => {
        // console.log(item.start_date.format('D-MM-YYYY'));
        // console.log(item);
        // const itemStartDate = item.start_date;
        // const itemEndDate = item.end_date;
        return {
            id: item.id,
            surname: item.surname,
            first_name: item.first_name,
            patronymic: item.patronymic,
            // start_date: setFormatDate(item.start_date),
            // end_date: setFormatDate(item.end_date),
            start_date: dateFormat(item.start_date, 'yyyy-mm-dd'),
            end_date: dateFormat(item.end_date, 'yyyy-mm-dd'),
            sfp: item.sfp.toUpperCase(),
            sex: item.sex == 0 ? 'Мужской' : 'Женский',
        };
    };
    const _transformIndividual = item => {
        return {
            id: item.id,
            surname: item.surname,
            first_name: item.first_name,
            patronymic: item.patronymic,
            start_date: item.start_date,
            end_date: item.end_date,
            sfp: item.srp,
            sex: item.sex,
        };
    };
    return {
        loading,
        error,
        clearError,
        getAllIndividuals,
        getIndividual,
        postIndividuals,
        deleteIndividual,
        updateIndividual,
        getEmplHartman,
    };
};

export default useIndividualsService;
