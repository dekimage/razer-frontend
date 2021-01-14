import React, { useState } from "react";
import { withContext } from "../Context/AppProvider";
import { graphql } from "react-apollo";
import { compose } from "recompose";

import { GET_REALM } from "../../GQL/Query";
import Link from "next/link";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

const RealmPopover = (props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);
  const onClose = () => setPopoverOpen(false);
  const { id, name } = props;
  const {
    data: { loading, error, realm },
    context,
  } = props;

  if (error) return "Error Loading Realm Link || just render name static";
  if (realm && !loading) {
    return (
      <div style={{ display: "inline-block" }}>
        <div
          id={"Popover-" + id}
          // type="button"
          className="card-popover-btn"
          onClick={() => toggle()}
          onBlur={() => onClose()}
        >
          <div className="card-popover-btn-monkey">
            <img
              src={`http://localhost:1337${realm.logo.url}`}
              style={{ height: "18px" }}
            />
          </div>
          <div
            className="card-popover-btn-name"
            style={{ color: "black", fontWeight: "600" }}
          >
            {name}
          </div>
        </div>
        <Popover
          trigger="legacy"
          placement="bottom"
          isOpen={popoverOpen}
          target={"Popover-" + id}
        >
          <PopoverHeader>{realm.name}</PopoverHeader>
          <PopoverBody>
            <div>{realm.description}</div>
            <div>{realm.logo}</div>
            <Button outline color="secondary">
              <Link as={`/realm/${id}`} href={`/realm?id=${id}`}>
                <a>View Realm</a>
              </Link>
            </Button>
          </PopoverBody>
        </Popover>
      </div>
    );
  }
  // loading...
  return (
    <div onBlur={() => onClose()}>
      <Button id="Popover1" type="button">
        Launch Popover
      </Button>
      <Popover
        placement="bottom"
        isOpen={popoverOpen}
        target="Popover1"
        toggle={toggle}
      >
        <PopoverHeader>{name}</PopoverHeader>
        <PopoverBody>
          <Link href={`/card?id=${id}`} as={`/card/${id}`}>
            <a href="View"></a>
          </Link>
          Data Loading...
        </PopoverBody>
      </Popover>
    </div>
  );
};

export default compose(
  withContext,
  graphql(GET_REALM, {
    options: (props) => {
      return {
        variables: {
          id: props.id,
        },
      };
    },
    props: ({ data }) => ({ data }),
  })
)(RealmPopover);
