"use client"
import React, { useEffect, useState } from "react"
import styles from "./JoinUs.module.scss"
import Image from "next/image"
import { useMediaQuery } from "react-responsive"
import { Button, Form, Input, Select, Upload } from "antd"
import mobileImg from "../../../public/images/joinUsMD.png"
import HorizontalLine from "../../../public/images/about-line.svg"
import discoverImg from "../../../public/images/discoverImg.png"
import logo from "../../../public/images/logo.png"
import type { FormProps } from "antd"
import { toast } from "react-toastify"
import { useMutation, useLazyQuery } from "@apollo/client"
import CAREER_FORM_MUTATION from "@/apollo/mutations/CareerForm"
import GET_SPECIALIZATIONS from "@/apollo/queries/getSpecializations" 
import axios from "axios"

type FieldType = {
  email: string;
  name: string;
  specialization: number;
};

const JoinUs = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const [specializations, setSpecializations] = useState([]);
  const [getSpecializations, { data }] = useLazyQuery(GET_SPECIALIZATIONS);
  const [file, setFile] = useState<File | null>(null);
  const [form] = Form.useForm(); // Ant Design form instance

  useEffect(() => {
    getSpecializations();
  }, [getSpecializations]);

  useEffect(() => {
    if (data && data.getSpecializations) {
      setSpecializations(data.getSpecializations);
    }
  }, [data]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const { email, name, specialization } = values;

      if (!file) {
        toast.error("Please upload your Resume!");
        return;
      }

      const variables = {
        email,
        name,
        specialization,
      };

      const formData = new FormData();
      formData.append(
        "query",
        `mutation careerForm($email: String!, $name: String!, $specialization: ID!) {
          careerForm(email: $email, name: $name, specialization: $specialization) {
            status
            message
          }
        }`
      );
      formData.append("variables", JSON.stringify(variables));
      formData.append("resume", file); // Key updated to "resume"

      const response = await axios.post("https://artz-trust-be.deepsense.dev/graphql/", formData);

      if (response.data.data.careerForm.status === "SUCCESS") {
        toast.success(response.data.data.careerForm.message);
        form.resetFields(); // Reset form fields
        setFile(null); // Reset file state
      } else {
        throw new Error(response.data.data.careerForm.message || "Failed to submit form.");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to submit form.");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    toast.error("Please fill out all required fields.");
  };

  const handleUploadChange = (info: any) => {
    if (info.file.status === "done") {
      setFile(info.file.originFileObj);
      toast.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      toast.error(`${info.file.name} file upload failed.`);
    }
  };
  
  return (
    <div className={styles.joinus_container}>
      <div className={styles.title_container}>
        <h1>Wish To Join Us?</h1>
        <Image
          src={HorizontalLine}
          alt=""
          style={{
            width: "20%",
            height: "5px",
          }}
        />
        <p className={styles.subtitle}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
      <div className={styles.details_container}>
        <div className={styles.image_section}>
          <Image
            className={styles.image}
            src={discoverImg}
            alt="discover"
            width={640}
            height={524}
          />
          <div className={styles.banner_logo}>
            <Image src={logo} alt="logo" width={isDesktopOrLaptop?100:70} height={isDesktopOrLaptop?100:70} />
          </div>
        </div>
        <div className={styles.form_section}>
          <Form
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              className={styles.form_item}
              label="Career Specialization"
              name="specialization"
              rules={[
                {
                  required: true,
                  message: "Please input your Career Specialization!",
                },
              ]}
            >
             <Select
                placeholder="Select your specialization"
                className={styles.form_input}
                options={specializations.map((spec: { id: number; name: string }) => ({
                  value: spec.id,
                  label: spec.name,
                }))}
              />
            </Form.Item>
            <Form.Item
              className={styles.form_item}
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your Name!" }]}
            >
              <Input
                placeholder="Enter your name"
                className={styles.form_input}
              />
            </Form.Item>
            <Form.Item
              className={styles.form_item}
              label="E-mail ID"
              name="email"
              rules={[
                { required: true, message: "Please input your E-mail ID!" },
              ]}
            >
              <Input
                placeholder="Enter your mail ID"
                className={styles.form_input}
              />
            </Form.Item>
            <Form.Item
              className={styles.form_item}
              label="Attach Resume"
              name="resume"
              rules={[
                { required: true, message: "Please upload your Resume!" },
              ]}
            >
             <Upload
                onChange={handleUploadChange}
                maxCount={1}
                accept=".pdf,.doc,.docx"
              >
                <Button className={styles.upload}>
                  Upload resume{" "}
                  <span className={styles.upload_svg} style={{display:'flex', alignItems:'center'}}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <path
                        d="M12.5 1C10.3244 1 8.19767 1.64514 6.38873 2.85383C4.57979 4.06253 3.16989 5.78049 2.33733 7.79048C1.50477 9.80047 1.28693 12.0122 1.71137 14.146C2.1358 16.2798 3.18345 18.2398 4.72183 19.7782C6.26021 21.3166 8.22022 22.3642 10.354 22.7886C12.4878 23.2131 14.6995 22.9952 16.7095 22.1627C18.7195 21.3301 20.4375 19.9202 21.6462 18.1113C22.8549 16.3023 23.5 14.1756 23.5 12C23.5 9.08262 22.3411 6.28473 20.2782 4.22183C18.2153 2.15893 15.4174 1 12.5 1ZM12.5 21C10.72 21 8.97992 20.4722 7.49987 19.4832C6.01983 18.4943 4.86628 17.0887 4.18509 15.4442C3.5039 13.7996 3.32567 11.99 3.67294 10.2442C4.0202 8.49836 4.87737 6.89471 6.13604 5.63604C7.39472 4.37737 8.99836 3.5202 10.7442 3.17293C12.49 2.82567 14.2996 3.0039 15.9442 3.68508C17.5887 4.36627 18.9943 5.51983 19.9832 6.99987C20.9722 8.47991 21.5 10.22 21.5 12C21.5 14.3869 20.5518 16.6761 18.864 18.364C17.1761 20.0518 14.887 21 12.5 21ZM18.5 12C18.5 12.2652 18.3946 12.5196 18.2071 12.7071C18.0196 12.8946 17.7652 13 17.5 13H13.5V17C13.5 17.2652 13.3946 17.5196 13.2071 17.7071C13.0196 17.8946 12.7652 18 12.5 18C12.2348 18 11.9804 17.8946 11.7929 17.7071C11.6054 17.5196 11.5 17.2652 11.5 17V13H7.5C7.23479 13 6.98043 12.8946 6.7929 12.7071C6.60536 12.5196 6.5 12.2652 6.5 12C6.5 11.7348 6.60536 11.4804 6.7929 11.2929C6.98043 11.1054 7.23479 11 7.5 11H11.5V7C11.5 6.73478 11.6054 6.48043 11.7929 6.29289C11.9804 6.10536 12.2348 6 12.5 6C12.7652 6 13.0196 6.10536 13.2071 6.29289C13.3946 6.48043 13.5 6.73478 13.5 7V11H17.5C17.7652 11 18.0196 11.1054 18.2071 11.2929C18.3946 11.4804 18.5 11.7348 18.5 12Z"
                        fill="url(#paint0_linear_646_21435)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_646_21435"
                          x1="12.5"
                          y1="1"
                          x2="12.5"
                          y2="23"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#0085FF" />
                          <stop offset="1" stop-color="#1540BC" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className={styles.submit_btn}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default JoinUs
