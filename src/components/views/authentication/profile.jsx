import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import {
  register,
  getProfileData
} from "../../services/authenticationServices";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", email: "", password: "", confirmPassword: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    register(this.state);
    event.preventDefault();
  }

  async componentDidMount() {
    let { username, email } = this.state;
    if (username.length === 0 || email.length === 0) {
      const data = await getProfileData();
      this.setState({ username: data.username, email: data.email });
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        {
          <Container>
            <Row className="justify-content-center">
              <Col md="9" lg="7" xl="6">
                <Card className="mx-4">
                  <CardBody className="p-4">
                    <Form className="form" onSubmit={this.handleSubmit}>
                      <h1>Register</h1>
                      <p className="text-muted">Create your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          id="username"
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Email"
                          autoComplete="email"
                          id="email"
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder="Password"
                          autoComplete="new-password"
                          id="password"
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder="Repeat password"
                          autoComplete="new-password"
                          id="confirmPassword"
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                      <Button color="success" block>
                        Create Account
                      </Button>
                    </Form>
                  </CardBody>
                  <CardFooter className="p-4">
                    <Row>
                      <Col xs="12" sm="6">
                        <Button className="btn-facebook mb-1" block>
                          <span>facebook</span>
                        </Button>
                      </Col>
                      <Col xs="12" sm="6">
                        <Button
                          className="btn-twitter mb-1"
                          block
                          //
                        >
                          <span>twitter</span>
                        </Button>
                      </Col>
                    </Row>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        }
      </div>
    );
  }
}

export default Profile;
