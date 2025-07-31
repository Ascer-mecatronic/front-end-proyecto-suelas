import React from 'react'

export const mediaContentReducer = (state = [], action) => {

    switch (action.type) {
        case 'loadPagesContent':
            return action.payload;

        case 'addPage':
            return [
                ...state,
                {
                    ...action.payload,
                }
            ];

        case 'updateProduct':
            return state.map((p) => {
                if (p.id === action.payload.id) {
                    return { ...action.payload };
                }
                return p;
            });

        case 'removePage':
            return state.filter((page) => page.id !== action.payload);


        default:
            return state;
    }

}
