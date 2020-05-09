import React,{useContext} from 'react';
import Layout from "../components/Layout"
import AsignarCliente from '../components/pedido/AsignarCliente';
import AsignarProductos from '../components/pedido/AsignarProductos';



const NUEVO_PEDIDO = () => {

    return ( 
        <Layout>
           <h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido </h1>
           <div className="flex justify-center mt-5">
               <div className="w-full max-w-lg">
                    <AsignarCliente />
                    <AsignarProductos />
               </div>
           </div>

        </Layout>
     );
}
 
export default NUEVO_PEDIDO;