/***2***/
it will alert 3 every time because the variable i was declared with var word, and after 1000 millisecond the value of i will equal 3 because i was increased from 0 to 3 , so the three alert will alert 3, we can fix this by using let word to declare the variable i

/***3***/
function createBase(a){
	return function(b){
		return a+b;
	}
}
var addSix = createBase(6);
addSix(10); // returns 16
addSix(21); // returns 27

/***4***/
<button id="btn-0">Button 1!</button>
<button id="btn-1">Button 2!</button>
<button id="btn-2">Button 3!</button>
<script type="text/javascript">    
var prizes = ['A Unicorn!', 'A Hug!', 'Fresh Laundry!'];
for (let btnNum = 0; btnNum < prizes.length; btnNum++) {
	// for each of our buttons, when the user clicks it...
	document.getElementById('btn-' + btnNum).onclick = function() {
		// tell her what she's won!
		alert(prizes[btnNum]);
	};
}
</script>
/**OR**/
<button id="btn-0">Button 1!</button>
<button id="btn-1">Button 2!</button>
<button id="btn-2">Button 3!</button>
<script type="text/javascript">
var prizes = ['A Unicorn!', 'A Hug!', 'Fresh Laundry!'];
function alertMessage(m){
	return function(){alert(prizes[m])};
}
for (var btnNum = 0; btnNum < prizes.length; btnNum++) {
	// for each of our buttons, when the user clicks it...
	document.getElementById('btn-' + btnNum).onclick = alertMessage(btnNum);
}
</script>

/***Rewrite to Async***/
/***1***/
function calculateSum(a , b , func){
	return func(a+b);
}
var sum = calculateSum(2, 6 , function(sum){console.log(sum);});
/***2***/
$.getJSON('http://myapi.com', function(result){
	showResults(results);
});
/***3***/
function calculateSum(a , b , func){
	return func(a+b);
}
var sum = calculateSum(2, 6 , function(sum){
	if (sum > 8) {
    console.log('larger than 8');
}
});
/***4***/
$.getJSON('http://myapi.com', function(data){
	data = data.map(function (x) { return x * 8; });
	writeDataToFile(data);
});
