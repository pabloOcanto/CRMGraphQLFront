import React,{useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useMutation,gql } from '@apollo/client';
import {useRouter} from 'next/router';
import Layout from '../components/Layout';

const AUTHENTICAR = gql`
    mutation authenticar($input:AuthenticarInput){
        authenticar(input:$input){
                token
        }
    }
`;

const Login = () => {



    const [authenticar] = useMutation(AUTHENTICAR);
    const [mensaje, guardarMensaje] = useState(null);
    const router = useRouter();

    const formik = useFormik({

        initialValues:{
            "email":"",
            "password":""
        },

        validationSchema:Yup.object({
            "email":Yup.string().email("email invalido").required("email es obligatorio"),
            "password":Yup.string().min(6,"minimo 6 caracteres").required("passorwd")
        }),

        onSubmit: async (values) =>{
            // check user and save token

            const {email,password}= values;

            try {

                localStorage.removeItem("token");
                
                const {data} = await authenticar({
                    variables:{
                        input:{
                            email,
                            password 
                        }
                    }
                }); 



                const {token} = data.authenticar;

                console.log(token);
                
                localStorage.setItem("token",token);

                guardarMensaje(`Usuario esta authenticado`);


                setTimeout(()=>{



                    guardarMensaje(null);
                    router.push("/");
                },2000);
        
            } catch (error) {
               
                guardarMensaje(error.message.replace("GrpahQL error: ",""));
                setTimeout(()=>{
                    guardarMensaje(null);
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
            <h1 className="text-center text-white text-2xl font-light">Login</h1>
            {mensaje && mostrarMensaje() }
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">
                    <form
                        className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
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

                        {formik.touched.email && formik.errors.email &&
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
 
export default Login;