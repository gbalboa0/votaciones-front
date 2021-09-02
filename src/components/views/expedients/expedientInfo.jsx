import React, { useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { Collapse } from "reactstrap";
import Button from "@material-ui/core/Button";

const RenderText = props => {
  const { link, text } = props;
  return link ? (
    <div>
      {/* <a href={link} target="_blank" rel="noopener noreferrer">
        {text}
      </a> */}
      {/* <iframe
        title={link}
        src={link}
        style={{ width: 600, height: 500 }}
      ></iframe> */}
    </div>
  ) : (
    ""
  );
};

const RenderText2 = props => {
  const { link, text } = props;
  return link ? showPdfIframe(link, text) : "";
};

const showPdfIframe = (link, text) => {
  let linked = link;
  if (!link.includes("www")) {
    linked = [
      link.slice(0, link.indexOf("://") + 3),
      "www.",
      link.slice(link.indexOf("://") + 3)
    ].join("");
  }
  if (link.includes("download")) {
    linked = "http://docs.google.com/gview?url=" + linked + "&embedded=true";
  }

  console.log("originalLink", linked);
  return (
    <div>
      <p>{text}</p>
      <iframe
        title={"pdf"}
        //src="http://docs.google.com/gview?url=https://www.senado.gov.ar/parlamentario/parlamentaria/421274/downloadPdfDefinitivo&embedded=true"
        src={linked}
        style={{ width: 600, height: 500 }}
      />
    </div>
  );
};

const RenderSummary = props => {
  const { text } = props;
  return text ? (
    <div>
      <strong className="font-weight-bold">Resumen: </strong>
      {text}
    </div>
  ) : (
    ""
  );
};

export function ExpedientInfo(props) {
  const [expOpen, setExpOpen] = useState(false);
  const { exp, onPdfShow } = props;
  /* console.log("exp!", exp);
  console.log("onPdfShow", onPdfShow); */
  return (
    <React.Fragment>
      <FormControlLabel
        className="ml-0 mt-2"
        key={exp.number}
        control={
          <Button
            onClick={() => {
              setExpOpen(!expOpen);
            }}
            name="checkedB"
            variant="contained"
            className="m-0 p-0"
            aria-controls={"expedient" + exp.number}
          >
            {exp.number}
          </Button>
        }
      />
      <Collapse
        key={"collapse" + exp.number}
        isOpen={expOpen}
        id={"expedient" + exp.number}
        style={{ width: "100%" }}
      >
        {
          <React.Fragment>
            <div>
              <h6>{exp.title}</h6>
            </div>
            <RenderSummary text={exp.summary} />
            {exp.originalTextLink ? (
              <Button onClick={() => onPdfShow(exp.originalTextLink)}>
                {"Texto Original"}
              </Button>
            ) : (
              ""
            )}
            {exp.definitiveTextLink ? (
              <Button onClick={() => onPdfShow(exp.definitiveTextLink)}>
                {"Texto Nuevo"}
              </Button>
            ) : (
              ""
            )}
            <RenderText link={exp.originalTextLink} text="Texto Original" />
            <RenderText link={exp.definitiveTextLink} text="Texto Nuevo" />
            {/* <RenderText2 link={exp.definitiveTextLink} text="Texto Nuevo" />
            <RenderText2 link={exp.originalTextLink} text="Texto Original" /> */}
          </React.Fragment>
        }
      </Collapse>
    </React.Fragment>
  );
}

export default ExpedientInfo;
