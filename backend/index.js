import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
const app = express()
const db = mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'password',
    database:'test',
    port: 3306
    
})

app.use(express.json( ))
app.use(cors())
app.get('/', (req, res)=>{
    res.json('this is the backend')
})

app.get('/books', (req,res)=>{
    const query="select * from books"
    db.query(query, (err, data)=>{
        if (err){
            return res.json(err)
        }else{
            return res.json(data)
        }
    })
})

app.get('/books/:id', (req,res)=>{
    const bookId = req.params.id;
    const query="select * from books where id = ? ";

    db.query(query, [bookId],(err, data)=>{
        if (err){
            return res.json(err)
        }else{
            return res.json(data)
        }
    })
})
app.post('/books', (req, res)=>{
    const query = "INSERT INTO BOOKS (`title`,`desc`, `cover`, `price`) values (?)";
    const values = [
        req.body.title, 
        req.body.desc, 
        req.body.cover,
        req.body.price];

    db.query(query, [values], (err, data)=>{
        if (err) return console.log(err)
        return res.json("Book added")
    });
   
});

app.delete('/books/:id', (req, res)=>{
    const bookID = req.params.id;
    const query = "DELETE FROM BOOKS WHERE id = ?";
    db.query(query, [bookID], (err, data)=>{
        if (err) return console.log(err)
        return res.json("Book deleted")
    });
})
app.put('/update/:id', (req, res)=>{
    const bookID = req.params.id;
    const query = "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE `id` = ?";
    const values = [
        req.body.title, 
        req.body.desc, 
        req.body.cover,
        req.body.price];
    db.query(query, [...values,bookID], (err, data)=>{
        if (err) return console.log(err)
        return res.json("Book updated")
    });
})
app.listen(8800, ()=>{
    console.log('Connected to backend..')
})