import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

// Sample user data (replace with your actual user data from MongoDB)
const users = [
    {
        id: 1,
        username: 'testuser',
        password: '$2b$10$dWTk1y0Bq1P0u2Fwdoa8LOLysE7p8GvVp35LwHTpI46.Rw1Txc6Zq', // Hashed password for 'testpassword'
    },
];

passport.use(
    new LocalStrategy((username, password, done) => {
        //find user by username
        const user = users.find((user => user.username == username));
        console.log(bcrypt.hash(password), user.password)
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: "Invalid Username or Password" })
        }

        return done(null, user);
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id);
})
passport.deserializeUser((id, done) => {
    const user = users.find((user) => user.id == id)
    done(null, user)
})

export default passport;