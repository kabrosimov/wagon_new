import { useMemo, useState } from 'react';
import {
    MRT_EditActionButtons,
    MaterialReactTable,
    // createRow,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tooltip,
    ThemeProvider,
} from '@mui/material';
import {
    QueryClient,
    QueryClientProvider,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import useIndividualsService from '../../services/IndividualsService';
// import { fakeData, usStates } from './makeData';
// import { fakeData, usStates } from './makeData';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme } from '@mui/material/styles';
import { ruRU } from '@mui/x-date-pickers/locales';
// import { ruRU as coreRuRU } from '@mui/material/locale';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';

import { formatDate } from '../../services/dateService';
// import dateFormat from 'dateformat';

const myTheme = createTheme({
    typography: {
        fontFamily: 'sans-serif',
        fontSize: 14,
    },
    // ruRU,
    MRT_Localization_RU,
});

const Example = () => {
    const [validationErrors, setValidationErrors] = useState({});

    // const columns = useMemo(
    //     () => [
    //         {
    //             accessorKey: 'id',
    //             header: 'Id',
    //             enableEditing: false,
    //             size: 80,
    //         },
    //         {
    //             accessorKey: 'firstName',
    //             header: 'First Name',
    //             muiEditTextFieldProps: {
    //                 required: true,
    //                 error: !!validationErrors?.firstName,
    //                 helperText: validationErrors?.firstName,
    //                 //remove any previous validation errors when user focuses on the input
    //                 onFocus: () =>
    //                     setValidationErrors({
    //                         ...validationErrors,
    //                         firstName: undefined,
    //                     }),
    //                 //optionally add validation checking for onBlur or onChange
    //             },
    //         },
    //         {
    //             accessorKey: 'lastName',
    //             header: 'Last Name',
    //             muiEditTextFieldProps: {
    //                 required: true,
    //                 error: !!validationErrors?.lastName,
    //                 helperText: validationErrors?.lastName,
    //                 //remove any previous validation errors when user focuses on the input
    //                 onFocus: () =>
    //                     setValidationErrors({
    //                         ...validationErrors,
    //                         lastName: undefined,
    //                     }),
    //             },
    //         },
    //         {
    //             accessorKey: 'email',
    //             header: 'Email',
    //             muiEditTextFieldProps: {
    //                 type: 'email',
    //                 required: true,
    //                 error: !!validationErrors?.email,
    //                 helperText: validationErrors?.email,
    //                 //remove any previous validation errors when user focuses on the input
    //                 onFocus: () =>
    //                     setValidationErrors({
    //                         ...validationErrors,
    //                         email: undefined,
    //                     }),
    //             },
    //         },
    //         {
    //             accessorKey: 'state',
    //             header: 'State',
    //             editVariant: 'select',
    //             editSelectOptions: usStates,
    //             muiEditTextFieldProps: {
    //                 select: true,
    //                 error: !!validationErrors?.state,
    //                 helperText: validationErrors?.state,
    //             },
    //         },
    //     ],
    //     [validationErrors],
    // );

    //call CREATE hook
    const sex = ['Мужской', 'Женский'];
    const columns = useMemo(
        () => [
            {
                accessorKey: 'id', //access nested data with dot notation
                header: 'ID',
                size: 15,
                enableEditing: false,
            },
            {
                accessorKey: 'surname',
                header: 'Фамилия',
                size: 150,
                muiEditTextFieldProps: {
                    required: true,
                },
            },
            {
                accessorKey: 'first_name',
                header: 'Имя',
                size: 150,
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.first_name,
                    helperText: validationErrors?.first_name,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            first_name: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: 'patronymic',
                header: 'Отчество',
                size: 150,
                muiEditTextFieldProps: {
                    required: true,
                },
            },
            {
                accessorKey: 'start_date',
                // accessorFn: row => new Date(row.start_date),
                id: 'start_date',
                header: 'Дата начала',
                // Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString(),
                Cell: ({ cell }) => formatDate(new Date(cell.getValue())),
                filterFn: 'greaterThan',
                filterVariant: 'date',
                editVariant: 'text',
                size: 100,
                muiEditTextFieldProps: {
                    required: true,
                    type: 'date',
                },
            },
            {
                accessorKey: 'end_date',
                // accessorFn: row => new Date(row.end_date),
                id: 'end_date',
                header: 'Дата окончания',
                // Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString(),
                Cell: ({ cell }) => formatDate(new Date(cell.getValue())),
                // Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString(),
                filterFn: 'greaterThan',
                filterVariant: 'date',
                size: 100,

                muiEditTextFieldProps: {
                    type: 'date',
                    required: true,
                },
            },
            {
                accessorKey: 'sfp',
                header: 'Полное имя',
                size: 150,
                muiEditTextFieldProps: {
                    type: 'text',
                    required: true,
                },
            },
            {
                accessorKey: 'sex',
                header: 'Пол',
                size: 50,
                filterVariant: 'select',
                editVariant: 'select',
                editSelectOptions: sex,
                muiEditTextFieldProps: {
                    // type: 'text',
                    select: true,
                    required: true,
                },
            },
        ],
        [validationErrors],
    );
    const { mutateAsync: createUser, isPending: isCreatingUser } =
        useCreateUser();
    //call READ hook
    const {
        data: fetchedUsers = [],
        isError: isLoadingUsersError,
        isFetching: isFetchingUsers,
        isLoading: isLoadingUsers,
    } = useGetUsers();
    //call UPDATE hook
    const { mutateAsync: updateUser, isPending: isUpdatingUser } =
        useUpdateUser();

    //call DELETE hook
    const { mutateAsync: deleteUser, isPending: isDeletingUser } =
        useDeleteUser();

    //CREATE action
    const handleCreateUser = async ({ values, table }) => {
        const newValidationErrors = validateUser(values);
        if (Object.values(newValidationErrors).some(error => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await createUser(values);
        table.setCreatingRow(null); //exit creating mode
    };

    //UPDATE action
    const handleSaveUser = async ({ values, table }) => {
        const newValidationErrors = validateUser(values);
        if (Object.values(newValidationErrors).some(error => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await updateUser(values);
        table.setEditingRow(null); //exit editing mode
    };

    //DELETE action
    const openDeleteConfirmModal = row => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUser(row.original.id);
        }
    };

    const table = useMaterialReactTable({
        columns,
        data: fetchedUsers,
        muiFilterDatePickerProps: {
            localization: ruRU,
        },
        // initialState: { showColumnFilters: true },
        initialState: {
            columnVisibility: { start_date: false, end_date: false },
        },
        createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
        editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        enableGrouping: true,

        enableMultiSort: true,

        enableColumnOrdering: true,
        // manualFiltering: true,

        getRowId: row => row.id,
        muiToolbarAlertBannerProps: isLoadingUsersError
            ? {
                  color: 'error',
                  children: 'Error loading data',
              }
            : undefined,
        muiTableContainerProps: {
            sx: {
                minHeight: '500px',
            },
        },

        muiTableHeadCellProps: {
            //simple styling with the `sx` prop, works just like a style prop in this example
            sx: {
                fontWeight: 'bold',
                fontSize: '18px',
            },
        },

        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: handleCreateUser,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveUser,
        //optionally customize modal content
        renderCreateRowDialogContent: ({
            table,
            row,
            internalEditComponents,
        }) => (
            <>
                <DialogTitle variant="h3">Новый работник</DialogTitle>
                <DialogContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}
                >
                    {internalEditComponents}{' '}
                    {/* or render custom edit components here */}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons
                        variant="text"
                        table={table}
                        row={row}
                    />
                </DialogActions>
            </>
        ),
        //optionally customize modal content
        renderEditRowDialogContent: ({
            table,
            row,
            internalEditComponents,
        }) => (
            <>
                <DialogTitle variant="h3">Изменить запись</DialogTitle>
                <DialogContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                    }}
                >
                    {internalEditComponents}{' '}
                    {/* or render custom edit components here */}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons
                        variant="icon"
                        table={table}
                        row={row}
                    />
                </DialogActions>
            </>
        ),
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Edit">
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton
                        color="error"
                        onClick={() => openDeleteConfirmModal(row)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <Button
                variant="outlined"
                onClick={() => {
                    table.setCreatingRow(true); //simplest way to open the create row modal with no default values
                    //or you can pass in a row object to set default values with the `createRow` helper function
                    // table.setCreatingRow(
                    //   createRow(table, {
                    //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
                    //   }),
                    // );
                }}
            >
                Новый работник
            </Button>
        ),
        state: {
            isLoading: isLoadingUsers,
            isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
            showAlertBanner: isLoadingUsersError,
            showProgressBars: isFetchingUsers,
        },
        localization: {
            ...MRT_Localization_RU,
        },
    });
    return (
        <ThemeProvider theme={myTheme}>
            {/* <ThemeProvider> */}
            <MaterialReactTable table={table} />
        </ThemeProvider>
    );

    // return <MaterialReactTable table={table} />;
};

