import React from 'react';
import { useRouter } from 'next/router'
import Layout from '../../components/Layout';
import { useQuery, gql, useMutation } from '@apollo/client'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2';


const GET_PRODUCTO = gql`
    query obtenerProducto($id:ID!) {
        obtenerProducto(id:$id) {
            id
            nombre
            precio
            existencia
        }
    }
`;


const EDITAR_PRODUCTO = gql`
    mutation actualizarProducto($id:ID!) {
        actualizarProducto(id:$id,input:ProductoInput) {
            id
            nombre
            precio
            existencia
        }
    }
`;

const EdicionProducto = () => {

    const router = useRouter();
    const { query: { id } } = router;

    const {data,loading,error} = useQuery(GET_PRODUCTO,{
        variables:{
            id:id   
        }
    });

    if(loading) return "loading...!";

    //TO DO agregar pagina para cuando no encuentra el producto.
    if (!data.obtenerProducto) return "no existe producto";


    console.log(data)

    const {nombre,precio,existencia} = data.obtenerProducto;

    return ( 

        <Layout>
        <div className="flex justify-center">
            <div className="w-full max-w-lg mt-5 bg-white-800">
            <h1 className="text-center text-2xl text-gray-800 font-bold mb-2">Edicion Producto </h1>
                <form
                className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                    <label name="nombre" 
                        htmlFor="nombre"
                        className="block text-gray-700 text-sm font-bold mb-2"
                        >nombre</label>
                        <input
                            id="nombre"
                            className="py-2 px-4 rounded shadow appearence-none w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="nombre"
                            placeholder="nombre"
                            value={nombre}
                        />
                    </div>


                    <div className="mb-4">
                        <label name="precio" 
                        htmlFor="precio"
                        className="block text-gray-700 text-sm font-bold mb-2"
                        >precio</label>

                        <input
                            id="precio"
                            className="py-2 px-4 rounded shadow appearence-none w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="number"
                            name="precio"
                            placeholder="100.00"
                            value={precio}
                        />
                    </div>


                    <div className="mb-4">
                        <label name="existencia" 
                        htmlFor="existencia"
                        className="block text-gray-700 text-sm font-bold mb-2"
                        >stock</label>
                        <input
                            className="py-2 px-3 rounded shadow appearence-none w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="existencia"
                            placeholder="stock"
                            value={existencia}
                        />
                    </div>

                    <input 
                    type="submit"
                    value="alta producto"
                    className="bg-blue-800 text-white rounded shadowd-md w-full uppercase font-bold hover:bg-gray-900 mt-2 mb-2"
                    />

                </form>
            </div>
        </div>
    </Layout>  
     );
}
 
export default EdicionProducto;