import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    required: true,
  },
  sec: {
    type: String,
    minlength: 1,
    required: true,
  },
  classTeacherId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  students: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        minlength: 1,
        required: true,
      },
      rollno: {
        type: String,
        minlength: 1,
        required: true,
      },
    },
  ],
  attendance: [
    {
      date: {
        type: Date,
      },
      absent: [
        {
          type: mongoose.Schema.Types.ObjectId,
        },
      ],
    },
  ],
  lastUpdated: {
    type: Date,
    minlength: 1,
    required: true,
  },
});

const Class = mongoose.model('Class', classSchema);
export default Class;
