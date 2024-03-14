
import React, { lazy } from 'react';
import { useParams } from "react-router-dom";
import { useGetAuthQuery } from '../../api/authApiSlice';
import Page404 from '../pages/page404';
import Spinner from '../spinner/Spinner';

const CreatePasswordNewUserPage = lazy(() => import('../pages/createPasswordNewUserPage'));

export const NavigationPasswordPage = (props) => {

    const { id } = useParams();
    const {
        data: auth = [],
        isLoading,
        isError
    } = useGetAuthQuery();

    const candidate = auth.find(item => item.id === id);

    if (isLoading) {
        return (
            <Spinner />
        )
    } else {
        if (isError) {
            return <h5 className="text-center mt-2">Ошибка загрузки</h5>
        }
    }
    if (candidate) {
        return props.children;
    }
    if (!candidate) {
        return (
           <Page404 />
        )
    }

};


const PasswordNewUserPage = () => {
    
    return (
        <NavigationPasswordPage >
            <CreatePasswordNewUserPage />
        </NavigationPasswordPage>
    )
}

export default PasswordNewUserPage;
