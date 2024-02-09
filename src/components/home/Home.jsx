import React, { useEffect, useState } from 'react'
import { useNotes } from "../../context/appContext";
import { Link } from 'react-router-dom';

const HomeCard = ({item}) =>{
  const { getRandomColor, formatDate} = useNotes();
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
      <Link to={`/seenote/${item._id}`} style={{ backgroundColor: randomColor }} className=' p-5 rounded-[3px] gap-3 w-[250px] text-white hover:text-white'>
          <p className='text-[26px]'>{item.mainTitle}</p>
          <p className='text-[22px]'>{item.status}</p>
          <span className="drop-shadow-md ml-24">
              {`${day}/${month}/${year}`} {`${hours}:${minutes}`}
            </span>
      </Link>
  )
}


const Home = () => {
  const {getNotes, allNotes} = useNotes();

  
  useEffect(() => {
    getNotes(null,"viewall");
  }, []);
  return (
    <div className='ml-[60px] pl-10'>
      <p className='text-[30px] '>Welcome to This ToDo App</p>

      <p>Make sure to explore this notes app to the fullest to get to know its features</p>
      <p>My bad for this uncompleted UI but due to some reasons i completed until this point</p>

      <p>a quick guide -- create note on create page it has a mainNote with subNite concept</p>
      <p>There might be nothing initially just start creating to see the magic</p>

      <div className="flex flex-wrap justify-start gap-5 ml-[60px] pl-10 mt-20 relative">
      <span className='absolute  -top-10 text-[30px]'>YourNotes</span>
      {allNotes?.map((item, index) => (<HomeCard key={index} item={item}/>))}
    </div>
    </div>
  )
}

export default Home