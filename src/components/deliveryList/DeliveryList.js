
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDeleteDeliverMutation, useDeleteDistrMutation } from '../../api/apiSlice';
import ModalDeliveryPage from '../modalDeliveryPage/ModalDeliveryPage';
import ModalMessageWarning from '../modalDeliveryPage/ModalMessageWarning';
import './deliveryList.css';



const DeliveryList = (props) => {
    const { distribution, deliveryItems, refetch, isFetching, isLoading, isSuccess, isError,
        filteredDeliveries, setFilteredDeliveries, authUsers } = props;
    const [deleteDeliver] = useDeleteDeliverMutation();
    const [deleteDistribution] = useDeleteDistrMutation();
    const [deliveryItem, setDeliveryItem] = useState(null);
    const onRefetch = () => setInterval(() => { refetch(); }, 3000);
    const [message, setMessage] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            onRefetch();

        }
        return clearInterval(onRefetch);
        // eslint-disable-next-line  
    }, []);

    const onDelete = (id) => {
        distribution.forEach(item => {
            if (item.check === id) {
                deleteDistribution(item.id);
            }
        });
        deleteDeliver(id);
    };


    const driverInfo = (id) => {
        const name = distribution.find(i => i.check === id);
        if (name === undefined) {
            return "Не обработано";
        } return name.driver;
    }

    if (isLoading) {
        return (
            <div className="spinner-border text-info" style={{ "margin": "100px auto" }} role="status">
                <span className="sr-only">{/* Loading... */}</span>
            </div>
        )
    } else {
        if (isError) {
            return <h5 className="text-center mt-2">Ошибка загрузки</h5>
        } else {
            if (isFetching) {
                return <h5 className="text-center mt-2">Запрос данных с сервера...</h5>
            }
        }
    }
    function onDeleteOfFilterDeliveries(e) {
        let target = e.target.id
        let result = filteredDeliveries ? filteredDeliveries.filter(item => item.id !== target) : null
        setFilteredDeliveries(result);
    }
        
    const deliveryRender = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Операций пока нет</h5>
        }
        return arr.map((item) => {
            return (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold" >{item.date}</div>
                        <div className="fw">{item.goods} - вес: <span className="badge text-bg-light">{item.weight}тн</span></div>
                        <div className="littleScreen" style={{"fontSize": "small"}}>доставляет: <span className="badge text-bg-light">{driverInfo(item.id)}</span></div>
                    </div>
                   <div className="bigScreen" style={{"fontSize": "small"}}>операция: <span className="badge text-bg-light">{driverInfo(item.id)}</span></div>
                    <button type="button" className="btn btn-link " onClick={() => { setDeliveryItem(item); }}>Детали</button>
                    <button type="button" id={item.id} onClick={e => setMessage({id: item.id, e: e})}   className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop"/* className="btn btn-danger " onClick={e => {onDelete(item.id); onDeleteOfFilterDeliveries(e)}} */>удалить</button>
                </li>
            )
        });
    }
    const elements = deliveryItems.length > 10 ? deliveryRender(deliveryItems).slice(-10) : deliveryRender(deliveryItems);

    return (
        <>
            <ol className="list-group">               
               {elements} 
               <ModalMessageWarning
               setMessage={setMessage}
               message={message}
               onDelete={onDelete}
               onDeleteOfFilterDeliveries={onDeleteOfFilterDeliveries}                          
               />                  
            </ol>
            {deliveryItem ? <ModalDeliveryPage
                distribution={distribution}
                deliveryItems={deliveryItems}
                deliveryItem={deliveryItem}
                setDeliveryItem={setDeliveryItem}
                authUsers={authUsers} /> : null}
        </>

    )
}

export default DeliveryList;