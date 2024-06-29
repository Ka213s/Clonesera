import React, { Component } from "react";
import { FaBook } from "react-icons/fa";
import { message } from "antd";
import NavigationTabs from "../../components/Instructor/NavigationTabs";
import ApiService, { CourseData, AccountData, SectionData, LectureData } from "../../services/ApiService";
import MyCourses from "./MyCourses";
import MySections from "./MySections";
import MyLectures from "./MyLectures";

interface ListCourseState {
  activeTab: string;
  isModalVisible: boolean;
  editingCourse: CourseData | null;
  courses: CourseData[];
  accounts: AccountData[];
  sections: SectionData[];
  lectures: LectureData[];
  isSectionModalVisible: boolean;
  editingSection: SectionData | null;
  isLectureModalVisible: boolean;
  editingLecture: LectureData | null;
}

class ListCourse extends Component<{}, ListCourseState> {
  courseFormRef = React.createRef<any>();
  sectionFormRef = React.createRef<any>();
  lectureFormRef = React.createRef<any>();

  state: ListCourseState = {
    activeTab: '1',
    isModalVisible: false,
    editingCourse: null,
    courses: [],
    accounts: [],
    sections: [],
    lectures: [],
    isSectionModalVisible: false,
    editingSection: null,
    isLectureModalVisible: false,
    editingLecture: null,
  };

  componentDidMount() {
    this.fetchCourses();
    this.fetchAccounts();
    this.fetchSections();
    this.fetchLectures();
  }

  fetchCourses = async () => {
    try {
      const courses = await ApiService.getCourses();
      this.setState({ courses });
    } catch (error) {
      message.error("Failed to fetch courses.");
    }
  };

  fetchAccounts = async () => {
    try {
      const accounts = await ApiService.getAccounts("2");
      this.setState({ accounts });
    } catch (error) {
      message.error("Failed to fetch accounts.");
    }
  };

  fetchSections = async () => {
    try {
      const sections = await ApiService.getSections();
      this.setState({ sections });
    } catch (error) {
      message.error("Failed to fetch sections.");
    }
  };

  fetchLectures = async () => {
    try {
      const lectures = await ApiService.getLectures();
      this.setState({ lectures });
    } catch (error) {
      message.error("Failed to fetch lectures.");
    }
  };

  showModal = (course?: CourseData) => {
    if (course) {
      this.setState({
        isModalVisible: true,
        editingCourse: course,
      });
      this.courseFormRef.current?.setFieldsValue(course);
    } else {
      this.setState({
        isModalVisible: true,
        editingCourse: null,
      });
      this.courseFormRef.current?.resetFields();
    }
  };

  showSectionModal = (section?: SectionData) => {
    if (section) {
      this.setState({
        isSectionModalVisible: true,
        editingSection: section,
      });
      this.sectionFormRef.current?.setFieldsValue(section);
    } else {
      this.setState({
        isSectionModalVisible: true,
        editingSection: null,
      });
      this.sectionFormRef.current?.resetFields();
    }
  };

  showLectureModal = (lecture?: LectureData) => {
    if (lecture) {
      this.setState({
        isLectureModalVisible: true,
        editingLecture: lecture,
      });
      this.lectureFormRef.current?.setFieldsValue(lecture);
    } else {
      this.setState({
        isLectureModalVisible: true,
        editingLecture: null,
      });
      this.lectureFormRef.current?.resetFields();
    }
  };

  handleOk = async () => {
    try {
      const values = await this.courseFormRef.current.validateFields();
      const updatedValues = {
        ...values,
        update_at: new Date().toISOString(),
      };
      if (this.state.editingCourse) {
        await ApiService.updateCourseById(this.state.editingCourse.id, updatedValues);
        message.success("Course updated successfully.");
      } else {
        const newCourse = {
          ...updatedValues,
          id: (this.state.courses.length + 1).toString(),
        };
        this.setState((prevState) => ({
          courses: [...prevState.courses, newCourse],
        }));
        message.success("Course added successfully.");
      }
      this.fetchCourses();
      this.setState({ isModalVisible: false, editingCourse: null });
    } catch (error) {
      message.error("Failed to save course.");
    }
  };

