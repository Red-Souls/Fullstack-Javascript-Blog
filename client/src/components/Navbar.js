import {useState, useEffect} from 'react';
import {api} from '@/manage';
import {toast} from 'react-toastify';

function Navbar() {
    const [check, setCheck] = useState('');
    const [user, setUser] = useState({});
    const [search, setSearch] = useState('');

    useEffect(() => {
        api.get('/authentication/checkauth/')
        .then(res => {
            setCheck(res.data);
        })
        .catch(err => {
            console.log(err);
        });
        api.get('/authentication/getinfo/')
        .then(res => {
            setUser(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    function signOut(event) {
        event.preventDefault();
        api.get('/authentication/signout/')
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
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        });
    }

    let ui = <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand text-white" href="/">Blog</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link active text-white" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active text-white" href="/signup/">Sign Up</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active text-white" href="/signin/">Sign In</a>
                    </li>
                </ul>
                <form className="d-flex" role="search" action={`/search/${search}/`}>
                    <input value={search} onChange={(e) => setSearch(e.target.value)} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>;
    if (check == 'authenticated !') {
        ui = <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand text-white" href="/">Blog</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active text-white" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active text-white" href="" onClick={signOut}>Sign Out</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active text-white" href="/addpost/">Add Post</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active text-white" href={`/profile/${user.id}/`}>Your Profile</a>
                        </li>
                    </ul>
                    <form className="d-flex" role="search" action={`/search/${search}/`}>
                        <input value={search} onChange={(e) => setSearch(e.target.value)} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>;
    }

    return (
        <div>
            {ui}
        </div>
    )
}

export default Navbar;