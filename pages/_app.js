import { ApolloProvider } from '@apollo/client'
import client from '../config/apollo';

const MyApp = ({ Component, pageProps}) => {
    console.log("desde my App");
    return(
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    
    )

}

export default MyApp;