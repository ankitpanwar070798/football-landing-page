"use client"
import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useMediaQuery } from "react-responsive";
import styles from "./OurTrustee.module.scss";
import Image from "next/image";
import HorizontalLine from "../../../../../public/images/about-line.svg";
import view from "../../../../../public/images/viewmore.svg";
import GET_TRUSTEES from "@/apollo/queries/getOurTrustees";

// Define types
interface TrusteeItem {
  id: string;
  name: string;
  designation: string;
  description: string;
  mobileImage: string;
  desktopImage: string;
}

interface FounderSection {
  id: string;
  title: string;
  sectionItems: {
    edges: {
      node: TrusteeItem;
    }[];
  };
}

interface FounderData {
  getSections: FounderSection;
}

// Helper function to truncate description
const truncateDescription = (description: string, wordLimit: number): string => {
  const words = description.split(" ");
  if (words.length <= wordLimit) {
    return description;
  }
  return words.slice(0, wordLimit).join(" ") + "...";
};

const OurTrustee: React.FC = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const [getFounderData] = useLazyQuery<FounderData>(GET_TRUSTEES);
  const [trustees, setTrustees] = useState<TrusteeItem[]>([]);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getFounderData({ variables: { section: "TRUSTEES" } });
        if (data?.getSections) {
          const { title, sectionItems } = data.getSections;
          setTitle(title);
          if (sectionItems) {
            setTrustees(sectionItems.edges.map(edge => edge.node));
          }
        } else {
          setTrustees([]);
        }
      } catch (error) {
        console.error("Error fetching trustees data:", error);
        setTrustees([]);
      }
    };
    fetchData();
  }, [getFounderData]);



  return (
    <div className={styles.our_trustee_container}>
      <div className={styles.title_container} data-aos="fade-down" data-aos-duration="600">
        <h1>{title}</h1>
        <Image
          src={HorizontalLine}
          alt=""
          style={{
            width: "20%",
            height: "5px",
          }}
        />
      </div>
      <div className={styles.grid_container} data-aos="fade-up" data-aos-duration="600">
        {trustees.slice(0, 6).map((trustee, index) => (
          <div key={trustee.id} className={`${styles.card} ${index >= 3 ? styles.hide_on_mobile : ''}`}>
            <Image
              src={isDesktopOrLaptop ? trustee.desktopImage : trustee.mobileImage}
              alt={trustee.name}
              className={styles.card_image}
              layout="responsive"
              width={340}
              height={320}
            />
            <div className={styles.card_content}>
              <h2 className={styles.card_title}>{trustee.name}</h2>
              <p className={styles.card_role}>{trustee.designation}</p>
              <p className={styles.card_description}>
                {truncateDescription(trustee.description, 15)}
              </p>
            </div>
          </div>
        ))}
      </div>
      {trustees.length > 6 && (
        isDesktopOrLaptop ? (
          <div className={styles.view_more}>
            <h4>View More</h4>
            <Image
              src={view}
              alt="view more"
              className={styles.view_more_image}
              width={18}
              height={18}
            />
          </div>
        ) : (
          <div className={styles.view_more_md}>
            <p>View More</p>
          </div>
        )
      )}
    </div>
  )
}

export default OurTrustee;
