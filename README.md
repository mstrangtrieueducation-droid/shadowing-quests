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
- `dubbingDriveId` (ưu tiên) hoặc `dubbingVideoId` (dự phòng): video đã tách giọng để lồng tiếng. Chỉ thêm ID Drive sau khi tệp đã tải xong, cấp quyền xem theo liên kết và kiểm tra phát được; `videoId` vẫn là bản nghe mẫu gốc.
- `transcriptUrl`, `transcriptInstructions`, `submissionScope`: nguồn lời thoại và phạm vi đọc trọn bài.
- `goals`, `phrases`, `pronunciation`, `extraPractice`: mục tiêu, cụm từ và hướng dẫn luyện.

Mỗi bài mới cần `id` và `slug` riêng. Không dùng lại slug của bài khác. Không tạo một repository hoặc một Form mới cho từng bài.

## Lớp và nộp bài

`config.json` chứa IELTS 45–53, FIGHTER 5–10 và địa chỉ Form cùng entry ID. Nút Nộp bài điền sẵn tên, lớp và mã bài. Học viên kiểm tra các giá trị, tải một video quay màn hình kèm micro lên rồi bấm Gửi trong Form.

Tất cả bài dùng luồng nghe mẫu → luyện theo giọng mẫu → bắt buộc lồng tiếng bằng video đã tách giọng → quay màn hình kèm giọng học sinh → nộp cho cô. Khi quay, dừng bản nghe mẫu, giữ tiếng nền của bản luyện, thu cả tiếng video và micro, quay thử 10 giây rồi kiểm tra. Không cần quay mặt. Bài chưa có `dubbingVideoId` hiển thị thông báo video lồng tiếng chưa sẵn sàng; phần nghe và luyện vẫn mở. Không hướng dẫn nộp bản đọc lời thoại thay cho lồng tiếng.

Hướng dẫn học sinh xưng “cô – em”, ngắn gọn và tập trung vào yêu cầu bài nộp. Không đưa giải thích về xử lý âm thanh, triển khai hay trạng thái YouTube vào bài học.

Level 2 phải gắn phụ đề tiếng Anh trực tiếp vào hình của video lồng tiếng. Ưu tiên phụ đề gốc do nguồn phát hành cung cấp và giữ đúng thời gian; không dùng phụ đề tự nhận dạng từ bản đã tách giọng. Chỉ thêm `dubbingDriveId` sau khi bản có phụ đề đã tải lên Drive, cấp quyền xem theo liên kết và kiểm tra phát được. Mỗi tệp có tên ngẫu nhiên, mỗi bài chỉ nhúng đúng tệp của bài đó; không chia sẻ thư mục chứa cả kho. Giữ nguyên slug, video nghe mẫu, Form và mã bài; không thêm danh sách khóa học hoặc liên kết sang bài khác.

Chỉ dọn file media cục bộ sau khi đúng bản cuối đã đăng và kiểm tra xong. Giữ thông tin nguồn, phụ đề, mã video và biên bản kiểm tra để tiếp tục công việc; không xóa bản còn chờ đăng.

## Phạm vi truy cập

Ẩn danh sách và dùng mã URL ngẫu nhiên giúp tránh truy cập bài kế bằng cách tăng số thứ tự. Đây là website tĩnh trên repository công khai, không phải cơ chế phân quyền: người có link vẫn mở được bài; người xem mã nguồn repository có thể tìm dữ liệu bài. Không lưu danh sách học viên, bài nộp hoặc mật khẩu trong repository.

## Chạy cục bộ

HTML/CSS/JavaScript tĩnh, không cần build. Phục vụ thư mục bằng HTTP, ví dụ `python -m http.server 4173`.

## Nguồn nội dung

Trang dẫn tới video và transcript của VOA Learning English, BBC Learning English và British Council. Một số transcript là bản biên tập của hội thoại; đối chiếu video trong lúc luyện. Không xuất lại toàn bộ transcript có bản quyền.
