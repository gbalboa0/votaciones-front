import React from "react";
import { Worker } from "@phuocng/react-pdf-viewer";
import Viewer from "@phuocng/react-pdf-viewer";
import { isNullOrUndefined } from "util";
import myPdf from "../../../assets/pdfs/CD155_19PL.pdf";
import { Button } from "reactstrap";
var _ = require("lodash");


export function PdfViewer(props) {
  const { link, onClose } = props;
  console.log("pdfLink", link);

  if (link) {
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
        <Button className="btn-danger" onClick={() => onClose()}>
          {" "}
          Close{" "}
        </Button>
        <iframe
          title={"pdf"}
          //src="http://docs.google.com/gview?url=https://www.senado.gov.ar/parlamentario/parlamentaria/421274/downloadPdfDefinitivo&embedded=true"
          src={linked}
          style={{ width: 600, height: 500 }}
        />
      </div>
    );
  }
  return "";

  /*return expPdf.byteLength !== undefined ? (
    <Document
      file={{
        url: expPdf
      }}
      onLoadError={console.error}
    ></Document>*/
  /*<Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
      <div
        style={{
          height: "750px"
        }}
      >
        <Viewer
          fileUrl={
            "https://cors-anywhere.herokuapp.com/https://www.senado.gov.ar/parlamentario/parlamentaria/421274/downloadPdfDefinitivo"
          }
        />
      </div>
    </Worker>
    <iframe
          title={"pdf"}
          src="http://docs.google.com/gview?url=https://www.senado.gov.ar/parlamentario/parlamentaria/421274/downloadPdfDefinitivo&embedded=true"
          style={{ width: 600, height: 500 }}
    />
  ) : (
    ""
  );*/
}

export default PdfViewer;
