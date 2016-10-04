YUI().use("node", function(Y){

    //insert popup on the page
     function displayPopup(data){
      //remove previous popup
      if(Y.one('.ymuis-popup-wrapper')){
        Y.one('.ymuis-popup-wrapper').remove(true);
      }

      var popup_wrapper = Y.Node.create('<div/>');
      popup_wrapper.setAttribute('class', 'ymuis-popup-wrapper');
      popup_wrapper.setStyles({
        left: data.x,
        top: data.y
      });

      var inner = generatePopupData(data);
      popup_wrapper.append(inner);

      //display popup
      Y.one('body').append(popup_wrapper);
    };

    //generate popup data
     function generatePopupData(data){
      var div_close = $('<div>', {
        class: 'ymuis-btn-close',
      });

      var div_tagName = $('<div>', {
        class: 'ymuis',
        html: '<h3>Tag Type: <span class="ymuis-emphasis"><strong>'+ data.tagName.toLowerCase() +'</strong></span> </h3>'
      });

      var div_classes = $('<div>', {
        class: 'ymuis',
        html: '<h3>Classes: <span class="ymuis-emphasis">'+ data.classes +'</span> </h3>'
      });

      var div_id = $('<div>', {
        class: 'ymuis',
        html: '<h3>ID: <span class="ymuis-emphasis">'+ data.id +'</span> </h3>'
      });

      var results = $('<div>', {
        id: 'ymuis-results'
      });
      
      var inner = $('<div>', {});

      //create click event for close
      div_close.on('click', ext.closePopup);

      inner.append(div_close);
      inner.append(div_tagName);

      //link, show attributes
      //var div_title = Y.Node.create('<div class="ymuis"><span class="ymuis-emphasis">Title: </span><span>' + data.title+ '</span></div>');
      var div_title = $('<div>', {
        class: 'ymuis',
        html: '<h3>Title: <span class="ymuis-emphasis">' + data.title+ '</span> </h3>'
      });

      var div_aria = $('<div>', {
        class: 'ymuis',
        html: '<h3>Aria-label: <span class="ymuis-emphasis">' + data.aria_label+ '</span> </h3>'
      });

       var div_aria_hidden = $('<div>', {
        class: 'ymuis',
        html: '<h3>Aria-hidden: <span class="ymuis-emphasis">' + data.aria_hidden+ '</span> </h3>'
      });

      var div_tabindex = $('<div>', {
        class: 'ymuis',
        html: '<h3>Tabindex: <span class="ymuis-emphasis">' + data.tabindex+ '</span> </h3>'
      });

      var div_role = $('<div>', {
        class: 'ymuis',
        html: '<h3>Role: <span class="ymuis-emphasis">' + data.role+ '</span> </h3>'
      });

      inner.append(div_title);  
      inner.append(div_aria);
      inner.append(div_aria_hidden);
      inner.append(div_tabindex); 
      inner.append(div_role); 

      inner.append(div_classes);

      if(data.id){
        inner.append(div_id);
      }
      
      inner.append(results);

      return inner;
    };

    //close popup
    function closePopup() {
      var that = this;
      console.log('closed clicked');
      $('.ymuis-persistent-popup-wrapper').remove();
      //enable showing popups again
      ext.nodes.on('mouseover', createPopup);
    };

    // $(document).keypress(function(e){

    // if(e.keyCode === 122){//z was pressed
    //   //perform search on last focused element
    //   e.preventDefault();
    //   searchFiles();
    // }

    // if(e.keyCode === 107){//k was pressed
    //   //disable popup search
    //   ext.nodes.detach('mouseover');

    //   //create unique popup
    //   $('.ymuis-popup-wrapper').clone().appendTo('body').addClass('ymuis-persistent-popup-wrapper').removeClass('ymuis-popup-wrapper');
    //   //remove background popup
    //   $('.ymuis-popup-wrapper').remove();
    //   //display close button
    //   $('.ymuis-btn-close').show();
    //   //add event handler for close button
    //   $('.ymuis-btn-close').on('click', closePopup);
    // }

  });


    //generate ajax call to server to search files
    function searchFiles(){

      var id = ext.lastFocusId === "" ? 'empty' : ext.lastFocusId;
      $.ajax({
        method: 'POST',
        data: { classes: ext.lastFocusClass, id: id } ,
        url: 'http://localhost/mail-ui-search/php/search.php',
        success: function(response){
          $('#ymuis-results').html(response);
        }
      });
    };


  function AccessibilityExtension(){
    var that = this;

    that.lastFocusId;
    that.lastFocusClass;

    //select all nodes in the html
    that.nodes = Y.all('*');

    //add event to nodes
    that.nodes.on('mouseover', that._createPopup);
    that.activate();
  }

  AccessibilityExtension.prototype = {
    //highlight the attribute
    activate: function (attr){
      console.log('activate called', attr);
    },

    //creates popup
    _createPopup: function (e){
      var that = this;
       e.stopPropagation(); //prevent from event bubbling

        var data = {
          x: e.pageX,
          y: e.pageY,
          classes: e.target.getAttribute('class'),
          id: e.target.getAttribute('id'),
          alt: e.target.getAttribute('alt'),
          title: e.target.getAttribute('title'),
          src: e.target.getAttribute('src'),
          tagName: e.target._node.tagName,
          role: e.target.getAttribute('role'),
          aria_label: e.target.getAttribute('aria-label'),
          aria_hidden: e.target.getAttribute('aria-hidden'),
          tabindex: e.target.getAttribute('tabindex')
        }

        that.lastFocusClass = e.target.getAttribute('class');
        that.lastFocusId = e.target.getAttribute('id');

        displayPopup(data);
    }

  }
  
  var ext = new AccessibilityExtension();

});