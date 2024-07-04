'use client';
import styles from "./EmpowerFuture.module.scss";
import React from "react";
import Image from "next/image";
import { Col, Row } from 'antd';

import CustomButton from "../CustomButton/CustomButton";

import EmpowerFutureImg from '../../../public/images/EmpowerFuture.png';


const EmpowerFuture = () => {
    return (
        <div className={styles.empower_future_container}>
             <Row>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} data-aos="fade-right" data-aos-duration="600">
                    <div className={styles.image_section}>
                        <Image 
                            src={EmpowerFutureImg} 
                            alt="Empower Future" 
                            layout="fill"
                            objectFit={"contain"}
                            objectPosition={"top"}
                        />
                    </div>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} data-aos="fade-left" data-aos-duration="600">
                    <div className={styles.title}>Donate to Empower Future Football Stars!</div>
                    <div className={styles.donate_btn}>
                        <CustomButton color={"#2D2D2D"} bgColor={"#FBE046"} borderColor={"#FBE046"} isFullWidth={false}>
                            Donate Now
                        </CustomButton>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default EmpowerFuture;