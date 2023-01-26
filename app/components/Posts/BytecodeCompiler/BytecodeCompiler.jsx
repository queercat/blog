import styles from "./BytecodeCompiler.module.css"
import { useEffect, useState } from "react"

export default function BytecodeCompiler(props) {
    let [comp, setComp] = useState('');
    let [cout, setCout] = useState('');
    let [out, setOut] = useState('');

    let [bytecode, setBytecode]= useState('');

    function compile() {
        const bytess = comp.replace(/,|\n|\r|\t|#.*#/g, '').split(' ').filter(n => n);

        let bytes = new ArrayBuffer(bytess.length);
        let _bytes = "";

        let i = 0;
        bytess.forEach(byte => {
            let _byte = parseInt(byte.split('0x').reverse()[0], 16)
            _bytes += _byte + ' ';
            bytes[i++] = _byte
        });

        setCout(_bytes);
    }

    function run() {
        let bytess = cout.split(' ');
        bytess.pop();
        let bytes = new Uint8Array(bytess.length);

        let i = 0;
        bytess.forEach(byte => {
            bytes[i++]= byte;
        });

        WebAssembly.instantiate(bytes).then((value) => {
            setOut(value.module);
            console.log(value);
        })
    }

    return (
    <div className={styles.compiler_container}>
        <div className={styles.compiler_input}>
            <textarea 
            id={"compiler_input_" + props.id} 
            placeholder={props.hint}
            value={comp}
            onChange={e => setComp(e.target.value)}/>
            <button onClick={compile}>compile</button>
        </div>

        <div className={styles.compiler_output}>
            <textarea id={"compiler_output_" + props.id}
            value={cout}
            onChange={e => setCout(e.target.value)}
            readOnly={true}
            />
            <button onClick={run}>run</button>
        </div>

        <div className={styles.output}>
            <textarea  id={"output_" + props.id}
            value={out}
            onChange={e => setOut(e.target.value)}
            readOnly={true}
            />
        </div>
    </div>
    )
}