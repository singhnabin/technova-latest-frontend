import React, { useEffect, useState } from 'react';

function TechNova({ value }) {
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(value)
    console.log("h")
  })
  return (
    <div>
      this is name : {user}

    </div>
  );
}

export default TechNova;