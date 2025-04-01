import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import { toast } from "react-toastify";
import { client } from "@axiosClient";

const NewUpdatePopup = ({
    visible,
    toggleModal,
    itemType = "watchlist", // "watchlist" or "screener"
    mode = "new", // "new" or "update"
    initialValues = {}, // For update: { name, description, query?, stocks?, fqn }
    onConfirm = () => { }
}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (mode === "update") {
            form.setFieldsValue({
                name: initialValues.name,
                description: initialValues.description,
                query: initialValues.query || ""
            });
        } else {
            form.resetFields();
        }
    }, [mode, initialValues, form, visible]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (mode === "new") {
                if (itemType === "watchlist") {
                    values.stocks = []; // default empty stocks for new watchlist
                }
                if (itemType === "screener" && !values.query) {
                    values.query = ""; // default empty query for new screener
                }
                await client.post(`/${itemType}`, values);
                toast.success(`${itemType} created successfully!`);
            } else {
                if (!initialValues.fqn) {
                    toast.error("Missing identifier for update.");
                    return;
                }
                // For update, retain existing stocks or query if not modified.
                if (itemType === "watchlist") {
                    values.stocks = initialValues.stocks || [];
                }
                if (itemType === "screener") {
                    values.query = values.query || initialValues.query || "";
                }
                await client.put(`/${itemType}/${initialValues.fqn}`, values);
                toast.success(`${itemType} updated successfully!`);
            }
            onConfirm();
            toggleModal();
        } catch (error) {
            toast.error(`Failed to ${mode === "new" ? "create" : "update"} ${itemType}.`);
        }
    };

    return (
        <Modal
            visible={visible}
            title={`${mode === "new" ? "Create New" : "Update"} ${itemType.charAt(0).toUpperCase() + itemType.slice(1)}`}
            onCancel={toggleModal}
            footer={[
                <Button key="cancel" onClick={toggleModal}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    {mode === "new" ? "Create" : "Update"}
                </Button>
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        { required: true, message: "Please enter name" },
                        { min: 6, message: "Name must be at least 6 characters" },
                        { max: 256, message: "Name must be at most 256 characters" },
                        {
                            pattern: /^[A-Za-z0-9 ]+$/,
                            message: "Name can only contain letters, numbers, and spaces"
                        }
                    ]}
                >
                    <Input placeholder="Enter name" />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        { required: true, message: "Please enter description" },
                        { min: 2, message: "Description must be at least 2 characters" },
                        { max: 2048, message: "Description must be at most 2048 characters" }
                    ]}
                >
                    <Input.TextArea placeholder="Enter description" rows={3} />
                </Form.Item>
                {itemType === "screener" && (
                    <Form.Item label="Query" name="query">
                        <Input.TextArea placeholder="Enter query" rows={3} />
                    </Form.Item>
                )}
            </Form>
        </Modal>
    );
};

export default NewUpdatePopup;
