
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const geoSlice = createApi({
    reducerPath: 'geo',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://geocode-maps.yandex.ru/1.x/?format=json&apikey=1e481047-f573-4480-8022-5db688d3508d&geocode=' }),
    tagTypes: ['Geocoder'],
    endpoints: builder => ({
        getCoordinats: builder.query({
            query: address => `${address}&results=1`,
            providesTags: ['Geocoder']
        }),
    })
});
export const { useGetCoordinatsQuery } = geoSlice;
