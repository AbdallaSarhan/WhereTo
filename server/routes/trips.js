const router = require("express").Router();
const { header } = require("express-validator");
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", async (req, res) => {
    try {
        
      
        const response = await pool.query("SELECT * FROM trips")

        //console.log(user.rows[0]);
      // console.log(response.rows);
       res.status(200).json({
        status: "success",
        results: response.rows.length,
        data: {
            trips: response.rows 
        },
    })
        
    } catch (error) {
        console.error(error.message)
        res.status(500).json("Server Error")
    }
})

router.post("/post", async (req, res) => {
    console.log(req.body)
    try {
        const post = await pool.query("INSERT INTO trips (user_id, user_name, user_to, user_from, user_restrictions, trip_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", 
        [req.body.headers.id, req.body.headers.name, req.body.headers.to, req.body.headers.from, req.body.headers.restriction, req.body.headers.trip_date])

        console.log(post);
      res.status(201).json({
        status: "success",
        data: {
          post: post.rows[0],
        },
      });
        
    } catch (error) {
        console.error(error.message)
        res.status(500).json("Server Error")
        
    }

})

router.get("/id", async (req, res) => {
    //console.log(req.headers);
    try {
        const getId = await pool.query("SELECT user_id FROM users WHERE user_name = $1", [req.headers.name])
        //console.log(getId.rows);
        res.status(201).json({
            status: "success",
            data: {
               id: getId.rows[0]
            }
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).json("Server Error") 
    }
})


module.exports = router