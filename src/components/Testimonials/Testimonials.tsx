'use client';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from "./Testimonials.module.scss";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import SectionTitle from "../SectionTitle/SectionTitle";
import TriangleVector from '../../../public/images/triangle-vector.svg';
import GET_TESTIMONIALS from '@/apollo/queries/getTestimonials';
import { useLazyQuery } from '@apollo/client';

// Define types
interface TestimonialItem {
    id: string;
    name: string;
    designation: string;
    description: string;
  }
  
  interface TestimonialSection {
    id: string;
    title: string;
    sectionItems: {
      edges: {
        node: TestimonialItem;
      }[];
    };
  }
  
  interface TestimonialData {
    getSections: TestimonialSection;
  }

const Testimonials = () => {
  const [getTestimonialsData] = useLazyQuery<TestimonialData>(GET_TESTIMONIALS);
  const [testimonialsData, setTestimonialsData] = useState<TestimonialItem[]>([]);
  const [title, setTitle] = useState<string>("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getTestimonialsData({ variables: { section: "TESTIMONIALS" } });
        if (data?.getSections) {
          const { title, sectionItems } = data.getSections;
          setTitle(title);
          if (sectionItems) {
            setTestimonialsData(sectionItems.edges.map(edge => edge.node));
          }
        } else {
          setTestimonialsData([]);
        }
      } catch (error) {
        console.error("Error fetching testimonials data:", error);
        setTestimonialsData([]);
      }
    };
    fetchData();
  }, [getTestimonialsData]);

    return (
        <div className={styles.testimonial_container}>
            <SectionTitle title={title} isWhite={false} />
            <div className={styles.content_section}>
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    modules={[Navigation, Pagination]}
                    pagination= {{
                        el: '.swiper-custom-pagination',
                    }}
                    navigation= {{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                >
                   {testimonialsData.map(({ id, description, name, designation }) => (
            <SwiperSlide key={id}>
              <TestimonialItem
                description={description}
                name={name}
                role={designation}
              />
            </SwiperSlide>
          ))}
                </Swiper>
                <div className="swiper-custom-pagination"/>
                <div className="swiper-button-prev"/>
                <div className="swiper-button-next"/>     
            </div>
        </div>
    );
}

export default Testimonials;


const TestimonialItem: React.FC<{ description: string, name: string, role: string }> = ({ description, name, role }) => {
    return (
      <div style={{ padding: '4rem 0' }}>
        <div className={styles.testimonial_item_container}>
          <div className={styles.description}>{description}</div>
          <div className={styles.author_name}>{name}</div>
          <div className={styles.author_role}>{role}</div>
          <div style={{ position: 'absolute', top: '99%', left: '60px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="39" height="31" viewBox="0 0 39 31" fill="none">
              <g clipPath="url(#clip0_20_9626)">
                <path d="M668.5 0V-254H171.5H116.25H88.625H-5.80225H-20V0H5.75003L5.75003 30.6491L33.375 0H61H171.5H668.5Z" fill="#012B7F" />
              </g>
              <defs>
                <clipPath id="clip0_20_9626">
                  <rect width="39" height="31" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    );
  };
  
