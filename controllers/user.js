
const User=require("../models/user")

module.exports.rendireSignupForm=(req,res)=>{
    res.render("users/signup.ejs")
}

module.exports.signup=async(req,res)=>{
    try{
     let {username, email, password,emailPassword}=req.body
     const newUser=new User({email,username, emailPassword})
     const registeredUser=await User.register(newUser,password)
     console.log(registeredUser)
     req.login(registeredUser,(err)=>{
         if(err){
             return next(err)
         }
         req.flash("success","Welcome to Seva")
         res.redirect("/listings")
     })
    }
    catch(e){
     req.flash("error",e.message)
     res.redirect("/signup")
    }
 }

 module.exports.rendireLoginForm=(req,res)=>{
    res.render("users/login.ejs")
}

module.exports.login=async(req,res)=>{
    req.flash("success","Welcome to Seva you are Loged in!")
    let redirectUrl=res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl)
}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
        return next(err)
        }
        req.flash("success","You are loged out Now!")
        res.redirect("/listings")
    })
}