'use client';
import styles from "./SectionTitle.module.scss";
import React from "react";
import Image from "next/image";
import {Flex} from 'antd';

import HorizontalLine from '../../../public/images/horizontal-line.svg';
import HorizontalLineWhite from '../../../public/images/horizontal-line-white.svg';


interface SectionTitleProps {
    title: string;
    isWhite: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, isWhite }) => {
    return (
        <Flex vertical justify="center" align="center" className={styles.section_title_container}>
            <div className={styles.title} style={{color:isWhite?'#fff':'#2C2C2C'}}>{title}</div>
            <Image src={isWhite ? HorizontalLineWhite : HorizontalLine} alt="" 
                    sizes="60vw"
                    style={{
                        width: '60%',
                        height: 'auto',
                    }}
                />                      
        </Flex>
    );
}

export default SectionTitle;