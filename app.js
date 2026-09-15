import {hasDubbing, dubbingEntrySteps, renderDubbingStage} from './dubbing.js?v=teacher-20260910-drive';
const main = document.querySelector('#main');
const header = document.querySelector('#header-actions');
const SESSION_KEY = 'chuot.practice.student.v1';
document.querySelector('.skip-link')?.addEventListener('click',event=>{event.preventDefault();main.focus();main.scrollIntoView();});
let config, lessons, student, activeStep = 'listen', previousLesson = '', confirmedLessonId = '';
const escape = (v='') => String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const duration = seconds => `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;
const route = () => { try { return decodeURIComponent(location.hash.replace(/^#/,'')) || '/'; } catch { return '/'; } };
const lessonPath = lesson => '/bai/' + encodeURIComponent(lesson.slug);
const externalLink = (url,label,classes='text-link') => `<a class="${classes}" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(label)} <span aria-hidden="true">↗</span></a>`;
const validStudent = s => s && typeof s.name==='string' && s.name.trim().length>=2 && config.classes.some(c=>c.code===s.classCode);

function formUrl(lesson){
  const url = new URL(config.form.url);
  url.searchParams.set('usp','pp_url');
  url.searchParams.set(config.form.entries.name,student.name);
  url.searchParams.set(config.form.entries.classCode,student.classCode);
  url.searchParams.set(config.form.entries.lessonCode,lesson.id);
  return url.href;
}

function renderHeader(){
  header.innerHTML = confirmedLessonId && validStudent(student) ? `<span class="student-chip"><strong>${escape(student.name)}</strong><span>${escape(student.classCode)}</span></span>` : '';
}

function renderEntry(lesson){
  document.title=`${lesson.id} · ${lesson.title} | Shadowing`;
  main.innerHTML = `<section class="welcome-grid">
    <div class="welcome-copy"><p class="eyebrow">QUEST · LEVEL ${lesson.level}</p><h1>${escape(lesson.title)}</h1><div class="lesson-meta"><span class="lesson-code">${escape(lesson.id)}</span><span>${duration(lesson.durationSeconds)} phút</span><span>${escape(lesson.channel)}</span></div><p class="intro">${escape(lesson.topic)}</p>
    <ol class="steps-list">${dubbingEntrySteps()}</ol></div>
    <section class="entry-card" aria-labelledby="entry-title"><h2 id="entry-title">Vào làm bài</h2><p class="lesson-code">${escape(lesson.id)}</p>
      <form id="entry-form" novalidate><div class="field"><label for="student-name">Họ và tên</label><input id="student-name" name="studentName" autocomplete="name" maxlength="80" placeholder="Nhập đầy đủ họ tên" value="${escape(student?.name||'')}" required aria-describedby="entry-error"></div>
      <div class="field"><label for="class-code">Lớp của em</label><select id="class-code" name="classCode" required aria-describedby="entry-error"><option value="">Chọn đúng lớp đang học</option>${['Fighter','IELTS'].map(course=>`<optgroup label="${course}">${config.classes.filter(c=>c.course===course).map(c=>`<option value="${escape(c.code)}"${student?.classCode===c.code?' selected':''}>${escape(c.code)}</option>`).join('')}</optgroup>`).join('')}</select></div>
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
    confirmedLessonId=lesson.id;
    activeStep='listen';
    render();
    main.focus();
  });
}
function showEntryError(message,input){
  document.querySelector('#entry-error').textContent=message;
  document.querySelectorAll('#entry-form [aria-invalid]').forEach(el=>el.removeAttribute('aria-invalid'));
  input.setAttribute('aria-invalid','true');input.focus();
}

function renderHome(){
  document.title='Bài tập Shadowing';
  main.innerHTML='<section class="workspace-head"><div><p class="eyebrow">SHADOWING</p><h1>Bài tập Shadowing</h1><p class="intro">Mở link bài cô đã gửi để bắt đầu luyện tập.</p></div></section>';
}

