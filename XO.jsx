

import React, { useRef, useState } from 'react'
import './XO.css'
import circle_icon from '../components/assets/circle.png'
import cross_icon from '../components/assets/cross.png'

let data = ["","","","","","","","",""];


const XO = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const titleref = useRef(null);

    const toggle = (e, num) => {
        if (lock || data[num] !== "") {
            return;
        }
        if (count % 2 === 0) {
            e.target.innerHTML = `<img src='${cross_icon}'/>`;
            data[num] = "x";
        } else {
            e.target.innerHTML = `<img src='${circle_icon}'/>`;
            data[num] = "o";
        }
        setCount(count + 1);
        checkwin();
    };

    const checkwin = () => {
        // Rows
        if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
            won(data[0]);
        } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
            won(data[3]);
        } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
            won(data[6]);
        }
        // Columns
        else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
            won(data[0]);
        } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
            won(data[1]);
        } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
            won(data[2]);
        }
        // Diagonals
        else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
            won(data[0]);
        } else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
            won(data[2]);
        }
    };

    const won = (winner) => {
        setLock(true);
        if (winner === "x") {
            titleref.current.innerHTML = `Congratulations : <img src='${cross_icon}'/>`;
        } else {
            titleref.current.innerHTML = `Congratulations : <img src='${circle_icon}'/>`;
        }
    };

    const resetGame = () => {
        for (let i = 0; i < 9; i++) {
            data[i] = "";
        }
        setLock(false);
        setCount(0);
        if (titleref.current) titleref.current.innerHTML = 'X O Game In <span>react</span>';
        // Clear board visuals
        const boxes = document.querySelectorAll('.boxes');
        boxes.forEach(box => box.innerHTML = "");
    };

    return (
        <div>
            <div className='container'>
                <h1 className="title" ref={titleref}>X O Game In <span>react</span></h1>
                <div className="board">
                    <div className="row1">
                        <div className="boxes" onClick={(e) => toggle(e, 0)}>0</div>
                        <div className="boxes" onClick={(e) => toggle(e, 1)}>1</div>
                        <div className="boxes" onClick={(e) => toggle(e, 2)}>2</div>
                    </div>
                    <div className="row2">
                        <div className="boxes" onClick={(e) => toggle(e, 3)}>3</div>
                        <div className="boxes" onClick={(e) => toggle(e, 4)}>4</div>
                        <div className="boxes" onClick={(e) => toggle(e, 5)}>5</div>
                    </div>
                    <div className="row3">
                        <div className="boxes" onClick={(e) => toggle(e, 6)}>6</div>
                        <div className="boxes" onClick={(e) => toggle(e, 7)}>7</div>
                        <div className="boxes" onClick={(e) => toggle(e, 8)}>8</div>
                    </div>
                </div>
                <button className="reset" onClick={resetGame}>Reset</button>
            </div>
        </div>
    );
};

export default XO;
