import React, { useState, useEffect } from "react";
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
import { useInput } from "../../functional/useInput";
import { Error } from "./errorField";

export function Profile() {
  const [errors, setErrors] = useState("");
  const {
    value: username,
    setValue: setUsername,
    bind: bindUsername
  } = useInput("");
  const { value: email, setValue: setEmail, bind: bindEmail } = useInput("");
  const { value: password, bind: bindPassword } = useInput("");
  const { value: confirmPassword, bind: bindConfirmPassword } = useInput("");

  useEffect(() => {
    async function getData() {
      const data = await getProfileData();
      setUsername(data.username);
      setEmail(data.email);
    }
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log("errorsEffect", errors);
  }, [errors]);

  const handleSubmit = event => {
    event.preventDefault();
    registerAsync();
  };

  async function registerAsync() {
    const profile = {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    };
    const data = await register(profile);
    if (data) {
      setErrors(data);
      console.log("dataErrors", data);
    }
  }

  return (
    <div className="app flex-row align-items-center">
      {
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form className="form" onSubmit={handleSubmit}>
                    <h1>Mi Perfil</h1>
                    <p className="text-muted">Actualizar Información</p>
                    <InputGroup className="mt-3">
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
                        {...bindUsername}
                      />
                    </InputGroup>
                    {errors && <Error errors={errors.Username} />}
                    <InputGroup className="mt-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Email"
                        autoComplete="email"
                        id="email"
                        {...bindEmail}
                      />
                    </InputGroup>
                    {errors && <Error errors={errors.Email} />}
                    <InputGroup className="mt-3">
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
                        {...bindPassword}
                      />
                    </InputGroup>
                    {errors && <Error errors={errors.Password} />}
                    <InputGroup className="mt-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Repeat password"
                        autoComplete="new-password"
                        id="ConfirmPassword"
                        {...bindConfirmPassword}
                      />
                    </InputGroup>
                    {errors && <Error errors={errors.ConfirmPassword} />}
                    <Button className="mt-4" color="success" block>
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

export default Profile;
