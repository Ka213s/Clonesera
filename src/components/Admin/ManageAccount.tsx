import React, { useEffect, useState } from "react";
import { FaLock, FaLockOpen , FaPen } from 'react-icons/fa';
import EditAccountModal from "../../components/Admin/EditAccountModal";
import ApiService from "../../services/ApiService";

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

  const fetchAccounts = async () => {
    const data = await ApiService.getAccountsByRole(2);
    if (data) {
      setAccounts(data);
    } else {
      console.error("There was an error fetching the accounts!");
    }
  };

  const handleBlock = async (id: number, currentStatus: boolean) => {
    const updatedAccount = await ApiService.updateAccountStatus(
      id,
      currentStatus
    );
    if (updatedAccount) {
      setAccounts(
        accounts.map((account) =>
          account.id === id
            ? { ...account, status: updatedAccount.status }
            : account
        )
      );
    } else {
      console.error("There was an error updating the account status!");
    }
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
    <main>
      <div>
        <h1>Manage Accounts</h1>
        <div>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account, index) => (
                <tr key={account.id}>
                  <td>{index + 1}</td>
                  <td>{account.fullName}</td>
                  <td>{account.email}</td>
                  <td>{account.address}</td>
                  <td>{account.phonenumber}</td>
                  <td>
                    {account.status ? (
                      <span>Active</span>
                    ) : (
                      <span>Blocked</span>
                    )}
                  </td>
                  <td>
                    <td className="py-2 px-4 border-b flex space-x-2">
                      <button
                        onClick={() => handleBlock(account.id, account.status)}
                        className="text-red-500 hover:text-red-700"
                      >
                        {account.status ? (
                          <FaLock className="h-5 w-5" />
                        ) : (
                          <FaLockOpen className="h-5 w-5" />
                        )}
                      </button>
                      <button
                        onClick={() => handleEdit(account)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaPen className="h-5 w-5" />
                      </button>
                    </td>
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
