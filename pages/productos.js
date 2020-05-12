import React from 'react';
import { gql, useQuery } from '@apollo/client'
import Link from 'next/link';
import Layout from "../components/Layout";
import Producto from "../components/Producto";


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

const Productos = () => {



    const {data,loading,error} = useQuery(GET_PRODUCTOS);

    if (loading) return "loading ...";


    const {obtenerProductos} = data;


    return (
        <div>
            <Layout>   
            
            <Link href="/nuevoproducto">
                <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">Nuevo Producto</a>
            </Link>

            <div className="flex">
        
            {
                obtenerProductos.length === 0 ? 
                (
                    <p> No hay productos</p>
                )
    
                :
    
                (
                    obtenerProductos.map ( producto =>(
                                <Producto
                                key={producto.id} 
                                producto={producto} 
                                />
                    ))
    
                )
            }

            </div>
    
            </Layout> 
        </div>
    );
}
 
export default Productos;