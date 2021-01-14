import React from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import Link from "next/link";
import "../../styles/reactstrap.scss";

const Breadcrumbs = (props) => {
  const { active, realm, card } = props.links;
  return (
    <div className="section-breadcrumb">
      <div style={{ width: "1080px" }}>
        <Breadcrumb className="breadcrumb">
          <BreadcrumbItem>
            <Link href={`/realms`}>
              <a>Realms</a>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            {card ? (
              <Link as={`/realm/${realm.id}`} href={`/realm?id=${realm.id}`}>
                <a>{realm.name}</a>
              </Link>
            ) : (
              <>{realm.name}</>
            )}
          </BreadcrumbItem>
          {card && (
            <BreadcrumbItem>
              <>{card.name}</>
            </BreadcrumbItem>
          )}
        </Breadcrumb>
      </div>
    </div>
  );
};

export default Breadcrumbs;
