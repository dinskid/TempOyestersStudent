const db = require('../config/connection');
const { DataTypes, INTEGER, STRING } = require("sequelize");


const Student = db.define('student_table', {
    student_id: {
        type: DataTypes.INTEGER(255),
      allowNull: false,
      autoIncrement:true,
      primaryKey:true
    },
    customer_id: {
        type: INTEGER,
        // references: {
        //     model: 'customer_table',
        //     key:'customer_id'
        // },
    },
    student_first_name: {
        type: STRING,
        allowNull:false
    },
    student_last_name: {
        type: STRING,
        allowNull:false
    },
    student_phone_number: {
        type: INTEGER,
        allowNull:false
    },
    student_email: {
        type: STRING,
        allowNull:false
    },
    student_password: {
        type: STRING,
        allowNull:false
    }

})

db.sync()
module.exports = Student;