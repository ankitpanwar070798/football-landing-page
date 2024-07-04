'use client';
import styles from "./JoinOurCamps.module.scss";
import React,{useState} from "react";
import { Select, Flex, Col, Row, Button, Collapse } from 'antd';
import MediaQuery from 'react-responsive'
import Image from 'next/image';
import { CaretRightOutlined } from '@ant-design/icons';
import type { CSSProperties } from 'react';
import type { CollapseProps } from 'antd';
import { useQuery } from '@apollo/client';
import GET_COACHES_OR_CAMPS from '@/apollo/queries/getCoachesOrCamps';

import SectionTitle from "../SectionTitle/SectionTitle";
import CustomButton from "../CustomButton/CustomButton";

import Polygon from "../../../public/images/polygon.svg";
import RightUpArrow from "../../../public/images/right-up-arrow.svg";


const JoinOurCamps = () => {
    
    const [selectedCamp, setSelectedCamp] = useState(0);

    const { data } = useQuery(GET_COACHES_OR_CAMPS, {
        variables: { section: 'CAMP' }
    });

    const {getCoachesOrCamps} = data || [];

    const selectedCampData = getCoachesOrCamps?.[selectedCamp] || {};


    // const handleChange = (value: string) => {
    //     console.log(`selected ${value}`);
    // };

    
  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    // background: token.colorFillAlter,
    // borderRadius: token.borderRadiusLG,
    border: 'none',
  };

const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => {
    const items = [];
    for (let i = 0; i < getCoachesOrCamps?.length; i++) {
      items.push({
        key: `${i+1}`,
        label: <CampHeader 
                  selectedCamp={selectedCamp}
                  data={getCoachesOrCamps[i]}
                  handleSelectedCamp={() => setSelectedCamp(i)}
                  showPolygon={false}
                  index={i}
                  />,
        children: <CampDetail selectedCampData={selectedCampData}/>,
        style: panelStyle,
        showArrow: false
      });
    }
    return items;
  };

    return (
        <div className={styles.join_our_camps_container}>
            <div data-aos="fade-down" data-aos-duration="600">
                <SectionTitle title={"Join Our Camps"} isWhite={true} />
            </div>
            <div className={styles.content_section} >
                {/* <Flex align="center" justify="flex-end" data-aos="fade-up" data-aos-duration="600">
                <Select
                    defaultValue="Cricket"
                    style={{ width: 150 }}
                    onChange={handleChange}
                    options={[
                        { value: 'Cricket', label: 'Cricket' },
                    ]}
                    className={styles.select_dropdown}
                    // className={"select_dropdown"}
                />
                </Flex> */}
                <div className={styles.content_container}>
                    <MediaQuery minWidth={1024}>
                        <Row gutter={[40,40]} data-aos="fade-up" data-aos-duration="600">
                            <Col sm={8} md={8} lg={8} xl={8}>
                                <div className={styles.camp_list_container} >
                                    {
                                        getCoachesOrCamps?.map((item:any,index:number)=>{
                                            return(
                                                <CampHeader 
                                                    selectedCamp={selectedCamp}
                                                    data={item}
                                                    handleSelectedCamp={()=> setSelectedCamp(index)}
                                                    showPolygon={true}
                                                    key={item.id}
                                                    index={index}
                                                />
                                            )
                                        })
                                    }                                    
                                </div>
                                <ViewAllCamps />
                            </Col>
                            <Col sm={16} md={16} lg={16} xl={16}>
                                <CampDetail selectedCampData={selectedCampData}/>
                            </Col>
                        </Row>
                    </MediaQuery>
                    <MediaQuery maxWidth={1023}>
                        <Collapse
                            accordion 
                            bordered={false}
                            defaultActiveKey={['1']}
                            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                            // style={{ background: token.colorBgContainer }}
                            items={getItems(panelStyle)}
                        />
                        <br/>
                        <ViewAllCamps />
                    </MediaQuery>
                </div>
            </div>
        </div>
    );
}

export default JoinOurCamps;

