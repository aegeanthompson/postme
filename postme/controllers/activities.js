const express = require('express');
const router = express.Router();
const Activities = require('../models/activities.js');
// const methodOverride  = require('method-override');
// router.use(methodOverride('_method'));

//___________________
// Routes
//___________________


// SEED ROUTE

router.get('/seed', async (req, res) => {
  const newActivities =
    [
      {
        name: 'Dinner Detective',
        description: 'America’s largest interactive comedy murder mystery dinner show is now playing in Austin, Texas! Solve a hilarious crime while you feast on a fantastic dinner. Just beware! The culprit is hiding in plain sight somewhere in the room, and you may find yourself as a Prime Suspect before you know it!',
        img: 'https://i.ibb.co/Wch59cP/e520fd68-6a9b-4626-9d1e-42be3894b809-f641567ac90b5e161685e7389d96dab1.jpg',
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

// NEW ROUTE
router.get('/new', (req, res) => {
  res.render('new.ejs');
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

// INDEX ROUTE
router.get('/', (req, res) => {
  Activities.find({}, (error, allActivities) => {
    res.render('index.ejs', {
      activities: allActivities
    });
  });
});

// SHOW ROUTE
router.get('/:id', (req, res) => {
  Activities.findById(req.params.id, (err, foundActivity) => {
      res.render('show.ejs', {
        activity: foundActivity
      });
  });
});



// POST ROUTE
router.post('/', (req, res) => {
  Activities.create(req.body, (error, newActivity) => {
    res.redirect('/activities');
  });
});


module.exports = router;
