import React from "react";
import { Form, Input, Button, Typography, Card, message } from "antd";
import Layout from "../../layout/HomePageLayout";
import { client } from "@axiosClient";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { useRouter } from "next/router";

const { Title } = Typography;

const ChangePasswordForm = () => {

   const router = useRouter();

  const onFinish = async values => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Passwords do not match");
      return;
    }
    const data = {
      oldPassword: values.currentPassword,
      newPassword: values.newPassword,
    };

    try {
      const response = await client.post("/user/changepassword", data);

      if(response.success == true){
        message.success("Password changed successfully");
        router.replace("/auth");
        return;
      }

      throw new Error('Failed to update password! retry again');
      
    } catch (err) {
      console.error(err);
      message.error("Failed to change password");
    }
  };

  return (
    <SessionAuth>
      <Layout>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "50px"
          }}
        >
          <Card style={{ width: 400, borderRadius: "10px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }} bodyStyle={{ padding: "32px" }}>
            <Title level={2} style={{ textAlign: "center", marginBottom: "10px" }}>Change Password</Title>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[
                  { required: true, message: "Please input your current password!" },
                  { min: 6, message: "Password must be at least 6 characters!" },
                ]}
              >
                <Input.Password placeholder="Current password" />
              </Form.Item>
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  { required: true, message: "Please input your new password!" },
                  { min: 6, message: "Password must be at least 6 characters!" },
                ]}
              >
                <Input.Password placeholder="New password" />
              </Form.Item>
              <Form.Item
                label="Confirm New Password"
                name="confirmPassword"
                dependencies={["newPassword"]}
                rules={[
                  { required: true, message: "Please confirm your new password!" },
                  { min: 6, message: "Password must be at least 6 characters!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      return !value || getFieldValue("newPassword") === value
                        ? Promise.resolve()
                        : Promise.reject(new Error("Passwords do not match!"));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm password" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{ backgroundColor: "#003DA5", borderRadius: "6px" }}
                >
                  CHANGE PASSWORD
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Layout>
    </SessionAuth>
  );
};

export default ChangePasswordForm;
