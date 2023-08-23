import { useSelector } from 'react-redux'

const DisplayUsers = () => {
  const { users, isLoading, error } = useSelector((store) => store.users)

  if (isLoading) return <p>Fetching data</p>
  if (error) return console.error(error);
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            Full name: {user.first} {user.last}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DisplayUsers