import React from "react";
import Menu from "../elements/Menu";

const ExploreMainMenu = () => {
  const onClickHandler = (menu) => {
    console.log("menu", menu);
  };
  return (
    <div className="box flex px-3 p-0">
      <Menu
        tab={"all"}
        text="Explore All"
        tabText={"exploreTab"}
        defaultTab={"all"}
        onClick={onClickHandler}
      />
      <Menu
        tab={"people"}
        text="Explore People"
        tabText={"exploreTab"}
        icon="person"
      />
      <Menu
        tab={"pages"}
        text="Explore Pages"
        tabText={"exploreTab"}
        icon="person"
      />
      <Menu
        tab={"posts"}
        text="Explore Posts"
        tabText={"exploreTab"}
        icon="person"
      />
      <Menu
        tab={"group"}
        text="Explore Group"
        tabText={"exploreTab"}
        icon="person"
      />
    </div>
  );
};

export default ExploreMainMenu;
