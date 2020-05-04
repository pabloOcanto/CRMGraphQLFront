import React from 'react';
import * as Yup from "yup";
import {useRouter} from 'next/router';
import { Formik } from 'formik'
import { useMutation,useQuery,gql } from '@apollo/client';
import Layout from '../../components/Layout';


const OBTENER_CLIENTE = gql`
    query obtenerCliente($id:ID!) {
        obtenerCliente(id:$id) {
            nombre
            apellido
            email
            telefono
            empresa
        }
    }
`;

const EditarCliente =  () => {

    const router = useRouter();
    const { query: { id } } = router;

    const { data, loading, error } = useQuery(OBTENER_CLIENTE, {
        variables: {
           id
        }
    });

    // Schema de validacion
        const schemaValidacion = Yup.object({
            nombre: Yup.string() 
                        .required('El nombre del cliente es obligatorio'),
            apellido: Yup.string() 
                        .required('El apellido del cliente es obligatorio'),
            empresa: Yup.string() 
                        .required('El campo empresa  es obligatorio'),
            email: Yup.string()
                        .email('Email no válido') 
                        .required('El email del cliente es obligatorio')
    });



    if (loading) return "cargando...";

    const {obtenerCliente} = data;


    const actualizarInfoCliente = (values) =>{
        console.log("actualizando info",values);
    }
   
    return ( 
        <Layout>

            <h1 className="text-2xl text-gray-800 font-light">Editar Cliente</h1>
          

            <div className="flex justify-center">

               <div className="w-full max-w-lg">

                <Formik 

                initialValues={obtenerCliente}
                enableReinitialize
                validationSchema={schemaValidacion}
                onSubmit={(values)=>{
                    actualizarInfoCliente(values);
                }}
                />

                {props => {

                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                    >
                     <div className="mb-4">
                        <label 
                            htmlFor="nombre"
                            className="block text-gray-700 font-bold mb-2 text-sm font"
                        > 
                            nombre
                        </label>
                        <input
                            id="nombre"
                            className="shadow apereance-none rounded w-full px-4 py-2"
                            placeholder="nombre"
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.nombre}
                        >
                        </input>
                     </div>


                     <div className="mb-4">
                        <label 
                            htmlFor="apellido"
                            className="block text-gray-700 font-bold mb-2 text-sm font"
                        > 
                            apellido
                        </label>
                        <input
                            id="apellido"
                            className="shadow apereance-none rounded w-full px-4 py-2"
                            placeholder="apellido"
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.apellido}
                        >
                        </input>
                     </div>


                     <div className="mb-4">
                        <label 
                            htmlFor="email"
                            className="block text-gray-700 font-bold mb-2 text-sm font"
                        > 
                            email
                        </label>
                        <input
                            id="email"
                            className="shadow apereance-none rounded w-full px-4 py-2"
                            placeholder="apellido"
                            type="email"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.email}
                        >
                        </input>
                     </div>



                     <div className="mb-4">
                        <label 
                            htmlFor="empresa"
                            className="block text-gray-700 font-bold mb-2 text-sm font"
                        > 
                            empresa
                        </label>
                        <input
                            id="empresa"
                            className="shadow apereance-none rounded w-full px-4 py-2"
                            placeholder="empresa"
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.empresa}
                        >
                        </input>
                     </div>
                     


                     <div className="mb-4">
                        <label 
                            htmlFor="telefono"
                            className="block text-gray-700 font-bold mb-2 text-sm font"
                        > 
                            telefono
                        </label>
                        <input
                            id="telefono"
                            className="shadow apereance-none rounded w-full px-4 py-2"
                            placeholder="telefono"
                            type="tel"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.telefono}
                        >
                        </input>
                     </div>


                    <input
                        type="submit"
                        className="bg-blue-800 shadow rounded w-full uppercase font-bold hover:bg-gray-900 mt-2 mb-2 py-2"
                        value="editar"
                    />

                    </form>
                }}
                </div>

            </div>
        </Layout>

     );
}
 
export default EditarCliente;