import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Update = () => {
    const [book, setBook] = useState({
        title: "",
        desc: "",
        cover: "",
        price: null
    });

    const titleRef = useRef(null);
    const descRef = useRef(null);
    const coverRef = useRef(null);
    const priceRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();
    const id = parseInt(location.pathname.split('/').slice(-1)[0]);

    const handleOnChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleOnClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8800/update/${id}`, book);
            navigate('/books');
        } catch (error) {
            console.log(error);
        }
    };
    /**
     * Load the row related to the ID in the database.
     * @param {Number} id
     *  
     */
    const handleLoad = async (id) => {
        try {
            const res = await axios.get("http://localhost:8800/books/" + id);
            console.log('Données récupérées :', res.data); // Vérifiez ici

            setBook(res.data[0]); 

            console.log('Livre après setBook:', res.data); 
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleLoad(id);
       
    }, []);
    /*Put actual values in the input fields, the goal is to help the user to modify information */
    useEffect(()=>{
      if (book) {
        titleRef.current.value = book.title || "";
        descRef.current.value = book.desc || "";
        coverRef.current.value = book.cover || "";
        priceRef.current.value = book.price !== null ? book.price : "";
    }
    })

    return (
        <div className='form'>
            <h1>Update the book</h1>

            <input
                type="text"
                placeholder='title'
                onChange={handleOnChange}
                name='title'
                ref={titleRef}
            />
            <input
                type="text"
                placeholder='description'
                onChange={handleOnChange}
                name="desc"
                ref={descRef}
            />
            <input
                type="text"
                placeholder='cover'
                onChange={handleOnChange}
                name="cover"
                ref={coverRef}
            />
            <input
                type="text"
                placeholder='price'
                onChange={handleOnChange}
                name="price"
                ref={priceRef}
            />
            <button onClick={handleOnClick}>Update</button>
        </div>
    );
};
