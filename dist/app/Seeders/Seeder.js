import settingsSeed from "./data/settings/settings.js";
import userSeed from "./data/users/users.js";
export const Seed = async () => {
    await userSeed();
    await settingsSeed();
    console.log("Seeding..");
    console.log("Seeding Completed!");
};
//
