const express = require('express');
const router = express.Router();
const Activities = require('../models/activities.js');
const Favs = require('../models/favs.js');

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
      },
      {
        name: 'Adult Coloring',
        description: 'Come to release your stress while enjoying the calming benefits of coloring books.',
        img: 'https://news.artnet.com/app/news-upload/2018/01/15881447631_d8c3652934_k-1024x683.jpg',
        tags: 'night-out',
        hours: '(Monday) 6:30 pm - 8:00 pm',
        location: 'APL - Ruiz Branch: 1600 Grove Blvd, Austin, TX 78741',
        info: 'http://library.austintexas.gov/event/coloring-adults-605992'
      },
      {
        name: 'Stand Up Paddle Boarding',
        description: 'SUP Austin! Rowing Dock is one of the top spots for paddle boarding in Austin. We’ve got a huge selection of stand up paddle boards that are suitable for people of all ages and skill levels.',
        img: 'http://48tx1q1rrcysi4t7l687xbtt.wpengine.netdna-cdn.com/wp-content/uploads/2019/07/sunset-SUP-700x350.jpg',
        tags: 'day-out',
        hours: 'HOURS: MONDAY-SUNDAY 7:30 AM-8:30 PM',
        location: '2418 STRATFORD DRIVE, AUSTIN, TX 78746',
        info: 'https://www.rowingdock.com/'
      },
      {
        name: 'Peter Pan Mini Golf',
        description: 'An Austin tradition since 1948, Peter Pan Mini Golf is fun for all ages. Enjoy two 18-hole courses filled with a variety of characters, obstacles, and surprises.',
        img: 'https://i0.wp.com/do512family.com/wp-content/uploads/2015/07/IMG_3754.jpg',
        tags: 'day-out',
        hours: 'Mon-Thurs: 9am till midnight, Fri: 9am till 1am, Sat: 9am till 1am, Sun: 9am till 11pm',
        location: '1207 Barton Springs Rd., Austin, TX 78704',
        info: 'http://peterpanminigolf.com/'

      },
      {
        name: 'iFLY Austin - Indoor Skydiving',
        description: 'Experience the thrill of human flight at iFLY Austin in North Austin, Texas. Fun for all ages!',
        img: 'http://meet.austintexas.org/sites/default/master/files/styles/listing_large/public/mmg_lfef_images/ifly-austin-indoor-skydiving-122-336.jpg?itok=jPDHhUJD',
        tags: 'night-out',
        hours: 'Mon–Thu: 12pm–8pm, Friday: 12pm–9pm, Saturday: 10am–9pm, Sunday: 10am–7pm',
        location: '13265 North US 183, Suite A, Austin, TX 78750',
        info: 'https://www.iflyworld.com/?npclid=Cj0KCQjwp5_qBRDBARIsANxdcikC_EX5DxU01PlbuMQWiDbt2jbS_31Im8-rQEiVNjK_suu1HB3U6YkaAp_1EALw_wcB&gclid=Cj0KCQjwp5_qBRDBARIsANxdcikC_EX5DxU01PlbuMQWiDbt2jbS_31Im8-rQEiVNjK_suu1HB3U6YkaAp_1EALw_wcB&npclid=Cj0KCQjwp5_qBRDBARIsANxdcikC_EX5DxU01PlbuMQWiDbt2jbS_31Im8-rQEiVNjK_suu1HB3U6YkaAp_1EALw_wcB'
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
