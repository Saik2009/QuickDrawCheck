draw_list = ['Car', 'Flower', 'Sun', 'Fan', 'Eye', 'Burger', 'Violin', 'Cat', 'Hurricane', 'Laptop', 'Frog', 'Lion'];
random_number = Math.floor(Math.random() * draw_list.length);
randomized_list = draw_list[random_number];
console.log(randomized_list);
document.getElementById("item").innerHTML = "Item to draw: " + randomized_list;
timer_counter = "";
timer_check = "";
awnser_holder = "";
drawn_sketch = "";
score = 0;



function setup() {
    canvas = createCanvas(280, 280);

    canvas.center;
    background("white");
    canvas.mouseReleased(classifyCanvas);
    
}


function check_sketch() {
    

    timer_counter = timer_counter + 1;
    document.getElementById("time").innerHTML = "Timer: " + timer_counter;
    console.log(timer_counter);
    if(timer_counter>400){
        timer_counter=0;
        timer_check="Completed"
    }
    if (timer_check == "Completed"||awnser_holder=="set") {
        awnser_holder = "";
        timer_check="";
        updateCanvas();
    }




}

function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}


function draw() {
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);

    }
    check_sketch();

    
    if (drawn_sketch == randomized_list) {
        awnser_holder = "set";
        score = score + 1;
        document.getElementById("score").innerHTML = "Score: " + score;
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    draw_sketch=results[0].label;
    document.getElementById('label').innerHTML = 'Your Sketch: ' + draw_sketch;
    document.getElementById('confidence').innerHTML = 'Confidence: ' + Math.round(results[0].confidence * 100) + '%';
   
}

function updateCanvas(){
    background('white');
    random_number = Math.floor(Math.random() * draw_list.length);
    randomized_list = draw_list[random_number];
    console.log(randomized_list);
    document.getElementById("item").innerHTML = "Item to draw: " + randomized_list;
}