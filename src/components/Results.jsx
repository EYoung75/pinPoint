import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import Geolocate from "./Geolocate.jsx";


const Results = props => {
  const venues = props.results.map(venue => {
    return (
        <Card>
          <CardImg
            top
            width="100%"
            src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle>{venue.name}</CardTitle>
            <CardSubtitle>{venue.location.address}</CardSubtitle>
            <CardText>
              {venue.categories !== undefined || null ?  " " : `${venue.categories[0].name}`}
            </CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
    );
  });
  return (
    <div className="results">
      <Geolocate/>
      {venues}
    </div>
  );
};

export default Results;
