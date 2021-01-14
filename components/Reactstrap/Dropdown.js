import React, { useState } from "react";
import {
  Dropdown as DropdownMain,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// import "./style.scss";
import "../../styles/reactstrap.scss";

const Dropdown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState(props.filterType);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const triggerSelect = (option) => {
    setSelected(option);
    props.filterBy(props.filterType, option);
  };
  const resetFilters = () => {
    setSelected(props.filterType);
    props.filterBy(props.filterType, "");
  };

  return (
    <DropdownMain isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>{selected}</DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => resetFilters()}>Show All</DropdownItem>
        <DropdownItem divider />
        {props.options.map((option, i) => (
          <DropdownItem key={i} onClick={() => triggerSelect(option)}>
            <div className="">
              {/* {optionImage && <img src={`http://localhost:1337${logo.url}`} />} */}
              {option}
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownMain>
  );
};

export default Dropdown;
