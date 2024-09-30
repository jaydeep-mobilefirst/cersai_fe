import React from "react";

const FooterText = () => {
  return (
    <div className="text-center mt-auto pt-5">
      <h1 className="text-[#24222B] text-xs text-wrap text-gilroy-light mt-3 font-normal">
        COPYRIGHT © 2024 CERSAI. ALL RIGHTS RESERVED.
      </h1>
      <p className="text-[#24222B] text-xs text-wrap text-gilroy-light font-normal">
        Powered and managed by{" "}
        <a
          href="https://www.proteantech.in/"
          className="underline text-gilroy-regular font-bold"
          target="_blank"
        >
          Protean eGov Technologies
        </a>{" "}
      </p>
    </div>
  );
};

export default FooterText;
