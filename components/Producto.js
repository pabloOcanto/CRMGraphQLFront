import React from 'react';
import Router from 'next/router';
import { gql, useMutation } from '@apollo/client'


const ELIMINAR_PRODUCTO = gql`
    mutation eliminarPedido($id: ID!) {
        eliminarPedido(id:$id)
    }
`;

const GET_PRODUCTOS = gql`
    query obtenerProductos{
        obtenerProductos{
            id
            nombre
            existencia
            precio
        }
    }
`;

const Producto = ({producto}) => {


    const {nombre,precio,existencia,id}= producto;
    
    const editarProducto = ()=>{
        Router.push({
            pathname: "/editarproducto/[pid]",
            query: {id} 
        })
    }

    const [eliminarProducto]=useMutation(ELIMINAR_PRODUCTO,{
        update(cache){

            const {obtenerProductos} = cache.readQuery({query:GET_PRODUCTOS});

            cache.write({
                query:GET_PRODUCTOS,
                data:{
                    obtenerProductos:obtenerProductos.filter( productos => pedidoCache.id !== pedido.id)
                }
            });
        }
    });

    const eliminarProductoSeleccionado = async()=>{

        try {
            const {data} = await eliminarProducto({
                variables:{
                    id
                }
            });


        } catch (error) {
            
        }

    }



    return ( 
            <div className="w-1/3 px-4 py-2">
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img className="w-full" src="data:image/jpeg;base64,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" alt="Sunset in the mountains"/>
                    <div className="px-6 py-4">
                        <div className="font-bold text-md uppercase mb-2">{nombre}</div>
                        <p className="text-gray-700 text-base">$: {precio}</p>
                        <p className="text-gray-700 text-base">stock {existencia}</p>
                    </div>
                    <div className="px-6 py-2">
                            <button
                                type="button"
                                className="bg-gray-800 w-md-full rounded mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                                onClick={()=>editarProducto()}>
                            editar</button>

                            <button
                                type="button"
                                className="bg-red-800 w-md-full rounded mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                                onClick={()=>eliminarProductoSeleccionado()}>
                            eliminar</button>

                    </div>
                </div>
            </div>
   
     );
}
 
export default Producto;