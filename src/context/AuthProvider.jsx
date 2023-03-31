import {useState, useEffect, createContext } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

// const query = gql`
//   query User{
//     users @rest(type: "User", path: "api/users/6422423f46f1fe78671988b7") {
//       username
//       email
//       user_id
//     }
//   }
// `;

const ME_USER = gql `
    query MeUser {
        meUser @rest (path: "api/users/me") {
            username
            email
            user_id
        }
    }
`

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const navigate = useNavigate()
    const [auth, setAuth] = useState({})
    const [loadingUser, setLoadingUser] = useState(true);


    const [meUser, {loading,error,data}] = useLazyQuery(ME_USER,{
        context:{
            headers: {authorization: `Bearer ${localStorage.getItem('token')}`}
        },
        onError(error){
            setAuth({});
        },
        onCompleted(data) {
            setAuth(data)
            setLoadingUser(false);
            navigate('dashboard')
        },
    })


    useEffect(() => {
        const authUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoadingUser(false)
                return
            }

            meUser()
        }
        authUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loadingUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext