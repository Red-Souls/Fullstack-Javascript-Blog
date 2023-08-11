import Head from 'next/head';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {api} from '@/manage';
import {toast} from 'react-toastify';

function UpdatePost() {
    const router = useRouter();
    const {slug} = router.query;
    const [post, setPost] = useState({});
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
        if (slug) {
            api.get(`/post/getbyid/${slug}/`)
            .then(res => {
                setPost(res.data);
                setTitle(res.data.title);
                setContent(res.data.content);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, [slug]);

    function updatePost(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('postId', slug);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', image);
        api.put('/post/updatepost/', formData)
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

    let ui = <div>
        <h2 className="text-center">You are not the owner of this post !</h2>
    </div>;
    if (user.id == post.user) {
        ui = <div className="container">
            <form onSubmit={updatePost}>
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
                <button className="btn btn-primary">Update Post</button>
            </form>
        </div>
    }

    return (
        <div>
            <Head>
                <title>Update Post - {post.title}</title>
            </Head>
            {ui}
        </div>
    )
}

export default UpdatePost;