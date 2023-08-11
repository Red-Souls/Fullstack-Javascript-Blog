import Head from 'next/head';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {api} from '@/manage';
import {toast} from 'react-toastify';

function DeletePost() {
    const router = useRouter();
    const {slug} = router.query;
    const [post, setPost] = useState({});
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
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, [slug]);

    function deletePost(event) {
        event.preventDefault();
        api.delete(`/post/deletepost/${slug}/`)
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
            <form onSubmit={deletePost}>
                <h2>Are you sure want to delete this post ?</h2>
                <br />
                <button className="btn btn-primary">Delete Post</button>
            </form>
        </div>
    }

    return (
        <div>
            <Head>
                <title>Delete Post - {post.title}</title>
            </Head>
            {ui}
        </div>
    )
}

export default DeletePost;