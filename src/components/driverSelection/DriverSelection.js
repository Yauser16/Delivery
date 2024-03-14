
import React, { useState,  memo } from "react";
import { useCreateDistrMutation, useDeleteDistrMutation } from "../../api/apiSlice";
import { v4 as uuidv4 } from 'uuid';

const DriverSelections = memo((props) => {

    const [driver, setDriver] = useState('Водитель не выбран');
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
            name: arrDistr.name,
            contactName: arrDistr.contactName,
            phone: arrDistr.phone,
            address: arrDistr.address,
            place: arrDistr.place,
            date: arrDistr.date,
            documents: arrDistr.documents,
            description: arrDistr.description,
            sender: arrDistr.sender,
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
            setDriver('Водитель отменён'); 
            setTimeout(() => setDriver('Водитель отменён'), 2000);
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
                    Выбор водителя
                </button>
                <ul className="dropdown-menu">
                    <li><button className="dropdown-item" onClick={() => cancelDriver()}>Водитель отменён</button></li>
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