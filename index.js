const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodejs-course')
  .then(() => console.log('connected to mongoDB...'))
  .catch(err => console.error('failed connect to mongoDB...', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

const createCourse = async (courseData) => {
  const course = new Course(courseData);

  const result = await course.save();
  console.log(result);
  return result;
};

// createCourse({
//   name: 'Node.js course',
//   author: 'Mosh',
//   tags: ['nodejs', 'mongodb'],
//   isPublished: true
// });


const home = require('./src/routes/home');
const courses = require('./src/routes/courses');

const app = express();

app.use(express.json());
app.use('/', home);
app.use('/api/courses', courses);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listen on ${port} ...`));
