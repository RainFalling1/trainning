/**
 * eslint-disable-next-line prettier/prettier
 */
import React, { useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import "./CSS.css";

const style = {
  li: {
    listStyle: "none",
    display: "flex",
    marginBottom: "10px",
    alignItems: "center",
  },
  lispan: {
    display: "block",
    marginLeft: "10px",
    textDecoration: "none",
    fontWeight: "bold",
    color: "#232323",
  },
};
const PopularCard = (props) => {
  const i = props.item;
  const { index } = props;

  useEffect(() => {}, []);

  const formatName = (str) => {
    if (str.length > 10) {
      return `${str.substr(0, 10)}...`;
    }
    return str;
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <a className="itemCard" key={i.id} href={i.owner.html_url}>
      {/* eslint-disable-next-line radix */}
      <h2>{`#${parseInt(index) + 1}`}</h2>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img
        src={i.owner.avatar_url}
        style={{
          width: "150px",
          height: "150px",
          display: "block",
          margin: "0 auto",
          borderRadius: "3px",
          marginBottom: "8px",
        }}
      />
      <h2 style={{ textAlign: "center", margin: "30px 0" }}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label
          style={{ color: "#000", fontWeight: "bold", textDecoration: "none" }}
        >
          {formatName(i.name)}
        </label>
      </h2>
      <ul style={{ listStyle: "none", paddingLeft: "20px" }}>
        <li style={style.li}>
          <span className="fa fa-star popularIcon" />
          <span style={style.lispan}>{i.watchers} stars</span>
        </li>

        <li style={style.li}>
          <span className="fa fa-random popularIcon" />
          <span style={style.lispan}>{i.forks} forks</span>
        </li>

        <li style={style.li}>
          <span className="fa fa-question-circle popularIcon" />
          <span style={style.lispan}>{i.open_issues} open_issues</span>
        </li>
      </ul>
    </a>
  );
};

export default PopularCard;
