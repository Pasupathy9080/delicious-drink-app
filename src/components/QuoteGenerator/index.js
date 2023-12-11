import styled  from 'styled-components';
import React, { useEffect, useRef, useState } from 'react'

const QuoteGenerator = ({genre}) => {
    
    const quotes = {
        coffee: [
            {quote: '“Someone doesn’t always need a gun to kill you. Sometimes, their actions are enough. You don’t need an assassin to kill you. Sometimes, a lover is enough.”' , by: '― Namrata Gupta, Together We Were (W)hole'},
            {quote: '“The sweetest smiles hold the darkest secrets...”' , by: '― Sara Shepard, Flawless'},
            {quote: '“Nobody’s ever been arrested for a murder; they have only ever been arrested for not planning it properly.”' , by: '― Terry Hayes, I Am Pilgrim'}
        ],
        tea: [
            {quote: '“You should be kissed and often, and by someone who knows how.”' , by: '― Margaret Mitchell, Gone With The Wind'},
            {quote: '“In vain I have struggled. It will not do. My feelings will not be repressed. You must allow me to tell you how ardently I admire and love you.”' , by: '― Jane Austen, Pride And Prejudice'},
            {quote: '“I cannot let you burn me up, nor can I resist you. No mere human can stand in a fire and not be consumed.”' , by: '― A.S. Byatt, Possession'}
        ],
        milk: [
            {quote: "“I like the night. Without the dark, we'd never see the stars.”" , by: '― Stephen Meyer, Twilight'},
            {quote: "“You don't get to choose if you get hurt in this world...but you do have some say in who hurts you. I like my choices.”" , by: '― John Green, The Fault in Our Stars'},
            {quote: "“There's nothing like deep breaths after laughing that hard. Nothing in the world like a sore stomach for the right reasons.”" , by: '― Stephen Chbosky, The Perks if Being a Wallflower'}
        ],
        juice: [
            {quote: "“That makes me a pirate! A space pirate!”" , by: '― Andy Weir, The Martian'},
            {quote: "“Who controls the past controls the future. Who controls the present controls the past.”" , by: '― George Orwell, 1984'},
            {quote: "“Time is an illusion. Lunchtime doubly so.”" , by: "― Douglas Adams, Hitchhiker's Guide to the Galaxy"}
        ],
    }

    const QuoteRef = useRef();

    const [currentQuote, setCurrentQuote] = useState(quotes[genre][0]);

    useEffect(() => {
            let isMounted = true;
            let count = 0;
            const interval = setInterval(() => {
                if(count < 2){
                    QuoteRef.current.style.opacity = '0'
                    count++;
                    setTimeout(() => {
                    setCurrentQuote(quotes[genre][count]);
                    if(isMounted){
                        QuoteRef.current.style.opacity = '1'
                    }    
                }, 1000);
                }else{
                    QuoteRef.current.style.opacity = '0'
                    count = 0;
                    setTimeout(() => {
                        setCurrentQuote(quotes[genre][count]);
                        if(isMounted){
                            QuoteRef.current.style.opacity = '1'
                        }  
                    }, 1000);
                }

                return(() => { 
                    isMounted = false;
                    clearInterval(interval);
                })
            }, 7000);
            return () => clearInterval(interval);
        // eslint-disable-next-line
    }, [genre])
    return (
        <QuotesContainer ref={QuoteRef}>
            <h1>{currentQuote.quote}</h1>
            <p>{currentQuote.by}</p>
        </QuotesContainer>
    )
}

export default QuoteGenerator;

const QuotesContainer = styled.div`
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    align-items: center;
    width: 100%;
    color: #ffffff;
    transition: all .5s ease-out;
    @media (max-width: 450px){
            margin-top: -20px;
        };
    & h1{
        font-style: italic;
        font-weight: 500;
        padding: 0 200px;
        margin: 0 auto;
        @media (max-width: 1290px){
            padding: 0 150px;
        };
        @media (max-width: 1000px){
            padding: 0 100px;
        };
        @media (max-width: 850px){
            padding: 0px 40px;
            font-size: 22px;
        };
    };
    & p{
        width: 80%;
        margin: 30px auto;
        text-align: right;
        @media (max-width: 850px){
            font-size: 15px;
            width: 75%;
        };
    }
`;
