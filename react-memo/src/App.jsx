import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MemoList from './components/MemoList';
import MemoEditor from './components/MemoEditor';
import './App.css';

const DEFAULT_MEMOS = [
  {
    id: 'welcome',
    title: '메모장에 오신 것을 환영합니다!',
    content: '이것은 첫 번째 메모입니다.\n\n새 메모를 만들어보세요!',
    category: '개인',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
];

function App() {
  // ✅ Step 6: localStorage에서 memos 불러오기 (lazy init)
  const [memos, setMemos] = useState(() => {
    try {
      if (typeof window === 'undefined') return DEFAULT_MEMOS;
      const saved = localStorage.getItem('memos');
      return saved ? JSON.parse(saved) : DEFAULT_MEMOS;
    } catch {
      return DEFAULT_MEMOS;
    }
  });

  // 선택된 메모는 id로 관리 (단일 소스: memos)
  const [selectedMemoId, setSelectedMemoId] = useState(null);

  // 검색/카테고리 필터 상태
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  // ✅ Step 6: memos 변경될 때마다 localStorage에 저장
  useEffect(() => {
    try {
      localStorage.setItem('memos', JSON.stringify(memos));
    } catch {
      // localStorage 접근 실패 시 무시
    }
  }, [memos]);

  // 카테고리 목록 만들기
  const categories = useMemo(() => {
    const set = new Set();
    memos.forEach((m) => set.add(m.category || '미분류'));
    return ['전체', ...Array.from(set)];
  }, [memos]);

  const selectedMemo = useMemo(() => {
    return memos.find((m) => m.id === selectedMemoId) || null;
  }, [memos, selectedMemoId]);

  // 검색/필터 함수
  const matchesQuery = (memo, q) => {
    const qq = q.trim().toLowerCase();
    if (!qq) return true;
    const t = (memo.title || '').toLowerCase();
    const c = (memo.content || '').toLowerCase();
    return t.includes(qq) || c.includes(qq);
  };

  const matchesCategory = (memo, cat) => {
    if (!cat || cat === '전체') return true;
    return (memo.category || '미분류') === cat;
  };

  // 화면에 보여줄 메모 리스트(검색+카테고리 적용)
  const visibleMemos = useMemo(() => {
    return memos.filter((m) => matchesQuery(m, query) && matchesCategory(m, selectedCategory));
  }, [memos, query, selectedCategory]);

  // 새 메모 생성
  const makeId = () => {
    // 이벤트 핸들러에서만 호출되므로 “impure render” 규칙에 걸리지 않음
    return typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : String(Date.now());
  };

  const handleNewMemo = () => {
    const now = new Date().toISOString();

    const newMemo = {
      id: makeId(),
      title: '',
      content: '',
      category: '개인',
      createdAt: now,
      updatedAt: now,
    };

    setMemos((prev) => [newMemo, ...prev]);
    setSelectedMemoId(newMemo.id);
  };

  // 메모 선택
  const handleSelectMemo = (memoId) => {
    setSelectedMemoId(memoId);
  };

  // 에디터 입력 변경(즉시 상태 반영)
  const handleChangeMemo = (memoId, patch) => {
    setMemos((prev) => prev.map((m) => (m.id === memoId ? { ...m, ...patch } : m)));
  };

  // ✅ 자동 저장(1초 디바운스 후 호출): updatedAt만 갱신
  const handleAutoSave = (memoId) => {
    const now = new Date().toISOString();
    setMemos((prev) =>
      prev.map((m) => (m.id === memoId ? { ...m, updatedAt: now } : m))
    );
  };

  // 삭제
  const handleDeleteMemo = (memoId) => {
    setMemos((prev) => prev.filter((m) => m.id !== memoId));
    setSelectedMemoId((prevId) => (prevId === memoId ? null : prevId));
  };

  // 검색어 바뀌면: 선택 메모가 검색 결과에 없으면 선택 해제(UX 정리)
  const handleQueryChange = (next) => {
    setQuery(next);

    if (!selectedMemo) return;
    const ok = matchesQuery(selectedMemo, next) && matchesCategory(selectedMemo, selectedCategory);
    if (!ok) setSelectedMemoId(null);
  };

  // 카테고리 바뀌면: 선택 메모가 해당 카테고리에 없으면 선택 해제
  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);

    if (!selectedMemo) return;
    const ok = matchesQuery(selectedMemo, query) && matchesCategory(selectedMemo, cat);
    if (!ok) setSelectedMemoId(null);
  };

  return (
    <div className="app">
      <Header query={query} onQueryChange={handleQueryChange} />

      <div className="main-container">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        <MemoList
          memos={visibleMemos}
          selectedMemoId={selectedMemoId}
          onMemoSelect={handleSelectMemo}
          onNewMemo={handleNewMemo}
        />

        <MemoEditor
          memo={selectedMemo}
          onChange={handleChangeMemo}
          onAutoSave={handleAutoSave}
          onDelete={handleDeleteMemo}
        />
      </div>
    </div>
  );
}

export default App;
