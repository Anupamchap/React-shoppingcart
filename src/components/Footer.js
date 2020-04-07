import React from "react";
import '../css/components/footer.css';

const Footer = props => {
  return (
    <footer>
      <p className="footer-links">
        <a
          href="https://github.com/anupamchap/React-shoppingcart"
          target="_blank"
          rel="noopener noreferrer" 
        >
          View Source on Github
        </a>
        <span>      /              </span>
        <a href="mailto:anurodhinfotech@gmail.com" target="_blank" rel="noopener noreferrer" >
          Contact us
        </a>
        <span>        /            </span>
        <a href="https://www.youtube.com/channel/UCo0RVHAE8f3Tqjwhh70ZB3g" target="_blank" rel="noopener noreferrer" >
          My youtube channel
        </a>
      </p>
    </footer>
  );
};

export default Footer;
