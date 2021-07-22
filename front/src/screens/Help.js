import React, { useEffect } from 'react';
import { apiBaseURL } from '../config/index';

function Help() {
  
  useEffect(() => {
    fetch(`${apiBaseURL}/home`).then(res => res.json());
  }, []);

  return (
      <>
      <p>Página indisponível no momento</p>
      </>
  );
}

export default Help;