const CampHeader = ({
    selectedCamp,
    data,
    handleSelectedCamp,
    showPolygon,
    index
}:{
    selectedCamp: number,
    data: any,
    handleSelectedCamp: () => void,
    showPolygon: boolean,
    index: number
}) => {
    return (
        <div className={`${styles.camp_header_container} ${selectedCamp === index ? styles.active: ''}`}  onClick={handleSelectedCamp}>
            <div className={styles.camp_name}>{data?.name}</div>
            <Flex align={"center"} gap={4}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0002 1.66602C11.0362 1.66602 7.00024 5.73802 7.00024 10.7607C7.00024 12.462 7.74958 14.5727 8.84024 16.678C11.2416 21.314 15.2416 25.9834 15.2416 25.9834C15.4309 26.2047 15.7082 26.3327 16.0002 26.3327C16.2922 26.3327 16.5696 26.2047 16.7589 25.9834C16.7589 25.9834 20.7589 21.314 23.1602 16.678C24.2509 14.5727 25.0002 12.462 25.0002 10.7607C25.0002 5.73802 20.9642 1.66602 16.0002 1.66602ZM16.0002 6.99935C13.9762 6.99935 12.3336 8.64202 12.3336 10.666C12.3336 12.69 13.9762 14.3327 16.0002 14.3327C18.0242 14.3327 19.6669 12.69 19.6669 10.666C19.6669 8.64202 18.0242 6.99935 16.0002 6.99935Z" fill={selectedCamp === index ? '#012B7F':'#fff'}/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.3788 23.1694C23.4628 23.4947 24.3562 23.8974 24.9735 24.3694C25.3735 24.6734 25.6668 24.9707 25.6668 25.3334C25.6668 25.5467 25.5455 25.74 25.3748 25.9334C25.0922 26.252 24.6722 26.5387 24.1522 26.8054C22.3148 27.7454 19.3442 28.3334 16.0002 28.3334C12.6562 28.3334 9.68549 27.7454 7.84816 26.8054C7.32816 26.5387 6.90816 26.252 6.6255 25.9334C6.45483 25.74 6.3335 25.5467 6.3335 25.3334C6.3335 24.9707 6.62683 24.6734 7.02683 24.3694C7.64416 23.8974 8.5375 23.4947 9.62149 23.1694C10.1495 23.0107 10.4495 22.452 10.2908 21.924C10.1322 21.3947 9.57349 21.0947 9.0455 21.2534C7.39483 21.7507 6.11216 22.432 5.3415 23.1854C4.66416 23.8454 4.3335 24.584 4.3335 25.3334C4.3335 26.2694 4.86283 27.2027 5.93883 27.9814C7.82683 29.3467 11.6188 30.3334 16.0002 30.3334C20.3815 30.3334 24.1735 29.3467 26.0615 27.9814C27.1375 27.2027 27.6668 26.2694 27.6668 25.3334C27.6668 24.584 27.3362 23.8454 26.6588 23.1854C25.8882 22.432 24.6055 21.7507 22.9548 21.2534C22.4268 21.0947 21.8682 21.3947 21.7095 21.924C21.5508 22.452 21.8508 23.0107 22.3788 23.1694Z" fill={selectedCamp === index ? '#012B7F':'#fff'}/>
                </svg>
                <div className={styles.camp_location}>{data?.location}</div>
                {
                    !showPolygon && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            style={{transform: selectedCamp === index ? 'rotate(180deg)':'rotate(0deg)'}}
                        >
                            <path d="M12.0002 15.9843C11.8686 15.9851 11.7381 15.9599 11.6163 15.9101C11.4944 15.8603 11.3836 15.787 11.2902 15.6943L5.29019 9.69432C5.10188 9.50601 4.99609 9.25062 4.99609 8.98432C4.99609 8.71801 5.10188 8.46262 5.29019 8.27432C5.47849 8.08601 5.73388 7.98022 6.00019 7.98022C6.26649 7.98022 6.52188 8.08601 6.71019 8.27432L12.0002 13.5743L17.2902 8.28432C17.4815 8.12049 17.7276 8.03488 17.9792 8.0446C18.2309 8.05433 18.4697 8.15866 18.6477 8.33675C18.8258 8.51485 18.9302 8.75359 18.9399 9.00526C18.9496 9.25694 18.864 9.50301 18.7002 9.69432L12.7002 15.6943C12.5139 15.8791 12.2625 15.9832 12.0002 15.9843Z" fill={selectedCamp === index ? '#012B7F':'#fff'}/>
                        </svg>
                    )
                }
            </Flex>
            {
                showPolygon && (
                    <Image src={Polygon} alt={""} width={40} height={40} className={styles.polygon_img}/>
                ) 
            }            
        </div>
    )
}

