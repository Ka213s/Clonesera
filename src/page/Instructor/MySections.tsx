// MySections.tsx
import React, { useState } from "react";
import { Button, Popconfirm, Tag, Modal, Form, Input, Select, message } from "antd";
import { FaEdit, FaTrashAlt, FaSearch, FaPlus } from "react-icons/fa";
import { SectionData, AccountData } from "../../services/ApiService";

const { Option } = Select;

interface MySectionsProps {
    sections: SectionData[];
    accounts: AccountData[];
    showModal: (section?: SectionData) => void;
    softDeleteSection: (id: string) => void;
    handleOk: () => void;
    handleCancel: () => void;
    formRef: React.RefObject<any>;
    isModalVisible: boolean;
    editingSection: SectionData | null;
}

const MySections: React.FC<MySectionsProps> = ({
    sections,
    accounts,
    showModal,
    softDeleteSection,
    handleOk,
    handleCancel,
    formRef,
    isModalVisible,
    editingSection,
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSections, setFilteredSections] = useState(sections);
    const handleSearch = () => {
        if (searchTerm) {
            setFilteredSections(
                sections.filter(section =>
                    section.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        } else {
            setFilteredSections(sections);
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
                    icon={<FaPlus />}
                >
                    Add Section
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
                    {sections.map((section) => (
                        <tr className="hover:bg-gray-50" key={section.id}>
                            <td className="py-2 px-4 border-b border-gray-200">{section.id}</td>
                            <td className="py-2 px-4 border-b border-gray-200">{section.title}</td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                {accounts.find((account) => account.id === section.Account_Id)?.fullName || "N/A"}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                <Tag color={section.status ? "green" : "red"}>{section.status ? "Active" : "Inactive"}</Tag>
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200 flex space-x-2">
                                <Button type="link" icon={<FaEdit />} onClick={() => showModal(section)}>
                                    Edit
                                </Button>
                                <Popconfirm
                                    title="Are you sure to delete this section?"
                                    onConfirm={() => softDeleteSection(section.id)}
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
                title={editingSection ? "Edit Section" : "Add Section"}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Save"
                cancelText="Cancel"
            >
                <Form ref={formRef} layout="vertical" initialValues={editingSection || {}}>
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: "Please input the section title!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Short Description"
                        name="shortDescription"
                        rules={[{ required: true, message: "Please input the short description!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: "Please input the description!" }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        label="Skill Section"
                        name="skillSection"
                        rules={[{ required: true, message: "Please input the skill section!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: "Please input the price!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Requirements"
                        name="requirements"
                        rules={[{ required: true, message: "Please input the requirements!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Section Category"
                        name="sectionCategory"
                        rules={[{ required: true, message: "Please select the section category!" }]}
                    >
                        <Select mode="multiple" placeholder="Select categories">
                            {["Category 1", "Category 2", "Category 3"].map((category) => (
                                <Option key={category} value={category}>
                                    {category}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Account"
                        name="Account_Id"
                        rules={[{ required: true, message: "Please select the account!" }]}
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

export default MySections;
