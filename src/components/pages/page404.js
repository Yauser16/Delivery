
import { Link } from "react-router-dom";

const Page404 = () => {    
    return (
        <div className="container text-align-center">
            <p style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'marginTop': '30px', 'fontSize': '24px' }}>Страница не найдена</p>
            <p style={{ 'textAlign': 'center',  'marginTop': '30px' }}> <Link to="/" type="button" className="btn btn-outline-primary row" >Вход в приложение</Link></p>
           
          {/*  <p onClick={() => navigate("/")}
                style={{ 'display': 'block', 'textAlign': 'center', 'fontWeight': 'regular', 'fontSize': '24px', 'marginTop': '30px', 'cursor': 'pointer' }}
            >
            </p> */}
        </div>
    )
}

export default Page404;