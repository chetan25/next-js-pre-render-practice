import { useEffect, Fragment, useState } from 'react'; 
import useSwr from 'swr';

const Sales = props => {
//    const [isLoading, setLoading] = useState(false);
      // setting the data from the server, set during pre-render
      const [todo, setTodo] = useState(props.data);

      const { data, error } = useSwr('https://jsonplaceholder.typicode.com/todos/1');
     
      useEffect(() => {
        setTodo(data);
      }, [data])

    // runs after the component is evaluated and rendered for the first time
    useEffect(() => {
        // setLoading(true);
        // const loadData = async () => {
        //   const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        //   const data =await  response.json();

        //   setData(data);
        //   setLoading(false);
        // };

        // loadData();
    }, []);

    if(error) {
        return <div>Error...</div>
    }

    if(!todo) {
        return <div>loading...</div>
    }

    // if(!data) {
    //     return <div>No Data</div>
    // }

   return (
      <Fragment>
        <h1>{todo.title}</h1>
        <h3>Completed - {todo.completed ? 'True' : 'False'}</h3>
      </Fragment>
   );
}

export async function getStaticProps() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();

    return {
        props: {
          data: data
        },
        revalidate: 60
    }
}

export default Sales;