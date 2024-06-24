import React, { useState } from 'react';
import { Avatar, Badge, Button, Input, List, Typography } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Search } = Input;

interface Contact {
  name: string;
  online: boolean;
  lastMessage: string;
  unread: number;
  lastActive: string;
}

interface Message {
  text: string;
  timestamp: string;
  typing?: boolean; // Thuộc tính optional
}

const contacts: Contact[] = [
  { name: 'John Doe', online: true, lastMessage: 'Hi! Sir, How are you. I ask you one thing please expl...', unread: 2, lastActive: '7 hours ago' },
  { name: 'Kerstin Cable', online: false, lastMessage: 'Hello, I paid your video tutorial but did not play error...', unread: 3, lastActive: '8 hours ago' },
  { name: 'Jose Portilla', online: false, lastMessage: 'Thanks Sir, Such a nice video.', unread: 1, lastActive: '15 hours ago' },
  { name: 'Farhat Amin', online: false, lastMessage: 'Hi! Sir, this is a purchase key CFKX12536ERUJSKLL', unread: 7, lastActive: '22 hours ago' },
  { name: 'Kyle Pew', online: false, lastMessage: 'Pls! Upload .NET Course', unread: 12, lastActive: '2 days ago' },
];

const messages: Record<string, Message[]> = {
  'John Doe': [
    { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor.', timestamp: 'Sat, April 10, 1:08 PM' },
    { text: 'Cras ultricies ligula.', timestamp: '5 minutes ago' },
    { text: 'Lorem ipsum dolor sit amet', timestamp: '2 minutes ago' },
    { text: 'Typing...', timestamp: '', typing: true },
    // add more messages for John Doe as needed
  ],
  'Kerstin Cable': [
    // add messages for Kerstin Cable
  ],
  // add more message arrays for other contacts as needed
};

const ChatApp: React.FC = () => {
  const [activeContact, setActiveContact] = useState<string>(contacts[0].name);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Contact List */}
      <div style={{ width: '25%', backgroundColor: '#f0f2f5', padding: '16px', borderRight: '1px solid #d9d9d9' }}>
        <Title level={4}>Messages</Title>
        <Search placeholder="Search Messages..." style={{ marginBottom: '16px' }} />
        <List
          itemLayout="horizontal"
          dataSource={contacts}
          renderItem={contact => (
            <List.Item onClick={() => setActiveContact(contact.name)} style={{ backgroundColor: activeContact === contact.name ? '#e6f7ff' : '#fff', padding: '8px', borderRadius: '4px', marginBottom: '8px', cursor: 'pointer' }}>
              <List.Item.Meta
                avatar={<Avatar src={`https://i.pravatar.cc/40?img=${contacts.findIndex(c => c.name === contact.name) + 1}`} />}
                title={<Text strong>{contact.name}</Text>}
                description={<Text ellipsis>{contact.lastMessage}</Text>}
              />
              <div>
                {contact.unread > 0 && (
                  <Badge count={contact.unread} style={{ backgroundColor: '#f5222d' }} />
                )}
                <div style={{ fontSize: '12px', color: '#8c8c8c' }}>{contact.lastActive}</div>
              </div>
            </List.Item>
          )}
        />
      </div>

      {/* Chat Box */}
      <div style={{ width: '75%', display: 'flex', flexDirection: 'column', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <Avatar src={`https://i.pravatar.cc/40?img=${contacts.findIndex(contact => contact.name === activeContact) + 1}`} size="large" />
          <div style={{ marginLeft: '16px' }}>
            <Title level={4}>{activeContact}</Title>
            <Text type="secondary">{contacts.find(contact => contact.name === activeContact)?.online ? 'ONLINE' : 'OFFLINE'}</Text>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px' }}>
          {messages[activeContact]?.map((message, index) => (
            <div key={index} style={{ marginBottom: '16px' }}>
              <div style={{ backgroundColor: '#f5f5f5', padding: '8px', borderRadius: '4px' }}>{message.text}</div>
              <div style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '4px' }}>{message.timestamp}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex' }}>
          <Input placeholder="Write a message..." style={{ flexGrow: 1, marginRight: '8px' }} />
          <Button type="primary" icon={<SendOutlined />} />
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
