import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function VerificationPage({props}) {  
  const data = {verified : true};

  return (
    <div className = "VerificationPage-Container-Main">
        {data.verified === "true" && <p>Your account has been verified. Go back to your login page to log in</p>}
        {data.verified === "false" && <p>Invalid Link, Go back and please try again</p>}
    </div>
  )
}

export default VerificationPage