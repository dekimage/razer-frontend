import React from "react";
import Link from "next/link";
import logoIcon from "../../assets/fonts/diamond.svg";
import "./style.scss";

const Footer = () => {
  return (
    <div className="footer">
      <Link as="/" href="/">
        <img src={logoIcon} height="20px" />
      </Link>
      <Link as="terms" href="terms">
        <div className="footer-link">Realms</div>
      </Link>
      <Link as="terms" href="terms">
        <div className="footer-link">Expansions</div>
      </Link>
      <Link as="terms" href="terms">
        <div className="footer-link">Support</div>
      </Link>
      <Link as="terms" href="terms">
        <div className="footer-link">FAQ</div>
      </Link>
      <Link as="about" href="about">
        <div className="footer-link">About</div>
      </Link>
      <Link as="terms" href="terms">
        <div className="footer-link">Terms & Conditions</div>
      </Link>
      <div className="footer-corporate">©Gemifuy.io</div>
    </div>
  );
};

export default Footer;
