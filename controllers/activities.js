const express = require('express');
const router = express.Router();
const Activities = require('../models/activities.js');


//___________________
// Routes
//___________________


// INDEX ROUTE
router.get('/', (req, res) => {
  Activities.find({}, (error, allActivities) => {
    res.render('index.ejs', {
      activities: allActivities
    });
  });
});

// NEW ROUTE
router.get('/new', (req, res) => {
  res.render('new.ejs');
});

// POST ROUTE
router.post('/', (req, res) => {
  Activities.create(req.body, (error, newActivity) => {
    res.redirect('/activities');
  });
});

// SEED ROUTE

router.get('/seed', async (req, res) => {
  const newActivities =
    [
      {
        name: 'Bowling',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        img: 'https://imgur.com/LEHS8h3.png',
        tags: 'night-out'
      }
    ]

  try {
    const seedItems = await Activities.create(newActivities)
    res.send(seedItems)
  } catch (err) {
    res.send(err.message)
  }
});

// SHOW ROUTE
router.get('/:id', (req, res) => {
  Activities.findById(req.params.id, (err, foundActivity) => {
      res.render('show.ejs', {
        activity: foundActivity
      });
  });
});

// DELETE ROUTE

router.delete('/:id', (req, res)=>{
    Activities.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/activities');
    });
});

// EDIT ROUTE

router.get('/:id/edit', (req, res)=>{
    Activities.findById(req.params.id, (err, foundActivity)=>{
        res.render(
    		'edit.ejs',
    		{
    			activity: foundActivity
    		}
    	);
    });
});

// PUT ROUTE

router.put('/:id', (req, res)=>{
    Activities.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
        res.redirect('/activities/' + req.params.id);
    });
});



module.exports = router;
