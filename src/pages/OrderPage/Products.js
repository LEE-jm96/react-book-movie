import React from 'react'

function Products({ name, imagePath, updateItemCount }) {
    const handleChange = (event) => {
        const currentValue = event.target.value;
        updateItemCount(name, currentValue);
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <img
                style={{ width: '70%' }}
                src={`http://localhost:5000/${imagePath}`}
                alt={`${name} product`}
            />
            <form style={{ marginTop: '10px' }}>
                <label htmlFor={name} style={{ textAlign: 'right', fontWeight: 'bold' }}>{name}</label>
                <input
                    id={name}
                    style={{ marginLeft: 7 }}
                    type="number"
                    name="quantity"
                    min="0"
                    defaultValue={0}
                    onChange={handleChange}
                />
            </form>
        </div>
    )
}

export default Products
