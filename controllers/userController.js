//SQL
const connection = require('../config/db');

//Get all users
exports.getAllUsers=(req,res)=>{
    connection.query('SELECT * FROM userdata', (err,rows,fields)=>{
        if(err) throw err;
            res.json(rows);
    });
};

//Search a user by ID
exports.getUsersById=(req,res)=>{
    const id=req.params.id;
    connection.query('SELECT * FROM userdata WHERE id=? OR email=?',[id,id],(err,rows,fields)=>{
        if(err) throw err;
        if(rows.length>0)
            res.json(rows);
        else
            res.status(404).json({message: 'User not found'});
    });
};

//Create a new user
//CRUD - Create
exports.createUser=(req,res)=>{
    const {fname,lname,email,gender}=req.body;
    connection.query('INSERT INTO userdata (first_name, last_name, email, gender) VALUES (?,?,?,?)',[fname,lname,email,gender],(err,result)=>{
        if(err) throw err;
            res.json({message: 'User created succesfully', userId:result.insertId});
    });
};

//Update a user
//CRUD - Update
exports.updateUser = (req, res) => {
  const { id,fname,lname,email,gender,course} = req.body;
  connection.query(
    "UPDATE userdata SET first_name=?, last_name=?, email=?, gender=?, course=? WHERE id=?",
    [fname,lname,email,gender,course,id],
    (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
        res.json({ message: "User updated successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    },
  );
};

//Delete a user
//CRUD - Delete
exports.deleteUser = (req, res) => {
  const id = req.body.id;
  connection.query("DELETE FROM userdata WHERE id=?", [id], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
};
