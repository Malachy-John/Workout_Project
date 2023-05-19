
let data = "";
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
        this.set_quantity = 0
        this.max = max
        this.ten_max = ten_max
        this.modifier = modifier
    }
}

//let exercises = document.getElementById("exercises")




//getArray()




//console.log(array[4])

//legs
let single_leg_press = new Exercise("Single Leg Press", "leg", 90, 90, 2.5);
let calf_raises = new Exercise("Calf Raises", "leg", 90, 210, 2.5);
let comp_squat = new Exercise("Competition Squat", "leg", 220, 182.5, 0);
let leg_press = new Exercise("Leg Press", "leg", 90, 270, 0);
let leg_extension = new Exercise("Leg Extension", "leg", 90, 100, 0);
let ham_curl = new Exercise("Ham Curl", "leg", 90, 65, 0);
let zercher_squat = new Exercise("Zercher Squat", "leg", 200, 170, 0)
let split_squat = new Exercise("Split Squat", "leg", 100, 110, 0)


//backs
let pullup = new Exercise("Pullup", "back", 140, 115, 0);
let deadlift = new Exercise("Deadlift", "back", 260, 200, 0)
let bb_hold = new Exercise("Barbell Hold", "back", 150, 170, 5)
let pendlay_row = new Exercise("Pendlay Row", "back", 130, 105, 0)
let single_arm_latpull = new Exercise("Single Arm LP", "back", 100, 60, 0)
let single_cable_row = new Exercise("Single Arm LP", "back", 100, 60, 0)




//biceps
let concentration_curl = new Exercise("Concentration Curl", "biceps", 25, 25, 2.5)

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

//shoulders
let machine_press = new Exercise("Machine Press", "shoulder", 110, 90, 0)
let lateral_raise = new Exercise("Lateral", "shoulder", 15, 15, 0)
let front_raise = new Exercise("Front Raise", "shoulder", 20, 25, 0)
let barbell_shrug = new Exercise("Barbell Hold", "shoulder", 180, 180, 0)




//let week_select = document.getElementById("week-select")
//var text = week_select.options[week_select.selectedIndex].text;
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




function calculateDay(workout, week_no) {





    workout.exercise_list.forEach(element =>
        //console.log(element[0]["name"]),
        calculateExerciseTier(element, week_no)
    );
    //update.addEventListener("click", appendValues(workout))
    appendValues(workout)



}

//this creates the tables
function appendValues(workout) {
    let exercises = document.getElementById("days")
    //let un_li = document.createElement("ul")



    let table = document.createElement("table")
    let caption = table.createCaption();



    let index = data.workout_list.indexOf(workout);
    console.log(index)

    caption.innerHTML = `Day ${index + 1}`
    caption.style.captionSide = "top";


    table.className = "table table-dark table-striped"

    exercises.appendChild(table)
    let thead = table.createTHead();
    let row = table.insertRow();

    let t = document.createElement("th");
    let text = document.createTextNode("Exercise")

    t.appendChild(text)
    row.appendChild(t)


    for (let i = 0; i < 7; i++) {
        let th = document.createElement("th");
        let text = document.createTextNode("Set")

        th.appendChild(text)
        row.appendChild(th)

    }

    t = document.createElement("th");
    text = document.createTextNode("Add")

    t.appendChild(text)
    row.appendChild(t)

    t = document.createElement("th");
    text = document.createTextNode("Rem")

    t.appendChild(text)
    row.appendChild(t)


    t = document.createElement("th");
    text = document.createTextNode("AddS")

    t.appendChild(text)
    row.appendChild(t)

    t = document.createElement("th");
    text = document.createTextNode("RemS")

    t.appendChild(text)
    row.appendChild(t)

    workout.exercise_list.forEach(element => {

        let limit = -1

        let row = table.insertRow();
        let cell = row.insertCell();
        let text = document.createTextNode(element[0].name);
        cell.appendChild(text);

        element[0].sets.forEach(e => {
            let cell = row.insertCell();
            let text = document.createTextNode(e);
            cell.appendChild(text);
        })

        if (element[0].sets.length < 7) {
            limit = 7 - element[0].sets.length;

            for (let i = 0; i < limit; i++) {
                let cell = row.insertCell();
                let text = document.createTextNode("");
                cell.appendChild(text)

            }
        }

        //this ups weight and makes it harder
        cell = row.insertCell();
        text = document.createElement("button");
        text.innerHTML = "+"
        text.addEventListener("click", () => modifySets(element, true, true))
        text.className = "btn btn-secondary btn-sm"
        cell.appendChild(text);
        cell = row.insertCell();
        text = document.createElement("button");

        text.innerHTML = "-"
        text.addEventListener("click", () => modifySets(element, false, true))


        cell.appendChild(text);
        text.className = "btn btn-secondary btn-sm"


        //these add sets and remove them
        cell = row.insertCell();
        text = document.createElement("button");
        text.innerHTML = "+"
        text.addEventListener("click", () => modifySets(element, true, false))
        text.className = "btn btn-dark btn-sm"
        cell.appendChild(text);
        cell = row.insertCell();
        text = document.createElement("button");

        text.innerHTML = "-"
        text.addEventListener("click", () => modifySets(element, false, false))


        cell.appendChild(text);
        text.className = "btn btn-dark btn-sm"



        table.prepend(caption)


    });





}




