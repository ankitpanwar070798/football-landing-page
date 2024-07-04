"use client"
import React, { useState } from "react"
import styles from "./Footer.module.scss"
import { useMediaQuery } from "react-responsive"
import Image from "next/image"
import location from "../../../public/images/location.svg"
import phone from "../../../public/images/phone.svg"
import logo from "../../../public/images/logo.png"
import { useMutation } from '@apollo/client';
import CREATE_SUBSCRIBE_MUTATION from '@/apollo/mutations/SubscribeMutation';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface SubscribeData {
  subscribe: {
    message: string;
    status: string;
  };
}

const Footer = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  })

  const [emailId, setEmailid] = useState('');
  const [error, setError] = useState('');
  const [Subscribe] = useMutation<SubscribeData>(CREATE_SUBSCRIBE_MUTATION);

  // const VerifyEmail = async () => {
  //   try {
  //     const { data } = await Subscribe({
  //       variables: { email: emailId },
  //     });
  //     toast.success(data?.subscribe?.message);
  //     setEmailid('');
  //   } catch (error: any) {
  //     toast.error(error.message);
  //   }
  // };
  const VerifyEmail = async () => {
    try {
      const { data } = await Subscribe({
        variables: { email: emailId },
      });
  
      if (data && data.subscribe && data.subscribe.status === "SUCCESS") {
        toast.success(data.subscribe.message);
        setEmailid('');
      } else {
        toast.error("Failed to subscribe. Please try again later.");
      }
    } catch (error:any) {
      toast.error(error.message);
    }
  };

  const EmailValidation = () => {
    const emailCond =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailId.trim() === '' || emailId.match(emailCond) === null) {
      setError('Please Enter Valid EmailId');
      return false;
    } else {
      setError('');
      VerifyEmail();
    }
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.footer_container}>
        <div className={styles.details_container}>
          {isDesktopOrLaptop ? (
            ""
          ) : (
            <div className={styles.logo}>
              <Image src={logo} alt="logo" width={80} height={80} />
              <p className={styles.logoTitle}>Artz Trust</p>
              <p className={styles.logoSubtitle}>
                A group company that mentors and receives tennis training
              </p>
            </div>
          )}
          <div className={styles.info_section}>
            <div className={styles.location}>
              <Image src={location} alt="location" width={48} height={48} />
              <div className={styles.location_text}>
                <p className={styles.title}>Full Address</p>
                <p className={styles.subtitle}>
                  2/854, Moovendar Nagar, Seelapadi, Dindigul-624005..
                </p>
              </div>
            </div>
            <div className={styles.phone}>
              <Image src={phone} alt="location" width={48} height={48} />
              <div className={styles.location_text}>
                <p className={styles.title}>Number Phone</p>
                <p className={styles.subtitle}>9944433851</p>
              </div>
            </div>
          </div>
          <div className={styles.newsletter_section}>
            <div className={styles.input_field}>
              <input
                className={styles.input}
                placeholder={"Enter your email"}
                type="text"
                name="Email"
                value={emailId}
                onChange={(e) => setEmailid(e.target.value)}
              />
              <button className={styles.cta} onClick={EmailValidation}>SUBMIT</button>
            </div>
            {error && <p className={styles.error_msg}>{error}</p>}
          </div>
        </div>

        <div className={styles.links_container}>
          {isDesktopOrLaptop ? (
            <div className={styles.logo}>
              <Image src={logo} alt="logo" width={120} height={120} />
              <p className={styles.logoTitle}>Artz Trust</p>
              <p className={styles.logoSubtitle}>
                A group company that mentors and receives tennis training
              </p>
            </div>
          ) : (
            ""
          )}
          <div className={styles.footer_section}>
            <h4>Links</h4>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div className={styles.footer_section}>
            <h4>Resources</h4>
            <ul>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Tutorials</a>
              </li>
              <li>
                <a href="#">Documentation</a>
              </li>
              <li>
                <a href="#">FAQs</a>
              </li>
            </ul>
          </div>
          <div className={styles.footer_section}>
            <h4>Support</h4>
            <ul>
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">Community</a>
              </li>
              <li>
                <a href="#">Contact Support</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className={styles.footer_section}>
            <h4>Follow</h4>
            <ul>
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        BallSpace © 2021-2022, All Rights Reserved
      </div>
    </div>
  )
}

export default Footer
