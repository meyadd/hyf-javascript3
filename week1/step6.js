//1.doubles the odd numbers in an array and throws away the even number.//
let numbers = [1, 2, 3, 4];
let newNumbers = numbers.filter((item)=>item%2!=0).map((item)=>item*2);

//2.write a program that add the even numbers to the resulting array twice
let newNumbers2 = [];
numbers.map((item)=>{
	if (item%2==0) {
		newNumbers2.push(item);
		newNumbers2.push(item);
	}
	else{
		newNumbers2.push(item);
	}
});

/*3*/
let monday = [
        {
            name     : 'Write a summary HTML/CSS',
            duration : 180
        },
        {
            name     : 'Some web development',
            duration : 120
        },
        {
            name     : 'Try to convince teachers to fix homework class10',
            duration : 30
        },
        {
            name     : 'Fix homework for class10 myself',
            duration : 20
        },
        {
            name     : 'Talk to a lot of people',
            duration : 200
        }
    ];
 
let tuesday = [
        {
            name     : 'Keep writing summery',
            duration : 240
        },
        {
            name     : 'Some more web development',
            duration : 180
        },
        {
            name     : 'Staring out the window',
            duration  : 10
        },
        {
            name     : 'Talk to a lot of people',
            duration : 200
        },
        {
            name     : 'Look at application assignments new students',
            duration : 40
        }
    ];
     
let tasks = [monday, tuesday];
//Collect two days' worth of tasks.
let durations = [];
tasks.map((item)=>{item.map((i)=>{durations.push(i.duration)})});
//Convert the task durations to hours, instead of minutes.
durations = durations.map((item)=>item/60);
//Filter out everything that took two hours or more.
durations = durations.filter((item)=>item >= 2);
//Sum it all up.
let sum = durations.reduce((total , val)=> total + val);
//Multiply the result by a per-hour rate for billing (you can decide yourself what Maartje should make per hour).
let per_hour = 100;
let amount = sum*per_hour;
//Output a formatted Euro amount.
amount = ('€' + amount.toLocaleString());