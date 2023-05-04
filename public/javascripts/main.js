let data;
class Week {
    constructor(workout_list, week_number) {
        this.workout_list = workout_list
        this.week_number = week_number
    }
}

class Workout {
    constructor(exercise_list) {
        this.exercise_list = exercise_list
    }
}


class Exercise {

    constructor(name, type, max, ten_max, modifier) {
        this.name = name
        this.type = type
        this.sets = []
        this.reps = []
        this.max = max
        this.ten_max = ten_max
        this.modifier = modifier
    }
}

//let exercises = document.getElementById("exercises")




getArray()




//console.log(array[4])

//legs
let single_leg_press = new Exercise("Single Leg Press", "leg", 90, 90, 2.5);
let calf_raises = new Exercise("Calf Raises", "leg", 90, 210, 2.5);
let comp_squat = new Exercise("Competition Squat", "leg", 220, 182.5, 0);
let leg_press = new Exercise("Leg Press", "leg", 90, 270, 0);
let leg_extension = new Exercise("Leg Extension", "leg", 90, 100, 0);
let ham_curl = new Exercise("Ham Curl", "leg", 90, 65, 0);

//backs
let pullup = new Exercise("Pullup", "back", 140, 115, 0);
let deadlift = new Exercise("Deadlift", "back", 260, 200, 0)
let bb_hold = new Exercise("Barbell Hold", "back", 150, 170, 2.5)
let pendlay_row = new Exercise("Pendlay Row", "back", 130, 105, 0)
let single_arm_latpull = new Exercise("Single Arm LP", "back", 100, 60, 0)

//biceps
let concentration_curl = new Exercise("Concentration Curl", "biceps", 25, 25, 0)

//triceps
let one_arm_tricep_push = new Exercise("One Arm Tricep Pushdown", "tricep", 25, 25, 0)

//abs
let plank = new Exercise("Plank", "abs", 100, 140, 0);

//chest
let bench_press = new Exercise("Bench Press", "chest", 145, 110, 0)
let incline_bench = new Exercise("Incline Bench Press", "chest", 130, 100, 0)
let dumbbell_bench = new Exercise("Dumbbell Bench", "chest", 50, 50, 0)
let incline_dumbbell_bench = new Exercise("Incline Dumbbell Bench", "chest", 40, 40, 0)
let cable_fly = new Exercise("Cable Fly", "chest", 25, 25, 0)

let week_select = document.getElementById("week-select")
var text = week_select.options[week_select.selectedIndex].text;
//console.log(text);


let exercise_list = {
    legs: [
        single_leg_press,
        calf_raises,
        comp_squat,
        leg_press,
        leg_extension,
        ham_curl,
    ],
    back: [
        pullup,
        deadlift,
        bb_hold,
        pendlay_row,
        single_arm_latpull
    ],
    biceps: [
        concentration_curl,
    ],
    triceps: [
        one_arm_tricep_push,
    ],
    abs: [
        plank
    ],

    chest: [bench_press, incline_bench, dumbbell_bench, incline_dumbbell_bench, cable_fly]

}


let cycle_1 = {
    id: 1,

}




function calculateDay(workout) {

    workout.exercise_list.forEach(element =>
        //console.log(element[0]["name"]),
        calculateExerciseTier(element)
    );


    for (let i = 0; i < workout.exercise_list.length; i++) {
        //console.log(workout.exercise_list[i][0].name);
    }



    let exercises = document.getElementById("days")

    let un_li = document.createElement("ul")

    exercises.appendChild(un_li);

    //day.forEach(element => {
    //console.log(element));
    //    calculateExerciseTier(element)
    //})


    workout.exercise_list.forEach(element => {
        //console.log(`${element[0]["name"]} : ${element[0]["sets"]}`)
        var text = `${element[0]["name"]} : ${element[0]["sets"]}`

        let li = document.createElement("li");
        li.innerText = text;
        un_li.appendChild(li);


    })


}





function calculateExerciseTier(exercise) {
    //this is used to pass the week 1 - 4 value to the exercise
    //exercise[0]["week"] = exercise[2]

    if (exercise[1] === true) {
        calculatePrimaryLift(exercise[0])
    } else {
        calculateTertiaryLift(exercise[0])
    }


}

function calculatePrimaryLift(exercise) {
    let sets = 2
    let reps = 10
    let multiplier = 0.7
    let value = 0
    let top_set = exercise.max * multiplier

    if (exercise.week === 2) {
        sets += 1
    } else if (exercise.week === 3) {
        sets += 2
    } else if (exercise.week === 4) {
        sets += 3
    }


    if (exercise.type === "chest") {
        sets += 1
    } else if (exercise.name === "deadlift") {

        if (exercise.week != 1) {
            sets -= 1
        }
    }

    for (let i = 0; i < sets; i++) {
        if (i === 0) {

            value = RoundTo(top_set)

            exercise.sets.push(value)
        } else {
            value = RoundTo(top_set * 0.9)
            exercise.sets.push(value)
        }
    }



}

function calculateSecondaryLift(exercise) {

    if (exercise.type === "back") {
        console.log("Sets will be 5")
    }
}

function calculateTertiaryLift(exercise) {

    let sets = 3
    let multiplier = 0.75
    let top_set = exercise["ten_max"] * multiplier

    if (exercise.type === "chest" || exercise.type === "back") {
        sets = 3
    }




    for (let i = 0; i < sets; i++) {

        let value = RoundTo(top_set * 0.9) + exercise.modifier

        exercise.sets.push(value)

    }



}

function RoundTo(number) {
    return 2.5 * Math.round(number / 2.5);
}

//alert(RoundTo(543.55, 2.5));
//alert(RoundTo(547.99, 2.5));



let workout_1 = new Workout([[deadlift, true], [bb_hold, false], [pendlay_row, false], [single_arm_latpull, false], [concentration_curl, false], [single_leg_press, false], [calf_raises, false]])
let workout_2 = new Workout([[bench_press, true], [incline_bench, false], [incline_dumbbell_bench, false], [dumbbell_bench, false], [one_arm_tricep_push, false], [cable_fly, false], [plank, false],])
let workout_3 = new Workout([[comp_squat, true], [leg_press, false], [leg_extension, false], [ham_curl, false], [calf_raises, false],])


let Week_1 = new Week([workout_1, workout_2, workout_3], 1)




for (let i = 0; i < Week_1.workout_list.length; i++) {
    calculateDay(Week_1.workout_list[i])
}


const data_1 = JSON.stringify(Week_1)


let saver = document.getElementById("save.button");

saver.addEventListener("click", () => postAjax(data))


//this is sort of working.
function postAjax(data) {

    console.log("sass")

    $.ajax({

        url: "https://workout-log-3n2u.onrender.com/post-test",
        data: data,
        contentType: "application/json",

        type: "POST",

        success: function (result) {
            console.log("Ajax is working")
            console.log(result);
        },
        error: function (result, status) {
            console.log("not quite")
            console.log(result);
        }
    });
}
async function getArray() {
    //check here for response error ??
    const response = await fetch("https://workout-log-3n2u.onrender.com/saved_workouts.json")

    data = await response.json();
    console.log(data);

    //printQuestion(data);
    //printQuestion(data);

    //printQuestion(data);
    for (let i = 0; i < data.workout_list.length; i++) {
        calculateDay(data.workout_list[i])
    }


}

