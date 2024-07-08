import React, { Component } from "react";
import { BellOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, List, Typography } from "antd";
import logoavatar from "../assets/Avatar01.jpg";

const { Title, Text } = Typography;

class Notifications extends Component {
  render() {
    const notifications = [
      {
        avatar: logoavatar,
        title: "Rock William",
        description: "Like Your Comment On Video How to create sidebar menu.",
        time: "2 min ago"
      },
      {
        avatar: logoavatar,
        title: "Jassica Smith",
        description: "Added New Review In Video Full Stack PHP Developer.",
        time: "12 min ago"
      },
      {
        avatar: logoavatar,
        title: "Your Membership Activated",
        time: "20 min ago"
      },
      {
        avatar: logoavatar,
        title: "Your Course Approved Now. How to create sidebar menu.",
        time: "20 min ago"
      }
    ];

    return (
      <div className="bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <BellOutlined className="text-2xl text-gray-700" />
            <Title level={2}>Notifications</Title>
          </div>
        </div>

        <div className="p-4 rounded mb-6">
          <Button type="primary" className="bg-[#9997F5] hover:bg-[#8886E5]">
            Notification Setting
          </Button>
        </div>

        <Card>
          <List
            itemLayout="horizontal"
            dataSource={notifications}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<Text strong>{item.title}</Text>}
                  description={
                    <>
                      <Text>{item.description}</Text>
                      <br />
                      <Text type="secondary">{item.time}</Text>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    );
  }
}

export default Notifications;
