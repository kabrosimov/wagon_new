import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useLoginService from '../../services/LoginService';
import { Link, useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// import authContext from '../app/context';
// import { useAuth } from '../useAuth';
import AuthConsumer from '../useAuth';
import { useLocation } from 'react-router-dom';
// import useHistory

import './form.scss';

const LoginForm = props => {
    const { appLogin, appRegister } = useLoginService();
    const { title, isRegister } = props;
    const styled_div = {
        display: !isRegister ? 'none' : 'block',
        // display: 'none'
    };

    // const context = useContext(authContext);
    const navigate = useNavigate();

    // const { login, authed } = useAuth();
    const { login, authed } = AuthConsumer();
    const { state } = useLocation();

    const submitFunc = values => {
        // let res = {};
        // if (localStorage.accessToken) {
        //     localStorage.clear();
        // }

        if (isRegister) {
            const resPromise = appRegister(JSON.stringify(values));
            resPromise.then(result => {
                if (values.remember) {
                    localStorage.setItem('accessToken', result.accessToken);
                    localStorage.setItem('userName', result.user.login);
                }
                sessionStorage.setItem('accessToken', result.accessToken);
                sessionStorage.setItem('userName', result.user.login);
                login().then(() => {
                    // console.log(authed, state.pathname);
                    navigate(state?.path || '/');
                });
            });
        } else {
            const resPromise = appLogin(JSON.stringify(values));
            resPromise.then(result => {
                if (values.remember) {
                    localStorage.setItem('accessToken', result.accessToken);
                    localStorage.setItem('userName', result.user.login);
                }
                sessionStorage.setItem('accessToken', result.accessToken);
                sessionStorage.setItem('userName', result.user.login);
                login().then(() => {
                    console.log(authed, state);
                    navigate(state?.path || '/');
                });
            });
        }
    };
    return (
        <Formik
            initialValues={{
                login: '',
                password: '',
                email: '',
                remember: false,
            }}
            validationSchema={Yup.object({
                login: Yup.string().required('Обязательное поле'),
                password: Yup.string().required('Обязательное поле'),
                email: Yup.string().email('Неверный формат email'),
            })}
            onSubmit={values => submitFunc(values)}
        >
            <Form className="form">
                <h2>{title}</h2>
                <label htmlFor="name">Ваше имя</label>
                <Field id="name" name="login" type="text" />
                <ErrorMessage className="error" name="name" component="div" />
                <label htmlFor="password">Пароль</label>
                <Field id="password" name="password" type="password" />
                <ErrorMessage
                    className="error"
                    name="password"
                    component="div"
                />
                {/* const d = !isRegister? 'none': 'block' ; */}
                <div style={styled_div}>
                    <label htmlFor="email">email</label>
                    <Field id="email" name="email" type="text" />
                    <ErrorMessage
                        className="error"
                        name="email"
                        component="div"
                    />
                </div>
                <label className="checkbox">
                    <Field name="remember" type="checkbox" />
                    Запомнить меня
                </label>

                <ErrorMessage
                    className="error"
                    name="remember"
                    component="div"
                />
                <button type="submit">Отправить</button>
                {isRegister ? null : (
                    <Link to="/registration" className="link_reg">
                        Регистрация
                    </Link>
                )}
            </Form>
        </Formik>
    );
};

export default LoginForm;
