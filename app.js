const main = document.querySelector('#main');
const header = document.querySelector('#header-actions');
const SESSION_KEY = 'chuot.practice.student.v1';
document.querySelector('.skip-link')?.addEventListener('click',event=>{event.preventDefault();main.focus();main.scrollIntoView();});
let config, lessons, student, activeLevel = 'all', searchQuery = '', activeStep = 'listen', previousLesson = '';
const escape = (v='') => String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const duration = seconds => `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;
const normalize = text => text.toLocaleLowerCase('vi').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d');
const route = () => { try { return decodeURIComponent(location.hash.replace(/^#/,'')) || '/'; } catch { return '/'; } };
const externalLink = (url,label,classes='text-link') => `<a class="${classes}" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(label)} <span aria-hidden="true">↗</span></a>`;
const validStudent = s => s && typeof s.name==='string' && s.name.trim().length>=2 && config.classes.some(c=>c.code===s.classCode);
const currentClass = () => config.classes.find(c=>c.code===student?.classCode);
const courseLessons = () => lessons.filter(l=>l.courses.includes(currentClass()?.course));

function formUrl(lesson){
  const url = new URL(config.form.url);
  url.searchParams.set('usp','pp_url');
  url.searchParams.set(config.form.entries.name,student.name);
  url.searchParams.set(config.form.entries.classCode,student.classCode);
  url.searchParams.set(config.form.entries.lessonCode,lesson.id);
  return url.href;
}

function renderHeader(){
  header.innerHTML = student ? `<span class="student-chip"><strong>${escape(student.name)}</strong><span>${escape(student.classCode)}</span></span><button class="button button-ghost" id="change-student">Đổi lớp / tên</button>` : '';
  document.querySelector('#change-student')?.addEventListener('click',()=>{
    student=null;
    try{sessionStorage.removeItem(SESSION_KEY);}catch{}
    render();
    document.querySelector('#student-name')?.focus();
  });
}

function renderEntry(){
  const requested = lessons.find(l=>route()===`/bai/${l.id}`);
  main.innerHTML = `<section class="welcome-grid">
    <div class="welcome-copy"><p class="eyebrow">LEVEL 1 · LEVEL 2</p><h1>Bài tập<br>Shadowing</h1><p class="intro">Luyện toàn bộ video, tối đa 6 phút mỗi bài.</p>
    <ol class="steps-list"><li><span class="step-number">01</span><div class="step-copy"><strong>Nghe và hiểu</strong><p>Xem hết video, mở bản lời thoại và hiểu nội dung trước khi luyện.</p></div></li><li><span class="step-number">02</span><div class="step-copy"><strong>Luyện nói toàn bài</strong><p>Nói bám theo giọng gốc. Sửa câu khó, rồi luyện một lượt từ đầu đến cuối.</p></div></li><li><span class="step-number">03</span><div class="step-copy"><strong>Đọc và ghi hình</strong><p>Tắt video gốc. Quay màn hình bản lời thoại kèm micro, đọc toàn bộ phần được giao.</p></div></li><li><span class="step-number">04</span><div class="step-copy"><strong>Nộp bài</strong><p>Kiểm tra video, bấm Nộp bài và gửi bản quay.</p></div></li></ol></div>
    <section class="entry-card" aria-labelledby="entry-title"><h2 id="entry-title">Vào làm bài</h2>${requested?`<p class="lesson-code">${escape(requested.id)}</p>`:''}
      <form id="entry-form" novalidate><div class="field"><label for="student-name">Họ và tên</label><input id="student-name" name="studentName" autocomplete="name" maxlength="80" placeholder="Nhập đầy đủ họ tên" required aria-describedby="entry-error"></div>
      <div class="field"><label for="class-code">Lớp của bạn</label><select id="class-code" name="classCode" required aria-describedby="entry-error"><option value="">Chọn đúng lớp đang học</option>${['Fighter','IELTS'].map(course=>`<optgroup label="${course}">${config.classes.filter(c=>c.course===course).map(c=>`<option value="${escape(c.code)}">${escape(c.code)}</option>`).join('')}</optgroup>`).join('')}</select></div>
      <p class="form-error" id="entry-error" role="alert"></p><button class="button button-primary" type="submit">Vào làm bài <span aria-hidden="true">→</span></button></form>
    </section></section>`;
  document.querySelector('#entry-form').addEventListener('submit',event=>{
    event.preventDefault();
    const nameInput=document.querySelector('#student-name'),classInput=document.querySelector('#class-code');
    const name=nameInput.value.trim().replace(/\s+/g,' '),classCode=classInput.value;
    if(name.length<2){showEntryError('Vui lòng nhập đầy đủ họ và tên.',nameInput);return;}
    if(!config.classes.some(c=>c.code===classCode)){showEntryError('Vui lòng chọn đúng lớp đang học trong danh sách.',classInput);return;}
    student={name,classCode};
    try{sessionStorage.setItem(SESSION_KEY,JSON.stringify(student));}catch{}
    render();
    main.focus();
  });
}
function showEntryError(message,input){
  document.querySelector('#entry-error').textContent=message;
  document.querySelectorAll('#entry-form [aria-invalid]').forEach(el=>el.removeAttribute('aria-invalid'));
  input.setAttribute('aria-invalid','true');input.focus();
}

function renderLibrary(){
  const available=courseLessons();
  document.title='Bài tập Shadowing';
  main.innerHTML=`<section class="workspace-head"><div><p class="eyebrow">SHADOWING</p><h1>Chọn bài luyện</h1><p class="intro">Chọn level và mã bài giáo viên giao.</p></div><div class="workspace-summary"><strong>${available.length}</strong><span>quest</span></div></section>
    <section aria-label="Chọn bài"><div class="toolbar"><div class="filter-tabs" role="tablist" aria-label="Lọc theo level">${[['all','Tất cả'],['1','Level 1 · Basic'],['2','Level 2 · Mở rộng']].map(([key,title])=>`<button class="filter-tab" role="tab" aria-selected="${activeLevel===key}" data-level="${key}">${title}</button>`).join('')}</div><div class="search-field"><label class="sr-only" for="lesson-search">Tìm tên hoặc mã bài</label><input id="lesson-search" type="search" placeholder="Tìm tên hoặc mã bài…" value="${escape(searchQuery)}"></div></div><div class="lesson-grid" id="lesson-grid"></div><p id="result-count" class="entry-note" role="status" aria-live="polite"></p></section>`;
  document.querySelectorAll('[data-level]').forEach(button=>button.addEventListener('click',()=>{activeLevel=button.dataset.level;document.querySelectorAll('[data-level]').forEach(b=>b.setAttribute('aria-selected',b===button?'true':'false'));renderCards();}));
  document.querySelector('#lesson-search').addEventListener('input',event=>{searchQuery=event.target.value;renderCards();});
  renderCards();
}
function renderCards(){
  const visible=courseLessons().filter(l=>(activeLevel==='all'||String(l.level)===activeLevel)&&normalize(`${l.id} ${l.title} ${l.topic}`).includes(normalize(searchQuery)));
  document.querySelector('#lesson-grid').innerHTML=visible.length?visible.map(l=>`<article class="lesson-card"><a class="lesson-thumb" href="#/bai/${encodeURIComponent(l.id)}" tabindex="-1" aria-hidden="true"><img src="https://i.ytimg.com/vi/${l.videoId}/hqdefault.jpg" alt="" loading="lazy"><span class="duration-tag">${duration(l.durationSeconds)}</span></a><div class="lesson-body"><div class="lesson-meta"><span class="level-chip">LEVEL ${l.level}</span><span>${escape(l.kind)}</span></div><p class="lesson-code">${escape(l.id)}</p><h2 class="lesson-title"><a href="#/bai/${encodeURIComponent(l.id)}">${escape(l.title)}</a></h2><p class="lesson-description">${escape(l.topic)}</p><div class="lesson-footer"><span>${escape(l.channel.replace(' | LearnEnglish','').replace(' | English',''))}</span><a class="button button-small" href="#/bai/${encodeURIComponent(l.id)}">Vào bài <span aria-hidden="true">↗</span></a></div></div></article>`).join(''):'<div class="empty-state"><h2>Chưa tìm thấy bài phù hợp</h2><p>Thử mã bài khác hoặc chọn Tất cả.</p></div>';
  document.querySelector('#result-count').textContent=`${visible.length} bài`;
}

function renderLesson(lesson){
  if(previousLesson!==lesson.id){activeStep='listen';previousLesson=lesson.id;}
  document.title=`${lesson.id} · ${lesson.title} | Shadowing`;
  const next=courseLessons().find(l=>l.level===lesson.level&&l.id>lesson.id);
  main.innerHTML=`<nav class="breadcrumb" aria-label="Đường dẫn"><a href="#/">Bài tập</a><span aria-hidden="true">/</span><span>${escape(lesson.id)}</span></nav><header class="lesson-heading"><p class="eyebrow">QUEST · LEVEL ${lesson.level} · ${escape(lesson.kind)}</p><h1>${escape(lesson.title)}</h1><div class="lesson-meta"><span class="lesson-code">${escape(lesson.id)}</span><span>${duration(lesson.durationSeconds)} phút</span><span>${escape(lesson.channel)}</span></div></header>
  <div class="lesson-layout"><div class="lesson-main"><div class="step-tabs" role="tablist" aria-label="Các bước làm bài"><button role="tab" class="filter-tab" data-step="listen" aria-selected="${activeStep==='listen'}">01 · Nghe & luyện</button><button role="tab" class="filter-tab" data-step="record" aria-selected="${activeStep==='record'}">02 · Ghi hình & nộp</button></div><div id="lesson-stage"></div>
  <section class="content-card"><h2>Từ và cụm từ</h2><ul class="phrase-list">${lesson.phrases.map(p=>`<li><strong class="phrase-en">${escape(p.en)}</strong><span class="phrase-meaning">${escape(p.vi)}</span></li>`).join('')}</ul></section>
  <section class="content-card"><h2>Thử dùng vào câu của bạn</h2><p>${escape(lesson.extraPractice)}</p><p class="entry-note">Tự luyện thêm; không cần đưa phần này vào video nộp.</p></section></div>
  <aside class="lesson-sidebar"><section class="content-card"><h2>Mục tiêu bài học</h2><ul class="instruction-list">${lesson.goals.map(g=>`<li>${escape(g)}</li>`).join('')}</ul></section><section class="submit-card"><h2>Nộp bài</h2><p><strong>${escape(student.name)}</strong><br>${escape(student.classCode)}<br><span class="lesson-code">${escape(lesson.id)}</span></p><p>Đọc toàn bộ lời thoại và quay màn hình kèm micro.</p>${externalLink(formUrl(lesson),'Nộp bài','button button-primary')}<p class="entry-note">Đăng nhập Google để tải video. Bấm Gửi và chờ xác nhận đã nộp.</p></section>${next?`<a class="text-link next-lesson" href="#/bai/${encodeURIComponent(next.id)}">Bài tiếp theo: ${escape(next.id)} →</a>`:''}</aside></div>`;
  document.querySelectorAll('[data-step]').forEach(button=>button.addEventListener('click',()=>{activeStep=button.dataset.step;document.querySelectorAll('[data-step]').forEach(b=>b.setAttribute('aria-selected',b===button?'true':'false'));renderStage(lesson);}));
  renderStage(lesson);
}
function renderStage(lesson){
  const target=document.querySelector('#lesson-stage');
  const sources=`<div class="source-links">${externalLink(`https://www.youtube.com/watch?v=${lesson.videoId}`,'Mở video trên YouTube')}${externalLink(lesson.transcriptUrl,'Mở bản lời thoại')}</div>`;
  if(activeStep==='listen'){
    target.innerHTML=`<div class="video-shell"><iframe src="https://www.youtube-nocookie.com/embed/${lesson.videoId}?rel=0" title="${escape(lesson.sourceTitle)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>${sources}<section class="content-card"><h2>Nghe trước, rồi nói theo</h2><ol class="instruction-list"><li>Nghe hết video một lượt để nắm ý chính.</li><li>Mở bản lời thoại, tra những từ gây vướng rồi nghe lại cả bài.</li><li>Nói bám theo người nói từ đầu đến cuối. Có thể dừng để sửa câu khó khi luyện; hoàn thành ít nhất một lượt trọn bài trước khi quay.</li></ol><p class="inline-notice"><strong>Trọng tâm:</strong> ${escape(lesson.pronunciation)}</p><h3>Cách mở bản lời thoại</h3><p>${escape(lesson.transcriptInstructions)}</p><button class="button button-secondary" id="ready-record">Sẵn sàng ghi hình →</button></section>`;
    document.querySelector('#ready-record').addEventListener('click',()=>{activeStep='record';document.querySelectorAll('[data-step]').forEach(b=>b.setAttribute('aria-selected',b.dataset.step==='record'?'true':'false'));renderStage(lesson);document.querySelector('#record-title')?.focus();});
  }else{
    // Replacing the stage removes the YouTube iframe and stops its playback.
    target.innerHTML=`<section class="content-card"><h2 id="record-title" tabindex="-1">Đọc toàn bài và ghi hình</h2><p>Tắt video gốc trước khi quay, kể cả video đang mở ở tab khác. Bản nộp chỉ có giọng đọc của bạn.</p><p class="inline-notice"><strong>Phần cần đọc:</strong> ${escape(lesson.submissionScope)}</p><p>${escape(lesson.transcriptInstructions)}</p>${externalLink(lesson.transcriptUrl,'Mở bản lời thoại để đọc','button button-secondary')}<ol class="instruction-list"><li>Bật quay màn hình và micro; không cần mở camera.</li><li>Hiển thị rõ bản lời thoại. Đọc liên tục từ đầu đến cuối, gồm lời dẫn, hội thoại, ví dụ và lời kết theo phạm vi của bài.</li><li>Không đọc tên nhân vật, mốc thời gian hoặc đầu/chân trang. Đọc nhầm một từ thì sửa và tiếp tục.</li><li>Xem lại bản quay để chắc có tiếng và đủ lời, rồi nộp một video.</li></ol><h3>Trước khi gửi</h3><div class="checklist"><label><input type="checkbox"> Tôi đã đọc đầy đủ phần được giao.</label><label><input type="checkbox"> Màn hình rõ chữ, nghe rõ giọng tôi.</label><label><input type="checkbox"> Video gốc đã tắt trong lúc quay.</label></div>${externalLink(formUrl(lesson),'Nộp bài','button button-primary')}<p class="entry-note">Mỗi lần nộp một video, tối đa 1 GB. Kiểm tra họ tên, lớp và mã bài trước khi gửi.</p></section>`;
  }
}
function render(){
  renderHeader();
  if(!student){document.title='Bài tập Shadowing';renderEntry();return;}
  const path=route();
  if(path==='/'||path===''){renderLibrary();return;}
  const lesson=courseLessons().find(l=>path===`/bai/${l.id}`);
  if(lesson){renderLesson(lesson);return;}
  main.innerHTML='<section class="empty-state"><h1>Chưa tìm thấy bài này</h1><p>Kiểm tra lại mã bài hoặc quay về danh sách.</p><a class="button button-primary" href="#/">Về danh sách bài</a></section>';
}

