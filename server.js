const express=require('express');
const cors=require('cors');
const morgan=require('morgan')
const dotenv=require('dotenv')
const colors=require('colors');
const connectDb=require('./config/connectDb');

//config dot env file
dotenv.config();

//connecting to Db
connectDb();

//rest object
const app=express();

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//user routes
app.use('/api/v1/users',require('./routes/userRoute'))

//transaction router
app.use('/api/v1/transactions',require('./routes/transactionRoute'));

//port
const PORT= 8080|| process.env.PORT

//server listening
app.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`);
})