import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    minlength: 1,
    required: true,
  },
  firstName: {
    type: String,
    minlength: 1,
    required: true,
  },
  lastName: {
    type: String,
    minlength: 1,
    required: true,
  },
  employeeId: {
    type: String,
    minlength: 1,
    required: true,
  },
  timeTable: [
    {
      class: {
        type: String,
        minlength: 1,
        required: true,
      },
      sec: {
        type: String,
        minlength: 1,
        required: true,
      },
      subject: {
        type: String,
        minlength: 1,
        required: true,
      },
      startTime: {
        type: String,
        minlength: 1,
        required: true,
      },
      endTime: {
        type: String,
        minlength: 1,
        required: true,
      },
    },
  ],
  lastUpdated: {
    type: Date,
    minlength: 1,
    required: true,
  },
});

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;
