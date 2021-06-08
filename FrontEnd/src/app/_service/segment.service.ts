import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SegmentService {
  // Segment -> Exercise -> Task
  Segments = [
    {
      SegmentId: 1,
      SegmentName: 'Validation Segment',
      SegmentDesciption: 'Validation Segment Description',
      SegmentStatus: true, // true: active, false: inactive
      Exercises: [
        {
          SegmentId: 1,
          ExerciseId: 12,
          ExerciseName: 'Validation Exersice',
          ExerciseDescription: 'Validation Exersice Description',
          ExerciseCategory: ['Quize', 'Fun', 'Education'],
          ExerciseStatus: true, // true: active, false: inactive
          Tasks: [
            {
              ExerciseId: 12,
              TaskId: 123,
              TaskName: 'Validation Task',
              TaskDescription: 'Validation Task Description',
              TaskStatus: true, // true: active, false: inactive
              TaskPositon: 0,
            },
          ],
        },
      ],
    },
  ];
}
