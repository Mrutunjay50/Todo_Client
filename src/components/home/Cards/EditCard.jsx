import React, { useState } from "react";
import { File, EDITW, FileOff, Check, Cancel, Pending, Complete } from "../../../assets/index";
import { API_URL } from "../../../utils";
import axios from "axios";
import { useAuth } from "../../../context/LoginContext";

const EditCard = ({ randomColor, item, mainID, formatDate, setClicked, handleUpdateSub, deleteSubNotes, updateContentStatus}) => {
  const [subContent, setSubContent] = useState({
    subTitle: "",
    subContent: "",
    status : ""
  });
  const {tokenId} = useAuth();
  const getOneSubNote = async (id, subId) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/getonesubnote?id=${id}&subId=${subId}`,{
            headers: {
              Authorization: `Bearer ${tokenId}`,
            },
          }
      );
      setSubContent(response.data);
    } catch (error) {
      console.error("Error getting note:", error.message);
    }
  };

  const inputHandlerSub = (e) => {
    const { name, value } = e.target;
    setSubContent((subData) => ({ ...subData, [name]: value }));
  };

  const { day, month, year, hours, minutes } = formatDate(item.updatedAt);
  const [editing, setEdit] = useState(false);


  return (
    <>
      {editing ? (
        <div
          className={`relative w-[260px] h-[45vh] rounded-md flex flex-col p-5 text-white shadow-md shadow-[#878585]`}
          style={{ backgroundColor: randomColor }}
        >
          <span
            className="absolute bottom-3 right-3 cursor-pointer"
            onClick={() => {
              handleUpdateSub(subContent, mainID, item._id);
              setClicked(true);
              setEdit(!editing);
              setSubContent({ subTitle: "", subContent: "" });
            }}
          >
            <img src={Check} alt="" />
          </span>
          <span
            className="absolute bottom-3 right-16 cursor-pointer"
            onClick={() => {
              setEdit(!editing);
            }}
          >
            <img src={Cancel} alt="" />
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
        <>
          {item && (
            <div
              className={` relative w-[260px] h-[45vh] rounded-md flex flex-col p-5 `}
              style={{ backgroundColor: randomColor }}
            >
              <span className="drop-shadow-md text-[23px] mb-10">
                {item.subTitle}
              </span>
              <div className="drop-shadow-md mb-5 flex justify-between items-center pr-5">
                <span>{`${day}/${month}/${year}`}</span>
                <span>{`${hours}:${minutes}`}</span>
              </div>
              <span className="drop-shadow-md">{item.subContent}</span>
              <span
                className="absolute bottom-3 right-3 cursor-pointer"
                onClick={() => {
                  setEdit(!editing);
                  getOneSubNote(mainID, item._id);
                }}
              >
                <img src={EDITW} alt="" />
              </span>
              <span
                className="absolute bottom-3 left-3 cursor-pointer flex"
                onClick={() => {
                    setClicked(true);
                    updateContentStatus(mainID, item._id, item.status === "pending" ? "completed" : "pending")}
                }
                
              >
                {item.status === "pending" && <>{item.status} <img src={Pending} className="cursor-pointer" alt="" /></>}
                {item.status === "completed" && <>{item.status} <img src={Complete} className="cursor-pointer" alt="" /></>}
              </span>
              <span
                className="absolute bottom-3 right-16 cursor-pointer"
                onClick={() => {
                  deleteSubNotes(mainID, item._id);
                }}
              >
                <img src={FileOff} alt="" />
              </span>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default EditCard;
