const supertest = require('supertest');
const app = require('./app.js');
const request = supertest(app);

//THIS A TEMPLATE TEST
describe('GET /data/test',()=> {
    test('Should respond with a 200 res code', async () => {
        const response = await request.get("/data/test");
        expect(response.statusCode).toBe(200);
    });
})


//Testing Login

//VALID LOGIN (Username)
describe('Post /login/LoginUser',()=> {
    test('VALID LOGIN (Username) Should respond with a 200 res code', async () => {
        const response = await request.post("/login/LoginUser").send({
            User: 'adrianiscool' ,
            Password: 'qwertyuiop1'
        });
        expect(response.statusCode).toBe(200);
    });
})

//VALID LOGIN (Emails)
describe('Post /login/LoginUser',()=> {
    test('VALID LOGIN (Emails) Should respond with a 200 res code', async () => {
        const response = await request.post("/login/LoginUser").send({
            User: 'adrian2@gmail.com' ,
            Password: 'qwertyuiop1'
        });
        expect(response.statusCode).toBe(200);
    });
})

//Non existing (Username)
describe('Post /login/LoginUser',()=> {
    test('Non existing (Username) Should respond with a 400 res code', async () => {
        const response = await request.post("/login/LoginUser").send({
            User: 'idontexist' ,
            Password: 'qwertyuiop1'
        });
        expect(response.statusCode).toBe(400);
    });
})

//Non existing (email)
describe('Post /login/LoginUser',()=> {
    test('Non existing (email) Should respond with a 400 res code', async () => {
        const response = await request.post("/login/LoginUser").send({
            User: 'idontexist@gmail.com' ,
            Password: 'qwertyuiop1'
        });
        expect(response.statusCode).toBe(400);
    });
})

//Wrong password (Username)
describe('Post /login/LoginUser',()=> {
    test('Non existing (email) Should respond with a 400 res code', async () => {
        const response = await request.post("/login/LoginUser").send({
            User: 'adrianiscool' ,
            Password: 'wrong password'
        });
        expect(response.statusCode).toBe(400);
    });
})

//Wrong password (Username)
describe('Post /login/LoginUser',()=> {
    test('Wrong password (Username) Should respond with a 400 res code', async () => {
        const response = await request.post("/login/LoginUser").send({
            User: 'adrianiscool' ,
            Password: 'wrong password'
        });
        expect(response.statusCode).toBe(400);
    });
})

//Wrong password (Email)
describe('Post /login/LoginUser',()=> {
    test('Wrong password (Email) Should respond with a 400 res code', async () => {
        const response = await request.post("/login/LoginUser").send({
            User: 'adrian2@gmail.com' ,
            Password: 'wrongpassword'
        });
        expect(response.statusCode).toBe(400);supertest
    });
})


//Register

//Valid details
// describe('Post /register/registerUser',()=> {
//     test('Valid details Should respond with a 200 res code', async () => {
//         const response = await request.post("/register/registerUser").send({
//             Username: 'morgan4', 
//             Email: 'adrian2@gmail.com' , 
//             Password: 'bigjimmy1' , 
//             DOB: '12/04/2009'
//         });
//         expect(response.statusCode).toBe(200);
//     });
// })

//non existing email
describe('Post /register/registerUser',()=> {
    test('None existing email Should respond with a 400 res code', async () => {
        const response = await request.post("/register/registerUser").send({
            Username: 'morgan12', 
            Email: 'a@gmail.com' , 
            Password: 'bigjimmy1' , 
            DOB: '12/04/2009'
        });
        expect(response.statusCode).toBe(400);
    });
})

//already exist (username)
describe('Post /register/registerUser',()=> {
    test('Existing username Should respond with a 400 res code', async () => {
        const response = await request.post("/register/registerUser").send({
            Username: 'morgan12', 
            Email: 'acon@gmail.com' , 
            Password: 'bigjimmy1' , 
            DOB: '12/04/2009'
        });
        expect(response.statusCode).toBe(400);
    });
})

//already exist (email)
describe('Post /register/registerUser',()=> {
    test('Existing email Should respond with a 400 res code', async () => {
        const response = await request.post("/register/registerUser").send({
            Username: 'nopeiorginal', 
            Email: 'adrianearlrivera@gmail.com' , 
            Password: 'bigjimmy1' , 
            DOB: '12/04/2009'
        });
        expect(response.statusCode).toBe(400);
    });
})