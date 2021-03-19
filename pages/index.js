import  fs from 'fs';
import path from 'path';
import Link from 'next/link'

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {
        products.map(product => <li key={product.id}><Link href={`/${product.id}`}>{product.title}</Link></li>)
      }
    </ul>
  );
}

// Next JS will first execute this function and then pass the result to the component in the next step
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const productsJsonData =  fs.readFileSync(filePath);
  const data = JSON.parse(productsJsonData);

  if (!data) {
    // if we have no access to db we might want to redirect to login page
    return {
      redirect: {
        destination: '/auth'
      }
    }
  }

  if (data.products.length === 0) {
    // if no data found we might want to return 404
    return {
      notFound: true
    }
  }

  // always return an object that has props keys 
  return {
    props: {
      products: data.products
    },
    revalidate: 60, // time in seconds, tells next js to re generate page if given time as passed
    // notFound: false, // returns 404 if set to true
    // redirect: {
    //   destination: '/auth'
    // } // allows to redirect user to different page
  }
}

export default HomePage;
