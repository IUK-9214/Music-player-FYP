import React, { useEffect, useState } from "react";
import { data, NavLink } from "react-router-dom";
import { IoAdd, IoPause, IoPlay, IoTrash } from "react-icons/io5";
import { AiOutlineClear}from "react-icons/ai" 
import {useStateValue} from  "../context/StateProvider"
import { getAllSongs } from "../api";
import{actionType} from "../context/reducer"
import SongCard from "./SongCard";

const DashboardSongs = () => {
  const [songFilter, setsongFilter] = useState("");
  const [IsFocus, setIsFocus] = useState(false);
const [{allsongs},dispatch] =useStateValue()

useEffect(()=>{
if (!allsongs){
  getAllSongs().then(data=>{
  dispatch({
    type:actionType.SET_ALL_SONGS,
    allsongs :data.song,
  })
  })
}
},[])

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col ">
      <div
        className={`w-full flex items-center justify-center gap-20 `}
      >
        <NavLink to={"/dashboard/newSong"}className="flex item-center justify-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-500 hover:shadow-md cursor-pointer">
          <IoAdd />
        </NavLink>
        <input
          type="text"
          className={`w-52 px-4 py-2 border ${
          IsFocus ? "border-gray-500 shadow-md" : "border-gray-300"
        } rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold `}
          placeholder="Search Here..."
          value={songFilter}
          onChange={(e) => setsongFilter(e.target.value)}
          onBlur={() => {setIsFocus(false)}}
          onFocus={() => setIsFocus(true)}
        />

        <i>
          <AiOutlineClear className="text-3xl text-textColor cursor-pointer"/>
        </i>

      </div>
      {/* this is the main container */}
      <div className="realtive w-full my-4 p-4 py-16 border border-gray-300 rounded-md ">
        {/*the count */}
        <div className=" top-4 left-4">
          <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-textColor">Count : </span> {allsongs?.length}
          </p>
        </div>
        <SongContainer data={allsongs}/>
      </div>
    </div>
  );
};

export const SongContainer=({data})=>{
  return(
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data && data.map((song,i)=>(
        <SongCard key={song._id}  data={song} index={i} type="song"/>
      ))}
    </div>
  )
}

export default DashboardSongs;
