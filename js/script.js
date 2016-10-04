function generateSpan(text){
  return $('<span>', {
    class: 'ymuis-caption',
    text: text
  });
}

function generateLabel(attr, attrValue){
  var a = '<a title="'+attrValue+'" class="ymuis-caption" href="#">'+attr+'</a>';
  console.log('a tag:', a);
  return a;
}

/*
  Aria
*/
function getAriaLabels(arialabel){
  console.log("getAriaLabels function called");
  var tags = $('['+arialabel+']');
  var checked = 'yumis-marked-' + arialabel;

  $.each(tags, function (index, htmlNode) {
    if(!$(this).hasClass(checked)){
       var attrValue = $(this).attr(arialabel);
      $(this).prepend(generateLabel(arialabel, attrValue));
      $(this).addClass(checked);
      $(this).addClass('ymuis-label');
    }
    
  });
}


function clearAriaLabels(arialabel){
  console.log("clearAriaLabels function called");
  var tags = $('['+arialabel+']');
  console.log(tags);
  var checked = 'yumis-marked-' + arialabel;
  $.each(tags, function (index, htmlNode) {
    $(this).find('.ymuis-caption').remove();
    $(this).removeClass(checked);
    $(this).removeClass('ymuis-label');
  });
}

/*
  Roles
*/
function getRoles(val){
  console.log("getRoles function called");
  var tags = $('[role="'+val+'"]');
  console.log(tags);
  var checked = 'yumis-marked-' + val;
  $.each(tags, function (index, htmlNode) {
    if(!$(this).hasClass(checked)){
      $(this).prepend(generateSpan(val));
      $(this).addClass(checked);
      $(this).addClass('ymuis-label');
    }
    
  });
}

function clearRoles(val){
  console.log("clearRoles function called");
  var tags = $('[role="'+val+'"]');
  console.log(tags);
  var checked = 'yumis-marked-' + val;
  $.each(tags, function (index, htmlNode) {
    $(this).find('.ymuis-caption').remove();
    $(this).removeClass(checked);
    $(this).removeClass('ymuis-label');
  });
}

/*
  TabIndex
*/
function getTabindex(index){
  console.log("getTabindex function called");
  var tags = $('[tabindex="'+index+'"]');
  console.log(tags);
  var checked = 'yumis-marked-' + index;
  $.each(tags, function (i, htmlNode) {
    if(!$(this).hasClass(checked)){
      $(this).prepend(generateSpan('tabindex='+index));
      $(this).addClass(checked);
      $(this).addClass('ymuis-label');
    }
  });
}

function clearTabindex(index){
  console.log("clearTabindex function called");
  var tags = $('[tabindex="'+index+'"]');
  console.log(tags);
  var checked = 'yumis-marked-' + index;
  $.each(tags, function (i, htmlNode) {
    $(this).find('.ymuis-caption').remove();
    $(this).removeClass(checked);
    $(this).removeClass('ymuis-label');
  });
}

//add jQuery tooltip to a tags
$(document).tooltip(); //enable tooltips
