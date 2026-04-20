import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchHelloWorld, fetchError } from './api'

function Home() {
  const queryClient = useQueryClient()

  const helloQuery = useQuery({
    queryKey: ['hello'],
    queryFn: fetchHelloWorld,
  })

  const errorQuery = useQuery({
    queryKey: ['error'],
    queryFn: fetchError,
  })

  const resetAll = () => queryClient.resetQueries()

  const resetSuccessful = () =>
    queryClient.resetQueries({
      predicate: (q) => q.state.status === 'success',
    })

  const resetErrored = () =>
    queryClient.resetQueries({
      predicate: (q) => q.state.status === 'error',
    })

  const resetHello = () => queryClient.resetQueries({ queryKey: ['hello'] })

  const resetError = () => queryClient.resetQueries({ queryKey: ['error'] })

  return (
    <div>
      <h1>Home</h1>

      <section>
        <h2>Actions</h2>
        <button onClick={resetAll}>Reset all queries</button>
        <button onClick={resetSuccessful}>Reset all successful queries</button>
        <button onClick={resetErrored}>Reset all errored queries</button>
        <button onClick={resetHello}>Reset query 1 (success)</button>
        <button onClick={resetError}>Reset query 2 (error)</button>
      </section>

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
