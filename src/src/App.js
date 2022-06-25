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


const MovableItem = ({ setIsFirstColumn }) => {

  const [{ isDragging }, drag] = useDrag({
    //v14より仕様が変わりtypeプロパティをitemの外に出す必要が出てきた。
    type: 'Our first type',
    item: { name: 'Any custom name' },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult && dropResult.name === 'Column 1') {
        setIsFirstColumn(true)
      } else {
        setIsFirstColumn(false)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} className='movable-item' style={{ opacity }}>
      We will move this item
    </div>
  )
}

const Column = ({ children, className, title }) => {

  const [/*{ canDrop, isOver }*/, drop] = useDrop({
    //
    accept: 'Our first type',
    drop: () => ({ name: 'Some name' }),
    collect: (monitor) => ({
      /*
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      */
    }),
  });

  /*console.log('options', { canDrop, isOver })*/

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

  const [isFirstColumn, setIsFirstColumn] = useState(true);

  //Stateで最初のカラムと次のカラムどちらに入っているかを管理する。

  const Item = <MovableItem setIsFirstColumn={setIsFirstColumn} />

  //stateを変更するためのHookをpropsで渡す。

  //&&は条件分岐の省略で左がtrueなら右を返すという表記になっている。

  /*
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', column: 'Column 1' },
    { id: 2, name: 'Item 2', column: 'Column 1' },
    { id: 3, name: 'Item 3', column: 'Column 1' },
  ]);

  const returnItemsForColumns = (columnName) = {
    return :items
      .filter((item) => item.column === columnName)
      .map((item) => (
        <MovableItem key={item.id} name={item.name} setItems={setItems}></MovableItem>
      ))
  }
  */


  return (
    <div className="container">
      <DndProvider backend={HTML5Backend}>
        <Column title='Column 1' className='column first-column'>
          {isFirstColumn && Item}
        </Column>
        <Column title='Column 2' className='column second-column'>
          {!isFirstColumn && Item}
        </Column>
      </DndProvider>
    </div>
  );
}


export default App;
