
import React, { useState, useEffect, memo } from 'react';
import useDeliveryServices from '../servises/DeliveryServices';
import "./deliveriesPage.css";


const DeliveriesPageCont = memo((props) => {
    const { deliveryItems, refetch, isLoading, isError, authUsers } = props;
    const [filteredDeliveries, setFilteredDeliveries] = useState(deliveryItems);    
    const { today, checkDate } = useDeliveryServices();    
    const onFilteredItems = (data) => {        
            setFilteredDeliveries(data.filter(item => item.date === today()));
        };        
    
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

   /*  const optionsForm = (data) => {
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
    }; */



    const deliveryRender = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">НА СЕГОДНЯ ВЪЕЗД АВТОТРАНСПОРТА НА ПЛАНИРУЕТСЯ</h5>
        }
        return arr.map((item) => {
            return (
                <li className="list-group-item d-flex justify-content-between align-items-start" key={item.id}>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{item.contactName}</div>
                        {item.operation === 'inTo' ? 'Груженый' : 'Порожний'}<span className="address" style={{ "fontStyle": "italic", "marginLeft": "10px" }}>
                            {item.weight}тн{item.operation === 'inTo' ? `, ${item.goods}` : null}{item.documents ? `, ${item.documents}` : null}</span>
                    </div>                    
                </li>
            )
        });
    }

    const elements = deliveryRender(filteredDeliveries.filter(item => checkDate(item.date) && item.place === authUsers.place));

    return (
        <>
            <div className="d-flex mt-5" style={{ "maxWidth": "1000px", "margin": "auto" }}>
                <div className="p-2 flex-fill">
                    <div className="row justify-content-between ">
                        <div className="col-4">
                            <form className="row row-cols-lg-auto g-3 align-items-center" onSubmit={(e) => { onFilteredItems(deliveryItems); e.preventDefault(); }}>
                                <div className="col-12">
                                   <h5>{today()}</h5>
                                </div>                               
                            </form>
                        </div>
                    </div>
                    <div className="form-wrapper mt-3">
                        <div style={{ "display": 'flex', "justifyContent": 'center', "color": "red"}}>
                            <h4>СЕГОДНЯ ЗАПЛАНИРОВАН ВЪЕЗД:</h4>
                        </div>
                        <ul className="list-group" style={{ "marginTop": "30px" }}>
                            {elements}
                        </ul>
                    </div>
                </div>
            </div>            
        </>
    )
})
export default DeliveriesPageCont;
