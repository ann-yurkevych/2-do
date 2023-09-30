import './TaskCard.css';

export default function TaskCard({
  task,
  onDelete
}) {
    return (
      <div className="card" style={{backgroundColor:task.color}}>
        <section>
          <h4 className = "taskTitle"><b>{task.title}</b></h4>
        </section>
        <div className='buttonContainer'>
          <button className = "deleteButton" onClick={() => onDelete(task.id)} > 
              X
          </button>
        </div>
      </div>
    );
  }