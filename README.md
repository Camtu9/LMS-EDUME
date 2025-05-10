# 🎓 LMS-EduMe

**LMS-EduMe** là một hệ thống quản lý học tập (LMS) trực tuyến, cho phép giáo viên tạo khóa học, theo dõi tiến trình học tập của học viên, và học viên có thể đăng ký, thanh toán và học các khóa học ngay trên nền tảng. Ứng dụng được xây dựng với các công nghệ hiện đại như ReactJS, Node.js và MongoDB.
## 🔧 Tính năng

- **Quản lý khóa học**:
- Giáo viên có thể tạo, chỉnh sửa khóa học.
- Theo dõi số lượng học viên đã đăng ký và tiến trình học tập của họ.
- **Tính năng dành cho học viên:**: 
- Đăng ký khóa học, xem tiến trình học.
- Truy cập nội dung bài học và đánh giá bài học.
- Thanh toán khóa học thông qua VNPay.
- **Xác thực người dùng bằng JWT**: Đăng ký, đăng nhập, bảo mật thông tin cá nhân.

## 🚀 Cài đặt và chạy dự án

### 1. Clone repository

```bash
git clone https://github.com/Camtu9/LMS-EDUME.git
cd LMS-EDUME
```

### 2. Cài đặt các gói phụ thuộc

```bash
npm install
```

### 3. Cấu hình MongoDB và môi trường

Tạo file .env và thêm các biến môi trường sau:

```env
MONGODB_URI=<YOUR_MONGODB_CONNECTION_URL>
JWT_SECRET=<your_jwt_secret>
VNPAY_TMN_CODE=<your_vnpay_code>
VNPAY_HASH_SECRET=<your_vnpay_hash_secret>
VNPAY_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
VNPAY_RETURN_URL=http://localhost:3000/payment-success
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
```
### 4. Khởi chạy ứng dụng

```bash
npm run dev
```
### 5. VNPay Test Payment Info

Ứng dụng sẽ chạy tại: [http://localhost:5173](http://localhost:5173)

## 🛠️ Công nghệ sử dụng
Dùng thông tin dưới đây để kiểm tra chức năng thanh toán VNPay (sandbox):
- **Ngân hàng**: NCB
- **Số thẻ**: 9704 1985 2619 1432 198
- **Tên chủ thẻ**: NGUYEN VAN A
- **Ngày phát hành**: 07/15
- **Mã OTP**: 123456

- **ReactJS** – Thư viện frontend linh hoạt và phổ biến.
- **MongoDB** – Cơ sở dữ liệu NoSQL lưu trữ thông tin khóa học, người dùng, đơn đăng ký.
- **Node.js & ExpressJS** – Backend API xử lý dữ liệu và xác thực.
- **Tailwind CSS** – Framework CSS tiện dụng, nhanh chóng cho việc thiết kế giao diện.
- **Cloudinary** - Dịch vụ lưu trữ & xử lý ảnh
- **JWT** - Xác thực người dùng bảo mật qua token
- **VNPay** – Tích hợp thanh toán trực tuyến.

