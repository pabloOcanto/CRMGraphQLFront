import React from 'react';
import Swal from 'sweetalert2';
import { useMutation,gql } from '@apollo/client';
import Router from 'next/router';


const ELIMINAR_CLIENTE=gql`
    mutation eliminarCliente($id: ID!){
        eliminarCliente(id:$id)
    }

`;

const OBTENER_CLIENTES_USUARIO = gql`
    query obtenerClientesVendedor {
        obtenerClientesVendedor {
            id
            nombre
            apellido
            empresa
            email
        }
    }
`;

const Cliente = ({cliente}) => {
    
    const {nombre,apellido,empresa,email,id} = cliente;


    // mutation para eliminar cliente
    const [ eliminarCliente ] = useMutation( ELIMINAR_CLIENTE, {
        update(cache) {
            // obtener una copia del objeto de cache
            const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO });

            // Reescribir el cache
            cache.writeQuery({
                query: OBTENER_CLIENTES_USUARIO,
                data: {
                    obtenerClientesVendedor : obtenerClientesVendedor.filter( clienteActual => clienteActual.id !== id )
                }
            })
        }
    }  );

    const confirmarEliminarCliente = ()=>{

        Swal.fire({
            title: "Delete",
            text: "Se eliminar el cliente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'No, Cancelar'
          })
          .then( async result => {
              if (result.value){

                try {
                    
                    const {data} = await eliminarCliente({
                        variables:{
                            id
                        }
                    });

                    Swal.fire({
                        title: "Eliminado!",
                        text: data.eliminarCliente,
                        icon: 'success',
                    });
                } catch (error) {
                    console.log(error);
                }

              }
          });
    }

    const editarCliente=()=>{
        Router.push({
            pathname: "/editarcliente/[id]",
            query: { id }
        })
    }


    return (  
            <>
            <td className="border px-4 py-2">{nombre} - {apellido} </td>
            <td className="border px-4 py-2">{empresa}</td>
            <td className="border px-4 py-2">{email}</td>
            <td className="border px-4 py-2">
                    <button
                        type="button"
                        className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                        onClick={() => confirmarEliminarCliente() }
                    >
                        Eliminar

                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 ml-2"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </button>
                </td>
                <td className="border px-4 py-2">
                    <button
                        type="button"
                        className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                        onClick={() => editarCliente() }
                    >
                        Editar

                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 ml-2"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                </td>
            </>
    );
}
 
export default Cliente;