import  { Fragment } from 'react';
import  fs from 'fs';
import path from 'path';

const ProductDetails = (props) => {
   const {product} = props;

   // since the server generated pages for P2 and P3 might take time we need a fallback ui
   if (!product) {
       return <div>Loading...</div>
   }

   // default would be to use the useEffect and fetch data 
   return (
     <Fragment>
         <h1>{product.title}</h1>
         <p>{product.description}</p>
     </Fragment>
   );
}

async function getData() {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const productsJsonData =  fs.readFileSync(filePath);
    const data = JSON.parse(productsJsonData);

    return data;
}


// only added to dynamic generated file. tells next js which instance will be generated
export async function getStaticPaths() {
    const data = await getData();
    // using data we can grab all the ids to generate the pages for

    return {
        paths: [
            { params: { pid: 'p1' } },
            // { params: { pid: 'p2' } },
            // { params: { pid: 'p3' } },
        ],
        fallback: true // helps us when we have too many pages to pre generate,
        // when set to true we can decide what to pre generate, if false then all pages will need to be specified
        // fallback with a string of 'blocking' won't need a fallback UI, since NextJS will take care of it and render a fully loaded page
    }
} 

export async function getStaticProps(context)  {
    const { params } = context;
    const productId = params.pid;

    const data = await getData();
    
    const product = data.products.find(product => product.id === productId);

    if (!product) {
        // if no data found we might want to return 404
        return {
          notFound: true
        }
    }

    return {
        props: {
            product: product
        },
        revalidate: 60
    }
}

export default ProductDetails;