import React from 'react';
import { useState, useEffect } from 'react';
import "./index.css";
// Icons
import check from './Images/check.svg';
import start from './Images/start.svg';
import remove from './Images/remove.svg';
// words
import j from './words/javascript';
import r from './words/reactjs';
import c from './words/css';
import h from './words/html';
const light = '#fefefe';
const dark = '#282c34';
function TechType({ theme }) {
    const js = j;
    const react = r;
    const css = c;
    const html = h;
    const [value, setValue] = useState('');
    const [word, setWord] = useState('JavaScript');
    const [counter, setCounter] = useState(0);
    const [data, setData] = useState([]);
    const [err, setErr] = useState('');
    const [done, setDone] = useState('');
    const [toggle, setToggle] = useState(false);
    const [enter, setEnter] = useState(1);
    function handleChange(e) {
        setValue(e.target.value);
    }
    function handleSubmit(e) {
        if (e.key === "Enter") {
            if (value === data[counter]) {
                setCounter(counter + 1);
                setValue('');
                if (counter >= data.length - 1) {
                    setDone("Finished.");
                    // setInfos(true);
                }
            }
        }
    }
    const JS = 'JavaScript';
    const REACT = "ReactJS";
    const CSS = 'CSS';
    const HTML = 'HTML';
    function changeWord(e) {
        if (e.key === "Enter") {
            if (word === '') {
                return;
            }
            else if (word.toLowerCase() === JS.toLowerCase()) {
                setData(js);
            }
            else if (word.toLowerCase() === REACT.toLowerCase()) {
                setData(react);
            }
            else if (word.toLowerCase() === CSS.toLowerCase()) {
                setData(css);
            }
            else if (word.toLowerCase() === HTML.toLowerCase()) {
                setData(html);
            }
            else {
                setErr(`${word} not responding!`);
                setWord('JavaScript');
                setData(js);
            }
            setValue('');
            setCounter(0);
        }
    }
    useEffect(() => {
        setData(js);
    }, [word], [counter]);
    function programmingLanguagesLength() {
        if (word.toLowerCase() === JS.toLowerCase()) {
            return js.length;
        }
        else if (word.toLowerCase() === REACT.toLowerCase()) {
            return react.length;
        }
        else if (word.toLowerCase() === CSS.toLowerCase()) {
            return css.length;
        }
        else {
            return html.length;
        }
    }
    function year() {
        let data = new Date();
        let year = data.getFullYear();
        if (year > 2021) {
            return '-' + year;
        }
        else {
            return '';
        }
    }
    const [infos, setInfos] = useState(false);
    useEffect(() => {
        if (word === '') {
            setInfos(true);
        }
        else {
            setInfos(false);
        }
    }, [word])
    return (
        <section className="container">
            <div className="program">
                <div className="err" style={{ display: err.length === 0 ? "none" : "flex" }}>
                    <p>{err}</p>
                    <img src={remove} onClick={() => setErr('')} />
                </div>
                <p style={{ paddingTop: "1em" }}>Input Language.</p>
                <div className="set">
                    <input type="text" placeholder="Program..." value={word} onChange={e => setWord(e.target.value)} onKeyPress={changeWord} style={{ background: theme === light ? "#f1f0ea" : "#536162", color: theme === light ? "" : light, boxShadow: theme === light ? "0 2px 4px #c8c8c8" : "" }} />
                </div>
            </div>
            <div className="type" style={{ display: infos ? "none" : "flex" }}>
                <div className="counter" style={{ display: counter + 1 > programmingLanguagesLength() ? "none" : "flex" }}>
                    <h3>{counter + 1}/{programmingLanguagesLength(), programmingLanguagesLength() < 10 ? "0" + programmingLanguagesLength() : programmingLanguagesLength()} words</h3>
                </div>
                <div className="word" style={{ display: err.length !== 0 ? "none" : "flex" }} style={{ display: done.length === 0 ? "flex" : "none" }}>
                    <img src={start} />
                    <h1>{data[counter]}/<span style={{ color: value === data[counter] ? "#00cc00" : "#ff2442" }}>{value}</span></h1>
                    <p>{value === data[counter] ? <img src={check} style={{ height: "25px" }} /> : ''}</p>
                </div>
                <div className="input">
                    <input type="text" value={value} onChange={handleChange} placeholder="⌨️Type-here..." onKeyPress={handleSubmit} style={{ background: theme === light ? "#f1f0ea" : "#536162", color: theme === light ? "" : light, boxShadow: theme === light ? "0 2px 4px #c8c8c8" : "" }} />
                </div>
                <div className="done" style={{ display: done.length === 0 ? "none" : "flex" }}>
                    <p>{done}</p>
                    <img src={remove} onClick={() => {
                        setDone('')
                        setCounter(0);
                    }} />
                </div>
            </div>
            <div className="jump-container" style={{ display: !toggle ? "none" : "flex" }}>
                <div className="jump-infos" style={{ background: light }}>
                    <i>Total words: {programmingLanguagesLength()}</i>
                    <p>Input word number.</p>
                    <input type="number" placeholder="Input..." value={enter} onChange={e => setEnter(e.target.value)} onKeyPress={e => {
                        if (e.key === "Enter") {
                            if (enter > programmingLanguagesLength() || enter <= 0) {
                                return;
                            }
                            setCounter(parseFloat(enter) - 1);
                            setToggle(!toggle);
                        }
                    }} />
                    <button onClick={() => {
                        if (enter > programmingLanguagesLength() || enter <= 0) {
                            return;
                        }
                        setCounter(parseFloat(enter) - 1);
                        setToggle(!toggle)
                    }}>Apply</button>
                    <div className="close" onClick={() => setToggle(!toggle)}>
                        <img src={remove} />
                    </div>
                </div>
            </div>
            <div className="jump" style={{ display: infos ? "none" : "flex" }}>
                <button onClick={() => setToggle(!toggle)} style={{ boxShadow: theme === light ? "0 2px 4px #c8c8c8" : "" }}>Jump to 🚀</button>
            </div>
            <footer>
                <p>© 2021{year()} TechType | made by <a href="https://github.com/Pagnavathcoding">Pagnavath</a>, All rights reserved.</p>
            </footer>
        </section>
    )
}
function local() {
    const stored = localStorage.getItem("theme");
    if (stored) {
        return localStorage.getItem("theme")
    }
    else {
        return light;
    }
}
function App() {
    const [theme, setTheme] = useState(local());
    function lightTheme() {
        setTheme(light)
    }
    function darkTheme() {
        setTheme(dark)
    }
    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);
    const [language, setLanguage] = useState([
        'JavaScript',
        'ReactJS',
        'CSS',
        'HTML'
    ]);
    const [setting, setSetting] = useState(false);
    return (
        <main style={{ backgroundColor: theme, color: theme === light ? dark : light, transition: "all 0.3s ease-in-out" }}>
            <div className={setting ? "setting show" : "setting"} style={{ background: theme === light ? light : dark, boxShadow: theme === light ? "rgb(200 200 200) 0px 2px 4px" : "", borderRight: theme === light ? '' : '0.1em solid #536162' }}>
                <div className="remove" onClick={() => setSetting(!setting)}>
                    <img src={remove} />
                </div>
                <div className="title" style={{ paddingBottom: "1em" }}>
                    <h1>Setting</h1>
                </div>
                <div className="lang">
                    <p>🔥 Available languages:</p>
                    {
                        language.map((data, index) => {
                            return <li key={index} style={{ background: theme === light ? "#f1f0ea" : "#536162", boxShadow: theme === light ? "rgb(200 200 200) 0px 2px 4px" : "" }}>{data}</li>
                        })
                    }
                </div>
                <div className="work">
                    <p>🔥 How does it work?</p>
                    <li>✔️ Press 'Enter' to submit input value.</li>
                </div>
            </div>
            <header>
                <div className="logo">
                    <h1>ツ TechType</h1>
                    <p onClick={() => setSetting(!setting)}>⚙️</p>
                </div>
                <div className="theme">
                    <button onClick={lightTheme}>Light {theme === light ? <img src={check} /> : ""}</button>
                    <button onClick={darkTheme} style={{ boxShadow: theme === light ? "rgb(200 200 200) 0px 2px 4px" : "" }}>Dark {theme === dark ? <img src={check} /> : ""}</button>
                </div>
            </header>
            <TechType theme={theme} />
        </main>
    )
}
export default App;