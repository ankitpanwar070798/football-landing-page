"use client";
import React from 'react'
import styles from './RegisterBanner.module.scss'
import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'
import desktopImg from "../../../public/images/registerBanner.png"
import { Button } from 'antd';
import logo from "../../../public/images/logo.png"
import mobileImg from "../../../public/images/registerMD.png"
import { usePathname } from 'next/navigation';



const RegisterBanner = () => {
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 1024px)",
    })
    const pathname = usePathname();
    const isCoachingPage = pathname === '/coaching';

    const getMarginTop = () => {
        if (isCoachingPage) {
          if (isDesktopOrLaptop) {
            return '100px';
          }
          if (!isDesktopOrLaptop) {
            return '60px';
          }
        }
        return '0px';
      };

  return (
 
    <div className={styles.banner_container}    style={{ marginTop: getMarginTop() }}>
        {
            isDesktopOrLaptop ? <>
                <div className={styles.banner_background}  
                            style={{
                                background:`url(${desktopImg.src}) no-repeat center center`,
                                backgroundSize: 'cover'
                            }}>
                        </div>
                        <div className={styles.banner_content}>
                    <div data-aos="fade-left" data-aos-duration="600">
                        <div className={styles.title}>Wish to Play & Win Tournaments?!</div>
                        <div className={styles.description}>Register your team and play a tournament</div>
                    </div>               
                 <div data-aos="fade-left" data-aos-duration="600">
                 <Button type="primary" className={styles.regiter_btn} >
                        Registers Now
                    </Button>
                 </div>
                </div>
                <div className={styles.banner_logo} data-aos="fade-left" data-aos-duration="600">
                    <Image src={logo} alt="logo" width={100} height={100} />
                </div>
            </> : <>
            <div className={styles.md_banner_background}>
                <Image className={styles.background_img} src={mobileImg} alt="mobile banner" width={100} height={100} />
                <div className={styles.banner_logo}>
                    <Image  src={logo} alt="logo" width={100} height={100} />
                </div>
            </div>
            <div className={styles.banner_content}>
                <div >
                    <div className={styles.title}>Wish to Play & Win Tournaments?!</div>
                    <div className={styles.description}>Register your team and play a tournament</div>
                </div>               
            <div className={styles.banner_cta}>
            <Button type="primary" className={styles.regiter_btn} >
                    Registers Now
                </Button>
            </div>
            </div>
            </>
        }
    </div>
  )
}

export default RegisterBanner
