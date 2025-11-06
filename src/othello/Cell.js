import { useState, useEffect, memo } from 'react';


export const Cell = memo(({ row, col, stone, size, okCells, active, myTurn}) => {
const [disabled, setDisabled] = useState(true);
//クリックした座標をサーバーにおくる
// const handleClick = (payload) => {
//     socket.emit('clickCell', payload)
// }
//disabledの付け替え

const handleClick = () => {
//   if (!canClick) return;
//   onClickCell(row, col);   // ← socket.emit の代わりに親からの関数を呼ぶ
};
useEffect(() => {
    setDisabled(true)
    okCells.forEach(ok => {
        if (ok.row === row && ok.col === col) {
              setDisabled(false)
        }
    })
}, [okCells, row, col])

    return (
      <div className="cell-wrap" >
        <div className="cell" style={{ width: size, height: size }}></div>
        <button className={`stone ${stone}` + (active ? ' isShow' : '')}
            style={{ width: size - 4, height: size - 4 }}
                onClick={() => handleClick({ y: row, x: col, turn: myTurn })}
                disabled={disabled}
           >
        </button>
     </div>
   );
 }
)
