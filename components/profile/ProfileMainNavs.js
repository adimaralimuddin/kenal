import React from "react";
import Menu from "../elements/Menu";

const ProfileMainNavs = () => {
  return (
    <div className="box p-0 px-4 flex gap-3 justify-around">
      <Menu
        tab={"posts"}
        tabText={"profileTab"}
        icon="home"
        defaultTab={"posts"}
      />
      <Menu tab={"photos"} tabText={"profileTab"} icon="image" />
      <Menu tab={"followers"} tabText={"profileTab"} icon="user" />
      <Menu tab={"followings"} tabText={"profileTab"} icon="user" />
    </div>
  );
};

export default ProfileMainNavs;
