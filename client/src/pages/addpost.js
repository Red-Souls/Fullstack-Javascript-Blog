import Head from 'next/head';
import {useState, useEffect} from 'react';
import {api} from '@/manage';
import {toast} from 'react-toastify';

function AddPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [user, setUser] = useState({});

    useEffect(() => {
        api.get('/authentication/getinfo/')
        .then(res => {
            setUser(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    function addPost(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('user', user.id);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', image);
        api.post('/post/addpost/', formData)
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

    return (
        <div>
            <Head>
                <title>Add Post</title>
            </Head>
            <div className="container">
                <form onSubmit={addPost}>
                    <div className="form-floating my-3">
                        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <label>Title</label>
                    </div>
                    <div className="form-floating my-3">
                        <textarea className="form-control h-100" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                        <label>Content</label>
                    </div>
                    <div className="form-floating my-3">
                        <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                        <label>Image</label>
                    </div>
                    <button className="btn btn-primary">Add Post</button>
                </form>
            </div>
        </div>
    )
}

export default AddPost;