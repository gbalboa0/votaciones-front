import React from "react";

export function Error(errors) {
  console.log("ErrorComp", errors);
  /* const err = errors.map(e => {
    return <div>{e}</div>;
  }); */
  return errors ? (
    <div style={{ color: "red", paddingBottom: 9 }}>
      {errors.errors &&
        errors.errors.map(element => {
          return <div key={element}>{element}</div>;
        })}
    </div>
  ) : (
    ""
  );
}
