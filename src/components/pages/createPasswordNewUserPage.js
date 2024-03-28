import { useGetAuthQuery, useCreateAuthMutation, useDeleteAuthMutation } from '../../api/authApiSlice';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useParams, useNavigate } from 'react-router-dom';



const CreatePasswordNewUserPage = () => {
    const { id } = useParams();
     
    const { data: auth = [],
        isLoading,
        isError,
         } = useGetAuthQuery();
    
    const [createUser] = useCreateAuthMutation();
    const [deleteUser] = useDeleteAuthMutation();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="spinner-border text-info" style={{ "margin": "100px auto auto auto" }} role="status">
                <span className="sr-only">{/* Loading... */}</span>
            </div>
        )
    } else {
        if (isError) {
            return <h5 className="text-center mt-2">Ошибка загрузки</h5>
        }
    }
    const newUser = (value) => {
        const newUser = auth.find(item => item.id === id);
        const user = {
            name: newUser.name,
            login: newUser.login,
            password: value.password,
            role: newUser.role,
            place: newUser.place,
            id: uuidv4(),
            admin: newUser.admin
        }
        return user;
    }
    const addUser = (user) => {
        createUser(newUser(user)).unwrap()
            .then(navigate('/'))
            .then(deleteUser(id))
          /*   .catch(setTimeout(() => alert('Что-то пошло не так. Обратитесь в поддержку'), 1000)); */
    }

    return (
        <div style={{ "maxWidth": "1000px", 'marginTop': "50px" }} className="container-fluid">
            <h6 className="col-12">Придуйте и сохраните пароль для входа в приложение доставки</h6>
            <Formik
                initialValues={{
                    password: ""
                }}
                validationSchema={Yup.object({
                    password: Yup.string()
                        .min(6, '!!!')
                        .required('!!!'),
                    passwordTwo: Yup.string()
                        .label('passwordTwo')
                        .required('!!!')
                        .oneOf([Yup.ref('password'), null], '!!!')
                })}
            onSubmit={(values, { resetForm }) => {
                addUser(values);
                resetForm();
            }}>
            <Form className="row row-cols-lg-auto g-3 align-items-center" style={{ 'marginTop': "10px" }}>
                <div className="col-12">
                    <label className="visually-hidden" htmlFor="inlineFormInputGroupUsername">Пароль</label>
                    <div className="input-group">
                        <Field
                            type="text"
                            name="password"
                            className="form-control"
                            id="password"
                            placeholder="Минимум 6 знаков" />
                        <ErrorMessage name="password" component='p' style={{ "color": "red",  "marginLeft": "7px", "fontWeight": "bold" }} />
                    </div>
                </div>
                <div className="col-12">
                    <div className="input-group">
                        <Field
                            type="text"
                            name="passwordTwo"
                            className="form-control"
                            id="passwordTwo"
                            placeholder="Продублируйте пароль" />
                        <ErrorMessage name="passwordTwo" component='p' style={{ "color": "red", "marginLeft": "7px", "fontWeight": "bold" }} />
                    </div>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Сохранить</button>
                </div>
            </Form>
        </Formik>
        </div >
    )
}

export default CreatePasswordNewUserPage;