

export const productsReducer = (state = [], action) => {

    switch (action.type) {

        case 'loadingProducts':
            return action.payload;
            
        case 'loadProdsByDetails':
            return action.payload;

        case 'findProdRebajas':
            return action.payload;

        case 'addProduct':
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

        case 'removeProduct':
            return state.filter((prod) => prod.id !== action.payload);


        default:
            return state;
    }
}