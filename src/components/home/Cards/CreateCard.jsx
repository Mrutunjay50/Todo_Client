import React, { useEffect, useState } from "react";
import {  Add } from "../../../assets/index";
import { Link } from "react-router-dom";

const CreateCard = ({
  noteData,
  inputHandler,
  getRandomColor,
  handleSubmit,
  handleSubmitSub,
  edit,
  id,
  setClicked,
}) => {
  const [randomColor, setRandomColor] = useState("");
  const [subContent, setSubContent] = useState({
    subTitle: "",
    subContent: "",
  });

  if (randomColor === "#FFFFFF") {
    setRandomColor("#FSDGDF");
  }

  const inputHandlerSub = (e) => {
    const { name, value } = e.target;
    setSubContent((subData) => ({ ...subData, [name]: value }));
  };

  useEffect(() => {
    let randomColorValue = getRandomColor();
    setRandomColor(randomColorValue);
  }, []);
  return (
    <>
      {edit ? (
        <div
          className={`relative w-[260px] h-[45vh] rounded-md flex flex-col p-5 text-white shadow-md shadow-[#878585]`}
          style={{ backgroundColor: randomColor }}
        >
          <span
            className="absolute bottom-3 right-3 cursor-pointer"
            onClick={() => {
              handleSubmitSub(subContent, id);
              setClicked(true);
              setSubContent({ subTitle: "", subContent: "" });
            }}
          >
            <img src={Add} alt="" />
          </span>
          <input
            name="subTitle"
            value={subContent.subTitle}
            className="drop-shadow-md text-[23px] mt-10 bg-transparent focus:outline-none"
            style={{ backgroundColor: randomColor, opacity: 0.8 }}
            type="text"
            onChange={inputHandlerSub}
          />
          <textarea
            name="subContent"
            value={subContent.subContent}
            className="drop-shadow-md bg-transparent focus:outline-none mt-10"
            style={{ backgroundColor: randomColor, opacity: 0.8 }}
            type="text"
            onChange={inputHandlerSub}
          />
        </div>
      ) : (
        <div
          className={`relative w-[260px] h-[45vh] rounded-md flex flex-col p-5 text-white shadow-md shadow-[#878585]`}
          style={{ backgroundColor: randomColor }}
        >
          <Link
            to={`/allnotes`}
            className="absolute bottom-3 right-3 cursor-pointer"
            onClick={() => {
              handleSubmit(noteData);
            }}
          >
            <img src={Add} alt="" />
          </Link>
          <input
            name="subTitle"
            value={noteData.subTitle}
            className="drop-shadow-md text-[23px] mt-10 bg-transparent focus:outline-none"
            style={{ backgroundColor: randomColor, opacity: 0.8 }}
            type="text"
            onChange={inputHandler}
          />
          <textarea
            name="subContent"
            value={noteData.subContent}
            className="drop-shadow-md bg-transparent focus:outline-none mt-10"
            style={{ backgroundColor: randomColor, opacity: 0.8 }}
            type="text"
            onChange={inputHandler}
          />
        </div>
      )}
    </>
  );
};

export default CreateCard;
