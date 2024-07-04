"use client";
import React, { useState } from "react";
import styles from "./Navbar.module.scss";
import Image from "next/image";
import Link from "next/link";

import MediaQuery from "react-responsive";
import { Modal, Button, Flex } from "antd";
import { usePathname } from "next/navigation";

import logo from "../../../public/images/logo.png";
import menu from "../../../public/images/menu.svg";
import close from "../../../public/images/closemenu.svg";
import UserIcon from "../../../public/images/user-icon.svg";


const Navbar = () => { 
  const [modalOpen, setModalOpen] = useState(false);
  
  const pathName = usePathname();
  return (
    <div className={styles.navbar_container}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
                src={logo}
                alt="logo"
            //   width={isDesktopOrLaptop ? 65 : 50}
            //   height={isDesktopOrLaptop ? 65 : 50}
                layout="fill"
                objectFit="contain"
                objectPosition="center"
            />
          </Link>
        </div>
        <MediaQuery minWidth={1024}>
          <ul className={styles.navLinks}>
            <li>
              <Link className={`${styles.menu} ${(pathName === '/home' || pathName === '/') ? styles.active: ''}`} href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className={`${styles.menu} ${(pathName === '/about-us') ? styles.active: ''}`} href="/about-us">
                About Us
              </Link>
            </li>
            <li>
              <Link className={`${styles.menu} ${(pathName === '/coaching') ? styles.active: ''}`} href="/coaching">
              Coaching
              </Link>
            </li>
            <li>
              <Link className={styles.menu} href="">
                Partners
              </Link>
            </li>
            <li>
              <Link className={styles.menu} href="">
                Tournament
              </Link>
            </li>
            <li>
              <Link className={styles.menu} href="">
                Gallery
              </Link>
            </li>
            <li>
                <Button className={styles.donate_btn}>Donation</Button>
            </li>
            <li>
                <Link  href="">
                    <Flex className={styles.login_btn} align="center">
                        <Image src={UserIcon} alt="logo" width={22} height={22} />
                        <div>Login</div>
                    </Flex>                   
                </Link>
            </li>
          </ul>
        </MediaQuery>
<div>
<MediaQuery maxWidth={1023}>
          <div className={styles.hamburger} onClick={() => setModalOpen(true)}>
            <Image src={menu} alt="logo" width={36} height={36} />
          </div>
        </MediaQuery>

        <Modal open={modalOpen} closable={false} footer={null} getContainer={false}>
          <ul className={styles.mobile_navlinks}>
            <li>
              <Link
                className={styles.menu}
                href="/"
                onClick={() => setModalOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={styles.menu}
                href="/about-us"
                onClick={() => setModalOpen(false)}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                className={styles.menu}
                href="/coaching"
                onClick={() => setModalOpen(false)}
              >
                Courses
              </Link>
            </li>
            <li>
              <Link className={styles.menu} href="">
                Partners
              </Link>
            </li>
            <li>
              <Link className={styles.menu} href="">
                Tournament
              </Link>
            </li>
            <li>
              <Link className={styles.menu} href="">
                Gallery
              </Link>
            </li>
            <li>
                <Button className={styles.login_btn}>Become a member</Button>
            </li>
            <li>
                <Button className={styles.donate_btn}>Donation</Button>
            </li>
          </ul>
          <div
            onClick={() => setModalOpen(false)}
            className={styles.close_menu}
          >
            <Image src={close} alt="logo" width={36} height={36} />
          </div>
        </Modal>
</div>
      </nav>
    </div>
  );
};

export default Navbar;
