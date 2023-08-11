import Head from 'next/head';
import {useState} from 'react';
import {api} from '@/manage';
import {toast} from 'react-toastify';

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');    
    const [password, setPassword] = useState('');    
    const [passwordConfirm, setPasswordConfirm] = useState('');    

    function signUp(event) {
        event.preventDefault();
        api.post('/authentication/signup/', {
            username: username,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm,
        })
        .then(res => {
            toast.success(res.data, {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
            window.location.href = '/signin/';
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div>
            <Head>
                <title>Sign Up</title>
            </Head>
            <div className="container">
                <form onSubmit={signUp}>
                    <div className="form-floating my-3">
                        <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label>Username</label>
                    </div>
                    <div className="form-floating my-3">
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label>Email</label>
                    </div>
                    <div className="form-floating my-3">
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label>Password</label>
                    </div>
                    <div className="form-floating my-3">
                        <input type="password" className="form-control" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                        <label>Password Confirm</label>
                    </div>
                    <button className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;