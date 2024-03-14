
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authSlice = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://www.localhost:3001' }),
    tagTypes: ['Authorization'],
    endpoints: builder => ({
        getAuth: builder.query({
            query: () => '/auth',
            providesTags: ['Authorization']
        }),
        createAuth: builder.mutation({
            query: auth => ({
                url: '/auth',
                method: "POST",
                body: auth
            }),
            invalidatesTags: ['Delivery']
        }),
        deleteAuth: builder.mutation({
            query: id => ({
                url: `/auth/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Authorization']
        }),
    })
});

export const { useGetAuthQuery, useCreateAuthMutation, useDeleteAuthMutation } = authSlice;
