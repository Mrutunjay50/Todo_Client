import React, { useEffect, useState } from "react";
import CreateCard from "./Cards/CreateCard";
import EditCard from "./Cards/EditCard";

const CreateContent = ({
  noteData,
  inputHandler,
  getRandomColor,
  handleSubmit,
  edit,
  see,
  create,
  item,
  id,
  formatDate,
  handleUpdateSub,
  setClicked,
  deleteSubNotes,
  updateContentStatus
}) => {
  const [randomColor, setRandomColor] = useState("");

  if (randomColor === "#FFFFFF") {
    setRandomColor("#FSDGDF");
  }

  useEffect(() => {
    let randomColorValue = getRandomColor();
    setRandomColor(randomColorValue);
  }, []);

  return (
    <>
      {create ? (
        <CreateCard
          create={create}
          mainID={id}
          noteData={noteData}
          inputHandler={inputHandler}
          handleSubmit={handleSubmit}
          getRandomColor={getRandomColor}
          formatDate={formatDate}
          setClicked={setClicked}
        />
      ) : (
        <>
          <EditCard
            edit={edit}
            create={create}
            item={item}
            see={see}
            mainID={id}
            noteData={noteData}
            inputHandler={inputHandler}
            randomColor={randomColor}
            handleSubmit={handleSubmit}
            formatDate={formatDate}
            handleUpdateSub={handleUpdateSub}
            setClicked={setClicked}
            deleteSubNotes={deleteSubNotes}
            updateContentStatus={updateContentStatus}
          />
        </>
      )}
    </>
  );
};

export default CreateContent;
