/*{"title": "cronalyzer", "description": "create cron schedules with english!"}*/

import styles from "./cronalyzer.module.css";

import { useState } from "react";
import { NextSeo } from "next-seo";
import Aside from "../../components/Aside/Aside"

export default function CronCreator() {
    const [cronInput, setCronInput] = useState();
    const [cronOutput, setCronOutput] = useState('* * * * *')

    function parse(input) {
        if (input != undefined) {
            const words_regex = /run\b|every\b|\d+\b|minut(es|e)\b|secon(ds|d)\b|hou(rs|r)\b|da(y|ys)\b|mont(h|hs)\b/g;
            const words = [...input.matchAll(words_regex)];

            let tokens = [];

            if (words.length > 0) {
                words.forEach((word) => {
                    let type = null;
                    let value = String(word[0]);

                    if (value == "run") {
                        type = "task_initiator";
                    }

                    if (value == "every") {
                        type = "when_specifier";
                    }

                    if (value == "at") {
                        type = "when_specifier";
                    }

                    if (!isNaN(value)) {
                        type = "number";
                        value = parseInt(value);
                    }

                    if 
                    (
                        value == "minute" || value == "minutes" || 
                        value == "hour" || value == "hours" || 
                        value == "day" || value == "days" || 
                        value == "month" || value == "months"
                    ) {
                        type = "time_unit";
                    }

                    tokens.push({
                        type: type,
                        value: value,
                        meta: word
                    });
                });
            }

            if (tokens.length > 0) {
                const numbers = tokens.filter(v => v.type == "number");
                const time_units = tokens.filter(v => v.type == "time_unit");
                const when_specifier = tokens.filter(v => v.type == "when_specifier");

                let time_map = {};
                let carry_map = {};
                let ordered_times = ["minute", "hour", "day", "month", "year"];
                let out = ['* ', '* ', '* ', '* ', '* '];

                if (when_specifier.length == 1) {
                    if (numbers.length == time_units.length && numbers.length > 0) {
                        const time_object = time_units.map((_, idx) => {
                            return {
                                amount: numbers[idx].value,
                                time_unit: time_units[idx].value
                            }
                        });

                        if (when_specifier[0].value == "every") {
                            let carry = 0;

                            time_object.forEach((time) => {
                                let amount = time.amount;
                                let unit = time.time_unit;

                                if (time.time_unit.includes("minute")) {
                                    if (amount > 59) {
                                        carry = Math.floor(amount/60);
                                        amount = amount % 60;
                                    }

                                    unit = "minute";
                                }

                                if (time.time_unit.includes("hour")) {
                                    if (amount > 24) {
                                        carry = time.amount % 23;
                                        amount = amount % 24;
                                    } else {
                                        carry = 0;
                                    }

                                    unit = "hour";
                                }

                                if (time.time_unit.includes("day")) {
                                    if (amount == 0) {
                                        amount += 1;
                                    }
                                    
                                    if (amount > 31) {
                                        carry = Math.floor(amount / 31);
                                        amount = amount % 31;
                                    } else {
                                        carry = 0;
                                    }

                                    unit = "day";
                                }

                                /* so months in cron are 1 - 12, same with days, this stuff is BROKEN over 12 months holy mother of god */
                                if (time.time_unit.includes("month")) {
                                    if (amount > 12) {
                                        carry = Math.floor(amount / 11);
                                        amount = amount % 12;
                                    } else {
                                        carry = 0;
                                    }

                                    unit = "month";
                                }

                                time_map[unit] = amount;
                                carry_map[ordered_times[ordered_times.indexOf(unit) + 1]] = carry;
                            });

                            Object.keys(carry_map).forEach(key => {
                                if (time_map[key] == undefined) {
                                    time_map[key] = 0;
                                }
                                
                                time_map[key] += carry_map[key];
                            });

                            ordered_times.forEach(key => {
                                if (time_map[key] == 0) {
                                    delete time_map[key];
                                }
                            });

                            Object.keys(time_map).forEach(key => {
                                out[ordered_times.indexOf(key)] = '*/' + time_map[key] + ' '
                            });
                        } 
                    }
                }

                setCronOutput(out);
            }
            
        }
    }

    return (
        <div className={styles.cron_container}>
            <NextSeo title="cronalyzer" description="analyze and create cron schedules with english."/>
            <h1>{cronOutput}</h1>

            <div className={styles.cron_input_container}>
                <textarea placeholder="run every 5 minutes..." onInput={e => {setCronInput(e.target.value.replace('\n', '')); parse(e.target.value.replace('\n', ''));}} value={cronInput} rows={1} className={styles.cron_input}></textarea>
            </div>

            <Aside mood="default">
                i feel compelled to say if you use this somewhere and it breaks its not <b>technically <i>my</i> fault.</b>
                <br/>
            </Aside>
        </div>
    )
}