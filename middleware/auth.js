const jwt=require("jsonwebtoken");


const auth=((req,res,next)=>{
    try {
        const token=req.headers("x-auth-token")
        console.log(token);
        if (!token) {
            return res.status(403).send({ message: `No token provided! ${token}` });
        }
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(500).send({ message: 'Failed to authenticate token.' });
            }
    
            req.mobileNo = decoded.mobileNo;
            req.userRole = decoded.role;
            next();
        });
    } catch (error) {
        res.send({message:error.message})
    }

})

module.exports=auth;