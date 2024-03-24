
import { useState, useCallback } from 'react';
import { useCreateDeliverMutation, useDeleteDeliverMutation, useDeleteDistrMutation } from '../../api/apiSlice';
import ModalDelivery from './ModalDelivery';
import ModalDeliveryForm from './modalDeliveryForm';

const ModalDeliveryPage = (props) => {
    const [state, setState] = useState(1);
    const { deliveryItem, setDeliveryItem, distribution, authUsers } = props;
    const [createDeliver] = useCreateDeliverMutation();
    const [deleteDeliver] = useDeleteDeliverMutation();
    const [deleteDistr] = useDeleteDistrMutation();

    const onDelete = useCallback((id) => {
        deleteDeliver(id);
        // eslint-disable-next-line  
    }, []);

    const onDeleteDistribution = (id) => {
        const itemDistr = distribution.find(item => item.check === id);
        if (itemDistr) {
            deleteDistr(itemDistr.id);
        }
    };

    return (
        <div className="mt-5" style={{ 'margin': 'auto', 'maxWidth': '1000px' }}>
            <ModalDelivery
                deliveryItem={deliveryItem}
                setDeliveryItem={setDeliveryItem}
                setState={setState}
                display={state === 1 ? 'block' : state === 2 ? 'none' : "none"}
                btnDisplay={'block'} />
            <ModalDeliveryForm
                authUsers={authUsers}
                deliveryItem={deliveryItem}
                setDeliveryItem={setDeliveryItem}
                createDeliver={createDeliver}
                onDelete={onDelete}
                onDeleteDistribution={onDeleteDistribution}
                setState={setState}
                display={state === 1 ? 'none' : state === 2 ? 'block' : "none"} />
        </div >
    )
}

export default ModalDeliveryPage;