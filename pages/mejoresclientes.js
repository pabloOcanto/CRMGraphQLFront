import React,{useEffect} from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Layout from '../components/Layout';
import { gql,useQuery } from '@apollo/client';


const MEJORES_CLIENTES=gql` 
    query mejoresCLientes{
        mejoresCLientes{
            cliente{
                nombre
                empresa
                telefono
            }
            total
        }
    }
`;

const MejoresClientes = () =>{

  const {data,loading,error,startPolling, stopPolling} = useQuery(MEJORES_CLIENTES);

  useEffect(() => {
        startPolling(1000);
       return () => {
            stopPolling();
       }
    }, [startPolling, stopPolling])


    if(loading) return "loading ...";

    if (!data.mejoresCLientes) return "no hay data";

    const {mejoresCLientes} = data;

    const clientesGrafica =[];

    mejoresCLientes.map((cliente, index) => {
      clientesGrafica[index] = {
          ...cliente.cliente[0],
          total: cliente.total
      }
  });


    return (
        <Layout>

            <BarChart
                width={500}
                height={300}
                data={clientesGrafica}
                margin={{
                top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" />
                
            </BarChart>
        </Layout>

    );
}


export default MejoresClientes;
