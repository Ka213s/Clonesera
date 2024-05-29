import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PencilIcon,
  LockClosedIcon,
  LockOpenIcon,
} from "@heroicons/react/solid";
import EditAccountModal from "../EditAccountModal";

interface Account {
  id: number;
  fullName: string;
  email: string;
  address: string;
  phonenumber: string;
  status: boolean;
  roleId: number;
}

const ManageAccount: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = () => {
    axios
      .get<Account[]>("https://66557e453c1d3b602939b8f1.mockapi.io/Account")
      .then((response) => {
        setAccounts(response.data.filter((account) => account.roleId === 2));
      })
      .catch((error) => {
        console.error("There was an error fetching the accounts!", error);
      });
  };

  const handleBlock = (id: number, currentStatus: boolean) => {
    axios
      .put(`https://66557e453c1d3b602939b8f1.mockapi.io/Account/${id}`, {
        status: !currentStatus,
      })
      .then(() => {
        setAccounts(
          accounts.map((account) =>
            account.id === id ? { ...account, status: !currentStatus } : account
          )
        );
      })
      .catch((error) => {
        console.error("There was an error updating the account status!", error);
      });
  };

  const handleEdit = (account: Account) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  const handleCloseModal = (updatedAccount: Account | null) => {
    if (updatedAccount) {
      setAccounts(
        accounts.map((account) =>
          account.id === updatedAccount.id ? updatedAccount : account
        )
      );
    }
    setIsModalOpen(false);
    setSelectedAccount(null);
  };

  return (
    <main className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Manage Accounts</h1>
        <div className="bg-white p-4 rounded-lg shadow">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">No</th>
                <th className="py-2 px-4 border-b">Full Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Address</th>
                <th className="py-2 px-4 border-b">Phone Number</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account, index) => (
                <tr key={account.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{account.fullName}</td>
                  <td className="py-2 px-4 border-b">{account.email}</td>
                  <td className="py-2 px-4 border-b">{account.address}</td>
                  <td className="py-2 px-4 border-b">{account.phonenumber}</td>
                  <td className="py-2 px-4 border-b">
                    {account.status ? (
                      <span className="text-green-500">Active</span>
                    ) : (
                      <span className="text-red-500">Blocked</span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b flex space-x-2">
                    <button
                      onClick={() => handleBlock(account.id, account.status)}
                      className="text-red-500 hover:text-red-700"
                    >
                      {account.status ? (
                        <LockClosedIcon className="h-5 w-5" />
                      ) : (
                        <LockOpenIcon className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleEdit(account)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <EditAccountModal
          account={selectedAccount}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
};

export default ManageAccount;
