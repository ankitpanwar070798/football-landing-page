"use client"
import React, { useState, useRef, useEffect } from "react"
import styles from "./Video.module.scss"
import SectionTitle from "../SectionTitle/SectionTitle"
import { useMediaQuery } from "react-responsive"
import Image from "next/image"
import PosterImage from "../../../public/images/Video.png"
import playBtn from "../../../public/images/PlayButton.svg"
import GET_VIDEO from '@/apollo/queries/getVideo';
import { useLazyQuery } from '@apollo/client';

const Video = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  })
  const [getVideoData] = useLazyQuery(GET_VIDEO);
  const [play, setPlay] = useState(false)
  const [videoData, setVideoData] = useState<any | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null)

  
  const getVideoApi = async () => {
    try {
      const { data } = await getVideoData({ variables: { section: "VIDEO_SECTION" } });
      if (data?.getSections) {
        setVideoData(data.getSections);
      } else {
        setVideoData(null);
      }
    } catch (error) {
      setVideoData(null);
    }
  };

  useEffect(() => {
    getVideoApi();
  }, []);

  // console.log("Video Data:", videoData); 

  const playHandler = () => {
    if (videoRef.current) {
      if (play) {
        setPlay(false)
        videoRef.current.pause()
      } else {
        setPlay(true)
        videoRef.current.play()
      }
    }
  }

  return (
    <div className={styles.video_container}>  
   <div data-aos="fade-down" data-aos-duration="600">
   <div >  
   <SectionTitle title={videoData?.title } isWhite={false} />
    </div>
          <p className={styles.sub_title} >
      {videoData?.description}
      </p>
   </div>
      <div className={styles.video_section} data-aos="fade-up" data-aos-duration="600">
    
          <video
            ref={videoRef}
            width="100%"
            height="100%"
            poster={PosterImage.src}
            onClick={playHandler}
            autoPlay={false}
            className={styles.video_component}
          >
            <source
              src={videoData?.video}
              type="video/mp4"
            />
          </video>
     
        {!play && (
          <div className={styles.video_btn}>
            <Image
              src={playBtn}
              alt={"Play Button"}
              layout={"fixed"}
              width={isDesktopOrLaptop ? 80 : 60}
              height={isDesktopOrLaptop ? 80 : 60}
              onClick={playHandler}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Video