function renderLesson(lesson){
  if(previousLesson!==lesson.id){activeStep='listen';previousLesson=lesson.id;}
  document.title=`${lesson.id} · ${lesson.title} | Shadowing`;
  main.innerHTML=`<header class="lesson-heading"><p class="eyebrow">QUEST · LEVEL ${lesson.level} · ${escape(lesson.kind)}</p><h1>${escape(lesson.title)}</h1><div class="lesson-meta"><span class="lesson-code">${escape(lesson.id)}</span><span>${duration(lesson.durationSeconds)} phút</span><span>${escape(lesson.channel)}</span></div></header>
  <div class="lesson-layout"><div class="lesson-main"><div class="step-tabs" role="tablist" aria-label="Các bước làm bài"><button role="tab" class="filter-tab" data-step="listen" aria-selected="${activeStep==='listen'}">01 · Nghe & luyện</button><button role="tab" class="filter-tab" data-step="record" aria-selected="${activeStep==='record'}">02 · Lồng tiếng & nộp</button></div><div id="lesson-stage"></div>
  </div>
  <aside class="lesson-sidebar"><section class="content-card"><h2>Mục tiêu bài học</h2><ul class="instruction-list">${lesson.goals.map(g=>`<li>${escape(g)}</li>`).join('')}</ul></section><section class="submit-card"><h2>Nộp bài</h2><p><strong>${escape(student.name)}</strong><br>${escape(student.classCode)}<br><span class="lesson-code">${escape(lesson.id)}</span></p><p>Em bắt buộc dùng video đã tách giọng của bài này để lồng tiếng, quay màn hình kèm giọng em và nộp cho cô.</p>${externalLink(formUrl(lesson),'Nộp bài','button button-primary')}<p class="entry-note">Đăng nhập Google để tải video. Bấm Gửi và chờ xác nhận đã nộp.</p></section></aside></div>`;
  document.querySelectorAll('[data-step]').forEach(button=>button.addEventListener('click',()=>{activeStep=button.dataset.step;document.querySelectorAll('[data-step]').forEach(b=>b.setAttribute('aria-selected',b===button?'true':'false'));renderStage(lesson);}));
  renderStage(lesson);
}
function renderStage(lesson){
  const target=document.querySelector('#lesson-stage');
  if(activeStep==='record'){
    renderDubbingStage(target, lesson, {externalLink, submissionUrl:formUrl(lesson)});
    return;
  }
  const sources=`<div class="source-links">${externalLink(`https://www.youtube.com/watch?v=${lesson.videoId}`,'Mở video trên YouTube')}${externalLink(lesson.transcriptUrl,'Mở bản lời thoại')}</div>`;
  if(activeStep==='listen'){
    target.innerHTML=`<div class="video-shell"><iframe src="https://www.youtube-nocookie.com/embed/${lesson.videoId}?rel=0" title="${escape(lesson.sourceTitle)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>${sources}<section class="content-card"><h2>Nghe kỹ, rồi shadow theo</h2><ol class="instruction-list"><li>Nghe hết video một lượt để hiểu nội dung và cảm xúc của người nói.</li><li>Mở bản lời thoại, chia thành từng đoạn 1–2 câu và nghe lại những chỗ chưa rõ.</li><li>Bật tiếng gốc và nói đuổi sát, đồng thời hoặc chậm hơn người nói tối đa một nhịp.</li><li>Luyện lại đoạn chưa khớp, sau đó shadow trọn bài từ đầu đến cuối trước khi quay.</li></ol><section class="shadowing-requirements" aria-labelledby="shadowing-requirements-title"><h3 id="shadowing-requirements-title">Yêu cầu khi Shadowing</h3><p>Shadowing không chỉ là đọc đúng chữ. Mục tiêu là bắt chước toàn bộ cách người bản ngữ nói, càng khớp giọng mẫu càng tốt.</p><ul class="instruction-list"><li><strong>Đúng lời:</strong> Nói đúng và đủ từng từ; không bỏ, thêm hoặc đổi từ.</li><li><strong>Phát âm:</strong> Bắt chước từng âm, đặc biệt là nguyên âm, phụ âm và âm cuối.</li><li><strong>Độ tự nhiên:</strong> Bắt chước trọng âm từ, trọng âm câu, nối âm, âm yếu và dạng rút gọn.</li><li><strong>Cách thể hiện:</strong> Giữ sát nhịp, chỗ ngắt, tốc độ, ngữ điệu lên xuống và cảm xúc của người nói.</li><li><strong>Nếu có nhiều nhân vật:</strong> Đổi giọng phù hợp với từng lượt lời, không đọc đều một giọng.</li></ul></section><p class="inline-notice"><strong>Trọng tâm riêng của bài:</strong> ${escape(lesson.pronunciation)}</p><h3>Cách mở bản lời thoại</h3><p>${escape(lesson.transcriptInstructions)}</p><button class="button button-secondary" id="ready-record">Sẵn sàng lồng tiếng →</button></section>`;
    document.querySelector('#ready-record').addEventListener('click',()=>{activeStep='record';document.querySelectorAll('[data-step]').forEach(b=>b.setAttribute('aria-selected',b.dataset.step==='record'?'true':'false'));renderStage(lesson);document.querySelector('#record-title')?.focus();});
  }
}
function render(){
  const path=route();
  const lesson=lessons.find(l=>path===lessonPath(l));
  if(!lesson||confirmedLessonId!==lesson.id)confirmedLessonId='';
  renderHeader();
  if(path==='/'||path===''){renderHome();return;}
  if(lesson){
    if(confirmedLessonId===lesson.id&&validStudent(student))renderLesson(lesson);
    else renderEntry(lesson);
    return;
  }
  document.title='Bài tập Shadowing';
  main.innerHTML='<section class="empty-state"><h1>Chưa mở được bài này</h1><p>Hãy mở lại link bài mới nhất cô đã gửi.</p></section>';
}

