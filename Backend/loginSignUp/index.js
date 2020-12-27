const router = require('express').Router();
const Student = require('./model');
const { sendWelcomeEmail,sendPasswordResetEmail } = require('../emails/account');
const { sendsms } = require('../completed_test_modules/sendSmsModule');
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken');


//Create a new User
router.post('/register' , async (req,res) => {
    console.log('❓',req.body.values);
    try{
        let { student_first_name,
            student_last_name,
            student_phone_number,
            student_email,
            student_password,using_google=false } = req.body.values;
        
        //Don't change it to let otherwise DB is will not connect
        sqlCheck = await Student.findOne({
            where: {
              student_email
            }
        });

        if(sqlCheck){
            return res.json({
                success:0,
                error:'Email Aready Registered'
            })
        }

        if(!using_google) {
            const salt = bcrypt.genSaltSync(10);
            student_password = bcrypt.hashSync(student_password,salt)
        }
        //Change it to customer email and customer name
        let name=student_first_name;
        if (student_last_name)
            name = `${student_first_name} ${student_last_name}`; 
        
        let temp = await sendWelcomeEmail(student_email,name);
        console.log('🚀', temp);
        
        // sending sms 
        if (!using_google) {
            const result=await sendsms(student_phone_number,'test')
            console.log(result);
        }
        const user = await Student.create({student_first_name,
            student_last_name,
            student_phone_number,
            student_email,
            student_password
        });

        //  res.status(200).json({
        //     success:1,
        //     message:"User Successfully Created"
        // });
        res.redirect(307, '/auth/login');

    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success:0,
            error:"Database connection error",
            errorReturned:err
        });
    }
})

// sigin in a user
router.post('/login', async (req, res) => {
    console.log(req.body.values);

    try {
        const {student_email,student_password='',using_google=false} = req.body.values;

        const sqlCheck = await Student.findOne({
            where: {
              student_email
            },
            attributes:['student_id','student_password']
        });
        if(!sqlCheck){
            return res.status(200).json({
                        success:0,
                        error:"Email not registered",
            });
        }
        else {
            if(!using_google) {
                let storedPassword = sqlCheck.dataValues.student_password;
                const matchPassword = bcrypt.compareSync(student_password,storedPassword);
                console.log(matchPassword)
                if(!matchPassword){
                    return res.status(200).json({
                        success:0,
                        error:"Incorrect Password",
                    });
                }
            }

            const jwtToken = jwt.sign({student_id : sqlCheck.dataValues.student_id},process.env.JWT_KEY,{
                expiresIn:"1h"
            });

            return res.status(200).json({
                success:1,
                message:"Login Successful",
                token:jwtToken
            });


        }
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success:0,
                error:"Database connection error",
                errorReturned:err
            });
        }
})

router.post('/forgotPassword',async (req, res) => {
    try {
        const { email } = req.body.values;
        sqlCheck = await Student.findOne({
            where: {
              student_email:email
            },
            attributes:['student_id']
        });
        console.log('RAN SUCCESSFULLY')
        // console.log('❓',sqlCheck.dataValues)

        if (!sqlCheck) {
            console.log('email not found')
            return res.status(500).json({
                        success:0,
                        error:"Email not registered",
                    });
        } else {
            let temp = await sendPasswordResetEmail(email);
            console.log('🚀', temp);
            
            return res.status(200).json({
                success: 1,
                error: ''
            })
        }
    } catch (err) {
        console.log('final err',err)
        return res.status(500).json({
            success: 0,
            error: "Database Connection Error",
            errorReturned:err
        })
    }
})

router.post('/reset-password',async (req, res) => {
    try {
        const { email, newPassword } = req.body.values;
        const salt = bcrypt.genSaltSync(10);
        new_hashed_password = await bcrypt.hashSync(newPassword, salt)
        
        const sqlCheck = await Student.update(
            { student_password: new_hashed_password },
            { where:{ student_email:email }}
        )  
        if (sqlCheck==0) 
            return res.status(400).json({
                success: 0,
                error:'Mail not registered'
            })
        
        return res.status(200).json({
                    success: 1,
                    error: ''
                })

    } catch (err) {
        console.log('final err',err)
        return res.status(500).json({
            success: 0,
            error: "Database Connection Error",
            errorReturned:err
        })
    }

})

module.exports = router;