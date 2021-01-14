import React from "react";
import defaultPage from "../hocs/defaultPage";
import Link from "next/link";
import Router from "next/router";

import "../styles/pages/home.scss";

const categories = [
  {
    id: 1,
    name: "beauty",
  },
  {
    id: 2,
    name: "fashion",
  },
  {
    id: 3,
    name: "whatever",
  },
];

const Category = (props) => {
  const { category, i } = props;
  const currentId = 4;
  const previous = currentId - 1;
  const next = currentId + 1;
  return (
    <Link to="/beauty" href={`shots/${previous}`}>
      <div className="category-link" index={i}>
        <div>{category.id}</div>
        <div>{category.name}</div>
      </div>
    </Link>
  );
};

class ViktorHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayLimit: 5,
    };
  }

  componentDidMount() {}

  render() {
    // const { data } = this.props;
    console.log(categories);

    return (
      <div>
        {categories.map((c, i) => {
          if (this.state.showFirstCategory)
            return <Category category={c} index={i} />;
        })}
      </div>
    );
  }
}

export default ViktorHome;
