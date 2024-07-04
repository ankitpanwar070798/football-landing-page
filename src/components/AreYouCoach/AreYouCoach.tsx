'use client';
import styles from "./AreYouCoach.module.scss";
import React from "react";
import Image from "next/image";
import { Col, Row } from 'antd';

import CustomButton from "../CustomButton/CustomButton";

import AreYouCoach1 from '../../../public/images/AreYouCoach1.png';
import AreYouCoach2 from '../../../public/images/AreYouCoach2.png';


const AreYouCoach = () => {
    return (
       <div className={styles.are_you_coach_container}>
            <Row gutter={[32,32]}>
                <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                    <Row gutter={[32,32]} data-aos="fade-right" data-aos-duration="600">
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <div className={styles.image_container}>
                                <Image 
                                    src={AreYouCoach1} 
                                    alt=""
                                    layout="fill"
                                    objectFit={"cover"}
                                    objectPosition={"top"}
                                 />
                            </div>                            
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <div className={styles.image_container}>
                                <Image 
                                    src={AreYouCoach2} 
                                    alt=""
                                    layout="fill"
                                    objectFit={"cover"}
                                    objectPosition={"top"}
                                 />
                            </div>  
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8} data-aos="fade-left" data-aos-duration="600">
                    <div className={styles.title}>Are you a coach?</div>
                    <div className={styles.sub_title}>Why wait? Join us & train the future champs!</div>
                    <div className={styles.enroll_btn}>
                        <CustomButton color={"#2D2D2D"} bgColor={"#FBE046"} borderColor={"#FBE046"} isFullWidth={false}>
                            Enroll Now
                        </CustomButton>
                    </div>
                </Col>
            </Row>
       </div>
    );
}

export default AreYouCoach;