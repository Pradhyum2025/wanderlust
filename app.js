
   if(process.env.NODE_ENV!="production"){
       require("dotenv").config();
   }
   console.log(process.env.SECRET);


    //require express package
    const express=require("express");
    const app=express();
    const path=require("path");
    const methodOverride=require("method-override");
    const ejsMate=require("ejs-mate");
    const ExpressError=require("./utils/ExpressError.js");


    app.set("view engine","ejs");
    app.set("views",path.join(__dirname,"/views"));
    app.use(methodOverride("_method"));
    app.engine("ejs",ejsMate);
    app.use(express.static(path.join(__dirname,"/public")));
    //use middleware to fetch data inot url body
    app.use(express.urlencoded({ extended: true }));
    const session=require("express-session");
    const mongoStore=require("connect-mongo")
    const flash=require("connect-flash");
    const passport=require("passport");
    const LocalStrategy=require("passport-local");
    const User=require("./models/user.js");


    const listingRouter=require("./routers/listing.js");
    const reviewRouter=require("./routers/review.js");
    const userRouter=require("./routers/user.js");

    const mongoose=require("mongoose");
    const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust';
    const dbUrl=process.env.ATLASDB_URL;
    main()
    .then(()=>{console.log("mongoose is responsing...")})
    .catch((err)=>{console.log(err)});

    async function main(){
        await mongoose.connect(MONGO_URL);
    }

    // const store = mongoStore.create({
    //     mongoUrl:dbUrl,
    //     crypto:{
    //        secret:process.env.SECRET 
    //     },
    //     touchAfter:24*3600,
    // })

    // store.on("error",()=>{
    //  console.log("ERROR in mongo session store",err)
    // })

    const sessionOptions={
        // store,
        secret:process.env.SECRET ,
        resave:false,
        saveUninitialized:true,
        cookie:{
            expires:Date.now()+7*24*60*60*1000,
            maxAge:7*24*60*60*1000,
            httpOnly:true
        }
    }
    app.use(session(sessionOptions));
    app.use(flash());

    //passport 
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());


    //flash middleware
    app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error")
    res.locals.currUser=req.user;
    next();
    });

    //listing route
    app.use("/listings",listingRouter);
    
    // review route
    app.use("/listings/:id/reviews",reviewRouter);

    //user authentication 
    app.use("/",userRouter);



    app.all('*',(req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
    });

    app.use((err,req,res,next)=>{
        let {status=500, message="Something went wrong"}= err;
        res.status(status).render("./listings/error.ejs",{err});
    });
    

    const port=8080;
    app.listen(port,()=>{
        console.log("server connected");
    });

