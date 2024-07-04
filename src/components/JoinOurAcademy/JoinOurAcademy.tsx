'use client';
import styles from './JoinOurAcademy.module.scss';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';

import CustomButton from "../CustomButton/CustomButton";
import GET_JOIN_OUR_ACADEMY from '@/apollo/queries/getJoinOurAcademy';
import { useLazyQuery } from '@apollo/client';
import { useMediaQuery } from "react-responsive";
import EditorJsRenderer from 'editorjs-react-renderer';

interface AcademyData {
    id: string;
    title: string;
    descriptionEditorjs: string;
}

const JoinOurAcademy = () => {
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 1024px)",
    });

    const [academyData, setAcademyData] = useState<AcademyData | null>(null);

    const [getAcademyDetail] = useLazyQuery(GET_JOIN_OUR_ACADEMY, {
        variables: { section: "JOIN_OUR_ACADEMY" },
        onCompleted: (data) => {
            if (data && data.getSections) {
                setAcademyData(data.getSections);
            }
        },
    });

    useEffect(() => {
        getAcademyDetail();
    }, [getAcademyDetail]);

    return (
        <div className={styles.join_our_academy_container}>
            <div className={styles.content_section}>
                <Row>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.left_column}>
                    Col
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.right_column} data-aos="fade-left" data-aos-duration="600">
                        <div className={styles.title}>{academyData?.title}</div>
                         {academyData && (
                            <ul className={styles.list_container}>
                                {JSON.parse(academyData.descriptionEditorjs)?.blocks[0]?.data?.items.map((item: string, index: number) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        )}
                        <div className={styles.enroll_btn}>
                            <CustomButton color={"#2D2D2D"} bgColor={"#FBE046"} borderColor={"#FBE046"} isFullWidth={false}>
                                Enroll Now
                            </CustomButton>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default JoinOurAcademy;