async function init(){
  try{
    const selected=route().match(/^\/bai\/([a-f0-9]{24})$/);
    const responses=await Promise.all([fetch('config.json',{cache:'no-cache'}),selected?fetch(`lesson-data/${selected[1]}.json`,{cache:'no-cache'}):Promise.resolve(null)]);
    if(responses.some(r=>r&&!r.ok))throw new Error('Không tải được dữ liệu bài học.');
    config=await responses[0].json();
    lessons=responses[1]?await responses[1].json():[];
    if(!Array.isArray(config.classes)||!Array.isArray(lessons)||!config.form?.entries?.classCode)throw new Error('Cấu hình bài học chưa hoàn chỉnh.');
    const slugs=lessons.map(l=>l.slug);
    if(slugs.some(s=>typeof s!=='string'||!/^[a-f0-9]{24}$/.test(s))||new Set(slugs).size!==slugs.length)throw new Error('Đường dẫn bài học cần được kiểm tra.');
    const ids=new Set();for(const lesson of lessons){const hasDubbingRef=lesson.dubbingVideoId!==undefined||lesson.dubbingDriveId!==undefined;if(ids.has(lesson.id)||!/^[-a-zA-Z0-9]+$/.test(lesson.id)||!/^[-\w]{11}$/.test(lesson.videoId)||lesson.durationSeconds>420||(hasDubbingRef&&!hasDubbing(lesson)))throw new Error('Dữ liệu bài học cần được kiểm tra.');ids.add(lesson.id);}
    try{const saved=JSON.parse(sessionStorage.getItem(SESSION_KEY)||'null');if(validStudent(saved))student=saved;}catch{}
    render();

  }catch(error){main.innerHTML='<section class="empty-state" role="alert"><h1>Chưa mở được bài tập</h1><p>Kiểm tra kết nối rồi tải lại trang. Nếu vẫn gặp lỗi, em nhắn cô.</p><button class="button button-primary" id="retry">Tải lại trang</button></section>';document.querySelector('#retry').addEventListener('click',()=>location.reload());console.error(error);}
}
window.addEventListener('hashchange',()=>{confirmedLessonId='';init();window.scrollTo({top:0,behavior:'instant'});main.focus();});
// A cached entry page must not expose a link to a course homepage.
document.querySelectorAll('a[href="#/"]').forEach(a=>a.removeAttribute('href'));
init();
