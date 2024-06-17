import React, { useState } from 'react';

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
  
      <div className="flex h-screen">
        {/* Contact List */}
        <div className="w-1/4 bg-gray-100 p-4 border-r border-gray-300">
          <div className="text-xl font-bold mb-4">Messages</div>
          <input
            type="text"
            placeholder="Search Messages..."
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          {contacts.map((contact, index) => (
            <div
              key={index}
              className={`p-2 mb-2 rounded-lg cursor-pointer ${activeContact === contact.name ? 'bg-violet-300' : 'bg-purple-200'}`}
              onClick={() => setActiveContact(contact.name)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img src={`https://i.pravatar.cc/40?img=${index + 1}`} alt={contact.name} className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <div className="font-semibold">{contact.name}</div>
                    <div className="text-sm text-gray-600">{contact.lastMessage}</div>
                  </div>
                </div>
                {contact.unread > 0 && (
                  <div className="text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">{contact.unread}</div>
                )}
              </div>
              <div className="text-xs text-gray-500">{contact.lastActive}</div>
            </div>
          ))}
        </div>

        {/* Chat Box */}
        <div className="w-3/4 flex flex-col p-4">
          <div className="flex items-center mb-4">
            <img src={`https://i.pravatar.cc/40?img=${contacts.findIndex(contact => contact.name === activeContact) + 1}`} alt={activeContact} className="w-10 h-10 rounded-full mr-3" />
            <div>
              <div className="font-semibold">{activeContact}</div>
              <div className="text-xs text-green-500">{contacts.find(contact => contact.name === activeContact)?.online ? 'ONLINE' : 'OFFLINE'}</div>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto mb-4">
            {messages[activeContact]?.map((message, index) => (
              <div key={index} className="mb-4">
                <div className="bg-violet-300 p-3 rounded-lg">{message.text}</div>
                <div className="text-xs text-gray-500 mt-1">{message.timestamp}</div>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Write a message..."
              className="flex-grow p-2 border border-gray-300 rounded-l-lg"
            />
            <button className="bg-[#9997F5] hover:bg-[#8886E5] text-white p-2 rounded-r-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
   
  );
};

export default ChatApp;
