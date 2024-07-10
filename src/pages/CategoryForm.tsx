import { React, Form, Input, Select, Modal, useEffect } from '../utils/commonImports';
import Category from './Category';

interface CategoryFormProps {
    isVisible: boolean;
    isEditing: boolean;
    editingCategory: Category | null;
    parentCategories: Category[];
    onSubmit: (values: any) => void;
    onCancel: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
    isVisible,
    isEditing,
    editingCategory,
    parentCategories,
    onSubmit,
    onCancel,
}) => {
    const [form] = Form.useForm(); 

    useEffect(() => {
        if (isVisible) {
            if (isEditing && editingCategory) {
                form.setFieldsValue({
                    name: editingCategory.name,
                    description: editingCategory.description,
                    parent_category_id: editingCategory.parent_category_id || undefined,
                });
            } else {
                form.resetFields();
            }
        }
    }, [isVisible, isEditing, editingCategory, form]);

    const filteredParentCategories = parentCategories.filter(
        (category) => !category.parent_category_id
    );

    return (
        <Modal
            title={isEditing ? 'Edit Category' : 'Add Category'}
            open={isVisible}
            onOk={async () => {
                try {
                    const values = await form.validateFields();
                    onSubmit(values);
                } catch (error) {
                    console.error('Validation failed:', error);
                }
            }}
            onCancel={onCancel}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="Category Name"
                    rules={[{ required: true, message: 'Please input the category name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                >
                    <Input />
                </Form.Item>
                {(!isEditing || editingCategory?.parent_category_id) && (
                    <Form.Item
                        name="parent_category_id"
                        label="Parent Category"
                    >
                        <Select placeholder="Select a parent category">
                            {filteredParentCategories.map(parentCategory => (
                                <Select.Option key={parentCategory._id} value={parentCategory._id}>
                                    {parentCategory.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                )}
            </Form>
        </Modal>
    );
};

export default CategoryForm;