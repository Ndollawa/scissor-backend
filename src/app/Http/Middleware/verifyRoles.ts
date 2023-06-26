import {Request,Response, NextFunction} from 'express'

 const verifyRoles = (...allowedRoles:[number] | number[]) =>{
    return(req:Request, res:Response, next:NextFunction)=>{
   //   console.log(allowedRoles)
     const roles = req.roles;
        if(roles === null || roles === undefined) return res.status(401).json({message:'Unautherized access'});
        // console.log(roles);
        const rolesArray = [...allowedRoles];
        // console.log(rolesArray);
      const  result = roles.map((role:number) => rolesArray.includes(role)).find((val:boolean) => val === true);
        if(!result) return res.sendStatus(401);
        next();
    }

 }

export default  verifyRoles;

