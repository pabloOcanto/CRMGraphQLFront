import { ApolloProvider } from '@apollo/client'
import client from '../config/apollo';
import PedidoState from "../context/pedidos/PedidoState";

const MyApp = ({ Component, pageProps}) => {
    console.log("desde my App");
    return(
        <ApolloProvider client={client}>
            <PedidoState>
                <Component {...pageProps} />
            </PedidoState>          
        </ApolloProvider>  
    )

}

export default MyApp;