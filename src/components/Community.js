import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

function Community() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const { currentUser } = useAuth();

  // Fetch posts from Firestore
  useEffect(() => {
    async function fetchPosts() {
      try {
        const postsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(postsQuery);
        const fetchedPosts = [];

        querySnapshot.forEach((doc) => {
          fetchedPosts.push({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date()
          });
        });

        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoadingPosts(false);
      }
    }

    fetchPosts();
  }, []);

  // Add a new post to Firestore
  async function handleSubmit(e) {
    e.preventDefault();

    if (newPost.trim() === '') {
      return setError('Post cannot be empty');
    }

    // Check if user is authenticated
    if (!currentUser) {
      return setError('You must be logged in to post');
    }

    try {
      setError('');
      setLoading(true);

      const postData = {
        content: newPost,
        authorId: currentUser.uid,
        authorEmail: currentUser.email,
        createdAt: serverTimestamp()
      };

      console.log('Adding post with data:', postData);
      const docRef = await addDoc(collection(db, 'posts'), postData);
      console.log('Post added successfully with ID:', docRef.id);

      // Add the new post to the state
      setPosts([{
        id: docRef.id,
        ...postData,
        createdAt: new Date()
      }, ...posts]);

      setNewPost('');
    } catch (error) {
      setError('Failed to add post. Please try again: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(date) {
    return new Date(date).toLocaleString();
  }

  return (
    <Container className="community-container">
      <h1 className="text-center mb-4">Community</h1>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Create a New Post</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={3}
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's on your mind?"
              />
            </Form.Group>
            <Button 
              type="submit" 
              variant="primary" 
              className="mt-3"
              disabled={loading}
            >
              {loading ? 'Posting...' : 'Post'}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <h2 className="mb-3">Recent Posts</h2>

      {loadingPosts ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts yet. Be the first to post!</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="community-post">
            <div className="community-post-header">
              <span className="community-post-author">{post.authorEmail}</span>
              <span className="community-post-date">{formatDate(post.createdAt)}</span>
            </div>
            <div className="community-post-content">
              {post.content}
            </div>
          </div>
        ))
      )}
    </Container>
  );
}

export default Community;
