import React,{useEffect} from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Layout from '../components/Layout';
import { gql,useQuery } from '@apollo/client';


const MEJORES_VENDEDORES=gql` 
    query mejoresVendedores{
        mejoresVendedores{
            vendedor{
                nombre
                apellido
                email
            }
            total
        }
    }
`;

const MejoreVendedores = () =>{

  const {data,loading,error,startPolling, stopPolling} = useQuery(MEJORES_VENDEDORES);

  useEffect(() => {
        startPolling(1000);
       return () => {
            stopPolling();
       }
    }, [startPolling, stopPolling])


    if(loading) return "loading ...";

    if (!data.mejoresVendedores) return "no hay data";

    const {mejoresVendedores} = data;

    const vendedoresGrafica =[];

    mejoresVendedores.map((vendedor, index) => {
        vendedoresGrafica[index] = {
          ...vendedor.vendedor[0],
          total: vendedor.total
      }
  });


    return (
        <Layout>

            <BarChart
                width={500}
                height={300}
                data={vendedoresGrafica}
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


export default MejoreVendedores;
