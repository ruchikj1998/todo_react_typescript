import AddToDo from "./components/AddToDo"
import NavBar from "./components/NavBar"
import TodoList from "./components/TodoList"
import "./App.css"

const App = () => {
  return (
    <main>
      <h2>TODO React + TypeScript</h2>

      <NavBar />
      <AddToDo />
      <TodoList />
    </main>
  )
}

export default App
