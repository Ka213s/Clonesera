import React, { useState, ChangeEvent } from "react";
import { Input } from "antd";

interface SearchCourseProps {
  onSearch: (keyword: string) => void;
}

const SearchCourse: React.FC<SearchCourseProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState<string>("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    onSearch(value);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <Input
          placeholder="Search course name..."
          size="large"
          value={keyword}
          onChange={handleSearch}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default SearchCourse;
