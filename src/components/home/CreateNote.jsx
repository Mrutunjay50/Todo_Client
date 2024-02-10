import React, { useEffect, useState } from "react";
import CreateContent from "./CreateContent";
import { BoxList, Complete, EDIT, Pending } from "../../assets/index";
import { API_URL } from "../../utils";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNotes } from "../../context/appContext";
import CreateCard from "./Cards/CreateCard";
import { useAuth } from "../../context/LoginContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateNote = ({ edit, see, create }) => {
  const [noteData, setNoteData] = useState({
    mainTitle: "untitled",
    subTitle: "",
    subContent: "",
    status: "",
  });

  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const { tokenId, userData } = useAuth();
  const [editTitle, setEditTitle] = useState(false);
  const [clicked, setClicked] = useState(false);

  const {
    addNote,
    addSubNote,
    getRandomColor,
    getOneMainNote,
    oneMainNote,
    formatDate,
    updateSubNote,
    deleteSubNotes,
    updateNoteStatus,
    updateContentStatus,
  } = useNotes();

  const { id } = useParams();

  const filteredSubContents = oneMainNote?.Contents?.filter((item) => {
    if (filterStatus === "all") {
      return true;
    } else {
      return item.status === filterStatus;
    }
  });

  const sortedSubContents = filteredSubContents?.sort((a, b) => {
    const dateA = new Date(a.updatedAt);
    const dateB = new Date(b.updatedAt);

    if (sortOrder === "desc") {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setNoteData((noteData) => ({ ...noteData, [name]: value }));
  };

  const handleFocus = () => {
    setEditTitle(true);
  };

  const handleBlur = async (mainNoteId) => {
    if (create === false) {
      const { mainTitle } = noteData;
      try {
        const response = await axios.put(
          `${API_URL}/api/updateheading/${mainNoteId}`,
          { mainTitle },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenId}`,
            },
          }
        );

        console.log("heading saved successfully!");
      } catch (error) {
        console.error("Error saving heading:", error.message);
      }
    }
    setEditTitle(false);
  };

  useEffect(() => {
    if (tokenId) {
      getOneMainNote(id, setNoteData);
    }
    if(create){
      setNoteData({
        mainTitle: "untitled",
        subTitle: "",
        subContent: "",
        status: "",
      })
    }
    setClicked(false);
  }, [clicked, tokenId, create]);

  return (
    <div className=" absolute ml-[60px] pr-10 min-w-[96%]">
    <ToastContainer/>
    <div className="absolute right-10 top-10 text-[26px]">{userData?.name}</div>
      <div className="flex text-[30px] px-10 my-5 justify-start items-center gap-2">
        <img src={EDIT} alt="+" />
        <p>
          {edit === true
            ? "Edit Note"
            : create === true
            ? "Create Note"
            : see === true && "Your Note"}
        </p>
      </div>
      {!create && (
        <div className="  flex justify-start items-center gap-2">
          <select
            className="ml-4 text-[26px] bg-transparent focus:outline-none"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <select
            className="ml-4 text-[26px] bg-transparent focus:outline-none"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      )}
      <div className=" bg-[#ffffff] ml-1 flex justify-start items-center gap-2 shadow-md shadow-[#131313]">
        <img className="ml-12" src={BoxList} alt="+" />
        <input
          type="text"
          name="mainTitle"
          id=""
          value={noteData.mainTitle}
          className={`${
            editTitle ? "bg-[#e2dede]" : "bg-transparent"
          } text-[26px] focus:outline-none w-[80%] text-black`}
          onFocus={handleFocus}
          onBlur={() => handleBlur(id)}
          onChange={inputHandler}
        />
        {!create && (
          <span
            className=" cursor-pointer text-black flex text-[26px] relative"
            onClick={() => {
              setClicked(true);
              updateNoteStatus(
                oneMainNote?._id,
                oneMainNote?.status === "pending" ? "completed" : "pending"
              );
            }}
          >
            {"("}
            {oneMainNote?.status === "pending" && (
              <>
                {oneMainNote?.status}{" "}
                <img
                  src={Pending}
                  className="cursor-pointer bg-blue-300 w-[40px] h-[40px] rounded-full"
                  alt=""
                />
              </>
            )}
            {oneMainNote?.status === "completed" && (
              <>
                {oneMainNote?.status}{" "}
                <img src={Complete} className="cursor-pointer bg-green-400 rounded-full" alt="" />
              </>
            )}
            {")"}
          </span>
        )}
      </div>
      <div className=" px-10 py-5 flex flex-wrap gap-3">
        {create ? (
          <CreateContent
            edit={edit}
            create={create}
            see={see}
            id={id}
            noteData={noteData}
            inputHandler={inputHandler}
            getRandomColor={getRandomColor}
            handleSubmit={addNote}
            getOneMainNote={getOneMainNote}
            formatDate={formatDate}
            setClicked={setClicked}
          />
        ) : (
          <>
            <CreateCard
              create={create}
              id={id}
              getRandomColor={getRandomColor}
              handleSubmitSub={addSubNote}
              formatDate={formatDate}
              edit={true}
              getOneMainNote={getOneMainNote}
              setClicked={setClicked}
            />
            {sortedSubContents?.map((item, index) => (
              <CreateContent
                key={index}
                edit={edit}
                create={create}
                item={item}
                see={see}
                id={id}
                handleUpdateSub={updateSubNote}
                getRandomColor={getRandomColor}
                formatDate={formatDate}
                setClicked={setClicked}
                deleteSubNotes={deleteSubNotes}
                updateContentStatus={updateContentStatus}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CreateNote;