//this adds weight to the tertiary lifts/or takes it away.
//adding 2.5 to a lift will add it to all lifts of same name.
function modifySets(exercise, isPositive, isModifier) {
    let value;
    let mod;

    if (isModifier) {
        console.log("weight")
        value = "modifier";
        mod = 2.5;
    } else {
        console.log("set")
        value = "set_quantity";
        mod = 1;
    }

    if (isPositive) {
        console.log(exercise[0]["modifier"])
        exercise[0][value] += mod
        console.log(exercise[0]["modifier"])

    } else {
        exercise[0][value] -= mod
    }
    if (isModifier) {
        verifySets(exercise)
    }

}

//this will go through all the workout days and update based on modified value
//the post ajax will save the update and then refresh the page
function verifySets(exercise) {
    for (let i = 0; i < data.workout_list.length; i++) {
        //console.log(data.workout_list[i].exercise_list[0])

        for (let j = 0; j < data.workout_list[i].exercise_list.length; j++) {

            //we might want to use this functionality in the future for CRUD application!
            //console.log(data.workout_list[i].exercise_list[j][0]["sets"]);
            if (data.workout_list[i].exercise_list[j][0]["name"] == exercise[0].name) {
                if (data.workout_list[i].exercise_list[j][0]["modifier"] != exercise[0].modifier) {
                    //data.workout_list[i].exercise_list[j][0]["modifier"] = exercise[0].modifier
                    data.workout_list[i].exercise_list[j][0]["modifier"] = exercise[0].modifier;

                } else {
                    data.workout_list[i].exercise_list[j][0]["modifier"] = exercise[0].modifier;
                }
            }
        }
    }

    //postAjax(data);

}



function calculateExerciseTier(exercise, week_no) {

    if (exercise[1] === true) {
        calculatePrimaryLift(exercise[0], week_no)
    } else {
        calculateTertiaryLift(exercise[0], week_no)
    }


}

