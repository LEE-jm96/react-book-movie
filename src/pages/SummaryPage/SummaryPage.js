import React, { useState, useContext } from 'react';
import { OrderContext } from '../../contexts/OrderContext';
import './SummaryPage.css';

const SummaryPage = ({ setStep }) => {
    const [checked, setChecked] = useState(false);
    const [orderDatas] = useContext(OrderContext);

    const productArray = Array.from(orderDatas.products);
    const productList = productArray.map(([key, value]) => (
        <li key={key}>
            {key} {value} 매
        </li>
    ));

    const hasOptions = orderDatas.options.size > 0;
    let optionsRender = null;
    if(hasOptions){
        const optionsArray = Array.from(orderDatas.options.keys());
        const optionList = optionsArray.map((key) => <li key={key}>{key}</li>)
        optionsRender = (
            <>
                <h2>Total Options Price: ₩{orderDatas.totals.options}</h2>
                <ul>{optionList}</ul>
            </>
        )
    }

    const handlerSubmit = (event) => {
        event.preventDefault();
        setStep(2);
    }

    return (
        <div>
            <h1 class="title">예매 확인</h1>
            <h2>Total Movies Price: ₩{orderDatas.totals.products}</h2>
            <ul>{productList}</ul>
            {optionsRender}
            <form onSubmit={handlerSubmit}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    id="confirm-checkbox"
                />
                <label htmlFor='confirm-checkbox'>주문하려는 것을 확인하셨나요?</label>
                <br />
                <button disabled={!checked} type="submit">
                    주문 확인
                </button>
            </form>
        </div>
    )
}

export default SummaryPage;


