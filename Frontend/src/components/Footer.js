import React from 'react';
import '../styles/Footer.css';
import '../styles/General.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Link para site hospedado no AWS Amplify 
        <span class="spacer"></span> 
        <a href="https://main.d1cp8k4m9e7a1u.amplifyapp.com">Acesse Aqui</a>
      </p>
      <p>
        Link para site hospedado no AWS Elastic Beanstalk 
        <span class="spacer"></span> 
        <a href="http://backend-dev2.sa-east-1.elasticbeanstalk.com">Acesse Aqui</a>
      </p>
    </footer>
  );
};

export default Footer;