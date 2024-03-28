
/* import { useLocation, Navigate } from 'react-router-dom'; */
import React, { lazy } from 'react';
import { Link } from "react-router-dom";

const AdminPanelPage = lazy(() => import('../pages/adminPanelPage'));

export const NavigationAdminPanel = (props) => {
    const { authUsers } = props;

    if (authUsers.admin) {
        return props.children;
    }
    if (!authUsers.admin) {
        return (
            <div>
                <p style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'marginTop': '30px', 'fontSize': '24px' }}>У Вас нет прав для администрирования приложения</p>
                <p style={{ 'textAlign': 'center',  'marginTop': '30px' }}> <Link to="/" type="button" className="btn btn-outline-primary row">Вход в приложение</Link></p>
            </div>
        )
    }
   
};

const AdminPanelElement = (props) => {
    const { authUsers, driversNames } = props;
    return (
        <NavigationAdminPanel authUsers={authUsers}>
            <AdminPanelPage driversNames={driversNames}/>
        </NavigationAdminPanel>
    )
}

export default AdminPanelElement;