async function init(){
  try{
    const responses=await Promise.all([fetch('config.json',{cache:'no-cache'}),fetch('lessons.json',{cache:'no-cache'})]);
    if(responses.some(r=>!r.ok))throw new Error('Không tải được dữ liệu bài học.');
    [config,lessons]=await Promise.all(responses.map(r=>r.json()));
    if(!Array.isArray(config.classes)||!Array.isArray(lessons)||!config.form?.entries?.classCode)throw new Error('Cấu hình bài học chưa hoàn chỉnh.');
    const ids=new Set();for(const lesson of lessons){if(ids.has(lesson.id)||!/^[-a-zA-Z0-9]+$/.test(lesson.id)||!/^[-\w]{11}$/.test(lesson.videoId)||lesson.durationSeconds>360)throw new Error('Dữ liệu bài học cần được kiểm tra.');ids.add(lesson.id);}
    try{const saved=JSON.parse(sessionStorage.getItem(SESSION_KEY)||'null');if(validStudent(saved))student=saved;}catch{}
    render();
    window.addEventListener('hashchange',()=>{render();window.scrollTo({top:0,behavior:'instant'});main.focus();});
  }catch(error){main.innerHTML='<section class="empty-state" role="alert"><h1>Chưa mở được bài tập</h1><p>Kiểm tra kết nối rồi tải lại trang. Nếu vẫn gặp lỗi, hãy nhắn giáo viên.</p><button class="button button-primary" id="retry">Tải lại trang</button></section>';document.querySelector('#retry').addEventListener('click',()=>location.reload());console.error(error);}
}
init();
