@react.component
let make = () => {
  let (todos, setTodos) = React.useState(() => Task.defaultTasks)

  let (showAddTask, setShowAddTask) = React.useState(() => false)

  let addTask = task => setTodos(prevTodos => prevTodos->Belt.Array.concat([task]))

  let deleteTask = id => setTodos(prevTodos => prevTodos->Js.Array2.filter(task => task.id !== id))

  let toggleReminder = id =>
    setTodos(prevTodos =>
      prevTodos->Js.Array2.map(task => {
        if task.id === id {
          {
            ...task,
            reminder: !task.reminder,
          }
        } else {
          task
        }
      })
    )

  let toogleShowAddTask = () => setShowAddTask(prev => !prev)

  <div>
    <Header title={"Task Tracker"} toogleShowAddTask showAddTask />
    {if showAddTask {
      <AddTask addTask />
    } else {
      React.null
    }}
    <div>
      {React.array(
        todos->Js.Array2.map(task => <Task key={task.id} task toggleReminder deleteTask />),
      )}
    </div>
  </div>
}