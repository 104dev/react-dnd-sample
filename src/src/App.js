import logo from './logo.svg';
import './App.css';
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useState } from 'react';

/*
const MovableItem = () => {

  return (
    <div className='movable-item'>
      We will move this item
    </div>
  )
  
}
*/


const MovableItem = ({ name, setItems }) => {

  //itemの名前と状態をpropsとして受け取る。

  //useDragの処理後に呼び出すメソッド
  const changeItemColumn = (currentItem, columnName) => {
    //prevStateはsetStateで変更する前の状態を参照できる。

    //currentiItem・・・<div>{name}</div>
    //各アイテムの名前と現在操作しようとしているアイテムが一致した場合は
    //カラム名を書き換える。falseの場合は以前のカラムのまま。

    setItems((prevState) => {
      return prevState.map(e => {
        return {
          //{ id: 1, name: 'Item 1', column: 'Column 1' }
          //Itemの中身それぞれに対して
          ...e,
          column: e.name === currentItem.name ? columnName : e.column,
        }
      })
    })
  }

  //①

  const [{ isDragging }, drag] = useDrag({
    //v14より仕様が変わりtypeプロパティをitemの外に出す必要が出てきた。
    type: 'Our first type',
    //drop:(item,monitor)・・・互換性のあるアイテムがドロップされた際に呼び出される。
    //undefinedかプレーンオブジェクトが返される。
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      //オブジェクトが返すときにドラッグ終わりのドラッグソースをgetDropResultとして使用できる。
      //getDropResultはドロップターゲットがアイテムを受け取った際に使用する。
      if (dropResult && dropResult.name === 'Column 1') {
        //item・・・div要素を以下を返すコンポーネント
        changeItemColumn(item, 'Column 1')
      } else {
        changeItemColumn(item, 'Column 2')
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  //①最終的には下記のようなコンポーネントを返す。
  //ref={drag}でドラッグの状態をuseDragでモニタリングしている。

  return (
    <div ref={drag} className='movable-item' style={{ opacity }}>
      {name}
    </div>
  )
}

const Column = ({ children, className, title }) => {

  const [, drop] = useDrop({
    //
    accept: 'Our first type',
    drop: () => ({ name: title }),
  });

  return (
    <div ref={drop} className={className}>
      {title}
      {children}
    </div>
  )
}

/*
export const App = () => {
  return (
    <div className="container">
        <FirstColumn />
        <SecondColumn />
    </div>
  );
}
*/


export const App = () => {

  /*
  const [isFirstColumn, setIsFirstColumn] = useState(true);
  */

  //Stateで最初のカラムと次のカラムどちらに入っているかを管理する。

  /*
  const Item = <MovableItem setIsFirstColumn={setIsFirstColumn} />
  */

  //stateを変更するためのHookをpropsで渡す。

  //&&は条件分岐の省略で左がtrueなら右を返すという表記になっている。

  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', column: 'Column 1' },
    { id: 2, name: 'Item 2', column: 'Column 1' },
    { id: 3, name: 'Item 3', column: 'Column 1' },
  ]);

  //カラムの名前を引数として受け取る。
  //itemが持っているカラム名と引数として受け取ったカラム名を比較して同一のものに絞り込む。
  //各アイテムを出力する。propsでitemの状態と名前を<MovableItem>に渡して処理
  const returnItemsForColumns = (columnName) => {
    return items
      .filter((item) => item.column === columnName)
      .map((item) => (
        <MovableItem key={item.id} name={item.name} setItems={setItems}></MovableItem>
      ))
  }

  return (
    <div className="container">
      <DndProvider backend={HTML5Backend}>
        <Column title='Column 1' className='column first-column'>
          {returnItemsForColumns('Column 1')}
        </Column>
        <Column title='Column 2' className='column second-column'>
          {returnItemsForColumns('Column 2')}
        </Column>
      </DndProvider>
    </div>
  );
}


export default App;
