import React,{useState} from 'react';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { useMutation,gql } from '@apollo/client';
import {useRouter} from 'next/router';
import Layout from '../components/Layout';

const CREA_CUENTA = gql`
    mutation nuevoUsuario($input:UsuarioInput){
        nuevoUsuario(input:$input){
            id
            nombre
            apellido
            email
        }
    }

`;




const nuevaCuenta = () => {

    const [nuevoUsuario] = useMutation(CREA_CUENTA);

    const [mensaje, guardarMensje] = useState(null);

    const router = useRouter();

    const formik = useFormik({
        initialValues:{
            "nombre":"",
            "apellido":"",
            "email":"",
            "password":""
            },

            validationSchema:Yup.object({
                "nombre":Yup.string().required("el nombre es obligatorio"),
                "apellido":Yup.string().required("el apellido es obligatorio"),
                "email":Yup.string().email("mail no valido").required("el mail es obligatorio"),
                "password":Yup.string().min(6,"al menos 6 caracteres").required("el password es obligatorio")
            }),
        
            onSubmit:async values =>{
                console.log(values);

                const {nombre,apellido,email,password} = values;

                try {


                    const {data} = await nuevoUsuario({
                        variables:{
                            input:{
                                nombre,
                                apellido,
                                email,
                                password
                            }
                        }
                    });

                    guardarMensje(`Se creo correctamente ${data.nuevoUsuario.nombre}`);
                    setTimeout(()=>{
                        guardarMensje(null);
                        router.push("/login");
                    },3000);

                    
                } catch (error) {

                    guardarMensje(error.message.replace("GraphQL error: ",""));
                    setTimeout(()=>{
                        null
                    },3000);
                    
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

            <h1 className="text-center text-white text-2xl font-light">Nueva cuenta</h1>
            {mensaje && mostrarMensaje() }
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">
                    <form
                        className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >

                        <div className="mb-4">
                            <label 
                                htmlFor="nombre"
                                className="block text-gray-700  tx-sm font-bold mb-2"
                            >
                                nombre
                            </label>
                            <input 
                                id="nombre"
                                className="shadow apereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                            <label 
                                htmlFor="apellido"
                                className="block text-gray-700  tx-sm font-bold mb-2"
                            >
                                apellido
                            </label>
                            <input 
                                id="apellido"
                                className="shadow apereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                            <label 
                                htmlFor="email"
                                className="block text-gray-700  tx-sm font-bold mb-2"
                            >
                                email
                            </label>
                            <input 
                                id="email"
                                className="shadow apereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>


                        {formik.touched.email &&  formik.errors.email &&
                            (   <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold"> {formik.errors.email}</p>
                                </div>
                            )
                        }


                        <div className="mb-4">
                            <label 
                                htmlFor="password"
                                className="block text-gray-700 tx-sm font-bold mb-2"
                            >
                                password
                            </label>
                            <input 
                                id="password"
                                className="shadow apereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.password && formik.errors.password &&
                            (   <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold"> {formik.errors.password}</p>
                                </div>
                            )
                        }

                        <input
                            type="submit"
                            value="enviar"
                            className="bg-gray-700 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"      
                        />

                    </form>
                </div>
                
            </div>
        </Layout>
    );
}
 
export default nuevaCuenta;