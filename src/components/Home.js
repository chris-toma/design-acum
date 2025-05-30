import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const { currentUser } = useAuth();

  return (
    <Container className="home-container">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Welcome to Firebase Community App</h1>
          <p className="text-center lead">
            A secure platform for community discussions and sharing ideas.
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Join Our Community</Card.Title>
              <Card.Text>
                Register to access our community page where you can connect with other members,
                share your thoughts, and participate in discussions.
              </Card.Text>
              {!currentUser ? (
                <Button as={Link} to="/register" variant="primary">Register Now</Button>
              ) : (
                <Button as={Link} to="/community" variant="success">Go to Community</Button>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Secure Authentication</Card.Title>
              <Card.Text>
                We use Firebase Authentication to ensure your account is secure.
                Your data is protected and your privacy is our priority.
              </Card.Text>
              {!currentUser ? (
                <Button as={Link} to="/login" variant="primary">Login</Button>
              ) : (
                <Card.Text className="text-success">You are logged in!</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2 className="text-center mb-4">Features</h2>
        </Col>
      </Row>
      <Row>
        <Col md={4} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Secure Authentication</Card.Title>
              <Card.Text>
                User registration and login powered by Firebase Authentication.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Community Discussions</Card.Title>
              <Card.Text>
                Share your thoughts and engage with other community members.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Real-time Updates</Card.Title>
              <Card.Text>
                See new posts and comments in real-time with Firestore.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;