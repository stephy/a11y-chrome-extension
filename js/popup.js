var bgPage = chrome.extension.getBackgroundPage();

function click(e) {
  if(e.target.id !== 'yahoo' && e.target.id !== 'keyboardfocus'){
      if(this.checked) {
          //add accessibility DOM nodes
          if(e.target.id === "role"){
            var code = 'getRoles("'+ e.target.attributes['data-attribute'].nodeValue+'");';
          }else if(e.target.id ==="arialabel"){
            var code = 'getAriaLabels("'+e.target.attributes['data-attribute'].nodeValue+'");'; 
          }else if(e.target.id =="tabindex"){
            var code = 'getTabindex("'+e.target.attributes['data-attribute'].nodeValue+'");'; 
          }

      }else{
           //clear accessibility DOM nodes
           if(e.target.id === "role"){
            var code = 'clearRoles("'+ e.target.attributes['data-attribute'].nodeValue+'");';
          }else if(e.target.id ==="arialabel"){
            var code = 'clearAriaLabels("'+e.target.attributes['data-attribute'].nodeValue+'");'; 
          }else if(e.target.id ==="tabindex"){
            var code = 'clearTabindex("'+e.target.attributes['data-attribute'].nodeValue+'");'; 
          }
      }
      
      //execute code
      chrome.tabs.executeScript(null, { file: "js/jquery-1.11.0.min.js" }, function() {
        chrome.tabs.executeScript(null, { file: "js/jquery-ui.js" }, function() {
          chrome.tabs.executeScript(null, {file: 'js/script.js'}, function() {
              chrome.tabs.executeScript(null, { code: code });
          });
        });
      });

  }else if(e.target.id === 'yahoo'){
    //yahoo mail search 
    if(this.checked){
      //execute code
      chrome.tabs.executeScript(null, { file: "js/jquery-1.11.0.min.js" }, function() {
        chrome.tabs.executeScript(null, {file: 'js/yui.js'}, function() {
            chrome.tabs.executeScript(null, {file: 'js/default.js'}, function() {});
        });
      });
    }
  }else if(e.target.id === 'keyboardfocus'){
    console.log('keyboard focus? ??');
    //yahoo mail search 
    if(this.checked){
      //execute code
      chrome.tabs.executeScript(null, { file: "js/jquery-1.11.0.min.js" }, function() {
        chrome.tabs.executeScript(null, {file: 'js/yui.js'}, function() {
            chrome.tabs.executeScript(null, {file: 'js/keyboard-focus.js'}, function() {});
        });
      });
    }
  }


}
document.addEventListener('DOMContentLoaded', function () {
  $('.settings').on('change', click);
  $( "#tabs" ).tabs(); //enable jquery tabs
  $(document).tooltip(); //enable tooltips

  //select all tabs
  $('#select-all-roles').click(function(event) {  //on click 
        if(this.checked) { // check select status
            $('.settings').each(function() { //loop through each checkbox
                this.checked = true;  //select all checkboxes with class "checkbox1"               
            });
        }else{
            $('.settings').each(function() { //loop through each checkbox
                this.checked = false; //deselect all checkboxes with class "checkbox1"                       
            });         
        }
    });

  var bgPage = chrome.extension.getBackgroundPage();

  YUI().use("node", function (Y) {

    var setRoleCheckbox = function (e) {
      var index = 'ymuis-' + e.target.getAttribute('data-attribute'),
        checked = !e.target.hasAttribute('checked');

      //nextVal ? e.target.setAttribute('checked', 'checked') : e.target.removeAttribute('checked');
      bgPage.roleSettings.set(index, checked);
    };

    var setAriaCheckbox = function (e) {
      var index = 'ymuis-' + e.target.getAttribute('data-attribute'),
        checked = !e.target.hasAttribute('checked');

      //nextVal ? e.target.setAttribute('checked', 'checked') : e.target.removeAttribute('checked');
      bgPage.ariaSettings.set(index, checked);
    };

    var setTabindexCheckbox = function (e) {
      var index = 'ymuis-' + e.target.getAttribute('data-attribute'),
        checked = !e.target.hasAttribute('checked');

      //nextVal ? e.target.setAttribute('checked', 'checked') : e.target.removeAttribute('checked');
      bgPage.tabindexSettings.set(index, checked);
    };

    console.log('i am the delegate');
    Y.one('#tabs-1').delegate('click', setRoleCheckbox, '.settings');
    Y.one('#tabs-2').delegate('click', setAriaCheckbox, '.settings');
    Y.one('#tabs-3').delegate('click', setTabindexCheckbox, '.settings');
  });

    YUI().use("cookie", "json-parse", function (Y) {
      var attrs = {}, currAttrs;
      attrs.roleAttrs = Y.JSON.parse(Y.Cookie.get('accessibilityExtensionRoleSettings')),
      attrs.ariaAttrs = Y.JSON.parse(Y.Cookie.get('accessibilityExtensionAriaSettings')),
      attrs.tabindexAttrs = Y.JSON.parse(Y.Cookie.get('accessibilityExtensionTabindexSettings'));


      for (key in attrs) {
        currAttrs = attrs[key];
        for (key in currAttrs) {
          var currRoleAttr = currAttrs[key].value,
              newKey = key.substr(6);
  
          if (currRoleAttr) {
             $('[data-attribute="'+newKey+'"]').attr("checked","checked");
             $('[data-attribute="'+newKey+'"]').change();
            //document.getElementById('' + key).setAttribute('checked', 'checked')
          }
        }
      }

    });



});



