basic setup (npm init y , index.js , imports express mongoose nodemon dotenv)
folder structures
database connection
routes
models
utilities(asynchandler,errorhandler)
middleware(auth,errormiddleware)
user controller.js
message controller.js


{
    "fullName": "Saud Khan",
    "username": "saud_dev",
    "password": "securePassword123",
    "gender": "male"
}
69aeeecedcc42e7b69c96ed1

{
    "username": "nasir_dev",
    "password": "secretPassword123"
}
nasir id = 69ae2d3abe71c7a4987cc537
-------------------------------------------
basic setup
app.listen,db connection
route :  dekh bhai aik folder banai ga routes ka jis mai sarai routes manage hongai an is project mai 2 chzain manage ki hain mainly jo kai hain user or msgs to 2 files bani hain routes folder mai jokai hain userRoute or messageRoute hain ab dekh route ko manage istrha kartai hain kai jo bhi apko kaam karana hai specific routes pr wo aik function banao controller folder mai or phr us function ko call krlo apnai route folder mai for example 
router.post("/login",login)
yai apnai userRouter mai likha hai or login wala function apnai userController mai banaya hai or phr index.js mai jakar isai import krlo or istrha use krlo app.use('/api/v1/user',userRoute)
uskai baad models banao
uskai baad utilities banain
uskai baad middlewares banain
