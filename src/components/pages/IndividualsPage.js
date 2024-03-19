import { useEffect, useState, useMemo } from 'react';
import useIndividualsService from '../../services/IndividualsService';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
// import { MRT_Localization_DE } from 'material-react-table/locales/de';
import {
    useMaterialReactTable,
    MaterialReactTable,
} from 'material-react-table';
// import { createTheme, ThemeProvider, useTheme } from '@mui/material';
// import { deDE } from '@mui/material/locale';
const IndividualsPage = () => {
    const { getAllIndividuals } = useIndividualsService();
    const [data, setData] = useState([]);

    useEffect(() => {
        loadIndividuals();
    }, []);
    const loadIndividuals = () => {
        // const p = getAllIndividuals();

        getAllIndividuals().then(onIndividualsListLoaded);
    };
    const onIndividualsListLoaded = newArr => {
        setData([...newArr]);
    };
    const columns = useMemo(
        () => [
            {
                accessorKey: 'id', //access nested data with dot notation
                header: 'ID',
                size: 15,
            },
            {
                accessorKey: 'surname',
                header: 'Surname',
                size: 150,
            },
            {
                accessorKey: 'first_name',
                header: 'Name',
                size: 150,
            },
            {
                accessorKey: 'patronymic',
                header: 'Patronymic',
                size: 150,
            },
        ],
        [],
    );
    const table = useMaterialReactTable({
        columns,
        data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableGrouping: true,
        enableColumnOrdering: true,
        enableEditing: true,
        getRowId: row => row.id,
        // enableMultiSort: true,
        localization: {
            ...MRT_Localization_RU,
        },
    });
    // const TableView = () => {
    //     return <MaterialReactTable table={table} />;
    // };
    // console.log(MRT_Localization_DE);
    // const theme = useTheme();
    return (
        <>
            {/* <ThemeProvider theme={createTheme(theme, deDE)}> */}
            <MaterialReactTable table={table} />

            {/* </ThemeProvider> */}
        </>
    );
};
export default IndividualsPage;
