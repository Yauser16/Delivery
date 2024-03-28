
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authSlice = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://www.serviceserver.teststudyweb.ru:3002' }),
    tagTypes: ['Authorization'],
    endpoints: builder => ({
        getAuth: builder.query({
            query: () => '/auth?secretKey=YaUseR',
            providesTags: ['Authorization']
        }),
        createAuth: builder.mutation({
            query: auth => ({
                url: '/auth?secretKey=YaUseR',
                method: "POST",
                body: auth
            }),
            invalidatesTags: ['Delivery']
        }),
        deleteAuth: builder.mutation({
            query: id => ({
                url: `/auth/${id}?secretKey=YaUseR`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Authorization']
        }),
    })
});

export const { useGetAuthQuery, useCreateAuthMutation, useDeleteAuthMutation } = authSlice;