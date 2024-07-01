import React, { useState } from "react";
import { Button, Popconfirm, Tag, Modal, Form, Input, Select, message } from 'antd';
import { FaEdit, FaTrashAlt, FaSearch, FaPlus } from "react-icons/fa";
import { LectureData, AccountData } from '../../services/ApiService';

const { Option } = Select;

interface MyLecturesProps {
    lectures: LectureData[];
    accounts: AccountData[];
    showModal: (lecture?: LectureData) => void;
    softDeleteLecture: (id: string) => void;
    handleOk: () => void;
    handleCancel: () => void;
    formRef: React.RefObject<any>;
    isModalVisible: boolean;
    editingLecture: LectureData | null;
}

const MyLectures: React.FC<MyLecturesProps> = ({
    lectures,
    accounts,
    showModal,
    softDeleteLecture,
    handleOk,
    handleCancel,
    formRef,
    isModalVisible,
    editingLecture,
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredLectures, setFilteredLectures] = useState(lectures);

    const handleSearch = () => {
        if (searchTerm) {
            setFilteredLectures(
                lectures.filter(lecture =>
                    lecture.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        } else {
            setFilteredLectures(lectures);
        }
    };

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <Input
                    placeholder="Search by title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onPressEnter={handleSearch}
                    prefix={<FaSearch className="text-gray-400" />}
                    style={{ width: 300 }}
                />
                <Button
                    type="primary"
                    style={{ backgroundColor: '#9997F5' }}
                    className="hover:bg-[#8886E5] text-white px-4 py-2 rounded"
                    icon={<FaPlus />}
                >
                    Add Lecture
                </Button>
            </div>

            <table className="min-w-full bg-white">
                <thead>
                    <tr className="text-left">
                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Item No.</th>
                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Title</th>
                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Account</th>
                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Status</th>
                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {lectures.map((lecture) => (
                        <tr className="hover:bg-gray-50" key={lecture.id}>
                            <td className="py-2 px-4 border-b border-gray-200">{lecture.id}</td>
                            <td className="py-2 px-4 border-b border-gray-200">{lecture.title}</td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                {accounts.find((account) => account.id === lecture.Account_Id)?.fullName || 'N/A'}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                <Tag color={lecture.status ? 'green' : 'red'}>{lecture.status ? 'Active' : 'Inactive'}</Tag>
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200 flex space-x-2">
                                <Button type="link" icon={<FaEdit />} onClick={() => showModal(lecture)}>
                                    Edit
                                </Button>
                                <Popconfirm
                                    title="Are you sure to delete this lecture?"
                                    onConfirm={() => softDeleteLecture(lecture.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button type="link" danger icon={<FaTrashAlt />}>
                                        Delete
                                    </Button>
                                </Popconfirm>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                title={editingLecture ? 'Edit Lecture' : 'Add Lecture'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Save"
                cancelText="Cancel"
            >
                <Form ref={formRef} layout="vertical" initialValues={editingLecture || {}}>
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please input the lecture title!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Short Description"
                        name="shortDescription"
                        rules={[{ required: true, message: 'Please input the short description!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        label="Skill Lecture"
                        name="skillLecture"
                        rules={[{ required: true, message: 'Please input the skill lecture!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input the price!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Requirements"
                        name="requirements"
                        rules={[{ required: true, message: 'Please input the requirements!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Lecture Category"
                        name="lectureCategory"
                        rules={[{ required: true, message: 'Please select the lecture category!' }]}
                    >
                        <Select mode="multiple" placeholder="Select categories">
                            {['Category 1', 'Category 2', 'Category 3'].map((category) => (
                                <Option key={category} value={category}>
                                    {category}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Account"
                        name="Account_Id"
                        rules={[{ required: true, message: 'Please select the account!' }]}
                    >
                        <Select placeholder="Select account">
                            {accounts.map((account) => (
                                <Option key={account.id} value={account.id}>
                                    {account.fullName}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default MyLectures;
