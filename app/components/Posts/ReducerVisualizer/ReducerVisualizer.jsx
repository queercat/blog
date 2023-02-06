import styles from "./ReducerVisualizer.module.css";
import { useState } from "react";
import { useEffect } from "react";

export default function ReducerVisualizer(props) {
    const [input, setInput] = useState(props.input.split('\n').join('').split('\r').filter(value => value));
    const [reduced, setReduced] = useState(false);

    const [oldSize, setOldSize] = useState('old size: ' + (props.input.length)+ ' bytes');
    const [newSize, setNewSize] = useState('');

    function reduce() {
        if (!reduced) {
            setReduced(true);

            const out = input.map(val => {
                const sep = val.split(' ');

                const quantity_regex =/^\d+$/
                const word_regex = /^\w+$/
                const skin_regex = /\<\w+\>/
                const set_regex = /\[\w+\]/
        
                let quantities = [];
                let words = [];
                let skins = [];
                let sets = [];

                sep.forEach(c => {
                    if (quantity_regex.test(c)) {
                        quantities.push(c)
                    }

                    else if (word_regex.test(c)) {
                        words.push(c);
                    }

                    else if (skin_regex.test(c)) {
                        skins.push(c);
                    }

                    else if (set_regex.test(c)) {
                        sets.push(c)
                    }
                })

                let set_code = sets[0] ? sets[0].slice(1, -1) + '-' : ''
                let name_code = words.map(word => (word[0])).join('')
                let skin = skins[0] ? skins[0].slice(1, -1) : ''

                return (set_code + name_code + ' ' + skin)
            });
            

            let copy = input.slice();
            out.map((value, index) => {
                setTimeout(() => {                
                    copy[index] = value;
                    setInput(() => [...copy]);
                    if (index >= out.length - 1){
                        setNewSize('new size: ' + out.join('\n').length + ' bytes')
                    }
                }, index * 25);
            })
        }
    }

    return (
        <div className={styles.reducer_container}>
            <div className={styles.reducer_view}>
                {input.map((value, index) => {
                    return <div className={styles.reducer_item} key={index}>{value}</div>
                })}
            </div>

            <button onClick={reduce}>reduce me!</button>
            <div className={styles.sizes}>
                <div>{oldSize}</div>
                <div>{newSize}</div>
            </div>
        </div>
    )
}
