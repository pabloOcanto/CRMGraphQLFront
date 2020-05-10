import React,{useState,useEffect,useContext} from 'react';
import PedidoContext from '../../context/pedidos/PedidoContext';


const DetallePedido = ({producto}) => {

    const context = useContext(PedidoContext);
    
    const {agregarCantidadProducto,actulizarTotal} = context;

    const [cantidad,guardarCantidad] = useState(0);

    useEffect(
        ()=>{
            actualizarCantidad();
            actulizarTotal();
        },[cantidad])

    const actualizarCantidad = ()=>{
        const nuevoProducto ={...producto,cantidad:cantidad}
        agregarCantidadProducto(nuevoProducto);
    }

    const {precio, nombre} = producto;

    return (  
        <div className="md:flex md:justify-between md:items-center mt-5">
            <div className="md:w-2/4 mb-2 md:mb-0">
                <p className="text-sm">{nombre}</p>
                <p>$ {precio}</p>
            </div>

            <input 
                type="number"
                placeholder="Cantidad"
                className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
                onChange={(e)=>{guardarCantidad(parseInt(e.target.value))}}
                value={cantidad}
            />
        </div>
    );
}
 
export default DetallePedido;