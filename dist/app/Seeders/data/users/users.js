import bcrypt from 'bcrypt';
import UserModel from '../../../Models/User.js';
const users = [
    {
        email: 'admin@admin.com',
        username: "admin",
        roles: {
            User: 1003,
            Admin: 1000,
        },
        password: "admin123",
        refreshToken: [],
    },
    {
        email: 'dev@admin.com',
        username: "developer",
        roles: {
            User: 1003,
            Admin: 1001,
            Dev: 1000
        },
        password: "dev123",
        refreshToken: [],
    }
];
const userSeed = async () => {
    users.map(async (user) => {
        //check for duplicate emails in the DB
        const duplicate = await UserModel.findOne({ email: user.email } || { username: user.username }).exec();
        if (!duplicate) {
            try {
                //encrypt password
                //encrypt password
                const hashedPassword = await bcrypt.hash(user.password, 10);
                // create and save new User
                const newUser = await UserModel.create({
                    'email': user.email,
                    'username': user.username,
                    'roles': user.roles,
                    'password': hashedPassword
                });
                // userDB.
                //encrypt password
            }
            catch (err) {
                console.log(err);
            }
        }
    });
};
export default userSeed;
