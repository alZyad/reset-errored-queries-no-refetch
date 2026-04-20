import { useQuery } from '@tanstack/react-query'

function App() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['hello'],
    queryFn: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
      if (!res.ok) throw new Error('Request failed')
      return res.json()
    },
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error: {error.message}</p>

  return (
    <div>
      <h1>React Query</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default App
