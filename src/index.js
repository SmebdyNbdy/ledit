import { dElement, dVal, dStyle } from "https://gavrikov.me/modules/DJs/d.js";

const LABEL = Symbol();
const TARGET = Symbol();
const INPUT = Symbol();
const LOCKED = Symbol();
const ATTACHED = Symbol();

var id = 0;

class LEditable {

    static create(targElem) {
        return new LEditable(targElem);
    }

    constructor(targElem) {

        let myId = `ledit_${targElem}_${id}`;

        this[LABEL] = dElement.create()
            .new.label()
            .attr.for(myId)
            .addClass("LEditable");
        this[INPUT] = dElement.create()
            .new.input()
            .attr.type("text")
            .attr.id(myId)
            .attr.name(myId)
            .on.blur((inpt) => this.setInnerValue(inpt))
            .addClass("LEditable");

        this[TARGET] = dElement.create()
            .new[targElem]()
            .addClass("LEditable");

        this[LABEL].child("target", this[TARGET]);
        this[LOCKED] = true;
        this[ATTACHED] = false;

        Object.defineProperty(this, "tag", {
            enumerable: false,
            writable: false,
            configurable: false,
            value: targElem,
        });

        return this;
    }

    get locked() {
        return this[LOCKED];
    }

    get attached() {
        return this[ATTACHED];
    }

    get style() {
        return this[TARGET].style;
    }

    attachAt(parentElement) {
        if (!this[ATTACHED]) {
            parentElement.appendChild(this[LABEL].$);
            this[ATTACHED] = true;
        }
        return this;
    }

    detach() {
        if (this[ATTACHED]) {
            this[LABEL].die();
        }
        return this;
    }

    setInnerValue(input) {
        this[TARGET].$.innerHTML = input;
        return this;
    }

}

export let ledit = {
    LEditable: LEditable,
}
