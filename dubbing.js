const escape = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const hasDubbing = lesson => /^[-\w]{11}$/.test(lesson.dubbingVideoId || '');

export function dubbingEntrySteps() {
  return [
    ['Nghe và hiểu', 'Xem video có giọng mẫu, mở bản lời thoại và hiểu toàn bộ nội dung.'],
    ['Shadow theo giọng mẫu', 'Nghe từng câu rồi nói đuổi sát. Bắt chước phát âm, trọng âm, nhịp và cảm xúc; luyện trọn bài.'],
    ['Lồng tiếng và ghi hình', 'Chuyển sang bản video đã tách giọng. Quay màn hình với âm thanh thiết bị và micro, lồng đủ lời theo hình video.'],
    ['Xem lại và nộp', 'Kiểm tra có hình, nghe rõ giọng mình và âm thanh nền nếu có; gửi một video bằng nút Nộp bài.'],
  ].map(([title, body], index) => `<li><span class="step-number">0${index + 1}</span><div class="step-copy"><strong>${title}</strong><p>${body}</p></div></li>`).join('');
}

export function renderDubbingStage(target, lesson, {externalLink, submissionUrl}) {
  target.innerHTML = `<section class="content-card">
    <p class="eyebrow">BẢN LUYỆN LỒNG TIẾNG</p>
    <h2 id="record-title" tabindex="-1">Lồng tiếng theo video và ghi hình</h2>
    <p class="record-rule">Video bên dưới đã được xử lý tách giọng mẫu, giữ hình và phần âm thanh nền còn lại. <strong>Bản nộp gồm hình video, âm thanh nền nếu có và giọng bạn lồng vào.</strong></p>
    <p>Dừng bản nghe mẫu ở các tab khác. Giữ tiếng của <strong>bản luyện bên dưới</strong> khi quay; những đoạn vốn không có nhạc hoặc hiệu ứng có thể rất yên tĩnh.</p>
  </section>
  <div class="video-shell"><iframe src="https://www.youtube-nocookie.com/embed/${lesson.dubbingVideoId}?rel=0" title="${escape(lesson.title)} — bản luyện đã tách giọng mẫu" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
  <div class="source-links">${externalLink(`https://www.youtube.com/watch?v=${lesson.dubbingVideoId}`, 'Mở bản luyện trên YouTube')}${externalLink(lesson.transcriptUrl, 'Mở bản lời thoại')}</div>
  <section class="content-card">
    <h3>Chuẩn bị trước khi quay</h3>
    <ol class="instruction-list">
      <li>Chuẩn bị lời thoại cạnh video, trên giấy hoặc trên thiết bị thứ hai. Khi quay, giữ hình video rõ và nói theo đúng thời điểm của từng lượt lời.</li>
      <li>Đeo tai nghe để nghe âm thanh nền, tránh loa ngoài lọt lại vào micro và gây vang. Chọn đúng micro đang dùng.</li>
      <li>Trong công cụ quay màn hình, bật <strong>âm thanh thiết bị/nội bộ và micro</strong> (có thể có tên “Device audio and microphone”). Không cần mở camera.</li>
      <li><strong>Quay thử 10 giây:</strong> phát bản luyện, nói một câu rồi xem lại. Phải nghe rõ giọng bạn; nếu đoạn đó có nhạc hoặc hiệu ứng, kiểm tra chúng cũng được thu. Nếu thiếu tiếng, sửa lựa chọn âm thanh trước khi quay cả bài.</li>
    </ol>
    <p class="inline-notice">Nếu thiết bị không hỗ trợ thu đồng thời hai nguồn âm, dùng thiết bị hoặc công cụ quay khác có lựa chọn này. Không nộp bản chỉ có nhạc nền mà thiếu giọng nói.</p>
    <h3>Quay trọn bài</h3>
    <p class="inline-notice"><strong>Phần cần lồng tiếng:</strong> ${escape(lesson.submissionScope)}</p>
    <ol class="instruction-list">
      <li>Đưa bản luyện về đầu video và tạm dừng. Bật quay màn hình, rồi phát video và bắt đầu lồng tiếng.</li>
      <li>Nói đúng, đủ lời theo nhịp video; bắt chước trọng âm, nối âm, chỗ ngắt, tốc độ, ngữ điệu và cảm xúc đã luyện. Đổi cách thể hiện theo từng nhân vật.</li>
      <li>Không đọc thêm nhãn tên người nói, mốc thời gian hoặc chữ chỉ dẫn ngoài lời thoại. Nếu lỡ nhịp nhiều, luyện lại đoạn đó rồi quay lại cả bài.</li>
      <li>Quay đến hết phần được giao. Xem lại từ đầu đến cuối và nộp một video hoàn chỉnh.</li>
    </ol>
    <h3>Trước khi gửi</h3>
    <div class="checklist">
      <label><input type="checkbox"> Tôi đã lồng đủ lời, đúng lượt nói và giữ nhịp theo hình video.</label>
      <label><input type="checkbox"> Tôi đã bắt chước phát âm, âm cuối, trọng âm, nối âm, ngữ điệu và cảm xúc.</label>
      <label><input type="checkbox"> Hình video rõ và nghe rõ giọng tôi cùng âm thanh nền nếu có.</label>
      <label><input type="checkbox"> Tôi đã dùng bản luyện đã tách giọng; bản nghe mẫu ở các tab khác đã dừng.</label>
    </div>
    ${externalLink(submissionUrl, 'Nộp bài', 'button button-primary')}
    <p class="entry-note">Mỗi lần nộp một video, tối đa 1 GB. Kiểm tra họ tên, lớp và mã bài; tải video lên, bấm Gửi và chờ xác nhận.</p>
  </section>`;
}
