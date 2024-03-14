// components/contactus-form.component.js

import React, { useRef, useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import './deliveryForm.css';
import { useCreateDeliverMutation } from '../../api/apiSlice';
import useDeliveryServices from '../servises/DeliveryServices';


const DeliveryForm = (props) => {
    const [createDeliver] = useCreateDeliverMutation();
    const { setFilteredDeliveries, authUsers } = props;
    const [state, setState] = useState('0');
    let inputAddress = useRef();
    const { selectData } = useDeliveryServices();


    useEffect(() => {
        const script = document.createElement('script');
        const body = document.querySelector('body');
        script.async = false;
        script.textContent = " ymaps.ready(init); function init(){ const suggestView = new ymaps.SuggestView('suggest')}";
        body.appendChild(script);

        return () => body.removeChild(script);
    }, []);


    const postDelivery = (values) => {
        const newDelivery = {
            name: values.name,
            contactName: values.contactName,
            phone: values.phone,
            address: inputAddress.current.value,
            date: values.dateOfDelivery,
            documents: values.documentNumbers,
            description: values.description,
            sender: authUsers.name,
            id: uuidv4()
        };
        createDeliver(newDelivery).unwrap();
    };

    const addressValue = e => setState(e.target.value);
    const selectMessage = state.length < 3 || state === '' ? (<p className="error">Обязательное поле!</p>) : null;
    const errorMessage = state === '0' ? null : selectMessage;

    const input = document.getElementById('suggest');

    return (
        <Formik
            initialValues={{
                name: '',
                contactName: '',
                phone: '',
                dateOfDelivery: '',
                documentNumbers: '',
                description: ''
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .min(2, 'Минимум 2 символа')
                    .required('Обязательное поле!'),
                contactName: Yup.string()
                    .min(2, 'Минимум 2 символа')
                    .required('Обязательное поле!'),
                phone: Yup.string()
                    .matches(/^[7-8]\d{10}$/, 'номер не корректен')
                    .required('Обязательное поле!'),
                dateOfDelivery: Yup.string()
                    .required('Обязательное поле!'),
                documentNumbers: Yup.string()
                    .min(2, 'Минимум 2 символа'),
                description: Yup.string()
                    .min(2, 'Минимум 2 символа')
            })}
            onSubmit={(values, { resetForm }) => {
                if (selectMessage === null && state !== '0') {
                    postDelivery(values);
                    setFilteredDeliveries(false);
                    resetForm();
                    setState('0');
                    input.value = ''
                }
                else {
                    setState('');
                    return null;
                }
            }}
        >

            {({ isSubmitting }) => (
                <Form>
                    <div className="form-group">
                        <label htmlFor="name">Получатель</label>
                        <Field
                            name="name"
                            id="name"
                            className="form-control"
                            type="text"
                            placeholder="введите название организации получателя" />
                        <ErrorMessage className="error" name="name" component="div" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contactName">Контактное лицо получателя</label>
                        <Field
                            name="contactName"
                            id="contactName"
                            className="form-control"
                            type="text"
                            placeholder="укажите контактное лицо получателя" />
                        <ErrorMessage className='error' name="contactName" component='div' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Телефон контактного лица</label>
                        <Field
                            name="phone"
                            id="phone"
                            className="form-control"
                            type="text"
                            placeholder="введите номер телефона получателя" />
                        <ErrorMessage className='error' name="phone" component='div' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="suggest">Адрес доставки</label>
                        <input
                            name="suggest"
                            id="suggest"
                            className="form-control"
                            type="text"
                            onBlur={addressValue}
                            ref={inputAddress}
                            placeholder="укажите адрес доставки" />
                        {errorMessage}
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfDelivery">Дата доставки</label>
                        <Field
                            as="select"
                            name="dateOfDelivery"
                            className="form-control"
                            type="text" >
                            <option  value="">Выберите дату доставки</option>
                            {selectData()}
                        </Field>
                        <ErrorMessage className='error' name="dateOfDelivery" component='div' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="documentNumbers">Документы</label>
                        <Field
                            name="documentNumbers"
                            id="documentNumbers"
                            className="form-control"
                            type="text"
                            placeholder="укажите номера документов" />
                        <ErrorMessage className='error' name="documentNumbers" component='div' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Детали доставки</label>
                        <Field
                            name="description"
                            id="description"
                            as="textarea"
                            className="form-control"
                            type="text"
                            placeholder="Укажите детали доставки (если необходимо)" />
                        <ErrorMessage className='error' name="description" component='div' />
                    </div>
                    <div className="form-group mt-2">
                        <button type="submit" className="btn btn-primary" style={{ "marginBottom": "4px" }}disabled={isSubmitting}>{isSubmitting ? "Добавление..." : "Добавить"}</button>
                        <button type="reset" onClick={() => { setState('0'); input.value = '' }} className="btn btn-secondary" style={{ "marginLeft": "4px" }}>Очистить форму</button>
                    </div>
                </Form>
            )}
        </Formik>
    );

};

export default DeliveryForm;