import { useState } from "react"
import { Link } from "react-router-dom"
import { Container, Stack, TextField, Button, Typography} from "@mui/material"
import { gql, useMutation} from '@apollo/client';
import { useNavigate } from "react-router-dom";


const REGISTER_USER = gql `
    mutation RegisterUser ($input: registerUser!) {
        registerUser (input: $input) @rest(type: "User", method: "POST", path: "api/users/" ){
            username
            email
            password
        }
    }
`

const Register = () => {
    let navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [alert, setAlert] = useState('');

    const[registerUser] = useMutation(REGISTER_USER,{
        variables: {input: {
            username,
            email,
            password
        }},
        onError(graphQLErrors){
            setAlert(graphQLErrors.networkError.result.msg);
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        if([username, email, password, repeatPassword].includes('')){
            setAlert("All fields required");
            return;
        }

        if(password !== repeatPassword) {
            setAlert("Passwords are not the same");
            return;
        }

        if(password.length < 6) {
            setAlert("Password must have 6 characters length min");
            return;
        }
        registerUser();

        setAlert('');
        setUsername('');
        setEmail('');
        setPassword('');
        setRepeatPassword('');
    }

  return (
    <>
        <Container maxWidth="sm">
                <h3>Create your account</h3>
                <p>and become part of the community</p>

                {alert && 
                <Stack spacing={2} paddingBottom={2} color="red">
                    <Typography variant="h5">
                        {alert}
                    </Typography>
                </Stack>
                }

                <form
                    onSubmit={handleSubmit}
                >
                    <Stack spacing={2} paddingBottom={2}>
                        <TextField
                            label="Username"
                            name="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            type="text"
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                        />
                        <TextField
                            label="Password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                        <TextField
                            label="Repeat password"
                            name="repeatpassword"
                            value={repeatPassword}
                            onChange={e => setRepeatPassword(e.target.value)}
                            type="password"
                        />
                    </Stack>
                    <Button variant="contained" type="submit">Sign up</Button>
                </form>
                <p> Have an account?</p> <Link to="/" style={{textDecoration:"none", color:"Black"}}>Log in now</Link>
        </Container>
    </>
  )
}

export default Register