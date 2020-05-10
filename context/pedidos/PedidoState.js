import React,{useReducer} from 'react';
import PedidoContext from "./PedidoContext";
import PedidoReducer from "./PedidoReducer"

import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS,
    ACTUALIZAR_TOTAL
} from "../../type"


const PedidoState = ({children})=>{


    const intialState = {
        cliente :{},
        productos:[],
        total:0
    }

    const [state, dispatch] = useReducer(PedidoReducer,intialState);


    const agregarCliente = cliente =>{
        dispatch({
            type:SELECCIONAR_CLIENTE,
            payload:cliente
        });
    }

    const agregarProductos = productosSeleccionados =>{

        let nuevoState;

        if (state.productos.length > 0){
            nuevoState = productosSeleccionados.map( producto => {
                const nuevoObjeto = state.productos.find( productoState => productoState.id === producto.id);
                return{...nuevoObjeto,...producto}
            });
        }else{
            nuevoState = productosSeleccionados;
        }

        dispatch({
            type:SELECCIONAR_PRODUCTO,
            payload:nuevoState
        });
    }

    const agregarCantidadProducto = nuevoProducto =>{
        dispatch({
            type:CANTIDAD_PRODUCTOS,
            payload:nuevoProducto
        });
    }

    const actulizarTotal = ()=>{
        dispatch({
            type:ACTUALIZAR_TOTAL
        })
    }


    //propage el context por la app;
    return(
        <PedidoContext.Provider
            value ={{
                total:state.total,
                cliente:state.cliente,
                productos:state.productos,
                agregarCliente,
                agregarProductos,
                agregarCantidadProducto,
                actulizarTotal
            }}
        
        >
            {children}
        </PedidoContext.Provider>
    )
}


export default PedidoState;