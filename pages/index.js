import Head from 'next/head'
import {gql,useQuery} from '@apollo/client';
import {useRouter} from 'next/router';
import Layout from '../components/Layout';
import Cliente from '../components/Cliente';


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


const Index =()=>  {

  const {data,error,loading} = useQuery(OBTENER_CLIENTES_USUARIO);
  const router = useRouter();


  if (loading){
    return (
      <div>Cargando...</div>
    )
  }

  if (!data.obtenerClientesVendedor){
    router.push("/login");
  }

  const crearCliente=()=>{
    router.push("/nuevocliente");
  }


  return (
    <div>
      <Layout>

        <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>

        <button
          type="button"
          className="bg-blue-800 rounded px-4 py-2 text-white shadow-md mt-2"
          onClick={()=>crearCliente()}
          >
            crear cliente
          </button>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Empresa</th>
              <th className="w-1/5 py-2">Email</th>
              <th className="w-1/5 py-2">Editar</th>
              <th className="w-1/5 py-2">Eliminar</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {data && data.obtenerClientesVendedor.map( cliente => (
                <tr key={cliente.id}>
                    <Cliente cliente={cliente}/>
                </tr>
            ))
          
          }
          </tbody>

        </table>
      </Layout>
    </div>
  )
}

export default Index;
