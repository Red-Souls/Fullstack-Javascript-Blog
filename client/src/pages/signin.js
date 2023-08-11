import Head from 'next/head';
import {useState} from 'react';
import {api} from '@/manage';
import {toast} from 'react-toastify';

function SignIn() {
    const [email, setEmail] = useState('');    
    const [password, setPassword] = useState('');    

    function signIn(event) {
        event.preventDefault();
        api.post('/authentication/signin/', {
            email: email,
            password: password,
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
            window.location.href = '/';
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div>
            <Head>
                <title>Sign In</title>
            </Head>
            <div className="container">
                <form onSubmit={signIn}>
                    <div className="form-floating my-3">
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label>Email</label>
                    </div>
                    <div className="form-floating my-3">
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label>Password</label>
                    </div>
                    <button className="btn btn-primary">Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default SignIn;