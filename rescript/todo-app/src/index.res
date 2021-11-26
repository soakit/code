// ReactDom 这个模块来自 "@rescript/react": "^0.10.3",
let rootQuery = ReactDOM.querySelector("#root")

switch rootQuery {
| Some(root) => ReactDOM.render(<App />, root)
| None => ()
}

// rootQuery 是个 option<Dom.element> 类型，在 TypeScript 中相当于
// let { value: rootQuery } = { value?: Element };
