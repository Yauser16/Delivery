
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://www.localhost:3001' }),
    tagTypes: ['Delivery', 'Deliveriesprops', 'Drivers', 'Distribution'],
    endpoints: builder => ({
        getDelivery: builder.query({
            query: () => '/delivery',
            providesTags: ['Delivery']
        }),
        getDistr: builder.query({
            query: () => '/distrdeliveries',
            providesTags: ['Distribution']
        }),
        getProps: builder.query({
            query: () => '/deliveriesprops',
            providesTags: ['Deliveriesprops']
        }),
        getDriver: builder.query({
            query: () => '/drivers',
            providesTags: ['Drivers']
        }),
        createDeliver: builder.mutation({
            query: deliver => ({
                url: '/delivery',
                method: "POST",
                body: deliver
            }),
            invalidatesTags: ['Delivery']
        }),
        createDriver: builder.mutation({
            query: driver => ({
                url: '/drivers',
                method: "POST",
                body: driver
            }),
            invalidatesTags: ['Drivers']
        }),
        createDistr: builder.mutation({
            query: distrdelivery => ({
                url: '/distrdeliveries',
                method: "POST",
                body: distrdelivery
            }),
            invalidatesTags: ['Distribution']
        }),
        deleteDeliver: builder.mutation({
            query: id => ({
                url: `/delivery/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Delivery']
        }),
        deleteDistr: builder.mutation({
            query: id => ({
                url: `/distrdeliveries/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Distribution']
        }),
        deleteDriver: builder.mutation({
            query: id => ({
                url: `/drivers/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags:  ['Drivers']
        })
    })
});

export const { useGetDeliveryQuery, useGetPropsQuery, useGetDriverQuery, useGetDistrQuery, useCreateDeliverMutation, useCreateDriverMutation, useCreateDistrMutation, useDeleteDeliverMutation, useDeleteDistrMutation, useDeleteDriverMutation } = apiSlice;
