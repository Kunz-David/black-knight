import {atom, atomFamily} from "recoil";

const cardListAtom = atom({
    key: "cardListState",
    default: [
        {name: "Dark Confidant", buyCard: true},
        {name: "Aether Vial", buyCard: false},
        {name: "Forest", buyCard: false},
        {name: "Plains", buyCard: false},
    ]
})

// const cardListAtomFamily = atomFamily()

export {cardListAtom}