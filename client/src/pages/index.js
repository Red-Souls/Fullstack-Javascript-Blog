import Head from 'next/head';
import {api, url} from '@/manage';
import {useEffect, useState} from 'react';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/post/getall/')
    .then(res => {
      setPosts(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  }, [])

  return (
    <div>
      <Head>
        <title>Blog</title>
      </Head>
      <div className="container my-5">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {
            posts.map(post => (
              <div className="col" key={post.id}>
                <a className="post-link" href={`/post/${post.id}/`}>
                  <div className="card h-100">
                    <img src={`${url}${post.image}`} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <p className="card-text">{post.content}</p>
                    </div>
                  </div>
                </a>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Home;