function calculatePrimaryLift(exercise, week_no) {
    let sets = 2
    let reps = 10
    let multiplier = 0.675
    let value = 0

    let week = week_no
    console.log(week_no)

    if (week == 2) {
        multiplier = 0.7
        sets += 1
    } else if (week == 3) {
        multiplier = 0.725
        sets += 2
        if (exercise.name === "Deadlift") {
            multiplier = 0.75;
        }

    } else if (week == 4) {
        multiplier = 0.75
        sets += 3

        if (exercise.name == "Deadlift") {
            multiplier = 0.65
        }
    }

    let top_set = exercise.max * multiplier


    console.log(`sets are ${sets}`)

    if (exercise.name === "Deadlift") {

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


    //exercise.set_quantity = 3;




    let multiplier = 0.75
    let top_set = exercise["ten_max"] * multiplier




    for (let i = 0; i < exercise.set_quantity; i++) {

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
let workout_4 = new Workout([[pendlay_row, false], [single_arm_latpull, false], [single_cable_row, false], [concentration_curl, false], [plank, false]])
let workout_5 = new Workout([[machine_press, false], [incline_dumbbell_bench, false], [lateral_raise, false], [front_raise, false], [barbell_shrug, false]])
let workout_6 = new Workout([[zercher_squat, false], [split_squat, false], [leg_extension, false], [ham_curl, false], [calf_raises, false]])


let Week_1 = new Week([workout_1, workout_2, workout_3, workout_4, workout_5, workout_6], 1)




for (let i = 0; i < Week_1.workout_list.length; i++) {
    //calculateDay(Week_1.workout_list[i])
}


const data_1 = JSON.stringify(Week_1)


let saver = document.getElementById("save.button");
let submit = document.getElementById("change");
let download = document.getElementById("download_button")
var e = document.getElementById("select");
var value = e.options[e.selectedIndex].value;
var text = e.options[e.selectedIndex].text;


//$("#elementId :select").text(); // The text content of the selected option
//var text = $("#elementId").val(); // The value of the selected option

//console.log($('#select').val());


submit.addEventListener("click", () => callWorkouts(data, $('#select').val()))
saver.disabled = true;
saver.addEventListener("click", () => postAjax(data))
download.addEventListener("click", () => getArray());


function clearSets(data) {
    //console.log("yes")
    for (let i = 0; i < data.workout_list.length; i++) {
        //console.log(data.workout_list[i].exercise_list[0])

        for (let j = 0; j < data.workout_list[i].exercise_list.length; j++) {

            //we might want to use this functionality in the future for CRUD application!
            //console.log(data.workout_list[i].exercise_list[j][0]["sets"]);
            data.workout_list[i].exercise_list[j][0]["sets"] = []

        }


    }
}


function callWorkouts(data, week_no) {

    let exercises = document.getElementById("days")
    while (exercises.firstChild) {
        exercises.removeChild(exercises.firstChild);
    }
    //sets need to be rejigged.
    clearSets(data)



    document.getElementById("week-number").innerHTML = `Week ${week_no}`;

    for (let i = 0; i < data.workout_list.length; i++) {
        calculateDay(data.workout_list[i], week_no)
    }
}

//this is sort of working.
function postAjax(data) {

    console.log("Ajax attempted")
    console.log(data)

    data = JSON.stringify(data)


    $.ajax({
        //url: "../post-test",
        url: "/post-test",
        //url: "http://localhost:4000/post-test",
        data: data,
        contentType: "application/json",

        type: "POST",

        success: function (result) {
            console.log("Ajax is working")
            console.log(result);
            //getArray();
        },
        error: function (result, status) {
            console.log("not quite")
            console.log(result);
        }
    });
}

function clearWorkout() {
    while (document.getElementById("days").firstChild) {
        document.getElementById("days").removeChild(document.getElementById("days").firstChild);
    }
}

//will need to clear out here...
async function getArray() {
    //check here for response error ??


    saver.disabled = false;
    clearWorkout()


    const response = await fetch("../saved_workouts.json")

    data = await response.json();
    //console.log(data);

    clearSets(data)


    for (let i = 0; i < data.workout_list.length; i++) {
        calculateDay(data.workout_list[i], 1)
    }
    findTotalSets(data);

}



function findTotalSets(data) {
    let back_sets = 0;
    let chest_sets = 0;
    let leg_sets = 0;
    let shoulder_sets = 0;
    let abs_sets = 0;
    let tricep_sets = 0;
    let biceps_sets = 0
    let calf_sets = 0;
    let hams_sets = 0;
    let side_sets = 0;

    for (let i = 0; i < data.workout_list.length; i++) {
        data.workout_list[i]
        for (let j = 0; j < data.workout_list[i].exercise_list.length; j++) {

            //we might want to use this functionality in the future for CRUD application!
            //console.log(data.workout_list[i].exercise_list[j][0]["name"]);

            for (let k = 0; k < data.workout_list[i].exercise_list[j][0]["sets"].length; k++) {
                //console.log(data.workout_list[i].exercise_list[j][0]["sets"][k])
                if (data.workout_list[i].exercise_list[j][0]["type"] == "back") {
                    back_sets += 1;
                } else if (data.workout_list[i].exercise_list[j][0]["type"] == "chest") {
                    chest_sets += 1;
                } else if (data.workout_list[i].exercise_list[j][0]["type"] == "quad") {
                    leg_sets += 1;
                } else if (data.workout_list[i].exercise_list[j][0]["type"] == "front delt") {
                    shoulder_sets += 1;
                } else if (data.workout_list[i].exercise_list[j][0]["type"] == "biceps") {
                    biceps_sets += 1;
                } else if (data.workout_list[i].exercise_list[j][0]["type"] == "tricep") {
                    tricep_sets += 1
                } else if (data.workout_list[i].exercise_list[j][0]["type"] == "abs") {
                    abs_sets += 1;
                } else if (data.workout_list[i].exercise_list[j][0]["type"] == "hamstring") {
                    hams_sets += 1;
                } else if (data.workout_list[i].exercise_list[j][0]["type"] == "calf") {
                    calf_sets += 1;
                } else if (data.workout_list[i].exercise_list[j][0]["type"] == "side delt") {
                    side_sets += 1;
                }
            }
        }
    }

    let type_list = { Front_Delt: [shoulder_sets, 6, 8], Side_Delt: [side_sets, 16, 22], Quad: [leg_sets, 12, 18], Back: [back_sets, 14, 22], Chest: [chest_sets, 12, 20], Biceps: [biceps_sets, 14, 20], Tricep: [tricep_sets, 10, 14], Abs: [abs_sets, 16, 20], Hams: [hams_sets, 10, 16], Calf: [calf_sets, 12, 16] };
    let ul = document.getElementById("type-counts");

    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }



    for (const value in type_list) {
        //console.log(value);
        let li = document.createElement("li");
        li.innerHTML = `${value} sets ${type_list[value][0]} (${type_list[value][1]} - ${type_list[value][2]})`;

        if (type_list[value][0] < type_list[value][1]) {
            li.style.color = "orange";
        } else if (type_list[value][0] > type_list[value][2]) {
            li.style.color = "red";
        } else {
            li.style.color = "green";
        }


        ul.appendChild(li);
    }

}