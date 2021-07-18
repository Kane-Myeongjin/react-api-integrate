import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { useAsync } from "react-async";
// import useAsync from "./useAsync";
import User from "./User";
import { getUsers, useUsersDispatch, useUsersState } from "./UsersContext";

// const getUsers = async () => {
//   const response = await axios.get(
//     "https://jsonplaceholder.typicode.com/users"
//   );
//   return response.data;
// };

const Users = () => {
  const [userId, setUserId] = useState(null);
  // const [state, refetch] = useAsync(() => getUsers(), [], true);
  // const { loading, data: users, error } = state;

  // const { data: users, error, isLoading, reload } = useAsync({
  // const { data: users, error, isLoading, run } = useAsync({
    // promiseFn : getUsers // 렌더링하는 시점 호출 (reload)
    // deferFn : getUsers // 사용자의 특정 인터랙션에 따라 API 를 호출(reload 대신 run)
  // });

  const state = useUsersState();
  const dispatch = useUsersDispatch();

  const {data: users, isLoading, error} = state.users;
  const fetchData = () => {
    getUsers(dispatch);
  }

  if (isLoading) return <div>로당중...</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return <button onClick={fetchData}>불러오기</button>;

  return (
    <>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={()=>setUserId(user.id)}
            style={{cursor: 'pointer'}}
          >
            {user.username} {user.name}
          </li>
        ))}
      </ul>
      <button onClick={fetchData}>다시 불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
};

export default Users;
