import React,{useState,useEffect} from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client'


const ACTUALIZAR_PEDIDO = gql`
    mutation actualizarPedido($id: ID!, $input: PedidoInput ) {
        actualizarPedido(id: $id, input: $input) {
            estado
        }
    }
`;

const ELIMINAR_PEDIDO = gql`
    mutation eliminarPedido($id: ID!) {
        eliminarPedido(id:$id)
    }
`;


const OBTENER_PEDIDOS = gql`
  query obtenerPedidosVendedor {
      obtenerPedidosVendedor {
        id
        pedido {
          id
          cantidad
          nombre
          precio
        }
        cliente{
          id
          nombre
          apellido
          email
          telefono
        }
        total
        estado
      }
  }
`;

const Pedido = ({pedido}) => {
        
    const { id, total, cliente: { nombre, apellido, telefono, email }, estado, cliente } = pedido;


    const [acutlizarEstadoPedido] = useMutation(ACTUALIZAR_PEDIDO);
    const [eliminarPedido] = useMutation(ELIMINAR_PEDIDO,{
        update(cache){

            const {obtenerPedidosVendedor} = cache.readQuery({query:OBTENER_PEDIDOS});

            cache.write({
                query:OBTENER_PEDIDOS,
                data:{
                    obtenerPedidosVendedor:obtenerPedidosVendedor.filter( pedidoCache => pedidoCache.id !== pedido.id)
                }
            });
        }
    });

    const [ estadoPedido, setEstadoPedido ] = useState(estado);
    const [ clase, setClase ] = useState('');

    useEffect(() => {
        if(estadoPedido) {
            setEstadoPedido(estadoPedido)
        }
        clasePedido();
    }, [ estadoPedido ]);

    // Función que modifica el color del pedido de acuerdo a su estado
    const clasePedido = () => {
        if(estadoPedido === 'PENDIENTE') {
            setClase('border-yellow-500')
        } else if (estadoPedido === 'COMPLETADO') {
            setClase('border-green-500')
        } else {
            setClase('border-red-800')
        }
    }


    const cambiarEstado =async nuevoEstado =>{

        try {

            const { data } = await acutlizarEstadoPedido({
                variables: {
                    id, 
                    input: {
                        estado: nuevoEstado,
                        cliente: cliente.id
                    }
                }
            });

            setEstadoPedido(data.actualizarPedido.estado);


            const {estado} = data.actualizarPedido;
            setEstadoPedido(estado);
        } catch (error) {
            console.log(error);
        }


    }


    const eliminarPedidoSeleccionado = ()=>{

        Swal.fire({
            title: "Delete",
            text: "Se eliminara el pedido",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'No, Cancelar'
          }).then(async (result)=>{

            if(result.value){
                console.log("cliente eliminado");

                try {
                    const {data} = await eliminarPedido({
                        variables:{
                            id:pedido.id
                        }
                    });

                    Swal.fire({
                        title: "Deleted!",
                        text: data,
                        icon: 'warning',
                    })


                } catch (error) {

                    console.log(error);
                    
                }



            }
          })

    }



    
    return (  

        <div className={`${clase} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}>

            <div>

                <p className="font-bold text-gray-800">Cliente :{nombre} {apellido}</p>


                {email && (
                    <p className="flex items-center my-2">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 mr-2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        {email}
                    </p>
                )}

                {telefono && (
                    <p className="flex items-center my-2">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 mr-2"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        {telefono}
                    </p>
                )}


                <h2 className="font-bold text-gray-800 mt-2"> Estado Pedido</h2>

                <select
                    className="bg-blue-600 border border-blue rounded text-white p-2 text-center appereance-none shadow "
                    value={estadoPedido}
                    onChange={(e)=>cambiarEstado(e.target.value) }
                >
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="COMPLETADO">COMPLETADO</option>
                    <option value="CANCELADO">CANCELADO</option>
                </select>

            </div>

            <div>

                <h2 className="text-gray-800 mt-2 font-bold"> Resumen Pedido</h2>

                {
                    pedido.pedido.map( articulo =>(
                     
                        <div className="mt-4" key={articulo.id}>
                            <p className="text-sm text-gray-600"> Nombre :{articulo.nombre}</p>
                            <p className="text-sm mt-2 text-gray-600">Precio: {articulo.precio}</p>
                            <p className="text-sm mt-2 text-gray-600">Cantidad {articulo.cantidad}</p>
                        </div>
                    ))
                }

                <p className="text-gray-800 font-bold mt-2">
                    Total a pagar <span className="font-light"> $ {total}</span>
                </p>


                <button
                    className="uppercase text-xs font-bold  flex items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight"
                    onClick={ ()=>eliminarPedidoSeleccionado()}
                >
                    Eliminar Pedido
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 ml-2"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>

                </button>

            </div>

        </div>
 
    );
}
 
export default Pedido;