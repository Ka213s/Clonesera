import React, { useState } from 'react';
import { Button, Modal, Form, Input, InputNumber } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { getSessionById, updateSession } from '../../../utils/commonImports';
import TinyMCEEditorComponent from '../../../utils/TinyMCEEditor'; // Import TinyMCE Editor component

interface ButtonEditProps {
  _id: string;
}

const ButtonEdit: React.FC<ButtonEditProps> = ({ _id }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const showModal = async () => {
    setVisible(true);
    setLoading(true);
    try {
      const session = await getSessionById(_id);
      form.setFieldsValue(session);
    } catch (error) {
      console.error('Failed to fetch session', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      await updateSession(_id, values);
      setVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Failed to update session', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Button icon={<EditOutlined />} onClick={showModal}>
        Edit
      </Button>
      <Modal
        visible={visible}
        title="Edit Session"
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="course_id"
            label="Course ID"
            rules={[{ required: true, message: 'Please input the course ID!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
          >
            <TinyMCEEditorComponent
              value={form.getFieldValue('description')}
              onEditorChange={(content) => form.setFieldsValue({ description: content })}
            />
          </Form.Item>
          <Form.Item
            name="position_order"
            label="Position Order"
            rules={[{ required: true, message: 'Please input the position order!' }]}
          >
            <InputNumber min={1} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ButtonEdit;
