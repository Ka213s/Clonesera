<<<<<<< HEAD
import { Table, Pagination, Button, Modal, Select, Input, React, useEffect, useState, useCallback, useMemo, getCategories, createCategory, editCategory, deleteCategory, EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '../utils/commonImports';
=======
import { Table, Pagination, Button, Modal, Select, Input, React, useEffect, useState, useCallback, useMemo, setGlobalLoadingHandler, getCategories, createCategory, editCategory, deleteCategory, EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '../util/commonImports';
>>>>>>> 3d3846adf733915098f31ffb1bdd13b1049d2e73
import { ColumnsType } from 'antd/es/table';
import CategoryForm from './CategoryForm';

interface Category {
    _id: string;
    name: string;
    description: string;
    parent_category_id: string | null;
}

const Category: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [parentCategories, setParentCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [filterOption, setFilterOption] = useState<'parent' | 'sub' | ''>('');
    const [searchKeyword, setSearchKeyword] = useState('');

    const fetchCategories = useCallback(
        async (page: number, pageSize: number, filterOption: string, keyword: string) => {
            setLoading(true);
            try {
                // Tạo điều kiện tìm kiếm với keyword và is_deleted: false
                const searchCondition = {
                    keyword,
                    is_deleted: false,
                };
    
                // Lấy danh sách các categories với searchCondition, pageNum và pageSize
                const data = await getCategories(searchCondition, page, pageSize);
    
                // Lọc các category dựa trên filterOption
                let filteredCategories = data.pageData;
                if (filterOption === 'parent') {
                    filteredCategories = filteredCategories.filter((cat: Category) => cat.parent_category_id === null);
                } else if (filterOption === 'sub') {
                    filteredCategories = filteredCategories.filter((cat: Category) => cat.parent_category_id !== null);
                }
    
                // Cập nhật danh sách các categories và tổng số mục
                setCategories(filteredCategories);
                setTotalItems(data.pageInfo.totalItems);
    
                // Lấy danh sách các parent categories
                const parentData = await getCategories({ keyword: '', is_deleted: false }, 1, 1000);
                setParentCategories(parentData.pageData);
            } catch (error) {
                // Xử lý lỗi nếu có
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        },
        []  // Dependency array có thể cần thêm các dependency nếu có
    );
    

    useEffect(() => {
        setGlobalLoadingHandler(setLoading);
    }, []);

    useEffect(() => {
        fetchCategories(page, pageSize, filterOption, searchKeyword);
    }, [page, pageSize, filterOption, fetchCategories]);

    const columns: ColumnsType<Category> = useMemo(
        () => [
            {
                title: 'Category Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: 'Parent Category',
                dataIndex: 'parent_category_id',
                key: 'parent_category_id',
                render: (parentCategoryId: string | null) => {
                    const parentCategory = parentCategories.find((cat: Category) => cat._id === parentCategoryId);
                    return parentCategory ? parentCategory.name : 'N/A';
                },
            },
            {
                title: 'Actions',
                key: 'actions',
                render: (record: Category) => (
                    <div className="flex space-x-2">
                        <Button
                            onClick={() => handleEdit(record)}
                            icon={<EditOutlined />}
                            className="text-blue-500 hover:text-blue-700"
                        />
                        <Button
                            onClick={() => handleDelete(record._id)}
                            icon={<DeleteOutlined />}
                            danger
                            className="text-red-500 hover:text-red-700"
                        />
                    </div>
                ),
            },
        ],
        [parentCategories]
    );

    const handleAddCategory = () => {
        setIsEditing(false);
        setEditingCategory(null);
        setIsModalVisible(true);
    };

    const handleEdit = (category: Category) => {
        setIsEditing(true);
        setEditingCategory(category);
        setIsModalVisible(true);
    };

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this category?',
            onOk: async () => {
                try {
                    await deleteCategory(id);
                    fetchCategories(page, pageSize, filterOption, searchKeyword);
                } catch (error) {
                    console.error('Failed to delete category:', error);
                }
            },
        });
    };

    const handleSubmit = async (values: any) => {
        try {
            if (isEditing && editingCategory) {
                await editCategory(editingCategory._id, values);
            } else {
                await createCategory(values);
            }
            setIsModalVisible(false);
            fetchCategories(page, pageSize, filterOption, searchKeyword);
        } catch (error) {
            console.error('Failed to save category:', error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSearch = (event?: React.KeyboardEvent<HTMLInputElement>) => {
        if (!event || event.key === 'Enter') {
            setPage(1); 
            fetchCategories(1, pageSize, filterOption, searchKeyword);
        }
    };

    return (
        <div className="p-4">
            <div className="mb-4 flex items-center">
                <Select
                    value={filterOption}
                    placeholder="Select"
                    onChange={(value) => {
                        setFilterOption(value as 'parent' | 'sub' | '');
                        setPage(1); 
                        fetchCategories(1, pageSize, value as 'parent' | 'sub' | '', searchKeyword);
                    }}
                    allowClear
                    className="mr-2 w-40"
                >
                    <Select.Option value="parent">Parent Category</Select.Option>
                    <Select.Option value="sub">Sub Category</Select.Option>
                </Select>
                <Input
                    placeholder="Search"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyPress={handleSearch}
                    className="mr-2 w-60"
                />
                <Button type="primary" onClick={() => handleSearch()} icon={<SearchOutlined />} className="mr-2" />
                <Button type="primary" onClick={handleAddCategory} icon={<PlusOutlined />} className="ml-auto">
                    New Category
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={categories.map(category => ({ ...category, key: category._id }))}
                loading={loading}
                pagination={false}
                className="mb-4"
            />
            <Pagination
                current={page}
                pageSize={pageSize}
                total={totalItems}
                onChange={(page, pageSize) => {
                    setPage(page);
                    setPageSize(pageSize);
                    fetchCategories(page, pageSize, filterOption, searchKeyword);
                }}
                showSizeChanger
                className="text-center"
            />
            <CategoryForm
                isVisible={isModalVisible}
                isEditing={isEditing}
                editingCategory={editingCategory}
                parentCategories={parentCategories}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default Category;
