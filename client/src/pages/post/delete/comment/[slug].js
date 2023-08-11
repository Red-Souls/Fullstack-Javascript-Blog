import Head from 'next/head';
import {useRouter} from 'next/router';
import {api} from '@/manage';
import {toast} from 'react-toastify';
import {useEffect, useState} from 'react';

function DeleteComment() {
    const router = useRouter();
    const {slug} = router.query;
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
                setCommentUser(res.data.user);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, [slug]);

    function deleteComment(event) {
        event.preventDefault();
        api.delete(`/comment/deletecomment/${slug}/`)
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
        ui = <form onSubmit={deleteComment}>
            <h2>Are you sure want to delete this comment ?</h2>
            <button className="btn btn-primary">Delete Comment</button>
        </form>
    }

    return (
        <div>
            <Head>
                <title>Delete Comment</title>
            </Head>
            <div className="container">
                {ui}
            </div>
        </div>
    )
}

export default DeleteComment;