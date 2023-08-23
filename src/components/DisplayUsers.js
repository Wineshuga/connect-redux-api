import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers,getLoading, getError, fetchUser } from '../store/users/usersSlice'

const DisplayUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector(getUsers);
  const isLoading = useSelector(getLoading)
  const err = useSelector(getError)

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUser())
    }
  }, [users.length, dispatch])

  if (isLoading) return <p>Fetching data</p>
  if (err) return <p>There's a problem: ${err}</p>;
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.login.md5}>
            Full name: {user.name.first} {user.name.last}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DisplayUsers