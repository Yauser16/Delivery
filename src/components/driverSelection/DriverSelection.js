
import React, { useState,  memo } from "react";
import { useCreateDistrMutation, useDeleteDistrMutation } from "../../api/apiSlice";
import { v4 as uuidv4 } from 'uuid';

const DriverSelections = memo((props) => {

    const [driver, setDriver] = useState('Не обработано');
    const { driversNames, distrItem, distribution } = props;
    const [createDistribution] = useCreateDistrMutation();
    const [deleteDistribution] = useDeleteDistrMutation();


    // useEffect(() => 
    //      stateItem(),
    //     // eslint-disable-next-line
    //     []);

    const driversList = (arg) => driversNames.map(i => {
        return <li key={i.id}><button className="dropdown-item" value={i.name} onClick={(e) => addNewDistribution(arg, e)} >{i.name}</button></li>
    });
    const addNewDistribution = (arrDistr, e) => {
        const newDistr = {
            place: arrDistr.place,
            operation: arrDistr.operation,
            name: arrDistr.name,
            contactName: arrDistr.contactName,
            phone: arrDistr.phone,
            date: arrDistr.dateOfDelivery,
            goods: arrDistr.titleOfGoods,
            weight: arrDistr.weight,
            items: arrDistr.items,
            documents: arrDistr.documentNumbers,
            description: arrDistr.description,
            sender: arrDistr.name,
            driver: e.target.value,
            check: arrDistr.id,
            id: uuidv4()
        }
        if (driver.driver) {
            deleteDistribution(driver.id);
        }
        createDistribution(newDistr).unwrap();
        setDriver(newDistr);
    };
    
    const cancelDriver = () => {

        if (driver.id) {
            deleteDistribution(driver.id);
            setDriver('Отмена'); 
            setTimeout(() => setDriver('Отмена'), 2000);
        } 
    };
    const stateItem = () => {
        if (distribution) {
            distribution.forEach(objItem => {
                if (objItem.check === distrItem.id) {
                    setDriver(objItem);
                } else {
                    return;
                }
            });
        } return;
    };
    setTimeout(() => stateItem(), 1000);

    return (
        <>
            <div className="dropdown">
                <button className="btn btn-Light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Статус
                </button>
                <ul className="dropdown-menu">
                    <li><button className="dropdown-item" onClick={() => cancelDriver()}>Отмена</button></li>
                    {driversList(distrItem)}
                </ul>
            </div>
            <div >
                <p style={{ "marginTop": "0.5rem", "marginBottom": "0", "width": "170px" }}>{driver.driver ? driver.driver : driver}</p>
            </div>
        </>
    )
})

export default DriverSelections;