'use client';
import styles from "./Impact.module.scss";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import GlobalRecognition from '../../../public/images/GlobalRecognition.svg';
import GET_IMPACT from '@/apollo/queries/getImpact';
import { useLazyQuery } from '@apollo/client';
import { useMediaQuery } from "react-responsive";

interface ImpactItem {
    id: string;
    title: string;
    description: string;
   
    imageCollections: {
      edges: {
        node: {
          id: string;
          mobileImage: string | null;
          desktopImage: string | null;
          statsCount: string | null;
        }
      }[]
    }
  }

const Impact = () => {
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 1024px)",
      })

    const [getImpactData, { loading, error, data }] = useLazyQuery(GET_IMPACT);
    const [impactItems, setImpactItems] = useState<ImpactItem[]>([]);
  
    useEffect(() => {
      getImpactData({ variables: { section: "IMPACT" } });
    }, [getImpactData]);
  
    useEffect(() => {
      if (data?.getTeamsAchievements) {
        setImpactItems(data.getTeamsAchievements);
      }
    }, [data]);

    // console.log(impactItems[0].imageCollections.edges[0].node.statsCount,"datat");
    
    return (
        <div className={styles.impact_container}>
            <div className={styles.title} data-aos="fade-down" data-aos-duration="600">The Impact</div>
            <div className={styles.impact_detail_section}>

            {impactItems.length > 0 && (
                    <div className={styles.impact_item_container} data-aos="fade-right" data-aos-duration="600">
                        <div className={styles.impact_value}>{impactItems[0].imageCollections.edges[0]?.node.statsCount || ""}</div>
                        <div className={styles.impact_title}>{impactItems[0].title}</div>
                        <div className={styles.impact_description}>{impactItems[0].description}</div>
                    </div>
                )}
                 {impactItems.length > 0 && (
                <div className={styles.impact_item_container} data-aos="fade-down" data-aos-duration="600">
                    <Image src={isDesktopOrLaptop ? impactItems[1].imageCollections.edges[0]?.node.desktopImage || "" : impactItems[1].imageCollections.edges[0]?.node.mobileImage || ""} alt="" width={94} height={94}  className={styles.impact_value}/>
                    <div className={styles.impact_title}>{impactItems[1].title}</div>
                    <div className={styles.impact_description}>{impactItems[1].description}</div>
                </div>
 )}
                {impactItems.length > 0 && (
                    <div className={styles.impact_item_container} data-aos="fade-right" data-aos-duration="600">
                        <div className={styles.impact_value}>{impactItems[2].imageCollections.edges[0]?.node.statsCount || ""}</div>
                        <div className={styles.impact_title}>{impactItems[2].title}</div>
                        <div className={styles.impact_description}>{impactItems[2].description}</div>
                    </div>
                )}
                
            </div>
        </div>
    );
}

export default Impact;