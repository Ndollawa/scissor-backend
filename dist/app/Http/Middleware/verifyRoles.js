const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        //   console.log(allowedRoles)
        const roles = req.roles;
        if (roles === null || roles === undefined)
            return res.status(401).json({ message: 'Unautherized access' });
        // console.log(roles);
        const rolesArray = [...allowedRoles];
        // console.log(rolesArray);
        const result = roles.map((role) => rolesArray.includes(role)).find((val) => val === true);
        if (!result)
            return res.sendStatus(401);
        next();
    };
};
export default verifyRoles;
