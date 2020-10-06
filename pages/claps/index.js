import React, { useState } from "react";

function Claps({ clapsNumbers = 0 }) {
  const [clapStyle, setClapStyle] = useState("clap-container");
  const [clickerStyle, setClickerStyle] = useState("click-counter");
  const [countNumber, setCountNumber] = useState(clapsNumbers);

  const handleClapClick = () => {
    setClapStyle("clap-container");
    setClickerStyle("click-counter first-active active");
    setCountNumber((preCount) => preCount + 1);
    setTimeout(() => {
      setClapStyle("clap-container");
      setClickerStyle("click-counter");
    }, 700);
  };
  return (
    <React.Fragment>
      <div className="container">
        <div className="canvas">
          <div id="totalCounter" className="total-counter"></div>
          <div id="clap" className={clapStyle} onClick={handleClapClick}>
            <i className="clap-icon fa fa-hand-paper-o"></i>
          </div>
          <div id="clicker" className={clickerStyle}>
            <span className="counter">{`+${countNumber}`}</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Claps;
