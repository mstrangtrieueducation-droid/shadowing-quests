const escape = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const hasDubbing = lesson => /^[-\w]{11}$/.test(lesson.dubbingVideoId || '');

export function dubbingEntrySteps() {
  return [
    ['Nghe và hiểu', 'Em xem hết video mẫu và đọc lời thoại để hiểu nội dung.'],
    ['Luyện theo giọng mẫu', 'Em luyện từng câu, bắt chước phát âm, nhịp điệu và cảm xúc, rồi luyện trọn bài.'],
    ['Lồng tiếng và quay màn hình', 'Em bắt buộc dùng video đã tách giọng ở bước 02 để lồng tiếng và quay màn hình kèm giọng của em.'],
    ['Xem lại và nộp cho cô', 'Em kiểm tra hình và tiếng, rồi bấm Nộp bài để gửi một video hoàn chỉnh cho cô.'],
  ].map(([title, body], index) => `<li><span class="step-number">0${index + 1}</span><div class="step-copy"><strong>${title}</strong><p>${body}</p></div></li>`).join('');
}

export function renderDubbingStage(target, lesson, {externalLink, submissionUrl}) {
  if (!hasDubbing(lesson)) {
    target.innerHTML = `<section class="content-card"><h2 id="record-title" tabindex="-1">Lồng tiếng và quay màn hình</h2><p class="record-rule"><strong>Cô yêu cầu em lồng tiếng bằng video đã tách giọng của bài và quay màn hình kèm giọng em.</strong></p><p>Video lồng tiếng của bài này chưa sẵn sàng. Em luyện phần Nghe & luyện trước.</p></section>`;
    return;
  }
  target.innerHTML = `<section class="content-card">
    <p class="eyebrow">BẢN LUYỆN LỒNG TIẾNG</p>
    <h2 id="record-title" tabindex="-1">Lồng tiếng và quay màn hình</h2>
    <p class="record-rule"><strong>Cô yêu cầu em dùng đúng video đã tách giọng bên dưới để lồng tiếng và quay màn hình kèm giọng của em.</strong></p>
    <p>Em lồng đủ lời theo nhịp video, giữ phát âm, ngữ điệu và cảm xúc đã luyện. Bài nộp phải có hình video này và nghe rõ giọng em.</p>
  </section>
  <div class="video-shell"><iframe src="https://www.youtube-nocookie.com/embed/${lesson.dubbingVideoId}?rel=0" title="${escape(lesson.title)} — bản luyện đã tách giọng mẫu" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
  <div class="source-links">${externalLink(`https://www.youtube.com/watch?v=${lesson.dubbingVideoId}`, 'Mở bản luyện trên YouTube')}${externalLink(lesson.transcriptUrl, 'Mở bản lời thoại')}</div>
  <section class="content-card">
    <h3>Cách làm bài</h3>
    <ol class="instruction-list">
      <li>Em chuẩn bị lời thoại bên cạnh và dừng video nghe mẫu.</li>
      <li>Em bật quay màn hình, thu cả <strong>tiếng video và micro</strong>. Em không cần quay mặt.</li>
      <li>Em <strong>quay thử 10 giây</strong>, nói một câu rồi xem lại để chắc chắn nghe rõ giọng em.</li>
      <li>Em phát video bên dưới từ đầu, lồng đủ lời đúng lượt nói và quay đến hết phần cô giao.</li>
    </ol>
    <p class="inline-notice"><strong>Phần cần lồng tiếng:</strong> ${escape(lesson.submissionScope)}</p>
    <h3>Em kiểm tra trước khi nộp</h3>
    <div class="checklist">
      <label><input type="checkbox"> Em đã dùng đúng video đã tách giọng của bài này và quay màn hình.</label>
      <label><input type="checkbox"> Em đã lồng đủ lời, đúng nhịp, phát âm và cảm xúc của giọng mẫu.</label>
      <label><input type="checkbox"> Video rõ hình, nghe rõ giọng em và giữ tiếng nền nếu có.</label>
    </div>
    ${externalLink(submissionUrl, 'Nộp bài', 'button button-primary')}
    <p class="entry-note">Em gửi một video hoàn chỉnh cho cô, tối đa 1 GB. Em kiểm tra họ tên, lớp và mã bài trước khi bấm Gửi.</p>
  </section>`;
}
