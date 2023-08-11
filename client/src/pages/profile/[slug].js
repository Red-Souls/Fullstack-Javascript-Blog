import Head from 'next/head';
import {api, url} from '@/manage';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';

function Profile() {
    const router = useRouter();
    const {slug} = router.query;
    const [user, setUser] = useState({});
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');    
    const [description, setDescription] = useState('');
    const [avatar, setAvatar] = useState('');
    const [user1, setUser1] = useState({});
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        api.get('/authentication/getinfo/')
        .then(res => {
            setUser1(res.data);
        })
        .catch(err => {
            console.log(err);
        });
        if (slug) {
            api.get(`/authentication/getuserbyid/${slug}/`)
            .then(res => {
                setUser(res.data);
                setUsername(res.data.username);
                setEmail(res.data.email);
                setDescription(res.data.description);
                setAvatar(res.data.avatar);
            })
            .catch(err => {
                console.log(err);
            });

            api.get(`/post/getpostbyuser/${slug}/`)
            .then(res => {
                setPosts(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, [slug]);

    function updateProfile(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('id', slug);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('description', description);
        formData.append('avatar', avatar);
        api.put('/authentication/update/', formData)
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
        })
        .catch(err => {
            console.log(err);
        });     
    }

    let updateUi = <div></div>
    if (user1.id == slug) {
        updateUi = <div className="text-center my-3">
            <button className="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#update-profile" aria-expanded="false" aria-controls="update-profile">Update Profile</button>
            <div className="collapse" id="update-profile">
                <div className="card card-body">
                    <form onSubmit={updateProfile}>
                        <div className="form-floating my-3">
                            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <label>Username</label>
                        </div>
                        <div className="form-floating my-3">
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label>Email</label>
                        </div>
                        <div className="form-floating my-3">
                            <textarea className="form-control h-100" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            <label>Description</label>
                        </div>
                        <div className="form-floating my-3">
                            <input type="file" className="form-control" onChange={(e) => setAvatar(e.target.files[0])} />
                            <label>Avatar</label>
                        </div>
                        <button className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    }

    return (
        <div>
            <Head>
                <title>{user.username}</title>
            </Head>
            <div className="container my-3">
                {updateUi}
                <div className="row">
                    <div className="col text-center">
                        <img src={`${url}${user.avatar}`} className="avatar" />
                    </div>
                    <div className="col">
                        <h3>{user.username}</h3>
                        <p>email: {user.email}</p>
                        <p>description: {user.description}</p>
                    </div>
                </div>
                {posts.map(post => (
                    <div key={post.id}>
                        <a href={`/post/${post.id}/`} className="post-link">
                            <div className="card post-width my-3">
                                <img src={`${url}${post.image}`} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{post.title}</h5>
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Profile;