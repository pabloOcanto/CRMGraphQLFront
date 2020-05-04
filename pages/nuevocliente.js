import React,{useState} from 'react';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { useMutation,gql } from '@apollo/client';
import {useRouter} from 'next/router';
import Layout from '../components/Layout';


const CREAR_CLIENTE = gql`
    mutation nuevoCliente($input:ClienteInput){
        nuevoCliente(input:$input){
            id
            nombre
            apellido
            empresa
            email
            telefono
        }
    }
`;

const OBTENER_CLIENTES_USUARIO=gql`
  query obtenerClientesVendedor{
    obtenerClientesVendedor{
      id
      nombre
      apellido
      empresa
      email
    }
  }

`;

const NUEVO_CLIENTE = () => {

    const [mensaje, guardarMensaje] = useState(null);
    const router = useRouter();

    const [ nuevoCliente ] = useMutation(CREAR_CLIENTE, {
        update(cache, { data: { nuevoCliente } } ) {
            // Obtener el objeto de cache que deseamos actualizar
            const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO  });

            // Reescribimos el cache ( el cache nunca se debe modificar )
            cache.writeQuery({
                query: OBTENER_CLIENTES_USUARIO,
                data: {
                    obtenerClientesVendedor : [...obtenerClientesVendedor, nuevoCliente ]
                }
            })
        }
    });




    const formik = useFormik({
        initialValues:{
            "nombre":"",
            "apellido":"",
            "email":"",
            "empresa":"",
            "telefono":""
        },
        validationSchema:Yup.object({
            "nombre":Yup.string().required("nombre es obligatorio"),
            "apellido":Yup.string().required("apellido es obligatorio"),
            "email":Yup.string().email("email invalido").required("apellido es obligatorio"),
            "empresa":Yup.string().required("empresa es obligatorio")
        }),

        onSubmit:async values =>{
            console.log("enviando...");


            const {nombre,apellido,email,empresa,telefono} = values;

            try {
                const {data} = await nuevoCliente({
                    variables:{
                        input:{
                            nombre,
                            apellido,
                            email,
                            empresa,
                            telefono
                        }
                    }
                });

                guardarMensaje("Cliente creado exisitosamente");

                setTimeout(()=>{
                    guardarMensaje(null);
                    router.push("/");
                },2000);
            } catch (error) {

                guardarMensaje(error.message.replace("GraphQL error: ",""));

                setTimeout(()=>{
                    guardarMensaje(null);
                },2000);
                
            }


        }
    });


    const mostrarMensaje = () => {
        return(
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }


    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
            <div className="flex justify-center">
                <div className="w-full max-w-lg">

                {mensaje && mostrarMensaje() }

                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                        >
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                    Nombre
                            </label>

                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="nombre"
                                type="text"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.nombre && formik.errors.nombre &&
                            (   <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold"> {formik.errors.nombre}</p>
                                </div>
                            )
                           }

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                                    apellido
                            </label>

                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="apellido"
                                type="text"
                                value={formik.values.apellido}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.apellido && formik.errors.apellido &&
                            (   <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold"> {formik.errors.apellido}</p>
                                </div>
                            )
                           }


                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    email
                            </label>

                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="text"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.email && formik.errors.email &&
                            (   <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold"> {formik.errors.email}</p>
                                </div>
                            )
                           }

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="empresa">
                                    empresa
                            </label>

                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="empresa"
                                type="text"
                                value={formik.values.empresa}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.empresa && formik.errors.empresa &&
                            (   <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold"> {formik.errors.empresa}</p>
                                </div>
                            )
                           }


                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                                    telefono
                            </label>

                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="telefono"
                                type="tel"
                                value={formik.values.telefono}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}       
                            />
                        </div>

                        {formik.touched.telefono && formik.errors.telefono &&
                            (   <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold"> {formik.errors.telefono}</p>
                                </div>
                            )
                           }

                        <input 
                        type="submit"
                        value="crear cliente"
                        className="bg-blue-800 text-white rounded shadowd-md w-full uppercase font-bold hover:bg-gray-900 mt-2 mb-2"
                        />


                    </form>

      
                </div>

            </div>
        </Layout>
      );
}
 
export default NUEVO_CLIENTE;