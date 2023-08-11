import Head from 'next/head';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {api} from '@/manage';
import {toast} from 'react-toastify';

function UpdateComment() {
    const router = useRouter();
    const {slug} = router.query;
    const [content, setContent] = useState('');
    const [commentUser, setCommentUser] = useState('');
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
            api.get(`/comment/getcommentbyid/${slug}/`)
            .then(res => {
                setContent(res.data.content);
                setCommentUser(res.data.user);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, [slug]);

    function updateComment(event) {
        event.preventDefault();
        api.put(`/comment/updatecomment/${slug}/`, {
            content: content,
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

    let ui = <div>
        <h2 className="text-center">You are not the owner of this comment !</h2>
    </div>;
    if (user.id == commentUser) {
        ui = <form onSubmit={updateComment}>
            <div className="form-floating my-3">
                <textarea className="form-control h-100" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <label>Content</label>
            </div>
            <button className="btn btn-primary">Publish</button>
        </form>
    }

    return (
        <div>
            <Head>
                <title>Update Comment</title>
            </Head>
            <div className="container">
                {ui}
            </div>
        </div>
    )
}

export default UpdateComment;