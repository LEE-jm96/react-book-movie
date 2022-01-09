import React, { useContext } from 'react';
import { OrderContext } from '../../contexts/OrderContext';
import Type from './Type';
import './OrderPage.css';

function OrderPage({ setStep }) {
    const [orderDatas]  = useContext(OrderContext);
    return (
        <div className="MovieTemplate">
            <div className="title">Reserve Movie tickets</div>
            <div>
                <Type orderType="products" />
            </div>
            <div style={{ display: "flex", marginTop: 20 }}>
                <div style={{ width: "50%" }}>
                    <Type orderType="options" />
                </div>
                <div style={{ width: "50%" }}>
                    <h2>Total Price: ₩{orderDatas.totals.total}</h2> <br />
                    <button onClick={() => setStep(1)}>예매</button>
                </div>
            </div>
        </div>
    )
}

export default OrderPage
