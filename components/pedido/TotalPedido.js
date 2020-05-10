import React from 'react';
const TotalPedido = ({total}) => {
    return (  
        <div className="flex jutstify-between bg-white p-3 mt-5" >
            <h2 className="text-gray-800 text-lg">Total a pagar: </h2>
            <p className="text-gray-800 mt-0 px-2 ">  ${parseFloat(total).toFixed(2)}</p>
        </div>
    );
}
 
export default TotalPedido;