$(document).ready(function() {
  $('#btn1').click(function() {
    createContent();
  });
  
  $('#btn2').click(function() {
    $("h1").fadeOut();
  });
});

function createContent(){
  // new element
  var newHeading = document.createElement('h1');
  var newParagraph = document.createElement('p');
  
  // to add content
  newHeading.innerHTML = 'Di you now know?';
  newParagraph.innerHTML = 'Most kangaroos are left-handed';
  
  // add new elements to the html
  document.getElementById('jsDiv').appendChild(newHeading);
  document.getElementById('jsDiv').appendChild(newParagraph);
  
}