import React,{useState,useEffect,useContext} from 'react';
import Select from "react-select";
import { useQuery,gql } from '@apollo/client';
import PedidoContext from '../../context/pedidos/PedidoContext';


const CONSULTAR_PRODUCTOS=gql`
    query obtenerProductos {
        obtenerProductos {
            id
            nombre
            existencia
            precio
        }
    }
`;


const AsignarProductos = () => {


    const context = useContext(PedidoContext);
    
    const {agregarProductos} = context;

    const [productos,agregarProducto] = useState([]);

    useEffect(
        ()=>{
            console.log("agregarProductos",productos);
            agregarProductos(productos);
        },[productos]);
    


    const {data,loading,error} = useQuery(CONSULTAR_PRODUCTOS);
    
    if(loading) return "loadin...";

    if (!data.obtenerProductos) return "no hay productos disponibles";

    const {obtenerProductos} = data;


    const seleccionarProducto = productos =>{
        agregarProducto(productos);
    }

    return (  
        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">2 - Seleccionar Productos</p>
            <Select
                className="mt-3"
                options={obtenerProductos}
                isMulti={true} 
                onChange={ opcion => seleccionarProducto(opcion)}
                getOptionValue={ (opciones)=>opciones.id }
                getOptionLabel={ (opciones)=>`${opciones.nombre} ${opciones.existencia}`  }
                noOptionsMessage={()=> "No hay resultados"}
            />
        </>

    );
}
 
export default AsignarProductos;