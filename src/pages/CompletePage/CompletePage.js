import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import ErrorBanner from '../../components/ErrorBanner';
import { OrderContext } from '../../contexts/OrderContext';
import './CompletePage.css';

function CompletePage({setStep}) {
    const [OrderDatas, , resetOrderDatas ] = useContext(OrderContext);
    const [orderHistory, setOrderHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        orderCompleted(OrderDatas);
    }, []);

    const orderCompleted =async(OrderDatas) => {
        try{
            let response = await axios.post('http://localhost:5000/order', OrderDatas);
            setOrderHistory(response.data);
            setLoading(false);
        } catch(error){
            setError(true);
        }
    };

    if(error){
        return<ErrorBanner message="에러가 발생했습니다." />
    }

    const orderTable = orderHistory.map((item) => (
        <tr key={item.orderNumber}>
            <td>{item.orderNumber}</td>
            <td>₩{item.price}</td>
        </tr>
    ))

    const handleClick = () => {
        resetOrderDatas();
        setStep(0);
    }

    if(loading){
        return <div>loading</div>
    }
    else{
        return(
            <div style={{ textAlign: "center "}}>
                <h2 style={{backgroundColor: "#22b8cf", color: "white"}}>예매가 성공하였습니다.</h2>
                <h3>지금까지 모든 주문</h3>
                <table style={{ margin: "auto" }}>
                    <tbody>
                        <tr>
                            <th>예매번호</th>
                            <th>총 가격</th>
                        </tr>
                        {orderTable}
                    </tbody>
                </table>
                <br />
                <button onClick={handleClick} >첫 페이지로 돌아가기</button>
            </div>
        );
    };
};

export default CompletePage