  handleSectionOk = async () => {
    try {
      const values = await this.sectionFormRef.current.validateFields();
      const updatedValues = {
        ...values,
        update_at: new Date().toISOString(),
      };
      if (this.state.editingSection) {
        await ApiService.updateSectionById(this.state.editingSection.id, updatedValues);
        message.success("Section updated successfully.");
      } else {
        const newSection = {
          ...updatedValues,
          id: (this.state.sections.length + 1).toString(),
        };
        this.setState((prevState) => ({
          sections: [...prevState.sections, newSection],
        }));
        message.success("Section added successfully.");
      }
      this.fetchSections();
      this.setState({ isSectionModalVisible: false, editingSection: null });
    } catch (error) {
      message.error("Failed to save section.");
    }
  };

  handleLectureOk = async () => {
    try {
      const values = await this.lectureFormRef.current.validateFields();
      const updatedValues = {
        ...values,
        update_at: new Date().toISOString(),
      };
      if (this.state.editingLecture) {
        await ApiService.updateLectureById(this.state.editingLecture.id, updatedValues);
        message.success("Lecture updated successfully.");
      } else {
        const newLecture = {
          ...updatedValues,
          id: (this.state.lectures.length + 1).toString(),
        };
        this.setState((prevState) => ({
          lectures: [...prevState.lectures, newLecture],
        }));
        message.success("Lecture added successfully.");
      }
      this.fetchLectures();
      this.setState({ isLectureModalVisible: false, editingLecture: null });
    } catch (error) {
      message.error("Failed to save lecture.");
    }
  };

  handleCancel = () => {
    this.setState({
      isModalVisible: false,
      editingCourse: null,
    });
  };

  handleSectionCancel = () => {
    this.setState({
      isSectionModalVisible: false,
      editingSection: null,
    });
  };

  handleLectureCancel = () => {
    this.setState({
      isLectureModalVisible: false,
      editingLecture: null,
    });
  };

  softDeleteCourse = async (id: string) => {
    try {
      await ApiService.softDeleteCourse(id);
      message.success("Course deleted successfully.");
      this.fetchCourses();
    } catch (error) {
      message.error("Failed to delete course.");
    }
  };

  softDeleteSection = async (id: string) => {
    try {
      await ApiService.softDeleteSection(id);
      message.success("Section deleted successfully.");
      this.fetchSections();
    } catch (error) {
      message.error("Failed to delete section.");
    }
  };

  softDeleteLecture = async (id: string) => {
    try {
      await ApiService.softDeleteLecture(id);
      message.success("Lecture deleted successfully.");
      this.fetchLectures();
    } catch (error) {
      message.error("Failed to delete lecture.");
    }
  };

  handleTabChange = (key: string) => {
    this.setState({ activeTab: key });
  };

  render() {
    const { activeTab, isModalVisible, editingCourse, courses, accounts, sections, lectures, isSectionModalVisible, editingSection, isLectureModalVisible, editingLecture } = this.state;

    return (
      <div className="bg-white p-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <FaBook className="h-6 w-6 text-gray-700" />
            <h1 className="text-2xl font-bold">Courses</h1>
          </div>
        </div>

        <NavigationTabs
          activeKey={activeTab}
          onTabChange={this.handleTabChange}
        />

        {activeTab === '1' && (
          <MyCourses
            courses={courses}
            accounts={accounts}
            showModal={this.showModal}
            softDeleteCourse={this.softDeleteCourse}
            handleOk={this.handleOk}
            handleCancel={this.handleCancel}
            formRef={this.courseFormRef}
            isModalVisible={isModalVisible}
            editingCourse={editingCourse}
          />
        )}

        {activeTab === '2' && (
          <MySections
            sections={sections}
            accounts={accounts}
            showModal={this.showSectionModal}
            softDeleteSection={this.softDeleteSection}
            handleOk={this.handleSectionOk}
            handleCancel={this.handleSectionCancel}
            formRef={this.sectionFormRef}
            isModalVisible={isSectionModalVisible}
            editingSection={editingSection}
          />
        )}

        {activeTab === '3' && (
          <MyLectures
            lectures={lectures}
            accounts={accounts}
            showModal={this.showLectureModal}
            softDeleteLecture={this.softDeleteLecture}
            handleOk={this.handleLectureOk}
            handleCancel={this.handleLectureCancel}
            formRef={this.lectureFormRef}
            isModalVisible={isLectureModalVisible}
            editingLecture={editingLecture}
          />
        )}
      </div>
    );
  }
}

export default ListCourse;
