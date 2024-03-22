
import React, { memo } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import useDeliveryServices from '../servises/DeliveryServices';

const ModalDeliveryForm = memo((props) => {
    const { deliveryItem, setDeliveryItem, createDeliver, onDelete, onDeleteDistribution, setState, display, authUsers } = props;
    const { selectData, selectWeight } = useDeliveryServices();

    const postDelivery = (values) => {
        const newDelivery = {
            place: values.place,
            operation: values.operation,
            name: values.name,
            contactName: values.contactName,
            phone: values.phone,
            date: values.dateOfDelivery,
            goods: values.goods,
            weight: values.weight,
            items: values.items,
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
                place: `${deliveryItem.place}`,
                operation: `${deliveryItem.operation}`,
                name: `${deliveryItem.name}`,
                contactName: `${deliveryItem.contactName}`,
                phone: `${deliveryItem.phone}`,
                dateOfDelivery: `${deliveryItem.date}`,
                goods: `${deliveryItem.goods}`,
                weight: `${deliveryItem.weight}`,
                items: `${deliveryItem.items}`,
                documentNumbers: `${deliveryItem.documents}`,
                description: `${deliveryItem.description}`
            }}

            validationSchema={Yup.object({
                place: Yup.string()
                    .required('Обязательное поле!'),
                operation: Yup.string()
                    .required('Обязательное поле!'),
                name: Yup.string()
                    .min(2, 'Минимум 2 символа')
                    .required('Обязательное поле!'),
                contactName: Yup.string()
                    .min(2, 'Минимум 2 символа')
                    .required('Обязательное поле!'),
                phone: Yup.string()
                    .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'номер не корректен')
                    .required('Обязательное поле!'),
                dateOfDelivery: Yup.string()
                    .required('Обязательное поле!'),
                goods: Yup.string()
                    .max(25, 'Максимум 25 знаков')
                    .required('Обязательное поле!'),
                weight: Yup.string()
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
                                        <label htmlFor="place">Площадка</label>
                                        <Field
                                            as="select"
                                            style={{ "fontWeight": 700 }}
                                            name="place"
                                            className="form-control"
                                            type="text">
                                            <option value="">Выберите площадку</option>
                                            <option key={"1"} value="tambov">Тамбов</option>
                                            <option key={"2"} value="lubertsy">Люберцы</option>
                                        </Field>
                                        <ErrorMessage className="error" name="place" component="div" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="operation">Операция</label>
                                        <Field
                                            as="select"
                                            style={{ "fontWeight": 700 }}
                                            name="operation"
                                            id="operation"
                                            className="form-control"
                                            type="text">
                                            <option value="">Выберите действие</option>
                                            <option key={"1"} value="inTo">Поступление</option>
                                            <option key={"2"} value="out">Отгрузка</option>
                                        </Field>
                                        <ErrorMessage className="error" name="operation" component="div" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Контрагент</label>
                                        <Field
                                            style={{ "fontWeight": 700 }}
                                            name="name"
                                            id="name"
                                            className="form-control"
                                            type="text" />
                                        <ErrorMessage className="error" name="name" component="div" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="contactName">Номер транспортного срества</label>
                                        <Field
                                            name="contactName"
                                            id="contactName"
                                            className="form-control"
                                            type="text" />
                                        <ErrorMessage className='error' name="contactName" component='div' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Телефон водителя</label>
                                        <Field
                                            name="phone"
                                            id="phone"
                                            className="form-control"
                                            type="text" />
                                        <ErrorMessage className='error' name="phone" component='div' />
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
                                        <label htmlFor="goods">Описание груза</label>
                                        <Field
                                            name="goods"
                                            id="goods"
                                            className="form-control"
                                            type="text" />
                                        <ErrorMessage className='error' name="goods" component='div' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="weight">Вес</label>
                                        <Field
                                            as="select"
                                            name="weight"
                                            className="form-control"
                                            type="text">
                                            <option value=">1">менее 1</option>
                                            {selectWeight()}
                                            <option value="20>">более 20</option>
                                        </Field>
                                        <ErrorMessage className='error' name="weight" component='div' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="items">Количество мест</label>
                                        <Field
                                            name="items"
                                            id="items"
                                            className="form-control"
                                            type="text" />
                                        <ErrorMessage className='error' name="items" component='div' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="documentNumbers">Время операции</label>
                                        <Field
                                            name="documentNumbers"
                                            id="documentNumbers"
                                            className="form-control"
                                            type="text" />
                                        <ErrorMessage className='error' name="documentNumbers" component='div' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Детали операциии</label>
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