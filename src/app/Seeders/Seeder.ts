import settingsSeed from "./data/settings/settings";
import userSeed from "./data/users/users";



  export const Seed = async()=>{
 await userSeed();
 await settingsSeed();
 console.log("Seeding..")
 console.log("Seeding Completed!")

}
  //

  