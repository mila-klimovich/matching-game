import { useState, useEffect } from "react";
import classnames from "classnames";

function MatchingGame({ data }) {
    const [items, setItems] = useState([]);
    const [clickedItems, setClickedItems] = useState([]);
    const [rightItems, setRightItems] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState(new Set());

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        const array = Object.entries(data).flat(1);
        const shuffledArray = shuffleArray(array);
        setItems(shuffledArray);
    }, []);

    const clickHandler = (item) => {
        if (clickedItems.length === 2 || clickedItems.includes(item)) {
            return null;
        }

        const clickedPair = clickedItems.concat(item);
        if (clickedPair.length === 2) {
            const [firstItem, secondItem] = clickedPair;

            if (
                data[firstItem] === secondItem ||
                data[secondItem] === firstItem
            ) {
                setRightItems(clickedPair);
                setTimeout(() => {
                    setMatchedPairs(new Set([...matchedPairs, ...clickedPair]));
                    setRightItems([]);
                    setClickedItems([]);
                }, 1000);
            } else {
                setClickedItems(clickedPair);
                setTimeout(() => {
                    setClickedItems([]);
                }, 1000);
            }
        } else {
            setClickedItems(clickedPair);
        }
    };

    if (matchedPairs.size === items.length) {
        return (
            <div className="game-container">
                <h1>Good job!</h1>
            </div>
        );
    }

    return (
        <div className="game-container">
            {items.map((item) => {
                if (matchedPairs.has(item)) {
                    return null;
                }
                const isClicked =
                    clickedItems.includes(item) || rightItems.includes(item);
                const isRight = rightItems.includes(item);
                const isWrong =
                    clickedItems.length === 2 && isClicked && !isRight;
                return (
                    <button
                        className={classnames(
                            "item-button",
                            isClicked && "clicked",
                            isWrong && "wrong",
                            isRight && "right"
                        )}
                        key={item}
                        onClick={() => clickHandler(item)}
                    >
                        {item}
                    </button>
                );
            })}
        </div>
    );
}

export default MatchingGame;
