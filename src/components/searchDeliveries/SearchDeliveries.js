
import { Formik, Field, Form } from 'formik';
import { useGetPropsQuery } from '../../api/apiSlice';
import "./searchDeliveries.css";

const SearchDeliveries = (props) => {
    const { deliveryItems, setFilteredDeliveries } = props;
    const {
        data: deliveriesProps = [],

    } = useGetPropsQuery();

    const optionsForm = (data) => {

        return data.map((item) => {
            return (
                <option key={item.id} value={item.name}>{item.label}</option>
            )
        })
    }
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
                        id="options">
                        <option value="">Выберите...</option>
                        {optionsForm(deliveriesProps)}
                    </Field >
                </div>
                <div className="col-sm-7">
                    <label className="visually-hidden" htmlFor="query">Введите запрос</label>
                    <div className="input-group">
                        <Field
                            type="text"
                            className="form-control"
                            name="query"
                            id="query"
                            placeholder="Введите запрос" />
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