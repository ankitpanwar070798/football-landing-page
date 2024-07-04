"use client";
import React, { useState, useEffect } from "react";
import styles from "./Awards.module.scss";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import GET_AWARDS from '@/apollo/queries/getAwards';
import { useLazyQuery } from '@apollo/client';

// Define types
interface AwardItem {
  id: string;
  title: string;
  description: string;
  mobileImage: string;
  desktopImage: string;
}

interface AwardSection {
  id: string;
  title: string;
  description: string;
  sectionItems: {
    edges: {
      node: AwardItem;
    }[];
  };
}

interface AwardsData {
  getSections: AwardSection;
}

const Awards: React.FC = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const [getAwardsData] = useLazyQuery<AwardsData>(GET_AWARDS);
  const [awardsData, setAwardsData] = useState<AwardItem[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAwardsData({ variables: { section: "AWARDS" } });
        if (data?.getSections) {
          const { title, description, sectionItems } = data.getSections;
          setTitle(title);
          setDescription(description);
          if (sectionItems) {
            setAwardsData(sectionItems.edges.map(edge => edge.node));
          }
        } else {
          setAwardsData([]);
        }
      } catch (error) {
        console.error("Error fetching awards data:", error);
        setAwardsData([]);
      }
    };
    fetchData();
  }, [getAwardsData]);



  return (
    <div className={styles.awards_container}>
      <div className={styles.heading_container} data-aos="fade-down" data-aos-duration="600">
        <div className={styles.title}>
          <h1>{title}</h1>
        </div>
        <div className={styles.heading}>
          <h2>{description}</h2>
        </div>
      </div>
      <div className={styles.awards_items} data-aos="fade-up" data-aos-duration="600">
        {awardsData.map((item, index) => (
          <div className={styles.award} key={item.id}>
            <div className={styles.image}>
              <Image
                src={isDesktopOrLaptop ? item.desktopImage : item.mobileImage}
                alt={item.title}
                width={200}
                height={200}
                layout="responsive"
              />
            </div>
            <div className={styles.content}>
              <div className={styles.title}>
                <h3>{item.title}</h3>
              </div>
              <div className={styles.description}>
                <p>{item.description}</p>
              </div>
            </div>
            {index !== awardsData.length - 1 && <hr />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Awards;