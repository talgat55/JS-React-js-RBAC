import {  Requirement } from "react-rbac-guard";
class MyRequirement extends Requirement {
    constructor(credentials) {
        super();
        this.credentials = credentials;
    }

    isSatisfied(credentials) {
        return this.credentials === credentials;
    }
}

const NeedAdmin = new MyRequirement("admin");
const NeedManager = new MyRequirement("manager");
const NeedUser = new MyRequirement("user");
const NeedGuest = new MyRequirement("guest");

export { NeedAdmin, NeedManager, NeedUser, NeedGuest };
