// src/components/PaymentPage.tsx
import React, { useState } from 'react';

const PaymentPage: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Mở khóa toàn bộ khóa học</h1>
      <div className="flex flex-col md:flex-row items-start w-full max-w-4xl">
        <div className="md:w-1/2 md:pr-8">
          <p className="mb-4">
            Sở hữu khóa học <span className="text-primary">HTML CSS</span> đầy đủ và chi tiết nhất bạn có thể tìm thấy trên Internet. 
            Có tới <span className="text-primary">hàng trăm bài tập</span> thực hành sau mỗi bài học và bạn sẽ được làm 8 dự án thực tế 
            trong khóa học này. Với <span className="text-primary">1000+ bài học</span> (bao gồm video, bài tập, thử thách, flashcards, v.v) 
            sẽ giúp bạn nắm kiến thức nền tảng vô cùng chắc chắn.
          </p>
          <div className="flex justify-start items-center mb-4">
            <span className="line-through text-gray-500 mr-2">2.500.000đ</span>
            <span className="text-3xl text-green-500">1.299.000đ</span>
          </div>
          <div className="text-3xl text-green-500 mb-4">Tổng tiền: 1.299.000đ</div>
          <button 
            className="bg-gradient-to-r from-purple-400 to-primary text-white px-8 py-3 rounded-lg"
            onClick={handleButtonClick}
          >
            LẤY THÔNG TIN THANH TOÁN
          </button>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 p-4 border-2 border-primary rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Bạn sẽ nhận được gì?</h2>
          <ul className="text-left list-disc list-inside space-y-2">
            <li>Truy cập toàn bộ khóa HTML CSS Pro</li>
            <li>Hơn 628 bài học</li>
            <li>Hơn 515 bài tập và thử thách</li>
            <li>Thực hành 8 dự án thực tế</li>
            <li>Hơn 224 flashcards</li>
            <li>Kênh hỏi đáp riêng tư</li>
            <li>Đáp án cho mọi thử thách</li>
            <li>Nhận chứng chỉ khi hoàn thành</li>
            <li>Cập nhật khóa học trong tương lai</li>
            <li>Mua một lần, học mãi mãi</li>
          </ul>
        </div>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white text-black p-8 rounded-lg shadow-lg max-w-lg w-full">
            <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-900" onClick={handleClosePopup}>
              &times;
            </button>
            <div className="mb-4 text-center">
              <h2 className="text-xl font-bold mb-2">Chờ thanh toán</h2>
              <p className="text-2xl font-semibold">04:59</p>
            </div>
            <div className="mb-4">
              <p>Tên khóa học: <span className="font-bold">HTML CSS Pro</span></p>
              <p>Mã đơn hàng: <span className="font-bold">F8C1XRWP</span></p>
            </div>
            <div className="mb-4">
              <input 
                type="text" 
                placeholder="Nhập mã khuyến mãi" 
                className="border border-gray-300 rounded-lg p-2 w-full" 
              />
              <button className="bg-primary text-white p-2 rounded-lg mt-2 w-full">ÁP DỤNG</button>
            </div>
            <div className="mb-4">
              <p>Chi tiết thanh toán:</p>
              <div className="flex justify-between">
                <span className="line-through text-gray-500">2.500.000đ</span>
                <span className="text-green-500 text-xl font-bold">1.299.000đ</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-semibold">Tổng tiền:</span>
                <span className="text-green-500 text-xl font-bold">1.299.000đ</span>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-bold mb-2">Chuyển khoản bằng QR</h3>
              <div className="flex items-center justify-center mb-4">
                <img src="/path/to/qr-code.png" alt="QR Code" className="w-32 h-32" />
              </div>
              <p>Bước 1: Mở app ngân hàng và quét mã QR.</p>
              <p>Bước 2: Đảm bảo nội dung chuyển khoản là <span className="font-bold">F8C1XRWP</span>.</p>
              <p>Bước 3: Thực hiện thanh toán.</p>
            </div>
            <div className="mb-4">
              <h3 className="font-bold mb-2">Chuyển khoản thủ công</h3>
              <div className="mb-2">
                <p>Số tài khoản: <span className="font-bold">9353538222</span></p>
                <p>Tên tài khoản: <span className="font-bold">ĐẶNG NGỌC SƠN</span></p>
                <p>Chi nhánh: <span className="font-bold">Vietcombank Hà Nội</span></p>
                <p>Nội dung: <span className="font-bold">F8C1XRWP</span></p>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-2">Lưu ý</h3>
              <p>Tối đa 5 phút sau thời gian chuyển khoản, nếu hệ thống không phản hồi vui lòng liên hệ ngay bộ phận hỗ trợ của F8.</p>
              <p>📞 0246.329.1102</p>
              <p>✉️ contact@fullstack.edu.vn</p>
              <p>📍 Số 11D, lô A10, khu đô thị Nam Trung Yên, Phường Yên Hòa, Quận Cầu Giấy, TP. Hà Nội</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
