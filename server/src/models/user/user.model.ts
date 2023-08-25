import { UserType } from "../../types/appTypes";

import User from'./user.mongo';

export async function isExistingUser(email:string) {
    const existingUser = await User.findOne({
        email: email
    });

    return existingUser;
}

export async function doSignup(user:UserType) {
    const newUser = new User(user);
    const newUserInserted = await User.create(
        newUser
    )
    return newUserInserted;
}