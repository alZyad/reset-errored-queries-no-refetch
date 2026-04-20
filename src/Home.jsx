import { useQuery } from '@tanstack/react-query'
import { fetchHelloWorld, fetchError } from './api'

function Home() {
  const helloQuery = useQuery({
    queryKey: ['hello'],
    queryFn: fetchHelloWorld,
  })

  const errorQuery = useQuery({
    queryKey: ['error'],
    queryFn: fetchError,
  })

  return (
    <div>
      <h1>Home</h1>

      <section>
        <h2>Hello Query</h2>
        <p>Status: {helloQuery.status}</p>
        <p>Data: {String(helloQuery.data)}</p>
        <p>Error: {helloQuery.error ? helloQuery.error.message : 'none'}</p>
      </section>

      <section>
        <h2>Error Query</h2>
        <p>Status: {errorQuery.status}</p>
        <p>Data: {String(errorQuery.data)}</p>
        <p>Error: {errorQuery.error ? errorQuery.error.message : 'none'}</p>
      </section>
    </div>
  )
}

export default Home
