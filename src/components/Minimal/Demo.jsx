import React, {Component} from "react";
import {CredentialProvider, guardFactory, Requirement} from "react-rbac-guard";

class MyRequirement extends Requirement {
    constructor(id) {
        super();
        this.id = id;
    }

    isSatisfied(credentials) {
        // For example we expect an object
        return credentials[this.id] ? true : false;
    }
}

const COUNT = 10;
const REQUIREMENTS = [...Array(COUNT)].map((_, id) => ({
    id: id,
    requirement: new MyRequirement(id)
}));

const GUARDS = REQUIREMENTS.map(r => ({
    id: r.id,
    guard: guardFactory(r.requirement)
}));

class Demo extends Component {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
        this.state = {};
    }

    onClick() {
        this.setState({});
    }

    render() {
        let credentials = {};
        for (let id = 0; id < REQUIREMENTS.length; id++) {
            credentials[id] = Math.random() > 0.5;
        }

        return (
            <CredentialProvider value={credentials}>
                <h2>Welcome to the Minimal Example</h2>
                <p>There we have {COUNT} requirements and the same amount of guards.</p>
                <p>Every guard is protected by own requirement.</p>
                <p>
                    Every render() each requirement is satisfied with 50% possibility.
                </p>
                <button onClick={this.onClick}>Try Again!</button>
                {GUARDS.map(G => (
                    <G.guard key={G.id}>
                        <p>Requirement with id=[{G.id}] was satisfied</p>
                    </G.guard>
                ))}
            </CredentialProvider>
        );
    }
}

export default Demo;
