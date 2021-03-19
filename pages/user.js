import { Fragment } from 'react';

const User = props => {
    const { user } = props;
   return (
     <Fragment>
       <h1>{user.name}</h1>
     </Fragment>
   ); 
}

// runs on server on every request
export async function getServerSideProps(context) {
    // req, res are default node js objects of incoming request and response
    const { params, req, res } = context;
    
    
    // same as getStaticProps, only cannot add revalidate key
    return {
        props: {
           user: {
               name: 'Rock'
           }
        }
    };
}

export default User;