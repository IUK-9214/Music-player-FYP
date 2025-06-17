import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { m, motion } from "framer-motion";
import { RiPlayListFill } from "react-icons/ri";
import "react-h5-audio-player/lib/styles.css";
import AudioPlayer from "react-h5-audio-player";
import { actionType } from "../context/reducer";
import { getAllSongs } from "../api";
import { IoClose, IoMusicalNote } from "react-icons/io5";
const MusicPlayer = () => {
  const nextTrack = () => {
    if (songIndex > allsongs.length-1) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: songIndex + 1,
      });
    }
  };
  const previousTrack = () => {
     if (songIndex === 0) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: songIndex - 1,
      });
    }
  };
  const closePlayer=()=>{
 dispatch({
        type: actionType.SET_ISSONG_PLAYING,
        isSongPlaying: false,
      });
  }

  const [{ allsongs, songIndex, isSongPlaying }, dispatch] = useStateValue();
  const [isPlayList, setisPlayList] = useState(false);
  return (
    <div className="w-full flex items-start gap-3 ">
      <div className={`w-full  items-center  gap-3 p-4 flex relative`}>
        <img
          src={allsongs[songIndex]?.imageURL}
          alt=""
          className="w-40 h-20 object-cover rounded-md"
        />
        <div className="flex flex-col items-start">
          <p className="text-xl text-headingColor font-semibold">
            {`${
              allsongs[songIndex]?.name.length > 20
                ? allsongs[songIndex]?.name.slice(0, 20)
                : allsongs[songIndex]?.name
            }`}{" "}
            <span className="text-base">({allsongs[songIndex]?.album})</span>
          </p>
          <p className="text-textColor">
            {allsongs[songIndex]?.artist}{" "}
            <span className="text-sm text-textColor font-semibold">
              ({allsongs[songIndex]?.category})
            </span>
          </p>
          <motion.i
            whileTap={{ scale: 0.8 }}
            onClick={() => setisPlayList(!isPlayList)}
          >
            <RiPlayListFill className="text-textColor hover:text-headingColor text-3xl cursor-pointer" />
          </motion.i>
        </div>
        <div className="flex-1">
          <AudioPlayer
            src={allsongs[songIndex]?.songURL}
            onPlay={() => console.log("Is Playing")}
            autoPlay={true}
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
            showSkipControls={true}
          />
        </div>
        {isPlayList && <PlayListCard />}
        <IoClose className="cursor-pointer" onClick={closePlayer}/>
      </div>
    </div>
  );
};
export const PlayListCard = () => {
  const [{ allsongs, songIndex, isSongPlaying }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allsongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allsongs: data.songs,
        });
      });
    }
  }, []);

  const setCurrentPlaySong = (index) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_ISSONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (songIndex !== index) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: index,
      });
    }
  };

  return (
    <div className="absolute left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll scrollbar-thin  rounded-md shadow-md bg-primary z-50">
      {allsongs.length > 0 ? (
        allsongs.map((music, index) => (
          <motion.div
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer bg-transparent"
            onClick={() => setCurrentPlaySong(index)}
            key={index}
          >
            <IoMusicalNote className="text-textColor group-hover:text-headingColor text-2xl cursor-pointer" />
            <div className="flex items-start flex-col">
              <p className="text-lg text-headingColor font-semibold">
                {`${
                  music?.name.length > 20
                    ? music?.name.slice(0, 20)
                    : music?.name
                }`}{" "}
                {""}
                <span className="text-base">({music?.album})</span>
              </p>
              <p className="text-textColor">
                {music?.artist}
                {""}
                <span className="text-sm text-textColor font-semibold">
                  ({music?.category})
                </span>
              </p>
            </div>
          </motion.div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};
export default MusicPlayer;
