import Head from 'next/head'
import {gql,useQuery} from '@apollo/client';
import {useRouter} from 'next/router';
import Layout from '../components/Layout';


const CONSULTAR_CLIENTES=gql`
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

  const {data,error,loading} = useQuery(CONSULTAR_CLIENTES);
  const router = useRouter();


  if (loading){
    return (
      <div>Cargando...</div>
    )
  }

  if (!data.obtenerClientesVendedor){
    router.push("/login");
  }


  return (
    <div>
      <Layout>

        <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
        <table className="table-auto shadow-md mt-10 w-full w-lg">
          
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Empresa</th>
              <th className="w-1/5 py-2">Email</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {data.obtenerClientesVendedor.map( cliente => (
                <tr key={cliente.id}>
                  <td className="border px-4 py-2">{cliente.nombre} {cliente.apellido}</td>
                  <td className="border px-4 py-2">{cliente.empresa}</td>
                  <td className="border px-4 py-2">{cliente.email}</td>
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
