import React, { useEffect, useState } from "react";
import NoteCard from "./Cards/NoteCard";
import { useNotes } from "../../context/appContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllNotes = () => {
  const {
    getNotes,
    allNotes,
    formatDate,
    deleteNotes,
    getRandomColor,
    updateNoteStatus,
  } = useNotes();
  const [sortBy, setSortBy] = useState(null);
  const [status, setStatus] = useState("viewall");

  useEffect(() => {
    getNotes(status, sortBy);
  }, [sortBy, status]);

  return (
    <div className="flex flex-col items-center w-[100%]">
      <ToastContainer/>
      <div className=" flex flex-row items-center gap-5 mt-20">
        <p className="text-white text-[30px] ml-20 p-2 rounded-md shadow-md shadow-[#131313]">
          My Notes
        </p>
        <div className="flex flex-row gap-5 items-center">
          <select
            name="sortBy"
            className="py-3 px-2 rounded-md shadow-md shadow-[#131313]"
            id=""
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">date</option>
            <option value="asc">ascending</option>
            <option value="desc">descending</option>
          </select>
          <select
            name="status"
            className="py-3 px-2 rounded-md shadow-md shadow-[#131313]"
            id=""
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="viewall">view all</option>
            <option value="pending">pending</option>
            <option value="completed">completed</option>
          </select>
          <span>Total Notes : {allNotes?.length}</span>
        </div>
      </div>

      <div className=" h-[75vh] px-2 overflow-scroll overflow-x-hidden mt-10 py-1">
        <div className="flex flex-col justify-start gap-5 ml-[60px] pl-10">
          {Array.isArray(allNotes) &&
            allNotes?.map((item, index) => (
              <NoteCard
                deleteNotes={deleteNotes}
                getRandomColor={getRandomColor}
                formatDate={formatDate}
                item={item}
                key={index}
                updateNoteStatus={updateNoteStatus}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllNotes;
