import React,{useReducer} from 'react';
import PedidoContext from "./PedidoContext";
import PedidoReducer from "./PedidoReducer"

import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS
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

    const agregarProductos = productos =>{
        dispatch({
            type:SELECCIONAR_PRODUCTO,
            payload:productos
        });
    }


    //propage por la app;
    return(
        <PedidoContext.Provider
            value ={{
                agregarCliente,
                agregarProductos,
                productos:state.productos
            }}
        
        >
            {children}
        </PedidoContext.Provider>
    )
}


export default PedidoState;