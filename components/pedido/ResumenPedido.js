import React,{useContext} from 'react';
import PedidoContext from '../../context/pedidos/PedidoContext';
import DetallePedido from "./DetallePedido"

const ResumenPedido = () => {

    const context = useContext(PedidoContext);
    const {productos} = context;

    console.log(productos);
    return ( 
        <>

        <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">Resumen Pedido</p>
        { productos.length > 0 ? 
            (
                productos.map( producto => (
                    < DetallePedido key={producto.id} producto={producto}/>
                ))     
            ) :

            (
                <p className="mt-6 text-sm"> No hay pedido </p>
            )

        }

    </>
        
    );
}
 
export default ResumenPedido;