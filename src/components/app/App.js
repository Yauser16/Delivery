
import React, { lazy, Suspense, useMemo, useState } from 'react';
import Spinner from '../spinner/Spinner';
import Navigate from '../navigators/navigateForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useGetDeliveryQuery, useGetDriverQuery, useGetDistrQuery } from '../../api/apiSlice';
import AdminPanelElement from '../navigators/navigationPage';
import PasswordNewUserPage from '../navigators/navigationPasswordPage';
import './App.css';

const Page404 = lazy(() => import('../pages/page404'));

function App() {
  const [authUsers, setAuthUsers] = useState({
    name: '',
    login: '',
    role: '',
    admin: false
  });

  const {
    data: delivery = [],
    refetch: refetchDelivery,
    isSuccess,
    isLoading,
    isFetching,
    isError
  } = useGetDeliveryQuery({ pollingInterval: 3000, refetchOnReconnect: true });

  const deliveryItems = useMemo(() => {
    const deliveryItems = delivery.slice();
    return deliveryItems;
  }, [delivery]);

  const {
    data: drivers = []
  } = useGetDriverQuery();

  const driversNames = useMemo(() => {
    const driverName = drivers.slice();
    return driverName;
  }, [drivers]);

  const {
    data: distrdeliveries = [],
    refetch: refetchDistribution
  } = useGetDistrQuery({ pollingInterval: 3000, refetchOnReconnect: true });

  const distribution = useMemo(() => {
    const distribution = distrdeliveries.slice();
    return distribution;
  }, [distrdeliveries]);

  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Navigate
            authUsers={authUsers}
            setAuthUsers={setAuthUsers}
            driversNames={driversNames}
            deliveryItems={deliveryItems}
            refetchDelivery={refetchDelivery}
            distribution={distribution}
            isLoading={isLoading}
            isError={isError}
            refetchDistribution={refetchDistribution}
            isFetching={isFetching}
            isSuccess={isSuccess}
          />}/>
          <Route path="*" element={<Page404 />} />
          <Route path="/admin" element={<AdminPanelElement
            authUsers={authUsers} />} />
          <Route path="/auth/:id" element={<PasswordNewUserPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
