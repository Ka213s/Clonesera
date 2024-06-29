import React from 'react';

interface AccountSettingsProps {
  avatar: string | ArrayBuffer | null;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string | null;
  setName: React.Dispatch<React.SetStateAction<string | null>>;
  phone_number: string | null;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string | null>>;
  email: string | null;
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
  description: string | null;
  setDescription: React.Dispatch<React.SetStateAction<string | null>>;
  errors: {
    name: string;
    phone_number: string;
    email: string;
    description: string;
  };
  handleSaveChanges: () => void;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({
  avatar,
  handleAvatarChange,
  name,
  setName,
  phone_number,
  setPhoneNumber,
  email,
  setEmail,
  description,
  setDescription,
  errors,
  handleSaveChanges,
}) => {
  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          type="text"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phone_number ? 'border-red-500' : ''}`}
          value={phone_number || ''}
          onChange={(e) => setPhoneNumber(e.target.value)}
          maxLength={10}
        />
        {errors.phone_number && <p className="text-red-500 text-xs italic">{errors.phone_number}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
          value={email || ''}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.description ? 'border-red-500' : ''}`}
          value={description || ''}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
        {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={handleSaveChanges}
      >
        Save Changes
      </button>
    </div>
  );
};

export default AccountSettings;
