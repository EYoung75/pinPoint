import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";

const SignUp = props => {
  return (
    <Modal isOpen={props.signUp} toggle={props.toggleSignUp} className={"SignUp"}>
      <ModalHeader toggle={props.toggleSignUp}>Create Account:</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="email">Email:</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email:"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password:</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password:"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Re-enter Password:</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Re-enter your password:"
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={props.toggleSignUp}>
          Create Account
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
};

export default SignUp;
