import useIndividualsService from '../../services/IndividualsService';
import { useState, useEffect } from 'react';
const WagonPage = () => {
    const { getEmplHartman } = useIndividualsService();
    // const ListEmpl = getEmplHartman();
    const [data, setData] = useState([]);
    useEffect(() => {
        loadIndividuals();
    }, []);
    const loadIndividuals = () => {
        // const p = getAllIndividuals();

        getEmplHartman().then(onIndividualsListLoaded);
    };
    const onIndividualsListLoaded = newArr => {
        setData([...newArr]);
    };
    console.log(data);
    return (
        <>
            {/* <Dempl /> */}
            <h2>Hello wagons</h2>
        </>
    );
};
export default WagonPage;
