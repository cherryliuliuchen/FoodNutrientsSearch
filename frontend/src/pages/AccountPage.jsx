import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import RegisterForm from '../components/AccountPage/RegisterForm';
import LoginForm from '../components/AccountPage/LoginForm';

const AccountPage = () => {
  const [isRegister, setIsRegister] = useState(true);

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Header>
              <Row>
                <Col
                  className={`text-center py-2 clickable ${isRegister ? 'selected' : 'unselected'}`}
                  onClick={() => setIsRegister(true)}
                >
                  Register
                </Col>
                <Col
                  className={`text-center py-2 clickable ${!isRegister ? 'selected' : 'unselected'}`}
                  onClick={() => setIsRegister(false)}
                >
                  Login
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              {isRegister ? <RegisterForm /> : <LoginForm />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountPage;