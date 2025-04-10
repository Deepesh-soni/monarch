import React from "react";
import { Form, Input, Button, Typography, Card } from "antd";
import Layout from "../layout/HomePageLayout";

const { Title, Text, Link } = Typography;

const ChangePasswordForm = () => {
  const onFinish = values => {
    console.log("Received values:", values);
  };

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f8fa",
        }}
      >
        <Card
          style={{
            width: 400,
            borderRadius: "10px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          }}
          bodyStyle={{ padding: "32px" }}
        >
          <Title
            level={2}
            style={{ textAlign: "center", marginBottom: "10px" }}
          >
            Change Password
          </Title>
          <Text
            type="secondary"
            style={{ display: "block", textAlign: "center", marginBottom: 24 }}
          >
            Remembered your password? <Link href="/login">Sign In</Link>
          </Text>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Current Password"
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your current password!",
                },
              ]}
            >
              <Input.Password placeholder="Current password" />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: "Please input your new password!" },
              ]}
            >
              <Input.Password placeholder="New password" />
            </Form.Item>

            <Form.Item
              label="Confirm New Password"
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
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
  );
};

export default ChangePasswordForm;
