import {useEffect, useState} from 'react';
import {animateOpacity, animateColor, getRandomColor} from './utils';

const COLOR_INIT = '#333333';

function App() {
    const [quote, setQuote] = useState({content: '', author: ''});
    const [quotes, setQuotes] = useState([]);
    const [opacity, setOpacity] = useState(0);
    const [color, setColor] = useState({
        cur: COLOR_INIT,
        prev: COLOR_INIT,
        use: COLOR_INIT
    });

    useEffect(() => {
        async function fetchData() {
            const data = await getQuotes();
            setQuotes(data)
            setQuote(getQuote(data))
        }

        fetchData();
        updateColor();
        animateOpacity(0 , 1, 1000, setOpacity);
    }, []);

    useEffect(() => {
        animateColor(color, setColor);

    }, [color.cur])

    function updateColor() {
        const newColor = getRandomColor()

        if (newColor === color.cur) {
            updateColor()
            return
        }

        setColor(prevState => ({...prevState, prev: prevState.cur, cur: newColor}))
    }

    function getQuote(data = quotes) {
        const {content, author} = data[Math.floor(Math.random() * data.length)]
        return {content, author}
    }
    async function getQuotes() {
        try {
            const res = await fetch('https://api.quotable.io/quotes/random?limit=150')
            return await res.json()
        } catch (error) {
            console.error(error)
        }
    }

    function handleClick() {
        updateColor()
        animateOpacity(1, 0, 500, setOpacity);

        setTimeout(() => {
            setQuote(getQuote())
            animateOpacity(0, 1, 500, setOpacity);
        } , 500)
    }

    return (
        <div className="container" style={{"--bg": color.use}}>
            {quote.content && <div id="quote-box" className="[ quote ] [ stack ]">
                <blockquote id="text" className="[ quote__text ] [ text-center ]" style={{opacity}}>{quote.content}</blockquote>
                <p id="author" className="[ quote__author ] [ text-center ]" style={{opacity}}>{quote.author}</p>

                <div id="buttons" className="space-3 direction-row justify-items-between">
                    <div>
                        <a id="tweet-quote" className="btn" href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(`${quote.content} - ${quote.author}`)}`} title="Tweet this quote!" target="_blank" rel="noreferrer">
                            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                <path
                                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                            </svg>
                        </a>
                    </div>
                    <button id="new-quote" onClick={handleClick} className="btn">New quote</button>
                </div>
            </div>}
        </div>
    )
}

export default App
