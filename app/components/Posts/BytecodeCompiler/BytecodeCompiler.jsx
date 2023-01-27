import styles from "./BytecodeCompiler.module.css"
import { useEffect, useState } from "react"
import Script from 'next/script'

export default function BytecodeCompiler(props) {
    let [comp, setComp] = useState('');
    let [cout, setCout] = useState('');
    let [out, setOut] = useState('');

    let [program, setProgram] = useState([]);

    var wabt;

    useEffect(() => {
       wabt = window.wabt
    });

    function compile() {
        const bytess = comp.replace(/,|\n|\r|\t|#.*#/g, '').split(' ').filter(n => n);

        let bytes = new Uint8Array(bytess.length + props.preappend.length);
        let _bytes = "";
        
        let i = 0;

        if (props.kind != undefined) {
            if (props.kind == "simple_function") {
                    bytes = new Uint8Array(bytess.length + props.preappend.length + 5)
            } else {
                throw new Error("invalid kind on bytecode compiler present");
            }
        }

        props.preappend.forEach(byte => {
            _bytes += String(byte + ' ')
            bytes[i++] = byte;
        })

        if (props.kind != undefined) {
            if (props.kind == "simple_function") {
                bytes[i++] = 0x0a
                bytes[i++] = bytess.length + 3
                bytes[i++] = 0x01
                bytes[i++] = bytess.length + 1
                bytes[i++] = 0x00
            }
        }

        bytess.forEach(byte => {
            let _byte = parseInt(byte.split('0x').reverse()[0], 16)
            _bytes += _byte + ' ';
            bytes[i++] = _byte
        });

        try {
            const wasm = wabt.readWasm(bytes, { readDebugNames: true });
            const wat = wasm.toText({ foldExprs: false, inlineExport: false });

            setProgram(bytes);
            setCout('[' + _bytes.trim() + ']' + "\n\n" + wat);
        } catch(e) {
            setCout('Compilation Error 😿 \n\n' + e);
        }
    }

    function run() {
        var bytes = new Uint8Array(program.length);

        let i = 0;
        program.forEach(byte => {
            bytes[i++] = byte;
        });

        
        WebAssembly.instantiate(bytes).then((value) => {
                setOut(value.module);
                
                if (props.kind != undefined) {
                    if (props.kind == "simple_function") {
                        setOut(value.instance.exports.main());
                    }
                }

                console.log(value);
        }).catch((error) => {
            setOut("Compiler Error 🌈\n\n" + error)
        })
    }

    return (
    <div className={styles.compiler_container}>
        <Script src="/scripts/wabt.js"></Script>
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