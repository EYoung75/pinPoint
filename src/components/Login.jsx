import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";

const Login = props => {
  return (
    <Modal isOpen={props.login} toggle={props.toggleLogin} className={"login"}>
      <ModalHeader toggle={props.toggleLogin}>Login:</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email:"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password:"
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={props.toggleLogin}>
          Login
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
};

export default Login;
