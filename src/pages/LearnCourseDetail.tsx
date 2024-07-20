import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { message, Layout, Menu, Spin } from "antd";
import { getCourseDetail, getLessonById } from "../utils/commonImports";
import "tailwindcss/tailwind.css";

const { Sider, Content } = Layout;

interface Lesson {
    _id: string;
    name: string;
    lesson_type: string;
    full_time: number;
    position_order: number;
    video_url?: string;
    image_url?: string;
    description?: string;
}

interface Session {
    _id: string;
    name: string;
    position_order: number;
    full_time: number;
    lesson_list: Lesson[];
}

interface Course {
    _id: string;
    name: string;
    session_list: Session[];
}

const LearnCourseDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [course, setCourse] = useState<Course | null>(null);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

    useEffect(() => {
        const fetchCourseDetail = async () => {
            if (!id) {
                message.error("Course ID is missing");
                return;
            }

            try {
                const data = await getCourseDetail(id);
                setCourse(data);
                setSelectedLesson(data.session_list[0]?.lesson_list[0] || null);
            } catch (error) {
                message.error("Error fetching course details");
                console.error("Error fetching course details:", error);
            }
        };

        fetchCourseDetail();
    }, [id]);

    const fetchLessonDetail = async (lessonId: string) => {
        try {
            const lesson = await getLessonById(lessonId);
            setSelectedLesson(lesson);
        } catch (error) {
            message.error("Error fetching lesson details");
            console.error("Error fetching lesson details:", error);
        }
    };

    const handleLessonClick = (lesson: Lesson) => {
        fetchLessonDetail(lesson._id);
    };

    if (!course) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <Layout className="min-h-screen">
            <Sider width={300} className="bg-white p-4">
                <Menu
                    mode="inline"
                    defaultOpenKeys={[course.session_list[0]?._id]}
                    style={{ height: "100%" }}
                >
                    {course.session_list.map((session) => (
                        <Menu.SubMenu key={session._id} title={session.name}>
                            {session.lesson_list.map((lesson) => (
                                <Menu.Item
                                    key={lesson._id}
                                    onClick={() => handleLessonClick(lesson)}
                                >
                                    {lesson.name}
                                </Menu.Item>
                            ))}
                        </Menu.SubMenu>
                    ))}
                </Menu>
            </Sider>
            <Layout>
                <Content className="p-6">
                    {selectedLesson ? (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">{selectedLesson.name}</h2>
                            {selectedLesson.lesson_type === "video" && selectedLesson.video_url && (
                                <div>
                                    <iframe
                                        width="100%"
                                        height="400px"
                                        src={selectedLesson.video_url}
                                        title={selectedLesson.name}
                                        frameBorder="0"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}
                            {selectedLesson.lesson_type === "image" && selectedLesson.image_url && (
                                <div>
                                    <img
                                        src={selectedLesson.image_url}
                                        alt={selectedLesson.name}
                                        className="max-w-full h-auto"
                                    />
                                </div>
                            )}
                            {selectedLesson.description && (
                                <div className="mt-4">
                                    <p className="text-lg">{selectedLesson.description}</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>No lesson selected</div>
                    )}
                </Content>
            </Layout>
        </Layout>
    );
};

export default LearnCourseDetail;
