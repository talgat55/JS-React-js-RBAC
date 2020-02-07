import React, { Component } from "react";
import {CredentialProvider, guardFactory, Requirement,Guard,any,not ,protect} from "react-rbac-guard";



import Button from "./Button";

import { ROLES } from "./roles";
import { NeedAdmin, NeedManager, NeedUser, NeedGuest } from "./requirements";

const Admin = guardFactory(NeedAdmin);
const Manager = guardFactory(NeedManager);
const User = guardFactory(NeedUser);
const Guest = guardFactory(NeedGuest);
const Authorized = guardFactory(not(NeedGuest));

const AdminOrManager = guardFactory(any(NeedAdmin, NeedManager));

const GuestButton = protect(NeedGuest)(Button);

class Demo extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state = { roleID: 0 };
    }

    handleChange(event) {
        this.setState({ roleID: event.target.value });
    }

    onClick() {
        alert("Coming soon...");
    }

    render() {
        const { roleID } = this.state;
        const currentRole = ROLES[roleID];

        return (
            <CredentialProvider value={currentRole.credentials}>
                <h2>Welcome to the Role Based Example</h2>
                <p>
                    Current role is <b>{currentRole.name}</b>. Please, select your role
                </p>
                <select value={roleID} onChange={this.handleChange}>
                    {ROLES.map((role, ID) => (
                        <option key={ID} value={ID}>
                            {role.name}
                        </option>
                    ))}
                </select>

                <p>
                    <GuestButton onClick={this.onClick}>Sign Up</GuestButton>
                </p>

                <Admin>
                    <p>This text is available only to Admins.</p>
                </Admin>
                <Manager>
                    <p>This text is available only to Managers.</p>
                </Manager>
                <User>
                    <p>This text is available only to Users</p>
                </User>
                <Guest>
                    <p>This text is available only to Guests</p>
                </Guest>
                <AdminOrManager>
                    <p>This text is available to Admins and Managers</p>
                </AdminOrManager>

                <Authorized>
                    <p>
                        This text is <b>not</b> available to Guests
                    </p>
                </Authorized>

                <Guard requirement={NeedUser}>
                    <Button onClick={this.onClick}>Request Admin Approve</Button>
                    <Button onClick={this.onClick}>Request Manager Approve</Button>
                </Guard>
            </CredentialProvider>
        );
    }
}

export default Demo;
