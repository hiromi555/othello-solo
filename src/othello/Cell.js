import { useState, useEffect, memo } from 'react';

export const Cell = memo(
  ({ row, col, stone, size, okCells, active, myTurn, onClickCell }) => {
    const [disabled, setDisabled] = useState(true);

    // このマスが「打てるマス」かどうかを disabled で管理
    useEffect(() => {
      let canClick = false;
      if (okCells && Array.isArray(okCells)) {
        okCells.forEach((ok) => {
          if (ok.row === row && ok.col === col) {
            canClick = true;
          }
        });
      }
      setDisabled(!canClick);
    }, [okCells, row, col]);

    const handleClick = () => {
      // 打てないマスなら何もしない
      if (disabled) return;
      // App.js の handleClickCell に「このマスの座標」を伝える
      if (typeof onClickCell === 'function') {
        onClickCell(row, col);
      }
    };

    return (
      <div className="cell-wrap">
        <div className="cell" style={{ width: size, height: size }}></div>
        <button
          className={`stone ${stone}` + (active ? ' isShow' : '')}
          style={{ width: size - 4, height: size - 4 }}
          onClick={handleClick}
          disabled={disabled}
        >
        </button>
      </div>
    );
  }
);

