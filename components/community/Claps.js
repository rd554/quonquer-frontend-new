import React, { useState } from "react";
import { postClaps } from "../../actions/community";
import _ from "lodash";
import claps from "../../public/svg/thumb-up.svg";
import { getCookie } from "../../actions/auth";


export function Claps({ clapsNumbers = 0, questionId }) {
  const [clapStyle, setClapStyle] = useState("clap-container");
  const [clickerStyle, setClickerStyle] = useState("click-counter");
  const [countNumber, setCountNumber] = useState(clapsNumbers);

  const token = getCookie("token");

  const handleClapClick = () => {
    setClapStyle("clap-container");
    setClickerStyle("click-counter first-active active");
    setCountNumber((preCount) => preCount + 1);
    setTimeout(() => {
      setClapStyle("clap-container");
      setClickerStyle("click-counter");
    }, 700);


    
    postClaps(questionId, countNumber, token).then((res) => {
      if (res.error) {
        console.log(res.error);
      } else {
        setCountNumber(res?.question?.claps);
      }
    });
  };




  return (
    <React.Fragment>
      <div className="">
        <div className="container">
          <div className="canvas flex">
            <div id="totalCounter" className="total-counter"></div>
            <div id="clap" className={clapStyle} onClick={handleClapClick}>
              <img src={claps} alt="claps" />
            </div>
            <div id="clicker" className={clickerStyle}>
              <span className="counter">{`+${countNumber}`}</span>
            </div>
            <p className="text-blue-900 text-lg ml-24 counter">{`+${countNumber}`}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
