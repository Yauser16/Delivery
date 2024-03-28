
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://www.serviceserver.teststudyweb.ru:3002' }),
    tagTypes: ['Delivery', 'Deliveriesprops', 'Drivers', 'Distribution'],
    endpoints: builder => ({
        getDelivery: builder.query({
            query: () => '/delivery?secretKey=YaUseR',
            providesTags: ['Delivery']
        }),
        getDistr: builder.query({
            query: () => '/distrdeliveries?secretKey=YaUseR',
            providesTags: ['Distribution']
        }),
        getProps: builder.query({
            query: () => '/deliveriesprops?secretKey=YaUseR',
            providesTags: ['Deliveriesprops']
        }),
        getDriver: builder.query({
            query: () => '/drivers?secretKey=YaUseR',
            providesTags: ['Drivers']
        }),
        createDeliver: builder.mutation({
            query: deliver => ({
                url: '/delivery?secretKey=YaUseR',
                method: "POST",
                body: deliver
            }),
            invalidatesTags: ['Delivery']
        }),
        createDriver: builder.mutation({
            query: driver => ({
                url: '/drivers?secretKey=YaUseR',
                method: "POST",
                body: driver
            }),
            invalidatesTags: ['Drivers']
        }),
        createDistr: builder.mutation({
            query: distrdelivery => ({
                url: '/distrdeliveries?secretKey=YaUseR',
                method: "POST",
                body: distrdelivery
            }),
            invalidatesTags: ['Distribution']
        }),
        deleteDeliver: builder.mutation({
            query: id => ({
                url: `/delivery/${id}?secretKey=YaUseR`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Delivery']
        }),
        deleteDistr: builder.mutation({
            query: id => ({
                url: `/distrdeliveries/${id}?secretKey=YaUseR`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Distribution']
        }),
        deleteDriver: builder.mutation({
            query: id => ({
                url: `/drivers/${id}?secretKey=YaUseR`,
                method: 'DELETE'
            }),
            invalidatesTags:  ['Drivers']
        })
    })
});

export const { useGetDeliveryQuery, useGetPropsQuery, useGetDriverQuery, useGetDistrQuery, useCreateDeliverMutation, useCreateDriverMutation, useCreateDistrMutation, useDeleteDeliverMutation, useDeleteDistrMutation, useDeleteDriverMutation } = apiSlice;