import express from 'express';
import cors from 'cors'
import passport from './auth'

const app = express();
const port = process.env.PORT || 3000;

//middleware for parsing json request body
app.use(express.json());

//middleware for CORS handling

app.use(cors());

app.use(passport.initialize());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went Wrong')
})

app.get('/', (req, res) => {
    res.send('InstaTweet Backend is up and running!');
});

app.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    res.json({ message: 'Login Successfull', user: req.user })
})

// Protected route (requires authentication)
app.get('/protected', passport.authenticate('local', { session: false }), (req, res) => {
    res.json({ message: 'Protected route', user: req.user });
});


app.listen(port, () => {
    console.log('Server is running on port number:', port)
})