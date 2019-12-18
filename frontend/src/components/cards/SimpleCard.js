import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import StyledLink from "../../components/StyledLink";
import EuroIcon from "@material-ui/icons/Euro";

const useStyles = makeStyles({
  card: {
    display: "inline-block",
    width: "fit-content",
    minWidth: 250,
    margin: 30,
    borderRadius: 20,
    border: "1px",
    borderColor: "#E7DFDD",
    fontFamily: "Roboto",
    borderStyle: "solid",
    maxHeight: "130px"
  },
  title: {
    fontSize: 18,
    fontWeight: "fontWeightBold"
  },
  number: {
    fontSize: 30,
    marginRight: "2px",
    alignSelf: "baseline"
  },
  content: {
    borderColor: "red",
    height: "80% ",
    paddingBottom: "5px !important",
    maxHeight: "fit-content",
    width: "90% ",
    maxWidth: "90% ",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }
});

const SimpleCard = props => {
  const classes = useStyles();
  console.log(props.color);
  return (
    <Card className={classes.card}>
      <StyledLink to={props.to || "/"}>
        <CardContent className={classes.content}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {props.label}
          </Typography>
          <Typography
            align="left"
            color="primary"
            gutterBottom
            className={classes.number}
          >
            {props.number}{" "}
            {props.unit ? props.unit : <EuroIcon color="primary" />}
          </Typography>
        </CardContent>
      </StyledLink>
    </Card>
  );
};

// SimpleCard.propTypes = {
//   label: PropTypes.string,
//   number: PropTypes.integ,
//   to: PropTypes.string,
//   unit: PropTypes.string
// }

export default SimpleCard;
