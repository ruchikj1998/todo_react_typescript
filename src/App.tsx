import AddToDo from "./components/AddToDo"
import NavBar from "./components/NavBar"
import ToDoList from "./components/TodoList"
import "./App.css"

const App = () => {
  return (
    <main>
      <h2>TODO React + TypeScript</h2>

      {/* components */}
      <NavBar />
      <AddToDo />
      <ToDoList />
      
    </main>
  )
}

export default App
