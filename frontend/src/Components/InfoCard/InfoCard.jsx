import React from "react";

function InfoCard({ title, discription, children }) {
  return (
    <div
      className=" theme-background-color2 text-white w-2/5 h-28 m-4 justify-center text-center flex items-center"
      style={{ fontFamily: "font-family: 'Oswald', sans-serif;" }}
    >
      <div className="">
        <div className="underline-animation cursor-pointer uppercase font-bold text-xl">{title}</div>
         <div className="g-fonts flex items-center">{children}{discription}</div>
      </div>
    </div>
  );
}

export default InfoCard;
