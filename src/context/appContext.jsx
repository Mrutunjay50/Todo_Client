import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { API_URL } from "../utils";
import { useAuth } from "./LoginContext";

const NoteContext = createContext();

export const NotesProvider = ({ children }) => {
  const [allNotes, setAllNotes] = useState([]);
  const [oneMainNote, setOneMainNote] = useState([]);
  const { tokenId } = useAuth();

  const getNotes = async (status, sortBy) => {
    if (tokenId) {
      try {
        const response = await axios.get(`${API_URL}/api/getnotes`, {
          headers: {
            Authorization: `Bearer ${tokenId}`,
          },
          params: {
            status,
            sortBy
        },
        });
        setAllNotes(response.data);
      } catch (error) {
        console.error("Error getting note:", error.message);
      }
    }
  };

  const addNote = async (noteData) => {
    if(tokenId){
      try {
        const response = await axios.post(
          `${API_URL}/api/addnotes`,
          { ...noteData },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenId}`,
            },
          }
        );
  
        console.log(response.data);
  
        console.log("Note saved successfully!");
      } catch (error) {
        console.error("Error saving note:", error.message);
      }
    }
  };

  const addSubNote = async (noteData, id) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/addsubnote/${id}`,
        { ...noteData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenId}`,
          },
        }
      );

      console.log(response.data);

      console.log("Subnote saved successfully!");
    } catch (error) {
      console.error("Error saving subnote:", error.message);
    }
  };

  const updateSubNote = async (noteData, id, subId) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/updateonesubnotes?id=${id}&subId=${subId}`,
        { ...noteData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenId}`,
          },
        }
      );

      console.log(response.data);

      console.log("subnote updated successfully!");
    } catch (error) {
      console.error("Error updating subnote:", error.message);
    }
  };

  const getOneMainNote = async (id, setNoteData) => {
    if(tokenId){
      try {
        if (id) {
          const response = await axios.get(
            `${API_URL}/api/getonemainnote/${id}`,
            {
              headers: {
                Authorization: `Bearer ${tokenId}`,
              },
            }
          );
  
          setOneMainNote(response.data);
          if (setNoteData) {
            setNoteData((DATA) => ({
              ...DATA,
              mainTitle: response.data.mainTitle,
            }));
          }
        } else setNoteData((DATA) => ({ ...DATA, mainTitle: "untitled" }));
      } catch (error) {
        console.error("Error getting note:", error.message);
      }
    }
  };

  const getOneSubNote = async (id, subId) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/getonesubnote?id=${id}&subId=${subId}`,
        {
          headers: {
            Authorization: `Bearer ${tokenId}`,
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error getting subnote:", error.message);
    }
  };

  const deleteNotes = async (id) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/deleteMainNote/${id}`,
        {
          headers: {
            Authorization: `Bearer ${tokenId}`,
          },
        }
      );

      setAllNotes(response.data.note);
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };

  const deleteSubNotes = async (id, subId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/deleteSubNote?id=${id}&subId=${subId}`,
        {
          headers: {
            Authorization: `Bearer ${tokenId}`,
          },
        }
      );
      setOneMainNote(response.data.note);
    } catch (error) {
      console.error("Error deleting subnote:", error.message);
    }
  };

  const updateNoteStatus = async (noteId, newStatus) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/updatenotestatus/${noteId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${tokenId}`,
          },
        }
      );

      setAllNotes(response.data.note);

      console.log("Note status updated successfully!");
    } catch (error) {
      console.error("Error updating note status:", error.message);
    }
  };

  const updateContentStatus = async (noteId, subNoteId, newStatus) => {
  
    try {
      const response = await axios.put(
        `${API_URL}/api/updateContentStatus?id=${noteId}&subId=${subNoteId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${tokenId}`,
          },
        }
      );

      console.log("Content status updated successfully!");
    } catch (error) {
      console.error("Error updating content status:", error.message);
    }
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();

    return { day, month, year, hours, minutes };
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    getNotes();
  }, [tokenId]);

  return (
    <NoteContext.Provider
      value={{
        getNotes,
        addNote,
        getOneMainNote,
        getOneSubNote,
        getRandomColor,
        allNotes,
        oneMainNote,
        formatDate,
        addSubNote,
        updateSubNote,
        deleteNotes,
        deleteSubNotes,
        updateNoteStatus,
        updateContentStatus
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

const useNotes = () => {
  return useContext(NoteContext);
};

export { useNotes };
