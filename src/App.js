import './App.css';
import { Board } from './othello/Board';
import { Info } from './othello/Info';
import { Reload } from './Reload';
import { useState, useEffect } from 'react';
import {
  board as initialBoard,
  countStone,
  okList as initialOkList,
  serchOkCells,
  getStoneListAndOkList
} from './othello/model.js';

function App() {
  const [size, setSize] = useState(64);
  const [othello, setBoard] = useState(initialBoard);
  const [myTurn, setMyTurn] = useState(true);              // true=黒, false=白 と仮定
  const [finish, setFinish] = useState(false);
  const [count, setCount] = useState({ black: 2, white: 2 });
  const [pass, setPass] = useState(false);
  const [okCells, setOkCells] = useState(initialOkList);
  const [active, setActive] = useState(false);

  // クリックできるマスの表示非表示
  const ShowCells = () => {
    setActive(true);
  };

  // マスをクリックしたとき（row, col は Board 側から渡してもらう）
  const handleClickCell = (row, col) => {
    if (finish) return;

    const { stoneList, okList } = getStoneListAndOkList(row, col, myTurn, othello);

    // 打てないマスなら何もしない
    if (!stoneList || stoneList.length === 0) return;

    setBoard(prev => {
      const newBoard = prev.map(r => [...r]); // 盤のコピー
      stoneList.forEach(list => {
        newBoard[list.row][list.col] = myTurn ? 'black' : 'white';
      });
      return newBoard;
    });

    setOkCells(okList);

    // 次の手番で打てる場所がなければ pass フラグON
    setPass(okList.length === 0);

    // 手番を交代
    setMyTurn(prev => !prev);
    setActive(false);
  };

  // パスボタン（Infoから呼んでもらう）
  const handlePass = () => {
    if (!pass || finish) return;

    setMyTurn(prevTurn => {
      const nextTurn = !prevTurn;
      const nextOkList = serchOkCells(othello, nextTurn);
      setOkCells(nextOkList);

      if (nextOkList.length === 0) {
        // お互い打てない → 終局
        setPass(false);
        setFinish(true);
      } else {
        setPass(false);
      }

      return nextTurn;
    });
  };

  // 石の数
  useEffect(() => {
    setCount(countStone(othello));
  }, [othello]);

  // 終局判定（枚数だけでもチェック）
  useEffect(() => {
    if (count.black === 0 || count.white === 0) {
      setPass(false);
      setFinish(true);
    }
    if (count.black + count.white === 64) {
      setPass(false);
      setFinish(true);
    }
  }, [count]);

  // Cell のサイズ
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth <= window.innerHeight) {
        setSize(window.innerWidth * 0.09);
      } else {
        setSize(window.innerHeight * 0.09);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <>
      <div className="App">
        <Info
          finish={finish}
          myTurn={myTurn}
          count={count}
          pass={pass}
          onPass={handlePass}      // ← ここ追加
        />

        <Board
          size={size}
          othello={othello}
          okCells={okCells}
          myTurn={myTurn}
          active={active}
          onClickCell={handleClickCell}  // ← ここ追加
        />

        <div className="button-wrap -show">
          <button className="button" onClick={ShowCells}>
            クリックできるマスを見る
          </button>
        </div>

        <Reload />
      </div>
    </>
  );
}

export default App;
