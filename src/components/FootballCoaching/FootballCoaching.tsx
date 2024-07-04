'use client';
import styles from "./FootballCoaching.module.scss";
import React,{useState,useEffect} from "react";
import { Col, Row, Flex, Button } from 'antd';
import MediaQuery from 'react-responsive'
import Image, { StaticImageData } from 'next/image';
import { SwiperSlide } from 'swiper/react';
import { useQuery } from '@apollo/client';
import GET_BANNER from '@/apollo/queries/getBanner';

import SectionTitle from "../SectionTitle/SectionTitle";
import CustomSwiper from "../CustomSwiper/CustomSwiper";
import CustomButton from "../CustomButton/CustomButton";

import CoachingImg1 from '../../../public/images/coaching-1.png';
import CoachingImg2 from '../../../public/images/coaching-2.png';
import CoachingImg3 from '../../../public/images/coaching-3.png';
import CoachingImg4 from '../../../public/images/coaching-4.png';
import CoachingImg5 from '../../../public/images/coaching-5.png';
import RightArrow from '../../../public/images/right-arrow.svg';


const FootballCoaching = () => {

    const [mount, setMount] = useState(false)

    const { data } = useQuery(GET_BANNER, {
        variables: { section: 'ASPIRING_CHAMPIONS' }
    });

    useEffect(() => {
        setMount(true)
      }, [])

    const {getSections} = data || {};

    const {sectionItems} = getSections || [];

    if(!mount) return null

    return (
        <div className={styles.football_coaching_container}>
            <SectionTitle title={getSections?.title} isWhite={false} />
            <div className={styles.content_section}>
                <MediaQuery minWidth={1024}>
                    <Row gutter={[12,12]}>
                        {
                            sectionItems?.edges?.slice(0,3).map((item:any, index:number) => {
                                return (
                                    <Col sm={8} md={8} lg={8} xl={8} key={item.id}>
                                        <CoachingItem 
                                            image={item?.node?.desktopImage} 
                                            title={item?.node?.title}
                                            slots={item?.node?.description}
                                        />
                                    </Col>
                                )
                            })
                        }
                        {
                            sectionItems?.edges?.slice(3,sectionItems.edges.length).map((item:any, index:number) => {
                                return (
                                    <Col  sm={12} md={12} lg={12} xl={12} key={item.id}>
                                        <CoachingItem 
                                            image={item?.node?.desktopImage} 
                                            title={item?.node?.title}
                                            slots={item?.node?.description}
                                        />
                                    </Col>
                                )
                            })
                        }
                        {/* <Col sm={8} md={8} lg={8} xl={8}>
                            <CoachingItem 
                                image={CoachingImg1} 
                                title={"Youth Development Coaching"}
                                slots={8}
                            />
                        </Col>
                        <Col sm={8} md={8} lg={8} xl={8}>
                           <CoachingItem 
                                image={CoachingImg2} 
                                title={"Goalkeeper Training"}
                                slots={8}
                            />
                        </Col>
                        <Col sm={8} md={8} lg={8} xl={8}>
                            <CoachingItem 
                                image={CoachingImg3} 
                                title={"Tactical Awareness Training"}
                                slots={8}
                            />
                        </Col> */}
                        {/* <Col sm={12} md={12} lg={12} xl={12}>
                            <CoachingItem 
                                image={CoachingImg4} 
                                title={"Fitness and Conditioning for Football"}
                                slots={8}
                            />
                        </Col>
                        <Col sm={12} md={12} lg={12} xl={12}>
                            <CoachingItem 
                                image={CoachingImg5} 
                                title={"Mentorship and Leadership Development"}
                                slots={8}
                            />
                        </Col> */}
                    </Row>
                </MediaQuery>
                <MediaQuery maxWidth={1023}>
                    <CustomSwiper>
                        <>  
                        {
                            sectionItems?.edges?.map((item:any, index:number) => {
                                return (
                                    <SwiperSlide key={item.id}>
                                        <CoachingItem 
                                            image={item?.node?.mobileImage} 
                                            title={item?.node?.title}
                                            slots={item?.node?.description}
                                        />
                                    </SwiperSlide>
                                )
                            })
                        }                      
                            {/* <SwiperSlide>
                                <CoachingItem 
                                    image={CoachingImg1} 
                                    title={"Youth Development Coaching"}
                                    slots={8}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <CoachingItem 
                                    image={CoachingImg2} 
                                    title={"Goalkeeper Training"}
                                    slots={8}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <CoachingItem 
                                    image={CoachingImg3} 
                                    title={"Tactical Awareness Training"}
                                    slots={8}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <CoachingItem 
                                    image={CoachingImg4} 
                                    title={"Fitness and Conditioning for Football"}
                                    slots={8}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <CoachingItem 
                                    image={CoachingImg5} 
                                    title={"Mentorship and Leadership Development"}
                                    slots={8}
                                />
                            </SwiperSlide> */}
                        </>
                    </CustomSwiper>
                    <Flex justify={"center"} align={"center"} style={{marginTop:'40px'}}>
                        <CustomButton color={"#2D2D2D"} bgColor={"#FBE046"} borderColor={"#FBE046"} isFullWidth={false}>
                            Explore All
                        </CustomButton>
                    </Flex>
                </MediaQuery>
            </div>
        </div>
    );
}

export default FootballCoaching;

const CoachingItem = ({
    image,
    title,
    slots
}:{
    image: string,
    title: string,
    slots: number
}) => {
    return (
        <div className={styles.coaching_item_container}>
            <Image src={image} alt={""}  
                // fill={true}
                layout="fill"
                objectFit={"cover"}

                 className={styles.coaching_item_image}
            />
            <Flex vertical justify="flex-end" className={styles.overlay_container}>
                <div className={styles.title}>{title}</div>
                <div className={styles.slot_detail}>slots available: <span>{slots}</span></div>
                <Flex align="center" justify="space-between">
                    <Button type="link" className={styles.enroll_btn}>Enroll Now</Button>
                    <Image src={RightArrow} alt={""}  
                        width={54}
                        height={54}
                    />
                </Flex>
            </Flex>
        </div>
    )
}