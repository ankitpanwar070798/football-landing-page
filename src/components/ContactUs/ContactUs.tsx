"use client"
import React from "react"
import styles from "./ContactUs.module.scss"
import { useMediaQuery } from "react-responsive"
import Image from "next/image"
import map from "../../../public/images/map.png"
import { Button, Form, Input, Select, Upload } from "antd"
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import CREATE_CONTACT_US_MUTATION from "@/apollo/mutations/ContactUsMutation";

const ContactUs = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  })

  const width = isDesktopOrLaptop ? 400 : 200;
  const height = isDesktopOrLaptop ? 400 : 200;


  const [contactUs, { loading }] = useMutation(CREATE_CONTACT_US_MUTATION);
  const [form] = Form.useForm(); // Capture the form instance

  const handleSubmit = async (values: any) => {
    const { firstName, lastName, email, PhoneNumber, Message } = values;

    // Validate email format
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate phone number format
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(PhoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      const { data } = await contactUs({
        variables: {
          firstName,
          lastName,
          email,
          contactNumber: PhoneNumber,
          message: Message,
        },
      });
      if (data.contactForm.status === "SUCCESS") {
        toast.success(data.contactForm.message);
        form.resetFields(); // Reset all form fields
      } else {
        throw new Error(data.contactForm.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.contactUs_container}>
      <div className={styles.details_container}>
        <div className={styles.contact_info}>
          <h1>Contact Us</h1>
         {
            isDesktopOrLaptop ? "" :  <div style={{textAlign:"center", marginBottom:"20px"}}><svg xmlns="http://www.w3.org/2000/svg" width="125" height="3" viewBox="0 0 125 3" fill="none">
            <path d="M8.24292 0H124.5L116.757 3H0.5L8.24292 0Z" fill="white"/>
          </svg></div>
         }
          {
              isDesktopOrLaptop ? 
              <>
              <Image
                src={map}
                className={styles.image_section}
                alt="contact us"
                width={isDesktopOrLaptop ? 400 : 200}
            height={isDesktopOrLaptop ? 400 : 200}
                useMap="#image-map"
              /> 
              <map name="image-map">
                <area shape="rect" coords={`0,0,${width},${height}`} 
                      href="https://dub.sh/hEoeSKo" alt="Google Maps" />
              </map>
            </>
          : ""
         }
        </div>
        <div className={styles.form_section}>
        <Form
            form={form}
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
          >
            <div className={styles.input_container}>
              <Form.Item
                className={styles.form_item}
                label="First Name"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please input your First Name!",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  placeholder="Enter your first name"
                  className={styles.form_input}
                />
              </Form.Item>
              <Form.Item
                className={styles.form_item}
                label="Last Name"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please input your Last Name!",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  placeholder="Enter your last name"
                  className={styles.form_input}
                />
              </Form.Item>
            </div>
            <div className={styles.input_container}>
              <Form.Item
                className={styles.form_item}
                label="Email Address"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email address!",
                    type: "email",
                  },
                ]}
              >
                <Input
                  placeholder="Enter your email address"
                  className={styles.form_input}
                />
              </Form.Item>
              <Form.Item
                className={styles.form_item}
                label="Phone Number"
                name="PhoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your Phone Number!",
                    pattern: /^[0-9]{10}$/,
                  },
                ]}
              >
                <Input
                  placeholder="Enter your name"
                  className={styles.form_input}
                />
              </Form.Item>
            </div>
            <Form.Item
              label="Message"
              name="Message"
              rules={[
                {
                  required: true,
                  message: "Please input your Message!",
                  whitespace: true,
                },
              ]}
            >
              <Input.TextArea placeholder="Write your messages in here"/>
            </Form.Item>

           <div className={styles.submit_cta}>
           <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.submit_btn}
                loading={loading}
              >
                Submit
              </Button>
            </Form.Item>
           </div>
          </Form>
        </div>
        {
            isDesktopOrLaptop ? " " :  <>
            <Image
              src={map}
              className={styles.image_section}
              alt="contact us"
              width={isDesktopOrLaptop ? 400 : 200}
          height={isDesktopOrLaptop ? 400 : 200}
              useMap="#image-map"
            /> 
            <map name="image-map">
              <area shape="rect" coords={`0,0,${width},${height}`} 
                    href="https://dub.sh/hEoeSKo" alt="Google Maps" />
            </map>
          </>
         }
      </div>
    </div>
  )
}

export default ContactUs
