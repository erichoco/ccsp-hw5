(function(){

/* Draggable options */

var optionElems = $('.poll-list label'),
    isDragging = false;

optionElems.mousedown(function(){
  isDragging = true;
}).mousemove(function(e){
  e.preventDefault(); // Prevent text selection
}).mouseup(function(){
  isDragging = false;
}).mouseenter(function(){
  var inputId;
  if(isDragging){
    // Check the corresponding input when the knob is dragged over.
    inputId = $(this).attr('for');
    $('#'+inputId).prop('checked', true);
  }
});

/* Pie charts */

var RESULT_DURATION = 1000;

$('.result-data').easyPieChart({
  animate: RESULT_DURATION,
  barColor: '#FC9823',
  trackColor:'#E4E2E3',
  scaleColor: false,
  lineCap: 'butt',
  lineWidth: '7',
  size: '100',
  onStep: function(start, end, current){
    $(this.el).find('span').text(current.toFixed(1));
  }
});



}());