const db = require('./db')
const utils =require('./utils')
const express = require('express')

const router = express.Router()

router.get('/',(request,response)=> {

    const connection = db.connect()
    const statment = `SELECT * FROM user WHERE userRole = 'user';`
    connection.query(statment,(error,data) => {
        connection.end()
        const users = []
        for (let index = 0; index < data.length; index++) {
            const user = data[index]
            users.push({
                userId:user['userId'],
                userName: user['userName'],
                emailId: user['emailId'],
                mobileNo: user['mobileNo'],
                userRole: user['userRole']
            })
        }
            response.send(utils.createResult(error,users))
    })
})

router.post('/login',(request,response)=> {
    const {emailId,password} = request.body
    const connection = db.connect()
    const statement = `select * from user where emailId = '${emailId}' and password = '${password}'`

    connection.query(statement,(error, users) => {
        connection.end()

        if(users.length == 0)
        {
            response.send(utils.createResult('user does not exits'))
        }
        else
        {
            const user = users[0]
            const info = {
                userName: user['userName'],
                emailId: user['emailId']
            }
            response.send(utils.createResult(null,info))
        }
        
    })
})

router.post('/register',(request,reponse) => {
    const {userId,userName,emailId,password,mobileNo,userRole} = request.body
    const connection = db.connect()

    const statement1 = `select * from user where emailId = '${emailId}'`
    connection.query(statement1,(error,users) => {

        if(users.length == 0)
        {
            const statement = `insert into user(userName, emailId, password, mobileNo, userRole) values ('${userName}','${emailId}','${password}','${mobileNo}','${userRole}')`
            connection.query(statement,(error,data) => {
                connection.end()
                reponse.send(utils.createResult(error,data))
            })
        }
        else{
            connection.end()
            reponse.send(utils.createResult('email exists. Please use another email.'))
        }
        
    })
})

module.exports = router