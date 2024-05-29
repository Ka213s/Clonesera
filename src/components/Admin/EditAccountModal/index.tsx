import React, { useState } from "react";
import axios from "axios";

const EditAccountModal = ({ account, onClose }: any) => {
  const [formData, setFormData] = useState({
    address: account.address,
    avatar: account.avatar,
    fullName: account.fullName,
    phonenumber: account.phonenumber,
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .put(
        `https://66557e453c1d3b602939b8f1.mockapi.io/Account/${account.id}`,
        formData
      )
      .then((response) => {
        onClose(response.data);
      })
      .catch((error) => {
        console.error("There was an error updating the account!", error);
      });
  };

  return (
    <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[30rem] p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Edit Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Avatar</label>
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="text"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => onClose(null)}
              className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAccountModal;
