

const DeliveryItemPage = (props) => {
    return (
        <div className="card" style={{'width': '18rem;'}}>
            {<img src="..." className="card-img-top" alt="..."/>}
                <div className="card-body">
                    <h5 className="card-title">Заголовок карточки</h5>
                    <p className="card-text">Небольшой пример текста, который должен основываться на названии карты и составлять основную часть содержимого карты.</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Элемент</li>
                    <li className="list-group-item">Второй элемент</li>
                    <li className="list-group-item">Третий элемент</li>
                </ul>
                <div className="card-body">
                    <a href="#" className="card-link">Ссылка карточки</a>
                    <a href="#" className="card-link">Другая ссылка</a>
                </div>
        </div>
    )
}

export default DeliveryItemPage;