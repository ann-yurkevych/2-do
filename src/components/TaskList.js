import TaskCard from './TaskCard';
import './TaskList.css'
import { useEffect, useState } from 'react';

export default function TaskList({
  tasks,
  onDelete,
  swapTasks
}) {
  const [dragTask, setDragTask] = useState(null);

  function dragStart(e) {
    this.style.opacity = '0.4';
    setDragTask(this);
  };

  function dragEnter(e) {
    this.classList.add('over');
  }

  function dragLeave(e) {
    e.stopPropagation();
    this.classList.remove('over');
  }

  function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  function dragDrop(e) {
    if (dragTask != this) {
      setTimeout(() => {
        const html = this.innerHTML;
        try {
          this.innerHTML = dragTask.innerHTML;
          dragTask.innerHTML = html;
          swapTasks(this.dataset.id, dragTask.dataset.id);
        }
        catch {}
      }, 100);
    }
    return false;
  }

  function dragEnd(e) {
    var listItems = document.querySelectorAll('.draggable');
    [].forEach.call(listItems, function (item) {
      item.classList.remove('over');
    });
    this.style.opacity = '1';
  }

  function addDnD(el) {
    el.addEventListener('dragstart', dragStart, true);
    el.addEventListener('dragenter', dragEnter, true);
    el.addEventListener('dragover', dragOver, true);
    el.addEventListener('dragleave', dragLeave, true);
    el.addEventListener('drop', dragDrop, true);
    el.addEventListener('dragend', dragEnd, true);
  }
  function removeDnD(el) {
    el.removeEventListener('dragstart', dragStart, true);
    el.removeEventListener('dragenter', dragEnter, true);
    el.removeEventListener('dragover', dragOver, true);
    el.removeEventListener('dragleave', dragLeave, true);
    el.removeEventListener('drop', dragDrop, true);
    el.removeEventListener('dragend', dragEnd, true);
  }
  useEffect(() => {
    var listItems = document.querySelectorAll('.draggable');
    [].forEach.call(listItems, function (item) {
      removeDnD(item);
      addDnD(item);
    });
  });
  
  return (
    <ol className='taskList'>
      {tasks.map(task => (
        <ul data-id={task.id} className="draggable" draggable="true" key={task.id}>
          <TaskCard cellPadding="0px"
            task={task}
            onDelete={onDelete}
          />
        </ul>
      ))}
    </ol>
  );
}