//CREATE hook (post new user to api)
function useCreateUser() {
    const queryClient = useQueryClient();
    const { postIndividuals } = useIndividualsService();
    let newId = 0;
    return useMutation({
        mutationFn: async user => {
            console.log(user);

            //send api update request here
            // await new Promise(resolve => setTimeout(resolve, 1000)); //fake api call
            // await new Promise(); //fake api call
            // const pp =postIndividuals(user);
            // return Promise.resolve();
            const pp = await postIndividuals(user);
            // let newId = 0;
            newId = pp.id;
            console.log(newId);
        },
        //client side optimistic update
        onMutate: newUserInfo => {
            queryClient.setQueryData(['users'], prevUsers => [
                ...prevUsers,
                {
                    ...newUserInfo,
                    // id: (Math.random() + 1).toString(36).substring(7),
                    id: newId,
                },
            ]);
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}

//READ hook (get users from api)
function useGetUsers() {
    const { getAllIndividuals } = useIndividualsService();
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            return await getAllIndividuals();
        },
        refetchOnWindowFocus: false,
    });
}

//UPDATE hook (put user in api)
function useUpdateUser() {
    const queryClient = useQueryClient();
    const { updateIndividual } = useIndividualsService();
    return useMutation({
        mutationFn: async user => {
            // console.log(user);
            //send api update request here
            await updateIndividual(user);
        },
        //client side optimistic update
        onMutate: newUserInfo => {
            queryClient.setQueryData(['users'], prevUsers =>
                prevUsers?.map(prevUser =>
                    prevUser.id === newUserInfo.id ? newUserInfo : prevUser,
                ),
            );
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
    const queryClient = useQueryClient();
    const { deleteIndividual } = useIndividualsService();
    return useMutation({
        mutationFn: async userId => {
            //send api update request here
            console.log(userId);
            deleteIndividual(userId);
            // await new Promise(resolve => setTimeout(resolve, 1000)); //fake api call
            // return Promise.resolve();
        },
        //client side optimistic update
        onMutate: userId => {
            queryClient.setQueryData(['users'], prevUsers =>
                prevUsers?.filter(user => user.id !== userId),
            );
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}

const queryClient = new QueryClient();

const ExampleWithProviders = () => (
    //Put this with your other react-query providers near root of your app
    <QueryClientProvider client={queryClient}>
        <Example />
    </QueryClientProvider>
);
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const ExampleWithLocalizationProvider = () => (
    //App.tsx or AppProviders file
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <ExampleWithProviders />
    </LocalizationProvider>
);
export { ExampleWithLocalizationProvider };
export default ExampleWithProviders;

const validateRequired = value => !!value.length;
// const validateEmail = email =>
//     !!email.length &&
//     email
//         .toLowerCase()
//         .match(
//             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//         );

function validateUser(user) {
    return {
        first_name: !validateRequired(user.first_name)
            ? 'First Name is Required'
            : '',
        surname: !validateRequired(user.surname) ? 'Surname is Required' : '',
        // email: !validateEmail(user.email) ? 'Incorrect Email Format' : '',
    };
}
