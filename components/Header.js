import React from 'react';
import {gql,useQuery} from '@apollo/client';
import {useRouter} from 'next/router';


const CONSULTAR_USUARIO=gql`
    query obtenerUsuario{
        obtenerUsuario{
            nombre
            apellido
        }
    }
`;


const Header = () => {

    const router = useRouter();
    const token = localStorage.getItem("token");

    if(!token){
        router.push("/login");
    }


    const {data,error,loading} =  useQuery(CONSULTAR_USUARIO);

    if (loading){
        return (<div>Cargando...</div>);
    }

    if (!data){
        router.push("/login");
    }



    const eliminarSession = ()=>{
        localStorage.removeItem("token");
        router.push("/login")
    }

    const {nombre,apellido} = data.obtenerUsuario;


    return (  

        <div className="flex justify-between mb-2">
            <div>
                Bienvenido {nombre} {apellido}
            </div>

            <button
                className="bg-blue-800 w-full sm:w-auto uppercase text-xs font-bold rounded py-1 px-2 text-white shadow-md"
                type="button"
                value="logout"
                onClick={()=>eliminarSession()}
                >Cerrar session

            </button>

        </div>

    );
}
 
export default Header;