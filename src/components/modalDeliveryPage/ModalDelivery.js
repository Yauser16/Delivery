
import React, { memo, useMemo } from 'react';
import {YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { useGetCoordinatsQuery } from '../../api/geoApiSlice';

const ModalDelivery = memo((props) => {
    const { deliveryItem, setDeliveryItem, setState, display, btnDisplay } = props;
    const {
        data: geo,
        isSuccess,
        isLoading,
        isError
    } = useGetCoordinatsQuery(deliveryItem.address);

    const lowerCorner = useMemo(() => {
        let lowerCorner = geo;
        return lowerCorner;
    }, [geo]);

    let wid = '',
        lon = '';

    if (isSuccess && lowerCorner.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.found !== '0') {
        wid = lowerCorner.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')[1];
        lon = lowerCorner.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')[0];
    }

    const yamap = (wid, lon) => {
        if (isLoading) {
            return <h5 className="text-center mt-5">Карта загружается</h5>
        }
        if (isError) {
            return <h5 className="text-center mt-5">Ошибка загрузки карты</h5>
        }
        if (wid === '' || lon === '') {
            return <h5 className="text-center mt-5">Объект на карте не найден</h5>
        }

        return (
            <YMaps>
                <Map
                    width="100%"
                    defaultState={{
                        center: [wid, lon],
                        zoom: 12,
                        controls: ["zoomControl", "fullscreenControl"],
                    }}
                    modules={["control.ZoomControl", "control.FullscreenControl"]}
                >
                    <Placemark defaultGeometry={[wid, lon]} />
                </Map>
            </YMaps>
        )
    }

    return (

        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true"
            style={{ "opacity": "1", "display": `${display}`, "backgroundColor": "rgb(128 128 128 / 0.5)", "--bs-modal-width": "1000px" }}>
            <div className="modal-dialog" style={{ "transform": "none" }}>
                <div className="modal-content" style={{ "opacity": "1", "display": "inline-block" }}>
                    <div id="map" className="modal-header">
                        {yamap(wid, lon)}
                    </div>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Доставка для: {deliveryItem.name}</h1>
                        <button type="button" onClick={() => setDeliveryItem(null)} className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                    </div>
                    <div className="modal-header">
                        <h4 className="modal-title fs-6">Адрес доставки: {deliveryItem.address}</h4>
                    </div>
                    <div className="modal-body" style={{ "wordWrap": "break-word" }}>
                        <ul className="list-group list-group-flush" >
                            <li className="list-group-item">Контактное лицо: {deliveryItem.contactName}</li>
                            <li className="list-group-item">Телефон контактного лица: {deliveryItem.phone}</li>
                            <li className="list-group-item">Дата доставки: {deliveryItem.date}</li>
                            <li className="list-group-item">Номера докуметов: {deliveryItem.documents}</li>
                            <li className="list-group-item">Детали доставки: {deliveryItem.description}</li>
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