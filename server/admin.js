const db = require('./db')
const utils =require('./utils')
const express = require('express')

const router = express.Router()

router.get('/',(request,response)=> {

    const connection = db.connect()
    const statment = `select * from user`
    connection.query(statment,(error,data) => {
        connection.end()
        const users = []
        for (let index = 0; index < data.length; index++) {
            const user = data[index]
            users.push({
                userId:user['userId'],
                userName: user['userName'],
                emailId: user['emailId'],
                mobileNo: user['mobileNo']
            })
        }
            response.send(utils.createResult(error,users))
    })
})

router.post('/login',(request,response)=> {
    const {emailId,password,userRole} = request.body
    const connection = db.connect()
    const statement = `select * from user where emailId = '${emailId}' and password = '${password}' and userRole ='${userRole}'`

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
                emailId: user['emailId'],
                userRole: user['userRole']
            }
            response.send(utils.createResult(null,info))
        }
        
    })
})

module.exports = router