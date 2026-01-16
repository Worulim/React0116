function MemoEditor({ memo, onChange, onSave, onDelete }) {
  if (!memo) {
    return (
      <div className="memo-editor">
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <p>메모를 선택하거나 새 메모를 만드세요</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    onSave({
      ...memo,
      title: (memo.title ?? '').trim(),
      content: (memo.content ?? '').trim(),
      updatedAt: new Date().toISOString(),
    });
  };

  const handleDelete = () => {
    if (window.confirm('이 메모를 삭제하시겠습니까?')) {
      onDelete(memo.id);
    }
  };

  return (
    <div className="memo-editor">
      <div className="editor-header">
        <input
          type="text"
          className="editor-title"
          value={memo.title ?? ''}
          placeholder="제목을 입력하세요"
          onChange={(e) => onChange(memo.id, { title: e.target.value })}
        />

        <div className="editor-actions">
          <button className="save-btn" onClick={handleSave}>
            저장
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            삭제
          </button>
        </div>
      </div>

      <div className="editor-content">
        <textarea
          value={memo.content ?? ''}
          placeholder="내용을 입력하세요"
          onChange={(e) => onChange(memo.id, { content: e.target.value })}
        />
      </div>
    </div>
  );
}

export default MemoEditor;
