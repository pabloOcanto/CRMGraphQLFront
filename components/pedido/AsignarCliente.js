import React,{useState,useEffect,useContext} from 'react';
import Select from "react-select";
import { useQuery,gql } from '@apollo/client';
import PedidoContext from '../../context/pedidos/PedidoContext';


const CONSULTAR_CLIENTES=gql`
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

const AsignarCliente = () => {


    const {agregarCliente} = useContext(PedidoContext)

    const [cliente,setCliente] = useState([]);

    useEffect(
          ()=>{
            agregarCliente(cliente);
          }
    ,[cliente])



     const {data,loading,error} = useQuery(CONSULTAR_CLIENTES);

    if (loading) return "loading";

     if (!data.obtenerClientesVendedor) router.push("/");
     
     
     const seleccionarCliente =cliente =>{
       setCliente(cliente);
    }

    return (  
            <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">1.- Asigna un Cliente al pedido</p>
            <Select
                className="mt-3"
                options={data.obtenerClientesVendedor}
                isMulti={false} 
                onChange={ opcion => seleccionarCliente(opcion)}
                getOptionValue={ (opciones)=>opciones.id }
                getOptionLabel={ (opciones)=>`${opciones.nombre} ${opciones.apellido}`  }
                noOptionsMessage={()=> "No hay resultados"}
                />
            </>
    );
}
 
export default AsignarCliente;