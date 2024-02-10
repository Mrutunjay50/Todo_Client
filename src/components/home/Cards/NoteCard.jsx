import React, { useEffect, useState } from "react";
import { Complete, EDITW, FileOff, Pending } from "../../../assets";
import { Link } from "react-router-dom";

const NoteCard = ({
  item,
  formatDate,
  deleteNotes,
  getRandomColor,
  updateNoteStatus,
}) => {
  const { day, month, year, hours, minutes } = formatDate(item.updatedAt);
  const [randomColor, setRandomColor] = useState("");

  if (randomColor === "#FFFFFF") {
    setRandomColor("#FSDGDF");
  }

  useEffect(() => {
    let randomColorValue = getRandomColor();
    setRandomColor(randomColorValue);
  }, []);

  return (
    <div className="flex items-center gap-5">
      <span
        className=" cursor-pointer text-black flex text-[26px] relative shadow-md shadow-[#131313] rounded-full"
        onClick={() => {
          updateNoteStatus(
            item._id,
            item.status === "pending" ? "completed" : "pending"
          );
        }}
      >
        {item.status === "pending" && (
          <>
            {" "}
            <img
              src={Pending}
              className="cursor-pointer bg-blue-400 rounded-full"
              alt=""
            />
          </>
        )}
        {item.status === "completed" && (
          <>
            {" "}
            <img src={Complete} className="cursor-pointer bg-green-700 rounded-full" alt="" />
          </>
        )}
      </span>
      <div
        className="flex flex-row items-center justify-between  p-2 rounded-[2px] shadow-md shadow-[#131313]"
        style={{ backgroundColor: randomColor }}
      >
        <img
          src={FileOff}
          className="cursor-pointer"
          onClick={() => deleteNotes(item._id)}
          alt=""
        />
        <Link
          to={`/seenote/${item._id}`}
          className="flex flex-row items-center justify-between  relative cursor-pointer  w-[400px] text-white hover:text-white "
        >
          <div className=" flex flex-col">
            <span className="drop-shadow-md">{item.mainTitle}</span>{" "}
            <span className="drop-shadow-md ">
              {`${day}/${month}/${year}`} {`${hours}:${minutes}`}
            </span>
          </div>
          <Link to={`/editnote/${item._id}`}>
            <img src={EDITW} alt="" />
          </Link>
        </Link>
      </div>
    </div>
  );
};

export default NoteCard;
