import React , {Component} from 'react';
import './App.css';
import Minimal from "./components/Minimal/Demo.jsx";
import RoleBasedDemo from "./components/RoleBased/Demo.jsx";

const DEMOS = [
    { name: "RoleBased", component: RoleBasedDemo },
    { name: "Minimal", component: Minimal },
];
class App extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state = { demoID: 0 };
    }
    handleChange(event) {
        this.setState({ demoID: event.target.value });
    }
    render() {
        const { demoID } = this.state;
        const currentDemo = DEMOS[demoID];

        return (
            <>
                <h1>React Guard Demos</h1>
                <h2>Please, select demo to render</h2>
                <p>
                    <select value={demoID} onChange={this.handleChange}>
                        {DEMOS.map((demo, ID) => (
                            <option key={ID} value={ID}>
                                {demo.name}
                            </option>
                        ))}
                    </select>
                </p>

                <currentDemo.component />
            </>
        );
    }
}
export default App;
