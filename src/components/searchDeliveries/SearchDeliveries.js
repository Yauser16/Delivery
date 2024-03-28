
import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { useGetPropsQuery } from '../../api/apiSlice';
import "./searchDeliveries.css";

const SearchDeliveries = (props) => {
    const { deliveryItems, setFilteredDeliveries } = props;
    const {
        data: deliveriesProps = [],

    } = useGetPropsQuery();
    const [state, setState] = useState(null);

    const optionsForm = (data) => {

        return data.map((item) => {
            return (
                <option key={item.id} value={item.name}>{item.label}</option>
            )
        })
    }
    const optionsValue = (data) => {
if (data) {
    return data.map(item => {
        return (
            <option key={item} value={item}>{item}</option>
        )
    })
}
   return null;     
    }
    
    const searchOptions = (data) => {        
        const arrOpt = [];
        deliveryItems.forEach((item) => {
           arrOpt.push(item[data]);
        });
        function dateList(item, index, arr) {
            return arr.indexOf(item) === index;
        }
        const filteredDate = arrOpt.filter(dateList);
        setState(filteredDate);
    };
 /*    console.log(state); */
    return (
        <Formik
            initialValues={{
                options: '',
                query: ''
            }}
            onSubmit={(values, { setSubmitting }) => {
                let result = values.options === '' ? null : deliveryItems.filter(item => item[values.options] === values.query);
                setFilteredDeliveries(result);
                setSubmitting(false);
            }}
        >
            <Form className="row g-2 mb-2">
                <div className="col-sm">
                    <label className="visually-hidden" htmlFor="options">Предпочтение</label>
                    <Field
                        as="select"
                        className="form-select"
                        name="options"
                        id="options"
                        onFocus={() => setState(null)}
                        onBlur={e => searchOptions(e.target.value)}>                            
                        <option value="">Выберите...</option>
                        {optionsForm(deliveriesProps)}                       
                    </Field >
                </div>
                <div className="col-sm-7">
                    <label className="visually-hidden" htmlFor="query">Введите запрос</label>
                    <div className="input-group">
                    <Field
                        as="select"
                        className="form-select"
                        name="query"
                        id="query">
                        <option value="">Выберите...</option>
                       {optionsValue(state)}
                    </Field >                      
                    </div>
                </div>
                <div className="col-sm">
                    <div className=" d-flex">
                        <button type="submit" className="btn btn-primary">Найти</button>
                        <button type="reset" className="btn btn-secondary ml-3" onClick={() => setFilteredDeliveries(null)}>Очистить</button>
                    </div>
                </div>
            </Form>
            {/*    <span className="badge bg-danger rounded-pill" onClick={() => onDelete(item.id)}>удалить</span> */}
        </Formik >

    )
}

export default SearchDeliveries;