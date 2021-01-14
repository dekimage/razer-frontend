import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import cx from "classnames";
import "./style.scss";

const SecondaryHeader = (props) => {
  const { links, router } = props;
  return (
    <div className="secondary-header-container">
      <div className="secondary-header">
        {links.map((link, i) => {
          return (
            <Link href={link.href} as={link.as} key={i}>
              <div
                className={cx(
                  "secondary-header__item",
                  router.pathname.includes(link.href) && "active"
                )}
              >
                {link.label}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default withRouter(SecondaryHeader);
