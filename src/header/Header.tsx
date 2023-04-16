import React from "react";
import s from "./Header.module.scss";

import { Button } from "../button/Button";

interface HeaderProps {
  starshipData?: string;
  onLaunch?: () => void;
}

const Header: React.FC<HeaderProps> = ({ starshipData, onLaunch }) => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>
        {starshipData ? starshipData : "Star Wars Spaceship"}
      </h1>
      {onLaunch && (
        <Button handleClick={onLaunch} text="Launch" width="300px"></Button>
      )}
    </div>
  );
};

export default Header;
