

import { Children, lazy } from 'react';


const FormPage = lazy(() => import('../pages/formPage'));
const EnterPage = lazy(() => import('../pages/enterPage'));
const DeliveriesPage = lazy(() => import('../pages/deliveriesPage'));
const DeliveriesPageDisp = lazy(() => import('../pages/deliveriesPageDisp'));
const DeliveriesPageCont = lazy(() => import('../pages/deliveriesPageCont'));

export const NavigationElement = (props) => {
    const { authUsers } = props;


    if (authUsers.role === '') {
        return Children.map(props.children, (item, i) => {
            if (i !== 0) {
                return;
            }
            return item;
        });
    }
    if (authUsers.role === 'manager') {
        return Children.map(props.children, (item, i) => {
            if (i !== 1) {
                return;
            }
            return item;
        });
    }
    if (authUsers.role === 'dispatcher') {
        return Children.map(props.children, (item, i) => {
            if (i !== 2) {
                return;
            }
            return item;
        });
    }
    if (authUsers.role === 'dl' || authUsers.role === 'dt') {
        return Children.map(props.children, (item, i) => {
            if (i !== 3) {
                return;
            }
            return item;
        });
    }
    if (authUsers.role === 'cl' || authUsers.role === 'ct') {
        return Children.map(props.children, (item, i) => {
            if (i !== 4) {
                return;
            }
            return item;
        });
    }
};
const Navigate = (props) => {
    const { driversNames, deliveryItems, refetchDelivery, distribution, isLoading, isError, authUsers,
        setAuthUsers, refetchDistribution, isFetching, isSuccess } = props;
    return (
        <NavigationElement authUsers={authUsers}>
            <EnterPage setAuthUsers={setAuthUsers} />
            <FormPage
                authUsers={authUsers}
                distribution={distribution}
                deliveryItems={deliveryItems}
                refetch={refetchDistribution}
                isFetching={isFetching}
                isLoading={isLoading}
                isSuccess={isSuccess}
                isError={isError} />
            <DeliveriesPage
                authUsers={authUsers}
                driversNames={driversNames}
                deliveryItems={deliveryItems}
                refetch={refetchDelivery}
                distribution={distribution}
                isLoading={isLoading}
                isError={isError} />
            <DeliveriesPageDisp
                authUsers={authUsers}
                driversNames={driversNames}
                deliveryItems={deliveryItems}
                refetch={refetchDelivery}
                distribution={distribution}
                isLoading={isLoading}
                isError={isError} />
            <DeliveriesPageCont
                authUsers={authUsers}                
                deliveryItems={deliveryItems}
                refetch={refetchDelivery}                
                isLoading={isLoading}
                isError={isError} />
        </NavigationElement>

    )
};

export default Navigate;
