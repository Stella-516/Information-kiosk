const STORE_VERSION_KEY = "feedback_store_version";
const STORE_VERSION = "2026-10-26-reset";
const DAILY_RESET_DATE_KEY = "feedback_daily_reset_date";
const COMMIT_LOCK_KEY = "feedback.commit_lock";
const DONE_VIEW_KEY = "feedback.done_view";
const DRAFT_KEYS = [
  "feedback.message",
  "feedback.emotion.key",
  "feedback.emotion.label",
  "feedback.emotion.src",
  "feedback.date",
];

function isHistoryKey(key) {
  return Boolean(
    key &&
      key.startsWith("feedback_") &&
      (key.endsWith("_message") ||
        key.endsWith("_emotion") ||
        key.endsWith("_date"))
  );
}

function defaultDate() {
  return new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
}

function clearDrafts() {
  DRAFT_KEYS.forEach((key) => localStorage.removeItem(key));
}

function removeFeedback(id) {
  localStorage.removeItem(`feedback_${id}_message`);
  localStorage.removeItem(`feedback_${id}_emotion`);
  localStorage.removeItem(`feedback_${id}_date`);
}

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function resetFeedbacksForNewDay() {
  const today = localDateKey();
  if (localStorage.getItem(DAILY_RESET_DATE_KEY) === today) return;

  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (isHistoryKey(key)) keysToRemove.push(key);
  }
  keysToRemove.forEach((key) => localStorage.removeItem(key));
  localStorage.setItem(DAILY_RESET_DATE_KEY, today);
}

export function resetSavedFeedbacksOnce() {
  if (localStorage.getItem(STORE_VERSION_KEY) === STORE_VERSION) return;

  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (isHistoryKey(key)) keysToRemove.push(key);
  }
  keysToRemove.forEach((key) => localStorage.removeItem(key));
  localStorage.setItem(STORE_VERSION_KEY, STORE_VERSION);
}

export function readFeedbackDraft() {
  return {
    message: localStorage.getItem("feedback.message") || "",
    emotion: localStorage.getItem("feedback.emotion.key") || "",
    emoSrc: localStorage.getItem("feedback.emotion.src") || "",
    date: localStorage.getItem("feedback.date") || "",
  };
}

export function commitCurrentFeedback() {
  const cachedView = sessionStorage.getItem(DONE_VIEW_KEY);
  if (cachedView) {
    try {
      return JSON.parse(cachedView);
    } catch {
      sessionStorage.removeItem(DONE_VIEW_KEY);
    }
  }

  const existingLock = localStorage.getItem(COMMIT_LOCK_KEY);
  if (existingLock) {
    const view = {
      id: existingLock,
      message: localStorage.getItem(`feedback_${existingLock}_message`) || "",
      emotion: localStorage.getItem(`feedback_${existingLock}_emotion`) || "",
      emoSrc: localStorage.getItem("feedback.emotion.src") || "",
      date: localStorage.getItem(`feedback_${existingLock}_date`) || "",
    };
    sessionStorage.setItem(DONE_VIEW_KEY, JSON.stringify(view));
    return view;
  }

  const draft = readFeedbackDraft();
  if (!draft.message || !draft.emotion) return null;

  const id = Date.now().toString();
  const date = draft.date || defaultDate();
  const view = { ...draft, id, date };

  localStorage.setItem(`feedback_${id}_message`, draft.message);
  localStorage.setItem(`feedback_${id}_emotion`, draft.emotion);
  localStorage.setItem(`feedback_${id}_date`, date);
  localStorage.setItem(COMMIT_LOCK_KEY, id);
  sessionStorage.setItem(DONE_VIEW_KEY, JSON.stringify(view));
  clearDrafts();

  return view;
}

export function clearFeedbackCommitLock() {
  localStorage.removeItem(COMMIT_LOCK_KEY);
  sessionStorage.removeItem(DONE_VIEW_KEY);
}

function collectSavedFeedbacks() {
  const savedFeedbacks = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("feedback_") && key.endsWith("_message")) {
      const feedbackId = key.slice("feedback_".length, -"_message".length);
      const message = localStorage.getItem(key);
      const emotion = localStorage.getItem(`feedback_${feedbackId}_emotion`);
      const date = localStorage.getItem(`feedback_${feedbackId}_date`);

      if (message && emotion && date) {
        savedFeedbacks.push({
          id: feedbackId,
          message,
          emotion,
          date,
        });
      }
    }
  }

  savedFeedbacks.sort((a, b) => {
    const timeA = parseInt(a.id, 10) || 0;
    const timeB = parseInt(b.id, 10) || 0;
    return timeB - timeA;
  });

  return savedFeedbacks;
}

function dedupeSavedFeedbacks(feedbacks) {
  const unique = [];

  feedbacks.forEach((item) => {
    const prev = unique[unique.length - 1];
    const prevTime = parseInt(prev?.id, 10) || 0;
    const itemTime = parseInt(item.id, 10) || 0;
    const duplicatedMount =
      prev &&
      prev.message === item.message &&
      prev.emotion === item.emotion &&
      Math.abs(prevTime - itemTime) < 2000;

    if (duplicatedMount) {
      removeFeedback(item.id);
      return;
    }

    unique.push(item);
  });

  return unique;
}

export function loadSavedFeedbacks() {
  resetSavedFeedbacksOnce();
  resetFeedbacksForNewDay();
  clearFeedbackCommitLock();
  return dedupeSavedFeedbacks(collectSavedFeedbacks());
}
