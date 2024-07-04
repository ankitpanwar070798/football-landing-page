'use client';
import 'swiper/css';
import 'swiper/css/pagination';

import styles from './CustomSwiper.module.scss';
import React,{useRef,useCallback} from 'react';
import { Swiper } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';

import PrevArrow from '../../../public/images/slider-left-arrow.svg';
import NextArrow from '../../../public/images/slider-right-arrow.svg';


const CustomSwiper = ({children}:{children:React.ReactNode}) => {
    const sliderRef = useRef(null);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);
    
    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    return (
        <div className={styles.custom_swiper_container}>
            <Swiper
                spaceBetween={24}
                slidesPerView={1}
                pagination={true} 
                modules={[Pagination]}
                ref={sliderRef}
            >
                {children}
            </Swiper>
            <div className={styles.prev_arrow} onClick={handlePrev}>
                <Image src={PrevArrow} alt={""} width={37} height={37}/>
            </div>
            <div className={styles.next_arrow} onClick={handleNext}>
                <Image src={NextArrow} alt={""} width={37} height={37}/>
            </div>
        </div>
    );
};

export default CustomSwiper;

