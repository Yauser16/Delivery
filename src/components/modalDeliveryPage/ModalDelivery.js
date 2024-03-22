
import React, { memo } from 'react';

const ModalDelivery = memo((props) => {
    const { deliveryItem, setDeliveryItem, setState, display, btnDisplay } = props;
   
    return (

        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true"
            style={{ "opacity": "1", "display": `${display}`, "backgroundColor": "rgb(128 128 128 / 0.5)", "--bs-modal-width": "1000px" }}>
            <div className="modal-dialog" style={{ "transform": "none" }}>
                <div className="modal-content" style={{ "opacity": "1", "display": "inline-block" }}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{deliveryItem.place === 'tambov' ? 'Тамбов' : 'Люберцы'} - {deliveryItem.operation === 'inTo' ? 'Поступление' : 'Отгрузка'} - {deliveryItem.date}</h1>
                        <button type="button" onClick={() => setDeliveryItem(null)} className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                    </div>
                    <div className="modal-header">
                        <h4 className="modal-title fs-6">{deliveryItem.goods}</h4>
                    </div>
                    <div className="modal-body" style={{ "wordWrap": "break-word" }}>
                        <ul className="list-group list-group-flush" >
                            <li className="list-group-item">Контрагент: {deliveryItem.name}</li>
                            <li className="list-group-item">Номер машины: {deliveryItem.contactName}</li>
                            <li className="list-group-item">Телефон водителя: {deliveryItem.phone}</li>
                            <li className="list-group-item">Вес груза: {deliveryItem.weight}тн{deliveryItem.items ? `, количество мест: ${deliveryItem.items}` : null}</li> 
                            {deliveryItem.documents ?  <li className="list-group-item">Время операции: {deliveryItem.documents}</li> : null}
                            {deliveryItem.description ?  <li className="list-group-item">Детали доставки: {deliveryItem.description}</li> : null}                          
                            <li className="list-group-item">Оформил: {deliveryItem.sender}</li>
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button type="button" style={{ "display": `${btnDisplay}` }} className="btn btn-primary" onClick={() => setState(2)}>Редактировать</button>
                        <button type="button" className="btn btn-secondary" onClick={() => setDeliveryItem(null)} data-bs-dismiss="modal">Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
    )

});

export default ModalDelivery;