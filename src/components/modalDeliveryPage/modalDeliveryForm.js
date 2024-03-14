
import React, { memo } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import useDeliveryServices from '../servises/DeliveryServices';

const ModalDeliveryForm = memo((props) => {
    const { deliveryItem, setDeliveryItem, createDeliver, onDelete, onDeleteDistribution, setState, display, authUsers } = props;
    const { selectData } = useDeliveryServices();

    const postDelivery = (values) => {
        const newDelivery = {
            name: values.name,
            contactName: values.contactName,
            phone: values.phone,
            address: values.address,
            date: values.dateOfDelivery,
            documents: values.documentNumbers,
            description: values.description,
            sender: `${deliveryItem.sender}, изменил: ${authUsers.name}`,
            id: uuidv4()
        };
        setState(null);
        onDeleteDistribution(deliveryItem.id);
        createDeliver(newDelivery).unwrap();
        onDelete(deliveryItem.id);
        setDeliveryItem(null);
    }
    return (
        <Formik
            initialValues={{
                name: `${deliveryItem.name}`,
                contactName: `${deliveryItem.contactName}`,
                phone: `${deliveryItem.phone}`,
                address: `${deliveryItem.address}`,
                dateOfDelivery: `${deliveryItem.date}`,
                documentNumbers: `${deliveryItem.documents}`,
                description: `${deliveryItem.description}`
            }}

            validationSchema={Yup.object({
                name: Yup.string()
                    .min(2, 'Минимум 2 символа')
                    .required('Обязательное поле!'),
                contactName: Yup.string()
                    .min(2, 'Минимум 2 символа')
                    .required('Обязательное поле!'),
                phone: Yup.string()
                    .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'номер не корректен')
                    .required('Обязательное поле!'),
                address: Yup.string()
                    .min(2, 'Минимум 2 символа')
                    .required('Обязательное поле!'),
                dateOfDelivery: Yup.string()
                    .required('Обязательное поле!'),
                documentNumbers: Yup.string()
                    .min(2, 'Минимум 2 символа'),
                description: Yup.string()
                    .min(2, 'Минимум 2 символа')
            })}
            onSubmit={(values, { /* setSubmitting, */ resetForm }) => {
                postDelivery(values);
                resetForm();
            }}>

            {({ isValid, dirty, isSubmitting }) => (
                <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true"
                    style={{ "opacity": "1", "display": `${display}`, "backgroundColor": "rgb(128 128 128 / 0.5)", "--bs-modal-width": "1000px" }}>
                    <div className="modal-dialog" style={{ "transform": "none" }}>
                        <div className="modal-content" style={{ "opacity": "1", "display": "inline-block" }}>
                            <Form>
                                <div className="modal-body" style={{ "wordWrap": "break-word" }}>
                                    <div className="form-group">
                                        <label htmlFor="name">Получатель</label>
                                        <Field
                                            style={{ "fontWeight": 700 }}
                                            name="name"
                                            id="name"
                                            className="form-control"
                                            type="text" />
                                        <ErrorMessage className="error" name="name" component="div" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="contactName">Контактное лицо получателя</label>
                                        <Field
                                            name="contactName"
                                            id="contactName"
                                            className="form-control"
                                            type="text" />
                                        <ErrorMessage className='error' name="contactName" component='div' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Телефон контактного лица</label>
                                        <Field
                                            name="phone"
                                            id="phone"
                                            className="form-control"
                                            type="text" />
                                        <ErrorMessage className='error' name="phone" component='div' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Адрес доставки</label>
                                        <Field
                                            name="address"
                                            id="address"
                                            className="form-control"
                                            type="text"
                                        />
                                        {<ErrorMessage className='error' name="address" component='div' />}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="dateOfDelivery">Дата доставки</label>
                                        <Field
                                            as="select"
                                            style={{ "fontWeight": 700 }}
                                            name="dateOfDelivery"
                                            className="form-control"
                                            type="text">
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
                                            type="text" />
                                        <ErrorMessage className='error' name="documentNumbers" component='div' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Детали доставки</label>
                                        <Field
                                            name="description"
                                            id="description"
                                            as="textarea"
                                            className="form-control"
                                            type="text" />
                                        <ErrorMessage className='error' name="description" component='div' />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary" disabled={!(isValid && dirty) || isSubmitting}>Сохранить</button>
                                        <button type="button" className="btn btn-secondary" style={{ "marginLeft": "10px" }} onClick={() => setDeliveryItem(null) /* setState(1) */}>Отмена</button>
                                    </div>
                                </div>
                            </Form>


                        </div>
                    </div>
                </div>
            )}
        </Formik >
    );
});

export default ModalDeliveryForm;