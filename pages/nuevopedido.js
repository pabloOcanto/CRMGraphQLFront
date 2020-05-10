import React,{useState,useContext} from 'react';
import {useRouter} from 'next/router';
import { useMutation,gql } from '@apollo/client';
import Swal from 'sweetalert2';
import PedidoContext from '../context/pedidos/PedidoContext';
import Layout from "../components/Layout"
import AsignarCliente from '../components/pedido/AsignarCliente';
import AsignarProductos from '../components/pedido/AsignarProductos';
import ResumenPedido from '../components/pedido/ResumenPedido';
import TotalPedido from '../components/pedido/TotalPedido';


const CREAR_PEDIDO =gql`
    mutation nuevoPedido($input:PedidoInput){
        nuevoPedido(input:$input){
            id
        }
    }
`;



const NUEVO_PEDIDO = () => {

    const [mensaje,guardarMensaje] = useState(null);

    const router = useRouter();

    const context = useContext(PedidoContext);
    
    const {total,productos,cliente} = context;

    const [crearPedido] = useMutation (CREAR_PEDIDO);

    const validarPedido = () => {
        return !productos.every( producto => producto.cantidad > 0 ) || total === 0 || cliente.length === 0 ? " opacity-50 cursor-not-allowed "  : "" ;
    }

    const registrarPedido =async()=>{

        const pedido = productos.map( ({__typename,existencia,...producto})=>producto);
    
        try{
             const {data} = crearPedido({
                 variables:{
                     input:{
                        cliente:cliente.id,
                        total,
                        pedido
                     }
                 }
             });

             router.push("/pedidos");

             Swal.fire({
                title: "Correcto",
                text:"Se creo correctamente el pedido!",
                icon:'success'
            });

   
        }catch(error){
            guardarMensaje( error.message.replace("GraphQL error: ",""));

            setTimeout(()=>{
                guardarMensaje(null);
            },2000);
        }
    }

    const mostrarMensaje = () => {
        return(
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }

    return ( 
        <Layout>
           <h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido </h1>
           {mensaje && mostrarMensaje() }
           <div className="flex justify-center mt-5">
               <div className="w-full max-w-lg">
                    <AsignarCliente />
                    <AsignarProductos />
                    <ResumenPedido />
                    <TotalPedido total={total} />

                    <button
                        type="button"
                        className={` bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${ validarPedido() } `}
                        onClick={ ()=>{registrarPedido()}}
                    >Registrar Pedido</button>

               </div>

           </div>

        </Layout>
     );
}
 
export default NUEVO_PEDIDO;