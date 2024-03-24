

import React, { useState } from 'react';
import { useGetAuthQuery, useCreateAuthMutation, useDeleteAuthMutation } from '../../api/authApiSlice';
import { useCreateDriverMutation, useDeleteDriverMutation } from '../../api/apiSlice';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import emailjs from '@emailjs/browser';
import "./adminPanel.css";

const AdminPanelPage = props => {

    const { driversNames } = props;
    const navigate = useNavigate();
    const [newDriver, setNewDriver] = useState('');
    const [createDriver] = useCreateDriverMutation();
    const [deleteDriver] = useDeleteDriverMutation();

    const { data: auth = [],
        isLoading,
        isError,
        isFetching,
        refetch } = useGetAuthQuery();

    const [deleteAuth] = useDeleteAuthMutation();

    const onDelete = (id) => {
        auth.forEach(item => {
            if (item.id === id) {
                deleteAuth(id);
            }
        }
        );
    }

    const [createUser] = useCreateAuthMutation();
    if (isLoading) {
        return <h5 className="text-center" style={{ "marginTop": "100px" }}>Загрузка данных...</h5>
    } else {
        if (isError) {
            return <h5 className="text-center mt-2">Ошибка загрузки</h5>
        } else {
            if (isFetching) {
                return <h5 className="text-center mt-2">Запрос данных с сервера...</h5>
            }
        }
    }
    const addNewDriver = (driver) => {
        const newDriver = {
            name: driver,
            id: uuidv4()
        }
        if (newDriver.name !== '')
            createDriver(newDriver).unwrap();            
    }

    const driversListForDelete = () => driversNames.map(i => {
        return <li key={i.id}><button className="dropdown-item" value={i.name} onClick={(e) => { deleteDriver(i.id); e.preventDefault() }} >{i.name}</button></li>
    });

    const status = (id) => {
        return auth.map(item => {
            if (item.id === id && item.password !== '') {
                return "Активен";
            } else {
                if (item.id === id && item.password === '') {
                    return "Приглашение отправлено";
                } else {
                    return null;
                }
            }
        }
        );

    }
    const colorStatus = item => item.password !== "" ? "badge text-bg-success" : "badge text-bg-warning";
    const colorRole = item => item.role === "manager" ? "badge text-bg-info" : item.role === "dl" ? "badge text-bg-primary" : item.role === "dt" ? "badge text-bg-secondary" : 
    item.role === "cl" ? "badge text-bg-dark" : item.role === "ct" ? "badge text-bg-danger" : "none";

    const deliveryRender = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Пользователей пока нет</h5>
        }
        return arr.map((item) => {
            return (
                <li className="list-group-item d-flex justify-content-between align-items-start" key={item.id}>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{item.name}</div>
                        <div className="fw">{item.login}  </div>
                        <div className="smallScreen">
                            роль: <span style={{ "marginRight": "5px" }} className={colorRole(item)}>{item.role}</span>
                            статус: <span style={{ "marginRight": "5px" }} className={colorStatus(item)}>{status(item.id)}</span>
                        </div>
                        <button type="button" id={item.id} disabled={item.admin} className="btn btn-danger small" onClick={e => onDelete(item.id)}>удалить</button>
                    </div>
                    <div className="largeScreen">
                        роль: <span style={{ "marginRight": "5px" }} className={colorRole(item)}>{item.role}</span>
                        статус: <span style={{ "marginRight": "5px" }} className={colorStatus(item)}>{status(item.id)}</span>
                    </div>
                    <button type="button" id={item.id} disabled={item.admin} className="btn btn-danger large" onClick={e => onDelete(item.id)}>удалить</button>
                </li>
            )
        });
    }

    const placeRole = role => role === "manager" ? "all" : role === "dispatcher" ? "all" : role === "dl" ? "lubertsy" : role === "dt" ? "tambov" :
    role === "cl" ? "lubertsy" : role === "ct" ? "tambov" : null;

    const newUser = (value, checkAdmin) => {
        const user = {
            name: value.name,
            login: value.login,
            password: value.password,
            role: value.role,
            place: placeRole(value.role),
            id: uuidv4(),
            admin: checkAdmin
        }
        return user;
    }
    const sendMail = values => {
        const mailDetails = {
            from_name: 'Доставка корпоративным клиентам',
            to_name: values.name,
            message: values.id,
            reply_to: values.login
        }
        emailjs.send('service_q8c12ve', 'template_j3xquk6', mailDetails, 'rIqvNzHJpzq6R_U-h')
            .then((result) => {
                console.log('SUCCESS!', result.text);
            }, (error) => {
                console.log('FAILED...', error.text);
            });
    }
    const addUser = (user) => {
        if (!auth.find(item => item.login === user.login)) {
            createUser(user).unwrap()
                .then(setTimeout(() => refetch(), 500))
                .then(sendMail(user))
        } else { alert(`Пользователь с логином ${user.login} уже есть`) }
    }

    const changeAdmin = (e) => {
        const admin = auth.find(item => item.admin && item.id !== e.target.id);
        createUser(newUser(admin, false)).unwrap()
            .then(deleteAuth(admin.id));
    }

    const adminSelect = (e) => {
        const candidate = auth.find(item => item.id === e.target.id);
        createUser(newUser(candidate, true)).unwrap()
            .then(deleteAuth(candidate.id))
            .then(changeAdmin(e))
    }
    const addAdminOptions = () => {
        return auth.map(item => {
            if (item.password !== '' && !item.admin) {
                return <li key={item.id}><button className="dropdown-item" id={item.id} onClick={(e) => adminSelect(e)}>{item.name}</button></li>
            } else {
                return null;
            }
        });
    }

    const elements = deliveryRender(auth);

    return (
        <>

            <div className="p-5 flex-fill" style={{ "maxWidth": "1000px", "margin": "auto" }}>
                <div className="row justify-content-end" style={{ "marginBottom": "10px" }}>
                    <button onClick={() => navigate(-1)} type="button" style={{ 'width': "230px", "margin": "10px 10px 0 0" }} className="btn btn-outline-primary">Назад, в список доставок</button>
                </div>
                <div className="col-8">
                    <form className="row row-cols-lg-auto g-2 mb-4 align-items-center justify-content-start">
                        <div className="col-12">
                            <div className="input-group">
                                <input type="text" className="form-control" onChange={e => setNewDriver(e.target.value)} onBlur={e => e.target.value = ''} id="inlineFormInputGroupUsername" placeholder="Добавить статус" />
                            </div>
                        </div>
                        <div className="col-12">
                            <button onClick={(e) => { addNewDriver(newDriver); e.preventDefault() }} className="btn btn-success" type="reset">Добавить</button>
                        </div>
                        <div className="dropdown">
                            <button className="btn btn-danger dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Удалить статус
                            </button>
                            <ul className="dropdown-menu">
                                {driversListForDelete()}
                            </ul>
                        </div>
                    </form>
                </div>
                <div className="form-wrapper">
                    <div className="row justify-content-between">
                        <div className="col">
                            <h5>ПОЛЬЗОВАТЕЛИ</h5>
                        </div>
                        <div className="col" >
                            <button type="button" style={{ "float": "right" }} className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Добавить пользователя
                            </button>
                        </div>
                    </div>
                    <ul className="list-group" style={{ "marginTop": "10px" }}>
                        <ol className="list-group list-group-numbered">
                            {elements}
                        </ol>
                    </ul>
                </div>
                <div className="row justify-content-end">
                    <div className="dropdown" style={{ 'width': "230px", "margin": "0px 23px 0 0" }}>
                        <button className="btn btn-outline-dark dropdown-toggle" style={{ 'width': "230px", "margin": "10px 20px 0 0" }} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Назначить администратора
                        </button>
                        <ul className="dropdown-menu">
                            {addAdminOptions().find(item => item !== null) ? addAdminOptions() : (<li className="dropdown-item"><p>Нет кандидатов</p></li>)}
                        </ul>
                    </div>

                </div>
            </div>

            <Formik
                initialValues={{
                    name: '',
                    login: '',
                    role: '',
                    password: ''
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .min(3, 'Минимум 3 символа')
                        .required('Обязательное поле!'),
                    login: Yup.string().email("Не корректный адрес")
                        .required('Обязательное поле!'),
                    role: Yup.string(!"выберите роль")
                        .required('Не выбрана роль')
                })}
                onSubmit={(values, { resetForm }) => {
                    addUser(newUser(values, false));
                    resetForm();
                }}>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <Form>
                                <div className="modal-header">
                                    <h2 className="modal-title fs-5" id="exampleModalLabel">Добаление нового пользователя</h2>
                                    <button type="reset" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="name">Пользователь</label>
                                        <Field
                                            name="name"
                                            id="name"
                                            className="form-control"
                                            type="text"
                                            placeholder="укажите имя и фамилию" />
                                        <ErrorMessage className='error' name="name" component='div' style={{ "color": "red" }} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="login">email</label>
                                        <Field
                                            name="login"
                                            id="login"
                                            className="form-control"
                                            type="text"
                                            placeholder="укажите email пользователя" />
                                        <ErrorMessage className='error' name="login" component='div' style={{ "color": "red" }} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="contactName">Роль пользователя</label>
                                        <Field
                                            name="role"
                                            as="select"
                                            id="role"
                                            className="form-control">
                                            <option value="">выберите роль</option>
                                            <option value="manager">управление</option>
                                            <option value="dispatcher">просмотр</option>                                           
                                            <option value="dl">просмотр Люберцы</option>
                                            <option value="dt">просмотр Тамбов</option>
                                            <option value="cl">охрана Люберцы</option>
                                            <option value="ct">охрана Тамбов</option>
                                        </Field>
                                        <ErrorMessage className='error' name="role" component='div' style={{ "color": "red" }} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="reset" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Пригласить</button>
                                    {/* <button type="submit" className="btn btn-primary">Пригласить</button> */}
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </Formik>
        </>
    )
}


export default AdminPanelPage;