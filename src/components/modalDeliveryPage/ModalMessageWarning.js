import React, { memo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ModalMessageWarning = memo((props) => {  
  const {message, setMessage, onDelete, onDeleteOfFilterDeliveries} = props;
  const deleteDelivery = () => {
onDelete(message.id);
onDeleteOfFilterDeliveries(message.e);
setMessage(false)
  }
       return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Вы уверенны?</h1>
              <button type="button" className="btn-close" onClick={() => setMessage(false)} data-bs-dismiss="modal" aria-label="Закрыть"></button>
            </div>           
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary"  onClick={() => setMessage(false)} data-bs-dismiss="modal">Нет</button>
              <button type="button" className="btn btn-primary" onClick={() => deleteDelivery()} data-bs-dismiss="modal">Да</button>
            </div>
          </div>
        </div>
      </div>    
    )
});

export default ModalMessageWarning;