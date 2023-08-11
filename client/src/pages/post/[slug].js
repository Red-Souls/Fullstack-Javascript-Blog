import Head from 'next/head';
import {api, url} from '@/manage';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';

function PostDetail() {
    const router = useRouter();
    const {slug} = router.query;
    const [post, setPost] = useState({});
    const [content, setContent] = useState('');
    const [user, setUser] = useState({});
    const [comments, setComments] = useState([]);
    const [threeLatestPosts, setThreeLatestPosts] = useState([]);
    const [author, setAuthor] = useState([]);

    useEffect(() => {
        api('/post/getthreelatestposts/')
        .then(res => {
            setThreeLatestPosts(res.data);
        })
        .catch(err => {
            console.log(err);
        });

        if (slug) {
            api.get(`/post/getbyid/${slug}/`)
            .then(res => {
                setPost(res.data);
                api.get(`/authentication/getuserbyid/${res.data.user}/`)
                .then(res => {
                    setAuthor(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
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
            api.get(`/comment/getallbypost/${slug}/`)
            .then(res => {
                setComments(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, [slug]);

    function addComment(event) {
        event.preventDefault();
        api.post('/comment/addcomment/', {
            post: slug,
            user: user.id,
            username: user.username,
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
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        });
    }

    let ui = <div></div>;
    if (user.id) {
        ui = <div>
            <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#add-comment" aria-expanded="false" aria-controls="add-comment">Add Comment</button>
            <div className="collapse" id="add-comment">
                <div className="card card-body">
                    <form onSubmit={addComment}>
                        <div className="form-floating my-3">
                            <textarea className="form-control h-100" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                            <label>Content</label>
                        </div>
                        <button className="btn btn-primary">Publish</button>
                    </form>
                </div>
            </div>
        </div>
    }

    let postOptions = <div></div>;
    if (user.id == post.user) {
        postOptions = <div>
            <a className="post-link" href={`/post/update/${post.id}/`}>Update</a>
            <br />
            <a className="post-link" href={`/post/delete/${post.id}/`}>Delete</a>
        </div>;
    }

    return (
        <div>
            <Head>
                <title>{post.title}</title>
            </Head>
            <div className="container my-3">
                <div className="row">
                    <div className="col-lg-8">
                        <div>
                            <a href={`/profile/${post.user}/`} className="post-link">
                                <div className="d-flex">
                                    <div>
                                        <img src={`${url}${author.avatar}`} className="small-avatar" />
                                    </div>
                                    <div className="ms-3">
                                        <h3>{author.username}</h3>
                                    </div>
                                </div>
                            </a>
                            {postOptions}
                            <h1 className="text-center">{post.title}</h1>
                            <div className="text-center">
                                <img src={`${url}${post.image}`} className="img" />
                            </div>
                            <p>{post.content}</p>
                        </div>
                        <div>
                            <h3>Comment</h3>
                            {ui}
                            {comments.map(comment => (
                                <div key={comment.id}>
                                    <a href={`/profile/${comment.user}/`} className="post-link"><h5>{comment.username}</h5></a>
                                    <p>{comment.content}</p>
                                    {user.id == comment.user &&
                                        <div>
                                            <a href={`/post/update/comment/${comment.id}/`} className="post-link">Update Comment</a>
                                            <br />
                                            <a href={`/post/delete/comment/${comment.id}/`} className="post-link">Delete Comment</a>
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="text-center bg-dark p-2">
                            <h3 className="text-white">New recent posts</h3>
                        </div>
                        {threeLatestPosts.map(post => (
                            <div key={post.id}>
                                <a className="post-link" href={`/post/${post.id}/`}>
                                    <div className="card my-3">
                                        <img src={`${url}${post.image}`} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{post.title}</h5>
                                            <p className="card-text">{post.content}</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostDetail;