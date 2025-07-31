import {v4} from "uuid";

export const itemsTotalCalculate = (items) => {
    return items.map(
        i => parseInt(i.quantity) * parseInt(i.item.product.precio))
        .reduce((accumulator,currentValue)=>accumulator+currentValue,0);
}

export const itemAsignId = () =>{
    return v4();
}