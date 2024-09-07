export interface BookAppointmentRequest {
  doctorId: string;
  timeSlot: {
    date: Date;
    startTime: Date;
    endTime: Date;
  };
}
