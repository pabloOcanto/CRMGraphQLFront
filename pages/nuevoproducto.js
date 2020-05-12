import React from 'react';
import Layout from '../components/Layout';

const NuevoProducto = () => {
    return (
        <Layout>
            <div className="flex justify-center">
                <div className="w-full max-w-lg mt-5 bg-white-800">
                <h1 className="text-center text-2xl text-gray-800 font-bold mb-2">Producto</h1>
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
 
export default NuevoProducto;