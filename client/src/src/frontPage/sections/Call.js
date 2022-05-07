import React, { useState } from 'react';

const Call = () => {
  const [name, setName] = useState('');
  const Email = 'du19sh92yant@gmail.com';
  const clickhandler = async () => {
    const response = await fetch('/login1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Email }),
    });
    const data = await response.json();
    console.log(data.Name);
    setName(data.Name);
  };

  return (
    <>
      <button type="button" onClick={clickhandler}>
        click
      </button>
      <h1>{name}</h1>
    </>
  );
};

export default Call;
