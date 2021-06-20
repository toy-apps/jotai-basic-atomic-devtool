/* eslint-disable no-console */
import React from "react";
import { Provider, atom, useAtom } from "jotai";
import {
  useAtomDevtools,
  useAtomsSnapshot,
  useGotoAtomsSnapshot,
} from "jotai/devtools";
import { AtomicDebugger, useAtomicDevtool } from "atomic-devtools";

const textAtom = atom("hello");
const textLenAtom = atom((get) => get(textAtom).length);
const uppercaseAtom = atom((get) => get(textAtom).toUpperCase());

const test1 = atom(1);
test1.debugLabel = "test1";

const test2 = atom((get) => get(test1) + 1);
test2.debugLabel = "test2";

const test3 = atom((get) => get(test2) + 1);
test3.debugLabel = "test3";

const test4 = atom((get) => get(test3) + 1);
test4.debugLabel = "test4";

const test5 = atom((get) => get(test4) + 1);
test5.debugLabel = "test5";

const test6 = atom((get) => get(test5) + 1);
test6.debugLabel = "test6";

const test7 = atom((get) => get(test6) + 1);
test7.debugLabel = "test7";

const test8 = atom((get) => get(test7) + 1);
test8.debugLabel = "test8";

const test9 = atom((get) => get(test8) + 1);
test9.debugLabel = "test9";

const test10 = atom((get) => get(test9) + 1);

const Input = () => {
  const usedTextAtom = useAtomicDevtool(textAtom, "textAtom");
  const text = usedTextAtom[0];
  const setText = usedTextAtom[1];

  return <input value={text} onChange={(e) => setText(e.target.value)} />;
};

const CharCount = () => {
  const [len] = useAtomicDevtool(textLenAtom, "textLenAtom");

  return <div>Length: {len}</div>;
};

const Uppercase = () => {
  const [uppercase] = useAtomicDevtool(uppercaseAtom, "uppercaseAtom");

  return <div>Uppercase: {uppercase}</div>;
};

const Test = () => {
  const [value] = useAtomicDevtool(test10, "test10");
  useAtomDevtools(test10);
  return null;
};

const snapShot = atom();

const SaveSnapshot = () => {
  const [savedSnapshots, setSnapshots] = useAtom(snapShot);
  let currentSnapshot = useAtomsSnapshot();

  console.log("current SS -> ", currentSnapshot);

  const clickHandler = () => {
    setSnapshots(currentSnapshot);
    console.log("SAVED --> ", savedSnapshots);
  };

  return <button onClick={clickHandler}>SAVE SNAPSHOT</button>;
};

const GoToSnapshot = () => {
  const [savedSnapshots] = useAtom(snapShot);
  const goToSnapshot = useGotoAtomsSnapshot();
  const clickHandler = () => {
    if (savedSnapshots) goToSnapshot(savedSnapshots);
  };

  return <button onClick={clickHandler}>GO TO SNAPSHOT</button>;
};

function App() {
  console.log("test");
  return (
    <Provider>
      <AtomicDebugger>
        <Input />
        <CharCount />
        <Uppercase />
        <SaveSnapshot />
        <GoToSnapshot />
        <Test />
      </AtomicDebugger>
    </Provider>
  );
}

export default App;
