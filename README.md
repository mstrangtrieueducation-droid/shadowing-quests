# Chuốt · Bài tập Fighter & IELTS

Một repository, một GitHub Pages site, nhiều bài có mã và level riêng. Toàn bộ bài nộp dùng chung một Google Form.

## Thay hoặc thêm bài

Mở `lessons.json` trên GitHub → biểu tượng bút chì → sửa nội dung → Commit changes. GitHub Pages sẽ tự cập nhật.

- `id`: mã duy nhất, ví dụ `Shadow-L1-001`.
- `level`: 1 hoặc 2; đây là độ khó của bài, độc lập với khóa Fighter/IELTS.
- `courses`: các khóa được xem bài; bộ mẫu dùng cả `Fighter` và `IELTS`.
- `title`, `topic`, `description`: nội dung hiển thị.
- `videoId`: phần sau `v=` của link YouTube.
- `durationSeconds`: thời lượng video; bộ shadowing hiện giới hạn tối đa 360 giây.
- `transcriptUrl`, `transcriptInstructions`, `submissionScope`: link và phạm vi lời thoại cần đọc đầy đủ.
- `goals`, `phrases`, `pronunciation`, `extraPractice`: hướng dẫn theo bài.

Giữ nguyên `id` khi muốn thay nội dung nhưng tiếp tục dùng link cũ. Dùng mã mới nếu là bài mới. Không tạo repository hoặc Google Form mới cho từng bài.

Trang chung: https://mstrangtrieueducation-droid.github.io/shadowing-quests/

Link bài có dạng `https://mstrangtrieueducation-droid.github.io/shadowing-quests/#/bai/Shadow-L1-001`. Học viên chưa khai báo tên và lớp sẽ được đưa về cổng vào, rồi trở lại đúng bài sau khi nhập đủ.

## 10 quest mẫu

| Level 1 | Level 2 |
|---|---|
| [Shadow-L1-001](https://mstrangtrieueducation-droid.github.io/shadowing-quests/#/bai/Shadow-L1-001) | [Shadow-L2-001](https://mstrangtrieueducation-droid.github.io/shadowing-quests/#/bai/Shadow-L2-001) |
| [Shadow-L1-002](https://mstrangtrieueducation-droid.github.io/shadowing-quests/#/bai/Shadow-L1-002) | [Shadow-L2-002](https://mstrangtrieueducation-droid.github.io/shadowing-quests/#/bai/Shadow-L2-002) |
| [Shadow-L1-003](https://mstrangtrieueducation-droid.github.io/shadowing-quests/#/bai/Shadow-L1-003) | [Shadow-L2-003](https://mstrangtrieueducation-droid.github.io/shadowing-quests/#/bai/Shadow-L2-003) |
| [Shadow-L1-004](https://mstrangtrieueducation-droid.github.io/shadowing-quests/#/bai/Shadow-L1-004) | [Shadow-L2-004](https://mstrangtrieueducation-droid.github.io/shadowing-quests/#/bai/Shadow-L2-004) |
| [Shadow-L1-005](https://mstrangtrieueducation-droid.github.io/shadowing-quests/#/bai/Shadow-L1-005) | [Shadow-L2-005](https://mstrangtrieueducation-droid.github.io/shadowing-quests/#/bai/Shadow-L2-005) |

## Lớp và Form

`config.json` chứa danh sách lớp hợp lệ cùng địa chỉ Form và các entry ID thực tế. Các lớp hiện tại: IELTS 45–53, Fighter 5–7. Form nhận họ tên, mã lớp, mã bài và một video.

Mã bài, tên và lớp được điền sẵn khi bấm Nộp bài. Google Forms vẫn cho sửa những giá trị điền sẵn; học viên cần kiểm tra trước khi gửi. Trang chỉ mở Form, không tự khẳng định học viên đã nộp thành công.

## Cơ chế vào lớp

Họ tên và lớp được lưu trong `sessionStorage` trên thiết bị cho phiên hiện tại. Đây là bước khai báo tên/lớp để định tuyến bài và điền Form, không phải đăng nhập xác minh danh tính hay kiểm tra danh sách học viên. Nguồn bài và mã lớp là dữ liệu công khai của một website tĩnh. Không đưa mật khẩu, danh sách học viên hay dữ liệu bài nộp vào repository.

## Chạy cục bộ

Đây là HTML/CSS/JavaScript tĩnh, không cần cài thư viện hoặc build. Phục vụ thư mục bằng HTTP, ví dụ `python -m http.server 4173`.

## Nội dung

Video thuộc VOA Learning English, BBC Learning English và British Council. Trang dẫn tới transcript chính thức, không xuất lại toàn bộ transcript có bản quyền. Một số transcript BBC không khớp từng từ tuyệt đối với audio; dùng video để luyện nhịp và toàn bộ lời thoại trong transcript làm phạm vi đọc nộp.
