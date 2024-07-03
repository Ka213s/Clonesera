import React from 'react';
import { Input, Select, Button, Form } from 'antd';

const { Option } = Select;

const UserFilter: React.FC<{ onFilter: (filters: any) => void, onClear: () => void }> = ({ onFilter, onClear }) => {
  const [form] = Form.useForm();

  const handleFilter = (values: any) => {
    onFilter(values);
  };

  const handleClear = () => {
    form.resetFields();
    onClear();
  };

  return (
    <Form form={form} layout="inline" onFinish={handleFilter} className="mb-4">
      {/* Remove Form.Item for searchID */}
      <Form.Item name="searchName" label="Name">
        <Input placeholder="Search by Name" />
      </Form.Item>
      <Form.Item name="searchEmail" label="Email">
        <Input placeholder="Search by Email" />
      </Form.Item>
      <Form.Item name="searchRole" label="Role">
        <Select placeholder="Select Role" allowClear>
          <Option value="admin">Admin</Option>
          <Option value="instructor">Instructor</Option>
          <Option value="student">Student</Option>
        </Select>
      </Form.Item>
      <Form.Item name="searchStatus" label="Status">
        <Select placeholder="Select Status" allowClear>
          <Option value={true}>Active</Option>
          <Option value={false}>Inactive</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className='!bg-[#9997F5] hover:!bg-[#8886E5]'>Filter</Button>
      </Form.Item>
      <Form.Item>
        <Button onClick={handleClear}>Clear</Button>
      </Form.Item>
    </Form>
  );
};

export default UserFilter;
