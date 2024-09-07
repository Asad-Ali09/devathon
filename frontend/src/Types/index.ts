export type User = {
  name: string;
  email: string;
  password?: string;
  imageUrl?: string | null | File;
  contactNumber: string;
  dob: string;
  address: string;
  gender: string;
};
export type loginType = {
  email: string;
  password: string;
};

// Doctor-specific fields
export type Doctor = User & {
  experience: string;
  timing: string; // appointment timings
  qualification: string;
  specialization: string;
  timeSlots:[]
};


{
  "name": "Rehan",
  "email": "rehanshafqat2004@gmail.com",
  "password": "123456789",
  "contactNumber": "03244949256",
  "dob": "2004-03-12",
  "address": "House#19, street#3A, Afzaal park, Harbanspura,Lahore",
  "gender": "male",
  "imageUrl": null,
  "specializations": ["Cardiology", "Internal Medicine"],
  "exp": 10,
"description": "Experienced cardiologist with a decade of practice in internal medicine.",
"timeSlots": [
  {
    "day": "Monday",
    "startTime": "2024-09-04T09:00:00.000Z", // ISO 8601 format for start time
    "endTime": "2024-09-04T17:00:00.000Z"   // ISO 8601 format for end time
  },
  {
    "day": "Wednesday",
    "startTime": "2024-09-06T10:00:00.000Z",
    "endTime": "2024-09-06T15:00:00.000Z"
  },
  {
    "day": "Friday",
    "startTime": "2024-09-08T08:00:00.000Z",
    "endTime": "2024-09-08T14:00:00.000Z"
  }
]
}