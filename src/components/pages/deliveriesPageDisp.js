
import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import ModalDelivery from '../modalDeliveryPage/ModalDelivery';
import DriverSelections from '../driverSelection/DriverSelection';
import useDeliveryServices from '../servises/DeliveryServices';
import "./deliveriesPage.css";


const DeliveriesPageDisp = memo((props) => {
    const { distribution, driversNames, deliveryItems, refetch, isLoading, isError, authUsers } = props;
    const [filteredDeliveries, setFilteredDeliveries] = useState(deliveryItems);
    const [deliveryItem, setDeliveryItem] = useState(null);
    const { today, checkDate, exportCSV } = useDeliveryServices();
    const [selectedDate, setSelectedDate] = useState(today);

    const onFilteredItems = (data) => {
        if (selectedDate !== "all") {
            let result = data.filter(item => item.date === selectedDate && item.place === authUsers.place);
            setFilteredDeliveries(result);
        }
        if (selectedDate === "all") {
            let resultPlace = data.filter(item => item.place === authUsers.place);
            setFilteredDeliveries(resultPlace);
        }
    }

    const onFilteredDistr = (data) => {
        if (selectedDate !== "all") {
            return data.filter(item => item.date === selectedDate && item.place === authUsers.place);
        }
        if (selectedDate === "all") {
            return data.filter(item => item.place === authUsers.place);
        }
    }
    console.log(authUsers);
    const onRefetch = () => setInterval(() => { refetch(); }, 3000);

    useEffect(() => {
        if (!isLoading) {
            onRefetch();
        }
        return clearInterval(onRefetch);
    },
        // eslint-disable-next-line
        []);
    useEffect(() => {
        onFilteredItems(deliveryItems);        
    },
        // eslint-disable-next-line
        [deliveryItems]);

    if (isLoading) {
        return (
            <div className="spinner-border text-info" style={{ "margin": "100px auto" }} role="status">
                <span className="sr-only"></span>
            </div>
        )
    } else {
        if (isError) {
            return <h5 className="text-center mt-2">Ошибка загрузки</h5>
        }
    }

    const optionsForm = (data) => {
        const datesArr = [];
        data.forEach((item) => {
            datesArr.push(item.date);
        });
        function dateList(item, index, arr) {
            return arr.indexOf(item) === index;
        }
        const filteredDate = datesArr.filter(dateList);
        if (!filteredDate.includes(today())) {
            filteredDate.push(today());
        }
        const dates = filteredDate.map(item => {
            if (checkDate(item)) {
                return <option key={item} value={item}>{item}</option>
            } return null;
        });
        return dates;
    };



    const deliveryRender = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">На эту дату операций нет</h5>
        }
        return arr.map((item) => {
            return (
                <li className="list-group-item d-flex justify-content-between align-items-start" key={item.id}>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{item.date}</div>
                        {item.operation === 'inTo' ? 'Поступление' : 'Отгрузка'}<span className="address" style={{ "fontStyle": "italic", "marginLeft": "10px" }}>
                            {item.goods}, {item.weight}тн{item.operation === 'out' ? `, ${item.name}` : null}{item.documents ? `, ${item.documents}` : null}</span>
                    </div>
                    <button type="button" className="btn btn-link" onClick={() => { setDeliveryItem(item); }}>Детали</button>
                    <DriverSelections distrItem={item} driversNames={driversNames} distribution={distribution} />
                </li>
            )
        });
    }

    const elements = deliveryRender(filteredDeliveries.filter(item => checkDate(item.date) && item.place === authUsers.place));
    

    return (
        <>
            <div className="d-flex mt-5" style={{ "maxWidth": "1400px", "margin": "auto" }}>
                <div className="p-2 flex-fill">
                    <div className="row justify-content-between ">
                        <div className="col-4">
                            <form className="row row-cols-lg-auto g-3 align-items-center" onSubmit={(e) => { onFilteredItems(deliveryItems); e.preventDefault(); }}>
                                <div className="col-12">
                                    <label className="visually-hidden" htmlFor="inlineFormSelectPref">Предпочтение</label>
                                    <select className="form-select" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}/* multiple size="1" */ id="inlineFormSelectPref">
                                        <option value="all">Весь список</option>
                                        {optionsForm(deliveryItems)}
                                    </select>
                                </div>
                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary">Выбрать</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="form-wrapper mt-3">
                        <div style={{ "display": 'flex', "justifyContent": 'center' }}>
                            <h4>СПИСОК ОПЕРАЦИЙ</h4>
                        </div>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            {authUsers.admin ? <Link className="btn btn-outline-primary" style={{ "height": "40px", "width": "150px" }} role="button" to="/admin">Пользователи</Link> : null}
                            <div className="dropdown">
                                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Выгрузить в CSV
                                </button>
                                <ul className="dropdown-menu">
                                    <li>{exportCSV(filteredDeliveries, 'Deliveries', 'Операции на дату')}</li>
                                    <li>{exportCSV(onFilteredDistr(distribution), 'Drivers', 'Обработано')}</li>
                                </ul>
                            </div>
                        </div>
                        <ul className="list-group" style={{ "marginTop": "30px" }}>
                            {elements}
                        </ul>
                    </div>
                </div>
            </div>
            {deliveryItem ? <ModalDelivery display={'block'} btnDisplay={'none'} deliveryItem={deliveryItem} setDeliveryItem={setDeliveryItem} /> : null}
        </>
    )
})
export default DeliveriesPageDisp;
