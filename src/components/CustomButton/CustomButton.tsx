'use client';
import styles from './CustomButton.module.scss';
import React from "react";
import { Button } from "antd";


const CustomButton = ({
    children,
    color,
    bgColor,
    borderColor,
    isFullWidth,
    onClick
}:{
    children:React.ReactNode,
    color:string,
    bgColor:string,
    borderColor:string,
    isFullWidth?:boolean
    onClick?: () => void
}) => (
    <Button className={styles.custom_button_container}
        style={{
            color:color,
            background:bgColor,
            border:`1px solid ${borderColor}`,
            width:isFullWidth ? "100%" : "auto",
        }}
        onClick={onClick}
    >
        {children}
    </Button>
)

export default CustomButton;