const ViewAllCamps = () => {
    return(
        <Flex align={'center'} justify={'center'}>
            <Button type="link" className={styles.view_all_camp_btn}>
                View All Camps
                <Image src={RightUpArrow} alt={""} width={18} height={18}/>
            </Button>
        </Flex>
    )
}


const CampDetail = ({selectedCampData}:{selectedCampData:any}) => {
    return(
        <div className={styles.camp_detail_container}>
            <Flex align={'center'} justify={'space-between'} className={styles.heading_section}>
                <div className={styles.camp_title}>{selectedCampData?.sessionName}</div>
                <MediaQuery minWidth={1024}>
                    <Flex align={"center"} gap={4}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0002 1.66602C11.0362 1.66602 7.00024 5.73802 7.00024 10.7607C7.00024 12.462 7.74958 14.5727 8.84024 16.678C11.2416 21.314 15.2416 25.9834 15.2416 25.9834C15.4309 26.2047 15.7082 26.3327 16.0002 26.3327C16.2922 26.3327 16.5696 26.2047 16.7589 25.9834C16.7589 25.9834 20.7589 21.314 23.1602 16.678C24.2509 14.5727 25.0002 12.462 25.0002 10.7607C25.0002 5.73802 20.9642 1.66602 16.0002 1.66602ZM16.0002 6.99935C13.9762 6.99935 12.3336 8.64202 12.3336 10.666C12.3336 12.69 13.9762 14.3327 16.0002 14.3327C18.0242 14.3327 19.6669 12.69 19.6669 10.666C19.6669 8.64202 18.0242 6.99935 16.0002 6.99935Z" fill={'#fff'}/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.3788 23.1694C23.4628 23.4947 24.3562 23.8974 24.9735 24.3694C25.3735 24.6734 25.6668 24.9707 25.6668 25.3334C25.6668 25.5467 25.5455 25.74 25.3748 25.9334C25.0922 26.252 24.6722 26.5387 24.1522 26.8054C22.3148 27.7454 19.3442 28.3334 16.0002 28.3334C12.6562 28.3334 9.68549 27.7454 7.84816 26.8054C7.32816 26.5387 6.90816 26.252 6.6255 25.9334C6.45483 25.74 6.3335 25.5467 6.3335 25.3334C6.3335 24.9707 6.62683 24.6734 7.02683 24.3694C7.64416 23.8974 8.5375 23.4947 9.62149 23.1694C10.1495 23.0107 10.4495 22.452 10.2908 21.924C10.1322 21.3947 9.57349 21.0947 9.0455 21.2534C7.39483 21.7507 6.11216 22.432 5.3415 23.1854C4.66416 23.8454 4.3335 24.584 4.3335 25.3334C4.3335 26.2694 4.86283 27.2027 5.93883 27.9814C7.82683 29.3467 11.6188 30.3334 16.0002 30.3334C20.3815 30.3334 24.1735 29.3467 26.0615 27.9814C27.1375 27.2027 27.6668 26.2694 27.6668 25.3334C27.6668 24.584 27.3362 23.8454 26.6588 23.1854C25.8882 22.432 24.6055 21.7507 22.9548 21.2534C22.4268 21.0947 21.8682 21.3947 21.7095 21.924C21.5508 22.452 21.8508 23.0107 22.3788 23.1694Z" fill={'#fff'}/>
                        </svg>
                        <div className={styles.camp_location}>{selectedCampData?.location}</div>
                    </Flex>
                </MediaQuery>                
            </Flex>
            <div className={styles.description}>{selectedCampData?.description}</div>
            <div className={styles.horizontal_divider}/>
            <div className={styles.specialization_section}>
                <div className={styles.title}>Specialization</div>
                <ul className={styles.specialization_list}>
                  {
                    selectedCampData?.specializations?.map((specialization:string, index:number) => (
                      <li key={index}>{specialization}</li>
                    ))
                  }
                </ul>
            </div>
            <div className={styles.horizontal_divider}/>
            <div className={styles.slot_details}>
                <div className={styles.trained_count}>Students Trained:&nbsp;<span>{selectedCampData?.studentsTrained}</span></div>
                <div className={styles.trained_count}>Available slots:&nbsp;<span>{selectedCampData?.availableSlots}</span></div>
                <div className={styles.slot_btn}>
                    <CustomButton color={"#2D2D2D"} bgColor={"#FBE046"} borderColor={"#FBE046"} isFullWidth={false}>
                        Enroll Now
                    </CustomButton>
                </div>
            </div>
        </div>
    )
}