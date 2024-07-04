"use client"
import React, { useState, useEffect } from "react";
import { useLazyQuery } from '@apollo/client';
import { useMediaQuery } from "react-responsive";
import styles from "./BehindArtz.module.scss";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import GET_FOUNDER from '@/apollo/queries/getFounder';

// Define types
interface FounderItem {
  id: string;
  title: string;
  description: string;
  name: string;
  designation: string;
  mobileImage: string;
  desktopImage: string;
}

interface FounderSection {
  id: string;
  title: string;
  sectionItems: {
    edges: {
      node: FounderItem;
    }[];
  };
}

interface FounderData {
  getSections: FounderSection;
}

const BehindArtz: React.FC = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const [getFounderData] = useLazyQuery<FounderData>(GET_FOUNDER);
  const [founderData, setFounderData] = useState<FounderItem | null>(null);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getFounderData({ variables: { section: "FOUNDER" } });
        if (data?.getSections) {
          const { title, sectionItems } = data.getSections;
          setTitle(title);
          if (sectionItems) {
            setFounderData(sectionItems.edges[0].node);
          }
        } else {
          setFounderData(null);
        }
      } catch (error) {
        console.error("Error fetching founder data:", error);
        setFounderData(null);
      }
    };
    fetchData();
  }, [getFounderData]);



  return (
    <div className={styles.behind_artz_container}>
      <div data-aos="fade-down" data-aos-duration="600">
        <SectionTitle
          title={title}
          isWhite={false}
        />
      </div>

      {founderData && (
        <div className={styles.cards_container}>
          <div
            className={styles.image_detail}
            data-aos="fade-right"
            data-aos-duration="600"
          >
            <div className={styles.image_container}>
              <Image
                src={isDesktopOrLaptop ? founderData.desktopImage : founderData.mobileImage}
                alt={founderData.name}
                width={isDesktopOrLaptop ? 380 : 327}
                height={isDesktopOrLaptop ? 362 : 300}
                className={styles.image}
              />
            </div>
            <div className={styles.details}>
              <div className={styles.title}>{founderData.name}</div>
              <div className={styles.tag}>{founderData.designation}</div>
            </div>
          </div>

          <div
            className={styles.details_container}
            data-aos="fade-left"
            data-aos-duration="600"
          >
            <div className={styles.details_title}>{founderData.title}</div>
            <div className={styles.details_description}>
              <p>{founderData.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BehindArtz;
