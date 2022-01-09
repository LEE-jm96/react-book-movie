import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import Products from './Products';
import Options from './Options';
import ErrorBanner from '../../components/ErrorBanner';
import { OrderContext } from '../../contexts/OrderContext';

function Type({ orderType }) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);
    const [orderDatas, updateItemCount] = useContext(OrderContext);

    useEffect(() => {
        loadItems(orderType)
    }, [orderType]);

    const loadItems = async (orderType) => {
        try{
            let response = await axios.get(`http://localhost:5000/${orderType}`);
            setItems(response.data);
        } catch(error){
            setError(true);
        }
    };

    if(error){
        return <ErrorBanner message="에러가 발생했습니다." />
    }

    const ItemComponents = orderType === "products" ? Products : Options;

    const optionItems = items.map((item) => (
        <ItemComponents
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
            updateItemCount={(itemName, newItemCount) => 
                updateItemCount(itemName, newItemCount, orderType)}
        />
    ));

    let orderPrice = orderType === "products"? "10000" : "7000"
    let orderTypeSort = orderType === "products"? "영화" : "옵션"
    return(
        <React.Fragment>
            <h2>{orderTypeSort} 종류</h2>
            <p>standard: ₩{orderPrice}</p>
            <p>
                {orderTypeSort} 총 가격: ₩{orderDatas.totals[orderType]}
            </p>
            <div
                style={{
                    display: "flex",
                    flexDirection: orderType === "options" && "column",
                }}
            >
                {optionItems}
            </div>
        </React.Fragment>
    );
};

export default Type;
