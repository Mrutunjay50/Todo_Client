import React, { useEffect, useState } from "react";
import { useNotes } from "../../context/appContext";
import { Link } from "react-router-dom";
import { MEMOPAD } from "../../assets";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomeCard = ({ item }) => {
  const { getRandomColor, formatDate } = useNotes();
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
    <Link
      to={`/seenote/${item._id}`}
      style={{ backgroundColor: randomColor }}
      className=" p-5 rounded-[3px] gap-3 w-[260px] h-[180px] text-white hover:text-white relative shadow-md shadow-[#131313]"
    >
      <p className="text-[26px]">{item.mainTitle}</p>
      <p className="text-[22px]">{item.status}</p>
      <span className="drop-shadow-md ml-24">
        {`${day}/${month}/${year}`} {`${hours}:${minutes}`}
      </span>
      <img src={MEMOPAD} alt="" className="absolute top-2 right-4" />
    </Link>
  );
};

const Home = () => {
  const { getNotes, allNotes } = useNotes();
  const [instruction, setInstruction] = useState(true);

  useEffect(() => {
    getNotes(null, "viewall");
    const timeoutId = setTimeout(() => {
      setInstruction(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <div className="ml-[60px] pl-10">
      <ToastContainer/>
      <p
        className="text-[30px] "
        onMouseEnter={() => setInstruction(true)}
        onMouseLeave={() => setInstruction(false)}
      >
        Welcome to This ToDo App
      </p>
      {instruction && (
        <>
          <span className="absolute right-0 text-center w-[500px]">
            Instruction :{" "}
          </span>
          <span className="absolute right-0 top-[10%] text-center w-[500px] shadow-md bg-[#363535] shadow-[#131313] rounded-md p-5 z-50">
            <p>
              Make sure to explore this notes app to the fullest to get to know
              its features
            </p>
            <p>
              My bad for this uncompleted UI but due to some reasons i completed
              until this point
            </p>

            <p>
              a quick guide -- create note on create page it has a mainNote with
              subNite concept
            </p>
            <p>
              There might be nothing initially just start creating to see the
              magic
            </p>
            <p>
              if notes are not getting updated then reload the page and after a
              few hits the server would work fine so bare with it for few
              time(maybe 3-4 times)
            </p>
          </span>
        </>
      )}
      <div className="flex flex-wrap justify-start gap-5 ml-[60px] mt-20 relative">
        <span className="absolute  -top-10 text-[30px]">YourNotes</span>
        {Array.isArray(allNotes) &&
          allNotes?.map((item, index) => <HomeCard key={index} item={item} />)}
      </div>
    </div>
  );
};

export default Home;
