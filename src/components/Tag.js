import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';


const Tag = () => {
    const [gif, setGif] = useState('');
    const[loading ,setLoading]=useState(false);
    const[tag, setTag]=useState('');

    const API_KEY=process.env.REACT_APP_GIPHY_API_KEY;
    async function fetchData() {
        setLoading(true);
        const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`;
        try {
            const { data } = await axios.get(url);
            const imageSource = data.data.images.downsized_large.url;
            console.log(imageSource);
           
            setGif(imageSource);
        } catch (error) {
            console.error('Error fetching random GIF:', error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    function clickHandler() {
        fetchData();
    }

    function changeHandler(event){
        setTag(event.target.value);
         
    }

    return (
        <div className='w-[750px]  bg-blue-500 rounded-lg border border-black 
        flex flex-col items-center gap-y-5 mt-[15px] relative'>
            <h1 className='text-3xl underline uppercase font-bold'>
                Random {tag} Gif
            </h1>
            {
                loading ? (<Spinner/>) : (<img src={gif} width={450} alt="Random Gif" /> )
            }

            <input
            type='text'
            className='w-10/12 text-lg py-3  px-5px rounded-lg  mb-3 text-center'
            onChange={changeHandler}
            value={tag}
            />
            
            <button onClick={clickHandler} className='w-10/12 bg-yellow-500 text-lg py-3  px-5px rounded-lg  mb-4'>
                Generate
            </button>
        </div>
    );
}

export default Tag;
