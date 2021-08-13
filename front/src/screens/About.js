import React, { useEffect } from "react";
import { apiBaseURL } from "../config/index";

export const About = () => {
  useEffect(() => {
    fetch(`${apiBaseURL}/home`).then((res) => res.json());
  }, []);

  return (
    <>
      <p>Página indisponível no momento</p>
    </>
  );
};
