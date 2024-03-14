
import DeliveryForm from "../addForm/DeliveryForm";
import DeliveryList from "../deliveryList/DeliveryList";
import ModalMessageWarning from "../modalDeliveryPage/ModalMessageWarning";
import SearchDeliveries from "../searchDeliveries/SearchDeliveries";
import React, { useState } from "react";
import { Link } from 'react-router-dom';

const FormPage = (props) => {
    const { distribution, deliveryItems, refetch, isLoading, isSuccess, isError, authUsers } = props;
    const [filteredDeliveries, setFilteredDeliveries] = useState(null);
    const deliveries = filteredDeliveries ? filteredDeliveries : deliveryItems;

    return (
        <div className="container mt-5" /* style={{ "maxWidth": "1400px", "margin": "auto" }} */>
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2">
            <div className="p-2 flex-fill col-md-4">
                <div className="form-wrapper">
                    <h4>Добавить доставку</h4>
                    <DeliveryForm
                        authUsers={authUsers}
                        setFilteredDeliveries={setFilteredDeliveries} />
                </div>
            </div>
            <div className="p-2 flex-fill col-md-8">
                <div className="form-wrapper">
                    <div style={{ "display": "flex", "justifyContent": "space-between", "fontSize": "calc(1.275rem + .3vw)"}}>
                        <h4>Последние добавления</h4>
                        {authUsers.admin ? <Link className="btn btn-outline-primary" style={{"height": "40px"}} role="button" to="/admin">Пользователи</Link> : null}
                    </div>
                    <ul className="list-group" style={{ "marginTop": "20px", "paddingLeft": "0px" }}>
                        <SearchDeliveries
                            deliveryItems={deliveryItems}
                            setFilteredDeliveries={setFilteredDeliveries} />
                        <DeliveryList
                            authUsers={authUsers}
                            distribution={distribution}
                            deliveryItems={deliveries}
                            refetch={refetch}
                            setFilteredDeliveries={setFilteredDeliveries}
                            filteredDeliveries={filteredDeliveries}
                            isSuccess={isSuccess}
                            isLoading={isLoading}
                            isError={isError}  />
                        <ModalMessageWarning/>
                    </ul>
                </div>
            </div>

            </div>
           
        </div >
    )
}

export default FormPage;