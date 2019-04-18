import React from "react";
import { Jumbotron, Button, Container } from "reactstrap";

const HomeCard = () => {
  return (
    <div className="homeCard">
      <Jumbotron className={"homeJumbo"} fluid>
        <Container>
          <h1 className="display-3">PinPoint</h1>
          <p className="lead">
            From lowkey alcoves and overlooked shops to well known and bustling attractions, PinPoint allows you discover new places, and dive deeper
            into the place you call home
          </p>
          <hr className="my-2" />
          <p>
            Build your bucket list, browse and save locations and events and share your activity with friends
          </p>
          <p className="lead">
            <Button>Learn More</Button>
          </p>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default HomeCard;
