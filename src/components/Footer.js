import React from "react";

// MATERIAL-UI ICONS
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";

// CSS
import "../css/footer.css";

function Footer() {
  const ProductsColumn = {
    title: "Products",
    entries: [
      "View all",
      "Beats flex",
      "Powerbeats pro",
      "solo pro",
      "Beats solo3 wireless",
      "Beats studio3 wireless",
      "Beats ep",
      "Beats pill+",
      "Special offers",
    ],
    column: true,
  };

  const SupportColumn = {
    title: "Support",
    entries: [
      "Product help",
      "Service & warranty",
      "Register your beats",
      "Update your beats",
      "Authorized retailers",
      "Contact support",
      "Internacional Numbers",
    ],
    column: true,
  };

  const CompanyColumn = {
    title: "Company",
    entries: ["About", "Press", "Careers"],
    column: true,
  };

  const LegalColumn = {
    title: "Legal",
    entries: ["Terms of use", "Privacy", "Trademark", "Promotion terms"],
    column: true,
  };

  const FollowUsColumn = {
    title: "Follow us",
    entries: [
      <TwitterIcon />,
      <FacebookIcon />,
      <YouTubeIcon />,
      <InstagramIcon />,
    ],
    column: false,
  };

  const locationColumn = {
    title: "Location",
    entries: ["United States", "Change"],
    column: false,
  };

  const NewsLettersColumn = {
    title: "Newsletter",
    entries: ["Signup"],
    column: false,
  };

  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__column productColumn">
          <h2 className="footer__columnTitle">{ProductsColumn.title}</h2>
          <ul className="footer__columnList">
            {ProductsColumn.entries.map((entry, index) => (
              <li key={index} className="footer__columnEntry">
                {entry}
              </li>
            ))}
          </ul>
        </div>
        <div className="footer__column supportColumn">
          <h2 className="footer__columnTitle">{SupportColumn.title}</h2>
          <ul className="footer__columnList">
            {SupportColumn.entries.map((entry, index) => (
              <li key={index} className="footer__columnEntry">
                {entry}
              </li>
            ))}
          </ul>
        </div>
        <div className="footer__column companyColumn">
          <h2 className="footer__columnTitle">{CompanyColumn.title}</h2>
          <ul className="footer__columnList">
            {CompanyColumn.entries.map((entry, index) => (
              <li key={index} className="footer__columnEntry">
                {entry}
              </li>
            ))}
          </ul>
          <h2 className="footer__columnTitle legalColumn">
            {LegalColumn.title}
          </h2>
          <ul className="footer__columnList">
            {LegalColumn.entries.map((entry, index) => (
              <li key={index} className="footer__columnEntry">
                {entry}
              </li>
            ))}
          </ul>
        </div>
        <div className="footer__column">
          <div className="followUsColumn">
            <h2 className="footer__columnTitle">{FollowUsColumn.title}</h2>
            <ul className="footer__columnList footer__row">
              {FollowUsColumn.entries.map((entry, index) => (
                <li key={index} className="footer__columnEntry">
                  {entry}
                </li>
              ))}
            </ul>
          </div>
          <div className="locationColumn">
            <h2 className="footer__columnTitle">{locationColumn.title}</h2>
            <ul className="footer__columnList footer__row">
              {locationColumn.entries.map((entry, index) => (
                <li key={index} className="footer__columnEntry">
                  {entry}
                </li>
              ))}
            </ul>
          </div>
          <div className="newsLettersColumn">
            <h2 className="footer__columnTitle newsLettersColumn">
              {NewsLettersColumn.title}
            </h2>
            <ul className="footer__columnList footer__row">
              {NewsLettersColumn.entries.map((entry, index) => (
                <li key={index} className="footer__columnEntry">
                  {entry}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <p className="footer__copyRight">
        Copyrigh &copy; 2020 Apple Inc. - All rights reserved
      </p>
    </div>
  );
}

export default Footer;
