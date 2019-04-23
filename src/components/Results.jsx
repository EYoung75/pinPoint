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

const Results = props => {
  const venues = props.results.map(venue => {
    return (
        <Card className={"result"}>
          {/* <CardImg
            top
            width="100%"
            src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
            alt="Card image cap"
          /> */}
          <CardBody>
            <CardTitle><u><b>{venue.name}</b></u></CardTitle>
            <CardText>
              {venue.categories === undefined || null ?  " " : `${venue.categories[0].name}`}
            </CardText>
            {venue.location.address === undefined ? "This listing does not include an address" : <CardSubtitle><h5><u>Address:</u></h5><a href={"https://maps.google.com/?q=" + venue.location.address}>{venue.location.address}</a></CardSubtitle>}
            <Button>Menu</Button>
          </CardBody>
        </Card>
    );
  });
  return (
    <div className="results">
      {venues.length !== 0 ? venues : <h4>There were no results found containing part or all of the keyword you searched for. Please try another.</h4>}
    </div>
  );
};

export default Results;
