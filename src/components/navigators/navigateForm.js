

import { Children, lazy } from 'react';


const FormPage = lazy(() => import('../pages/formPage'));
const EnterPage = lazy(() => import('../pages/enterPage'));
const DeliveriesPage = lazy(() => import('../pages/deliveriesPage'));

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
        </NavigationElement>

    )
};

export default Navigate;
