# Bài tập Shadowing · Ms. Trang Trieu Education

Một website dùng chung, mỗi bài có đường dẫn riêng và nộp qua cùng một Google Form.

## Giao bài

Giáo viên lấy link của bài cần giao trong bảng Guidelines. Trang chủ không hiển thị danh sách bài; trong bài không có nút chuyển sang bài tiếp theo.

Đường dẫn có dạng `#/bai/<mã-ngẫu-nhiên>`. Link theo mã tuần tự như `#/bai/Shadow-L1-001` không còn mở bài. Mã bài `Shadow-L1-001` vẫn hiển thị trong quest và được điền vào Form để giao, đối chiếu và chấm bài.

Mỗi lần mở một bài, học viên nhập hoặc xác nhận họ tên, lớp trước khi video được tải. Tên/lớp đã lưu chỉ dùng điền sẵn, không tự mở các bài khác.

## Thay hoặc thêm bài

Sửa đúng tệp `lesson-data/<slug>.json` rồi commit để GitHub Pages cập nhật. Mỗi tệp chỉ chứa một bài; `lessons.json` luôn là mảng rỗng, không dùng làm danh mục công khai.

- `id`: mã bài hiển thị và gửi vào Form.
- `slug`: mã ngẫu nhiên 24 ký tự của đường dẫn; giữ nguyên khi thay nội dung để link đã giao vẫn dùng được.
- `level`: độ khó của bài.
- `title`, `topic`, `description`: nội dung giới thiệu bài.
- `videoId`, `durationSeconds`: video YouTube và thời lượng thật.
- `dubbingVideoId` (tùy chọn): video đã tách giọng để lồng tiếng. Chỉ thêm khi bản xử lý đã được đăng và kiểm tra; `videoId` vẫn là bản nghe mẫu gốc.
- `transcriptUrl`, `transcriptInstructions`, `submissionScope`: nguồn lời thoại và phạm vi đọc trọn bài.
- `goals`, `phrases`, `pronunciation`, `extraPractice`: mục tiêu, cụm từ và hướng dẫn luyện.

Mỗi bài mới cần `id` và `slug` riêng. Không dùng lại slug của bài khác. Không tạo một repository hoặc một Form mới cho từng bài.

## Lớp và nộp bài

`config.json` chứa IELTS 45–53, FIGHTER 5–10 và địa chỉ Form cùng entry ID. Nút Nộp bài điền sẵn tên, lớp và mã bài. Học viên kiểm tra các giá trị, tải một video quay màn hình kèm micro lên rồi bấm Gửi trong Form.

Các bài có `dubbingVideoId` dùng luồng nghe mẫu → shadow → lồng tiếng theo bản xử lý → quay và nộp. Khi quay, dừng bản nghe mẫu, giữ hình và tiếng nền của bản luyện, bật cả âm thanh thiết bị và micro, quay thử 10 giây rồi kiểm tra trước khi quay trọn bài. Không cần camera. Bài chưa có bản xử lý tiếp tục dùng hướng dẫn ghi hình với lời thoại hiện có.

Đợt thử nghiệm ngày 09/09/2026 chỉ áp dụng cho 5 bài đầu Level 1 và 5 bài đầu Level 2. Giữ nguyên slug, video mẫu, Form và mã bài. Không thêm danh sách khóa học hoặc liên kết sang bài khác.

## Phạm vi truy cập

Ẩn danh sách và dùng mã URL ngẫu nhiên giúp tránh truy cập bài kế bằng cách tăng số thứ tự. Đây là website tĩnh trên repository công khai, không phải cơ chế phân quyền: người có link vẫn mở được bài; người xem mã nguồn repository có thể tìm dữ liệu bài. Không lưu danh sách học viên, bài nộp hoặc mật khẩu trong repository.

## Chạy cục bộ

HTML/CSS/JavaScript tĩnh, không cần build. Phục vụ thư mục bằng HTTP, ví dụ `python -m http.server 4173`.

## Nguồn nội dung

Trang dẫn tới video và transcript của VOA Learning English, BBC Learning English và British Council. Một số transcript là bản biên tập của hội thoại; đối chiếu video trong lúc luyện. Không xuất lại toàn bộ transcript có bản quyền.
