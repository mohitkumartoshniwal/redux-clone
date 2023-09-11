// import { useSelector, useDispatch } from "react-redux";
import { useSelector, useDispatch } from "./customRedux";
import { increment, decrement } from "./redux/actions/counterActions";
import "./App.css";

function App() {
  const counter = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h3>Counter</h3>
      <div className="container">
        <button onClick={() => dispatch(decrement())}>-</button>
        <h3>{counter}</h3>
        <button onClick={() => dispatch(increment())}>+</button>
      </div>
    </div>
  );
}

export default App;
