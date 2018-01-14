const exercises = [
  {
    muscle: 'Chest',
    exercises: [
      {
        name: 'Dumbbell bench press',
        equipment: 'Dumbbell'
      },
      {
        name: 'Pushups',
        equipment: 'Body'
      },
      {
        name: 'Dumbbell flies',
        equipment: 'Dumbbell'
      },
      {
        name: 'Incline dumbbell press',
        equipment: 'Dumbbell'
      },
      {
        name: 'Low cable crossover',
        equipment: 'Cable'
      },
      {
        name: 'Decline dumbbell flies',
        equipment: 'Dumbbell'
      },
      {
        name: 'Dips',
        equipment: 'Body'
      },
      {
        name: 'Incline cable flies',
        equipment: 'Cable'
      },
      {
        name: 'Decline barbell bench press',
        equipment: 'Barbell'
      },
      {
        name: 'Incline push-ups',
        equipment: 'Body'
      },
      {
        name: 'Incline dumbbell flies',
        equipment: 'Dumbbell'
      },
      {
        name: 'Cable crossover',
        equipment: 'Cable'
      },
      {
        name: 'Butterfly',
        equipment: 'Machine'
      },
      {
        name: 'Chest press',
        equipment: 'Machine'
      },
      {
        name: 'Incline chest press',
        equipment: 'Machine'
      },
      {
        name: 'Smith machine bench press',
        equipment: 'Machine'
      },
      {
        name: 'Smith machine incline bench press',
        equipment: 'Machine'
      },
      {
        name: 'Incline cable flies',
        equipment: 'Cable'
      },
      {
        name: 'Incline cable flies',
        equipment: 'Cable'
      },
      {
        name: 'Incline cable flies',
        equipment: 'Cable'
      },
      {
        name: 'Incline cable flies',
        equipment: 'Cable'
      },
      {
        name: 'Pullover dumbbell',
        equipment: 'Dumbbell'
      }
    ]
  },
  {
    muscle: 'Forearms',
    exercises: [
      {
        name: 'Rickshaw carry',
        equipment: 'Other'
      },
      {
        name: 'Wrist rotations barbell',
        equipment: 'Barbell'
      },
      {
        name: 'Palms-down wrist curl',
        equipment: 'Barbell'
      },
      {
        name: 'Palms-up wrist curl',
        equipment: 'Barbell'
      },
      {
        name: 'Farmer\'s walk',
        equipment: 'Other'
      },
      {
        name: 'Fingers curl',
        equipment: 'Barbell'
      },
      {
        name: 'Seated pulley wrist curl',
        equipment: 'Cable'
      }
    ]
  },
  {
    muscle: 'Lats',
    exercises: [
      {
        name: 'Shotgun row',
        equipment: 'Cable'
      },
      {
        name: 'Pull-up',
        equipment: 'Body'
      },
      {
        name: 'Chin-up',
        equipment: 'Body'
      },
      {
        name: 'Close-grip front lat pull-down',
        equipment: 'Cable'
      }
    ]
  },
  {
    muscle: 'Middle back',
    exercises: [
      {
        name: 'T-Bar row',
        equipment: 'Barbell'
      },
      {
        name: 'Reverse grip bent over rows',
        equipment: 'Barbell'
      },
      {
        name: 'One-arm dumbbell row',
        equipment: 'Dumbbell'
      },
      {
        name: 'Dumbbell incline row',
        equipment: 'Dumbbell'
      },
      {
        name: 'Seated cable rows',
        equipment: 'Cable'
      },
      {
        name: 'Bent over barbell row',
        equipment: 'Barbell'
      },
      {
        name: 'Yates row',
        equipment: 'Barbell'
      },
      {
        name: 'Pendlay row',
        equipment: 'Barbell'
      },
      {
        name: 'Smith machine bent over row',
        equipment: 'Machine'
      }
    ]
  },
  {
    muscle: 'Lower back',
    exercises: [
      {
        name: 'Deadlift',
        equipment: 'Barbell'
      },
      {
        name: 'Rack pull',
        equipment: 'Barbell'
      },
      {
        name: 'Superman',
        equipment: 'Body'
      },
      {
        name: 'Seated back extension',
        equipment: 'Machine'
      },
      {
        name: 'Seated good mornings',
        equipment: 'Barbell'
      }
    ]
  },
  {
    muscle: 'Quadriceps',
    exercises: [
      {
        name: 'Romanian deadlift with dumbbells',
        equipment: 'Dumbbell'
      },
      {
        name: 'Clean deadlift',
        equipment: 'Barbell'
      },
      {
        name: 'Barbell deadlift',
        equipment: 'Barbell'
      },
      {
        name: 'Sumo deadlift',
        equipment: 'Barbell'
      },
      {
        name: 'Lying leg curls',
        equipment: 'Machine'
      },
      {
        name: 'Power clean',
        equipment: 'Barbell'
      },
      {
        name: 'Good morning',
        equipment: 'Barbell'
      },
      {
        name: 'Romanian deadlift',
        equipment: 'Barbell'
      }
    ]
  },
  {
    muscle: 'Calves',
    exercises: [
      {
        name: 'Smith machine calf raise',
        equipment: 'Machine'
      },
      {
        name: 'Standing calf raises',
        equipment: 'Machine'
      },
      {
        name: 'Standing dumbbell calf raise',
        equipment: 'Dumbbell'
      },
      {
        name: 'Seated calf raise',
        equipment: 'Machine'
      },
      {
        name: 'Rocking standing calf raise',
        equipment: 'Barbell'
      },
      {
        name: 'Calf press on the leg press machine',
        equipment: 'Machine'
      },
      {
        name: 'Calf press',
        equipment: 'Machine'
      },
      {
        name: 'Standing barbell calf raise',
        equipment: 'Barbell'
      },
      {
        name: 'Barbell seated calf raise',
        equipment: 'Barbell'
      }
    ]
  }
  ,
  {
    muscle: 'Triceps',
    exercises: [
      {
        name: 'Dips - triceps version',
        equipment: 'Body'
      },
      {
        name: 'Decline EZ bar triceps extension',
        equipment: 'Barbell'
      },
      {
        name: 'Close-grip barbell bench press',
        equipment: 'Barbell'
      },
      {
        name: 'Triceps pushdown - V-bar attachment',
        equipment: 'Cable'
      },
      {
        name: 'Kneeling cable triceps extension',
        equipment: 'Cable'
      },
      {
        name: 'Reverse grip triceps pushdown',
        equipment: 'Cable'
      },
      {
        name: 'Standing dumbbell triceps extension',
        equipment: 'Dumbbell'
      },
      {
        name: 'Push-ups - Close triceps position',
        equipment: 'Body'
      },
      {
        name: 'EZ-bar skullcrusher',
        equipment: 'EZ curl bar'
      },
      {
        name: 'Triceps pushdown - Rope attachment',
        equipment: 'Cable'
      },
      {
        name: 'Cable one arm tricep extension',
        equipment: 'Cable'
      },
      {
        name: 'Decline close-grip bench to skull crusher',
        equipment: 'Barbell'
      },
      {
        name: 'Seated triceps press',
        equipment: 'Dumbbell'
      },
      {
        name: 'Incline barbell triceps extension',
        equipment: 'Barbell'
      },
      {
        name: 'Close-grip EZ-bar press',
        equipment: 'EZ curl bar'
      },
      {
        name: 'Dip machine',
        equipment: 'Machine'
      },
      {
        name: 'Tricep dumbbell kickback',
        equipment: 'Dumbbell'
      },
      {
        name: 'Dumbbell one-arm triceps extension',
        equipment: 'Dumbbell'
      },
      {
        name: 'Standing one-arm dumbbell triceps extension',
        equipment: 'Dumbbell'
      }
    ]
  }
]

export default exercises

// https://www.bodybuilding.com/exercises/finder/?muscleid=11