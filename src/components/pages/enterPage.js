
import { useGetAuthQuery } from "../../api/authApiSlice";
import { Formik, Field, Form, ErrorMessage } from 'formik';
// import { Navigate } from "react-router-dom";
import * as Yup from 'yup';


const EnterPage = (props) => {
  const { setAuthUsers } = props;
  const { data: auth = [] } = useGetAuthQuery();

  const authorization = (values) => {
    const authVolue = {
      login: values.login,
      password: values.password
    };
    const user = auth.find(item => item.login === authVolue.login && item.password === authVolue.password);
    if (!user) {
      alert('Неверный логин или пароль');
    return;
    }  
      setAuthUsers({
        name: user.name,
        login: user.login,
        role: user.role,
        admin: user.admin

      });
  }
  return (

    <Formik
      initialValues={{
        login: '',
        password: '',

      }}
      validationSchema={Yup.object({
        login: Yup.string()
          .min(7, 'Минимум 7 символов')
          .required('Обязательное поле!'),
        password: Yup.string()
          .min(6, 'Минимум 6 символов')
          .required('Обязательное поле!')
      })}
      onSubmit={(values) => {
        authorization(values);
      }}>
      <Form style={{ 'width': '700px', 'maxWidth': "70%", 'margin': '100px auto auto auto' }}>
        <div className="mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Эл. почта</label>
          <div className="col-sm-10">
            <Field
              type="email"
              className="form-control"
              id="login"
              name="login" />
              <ErrorMessage className="error" name="login" component="div" style={{"color": "red"}} />
          </div>
        </div>
        <div className=" mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Пароль</label>
          <div className="col-sm-10">
            <Field type="password" className="form-control" id="password" name="password" />
            <ErrorMessage className="error" name="password" component="div" style={{"color": "red"}}/>
          </div>
        </div>
        {/* <div className="mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <Field className="form-check-input" type="checkbox" id="gridCheck1" />
              <label className="form-check-label" htmlFor="gridCheck1">
                Пример флажка
              </label>
            </div>
          </div>
        </div> */}
        <button type="submit" className="btn btn-primary">Войти</button>
      </Form>
    </Formik>
  )
}

export default EnterPage;