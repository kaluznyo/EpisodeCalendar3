jQuery.fn.submitWithAjax = function() {
  this.submit(function() {
    $.post(this.action, $(this).serialize(), null, "script");
    return false;
  });
  return this;
};
	
function hijackAjaxLinks() {
  $("a.ajaxLink:not('.ui-checkbox')").live("click", function() {
    var link = $(this);
    $("#" + link.attr("rel")).show();
    link.parent().parent().find(".hide_while_loading").hide();
    $.ajax({
      type: "POST",
      url: link.attr("href"),
      dataType: "script",
      data: {},
      success: function(){}
    });
    return false;
  });
}

function initAjaxCheckbox() {  	
  $(".ui-checkbox.ajaxLink").live("click", function(){
    var $link = $(this);
    
    $link.toggleClass("ui-checkbox-state-checked");
    var mark = $link.hasClass("ui-checkbox-state-checked") ? 1 : 0;
    
    $("#" + $link.attr("rel")).show();
    $link.parent().find(".hide_while_loading").hide();
    
    ajaxUrl = $link.attr("href") + ($link.attr("href").indexOf("?") > 0 ? "&" : "?") + "mark=" + mark;
    
    //Send ajax request
    $.ajax({
      type: "POST",
      url: ajaxUrl,
      dataType: "script",
      data: {},
      success: function(){}
    });
    
    return false;
    
  });
}

function initTooltip() {
  var standard = {tip: 'leftTop', target: 'rightTop', tooltip: 'leftTop'};
  var inverted = {tip: 'rightTop', target: 'leftTop', tooltip: 'rightTop'};

  $(".tip").each(function()
  {
    var index = $(this).parents("td").attr("rel");    
    var content = $('#' + $(this).attr("rel")).html();
    var normal = index > 5 ? false : true;
    if ($(this).hasClass("inverted"))
      normal = false;
      
    $(this).qtip({
      content: content,
      style: {
        width: 300,
        padding: 5,
        background: '#000',
        color: '#fff',
        border: { width: 3, radius: 5, color: '#EC0075' },
        tip: normal ? standard.tip : inverted.tip
      },
      show: { deplay: 0, effect: { length: 0 } },
      hide: "mouseout",
      position: {
        corner: {
           target: normal ? standard.target : inverted.target,
           tooltip: normal ? standard.tooltip : inverted.tooltip
        },
        adjust: { y: 7, x: index > 5 ? -5 : 5 }
      }
    }); //qtip
  }); //each
}

function initTableSorter() {
	if (!$(".my_shows tbody tr").length)
		return;
	
	$.tablesorter.defaults.widgets = ['zebra'];
  
	// add parser through the tablesorter addParser method 
  $.tablesorter.addParser({ 
      // set a unique id 
      id: "date", 
      is: function(s) { 
          // return false so this parser is not auto detected 
          return false; 
      }, 
      format: function(s) { 
          // format your data for normalization
          if (s.indexOf(',') > 0)
          {
            re = /(?:January|February|March|April|May|June|July|August|September|October|November|December?)\s\d{1,2}[a-z]{2},\s\d{4}/;
            var date_string = null;
            var date = s.match(re)[0];
            var ds = date.replace(/st,|nd,|rd,|th,/,",");
            var parts = ds.split(",");
            var day_month = parts[0];
            var year = parts[1].substring(0,5);
            date_string = day_month + "," + year;
            var d = Date.parse(date_string);
            if (isNaN(d))
              return -9999999999999999999999;
            else
              return d;
          }
          else
            return -9999999999999999999999;
      }, 
      // set type, either numeric or text 
      type: "numeric"
  });
  
	$(".my_shows").tablesorter({
	  cssAsc: "asc",
	  cssDesc: "desc",
    headers: {
      0: { sorter: "string" }, 
      1: { sorter: "date" },
      2: { sorter: "date" },
      3: { sorter: false },
      4: { sorter: false }
    },
	  sortList: [[0,0]],
	  textExtraction: myTextExtraction,
	  sortMultiSortKey: 'altKey'
  });

  $(".my_shows").bind("sortEnd",function() {
    if ($("th.sort span").attr("style"))
    {
      var style = $("th.sort span").attr("style").replace("_desc", "_small").replace("_asc", "_small");
      var asc = style.replace("_small", "_desc");
      var desc = style.replace("_small", "_asc");
      $("th.sort span").attr("style", style);
      $("th.asc span").attr("style", asc);
      $("th.desc span").attr("style", desc);
    }
  }); 
}

  var myTextExtraction = function(node) {
    return $(node).text();
  }

function initTogglers() {
  $("a.toggler").click( function(){
    var e = $("#" + $(this).attr("rel"));
    e.is(':hidden') ? e.fadeIn(1000) : e.fadeOut(500);
    return false;
  });
}

function initCheckboxTogglers() {
  $(".toggler:checkbox").each( function() {
    setCheckbox($(this));
  });
  
  $(".toggler:checkbox").change( function(){
    setCheckbox($(this));    
  });
}

  function setCheckbox(chk) {
    var checked = chk.is(':checked');
    
    var checkbox = $("#" + chk.attr("rel") + "");
    var label = checkbox.nextAll("label");
    var ui_checkbox = checkbox.nextAll("span.ui-checkbox");
    
    if (checked) {
      label.removeClass("disabled");
      checkbox.removeAttr("disabled");
    }
    else {
      label.addClass("disabled");
      checkbox.attr({checked: false, disabled: true});
    }
    
    if (ui_checkbox)
      checkbox.checkBox('reflectUI');
  }

function renderProgress() {
  if ($("#progress").length) {
    $.ajax({
      type: "GET",
      url: "/render_progress/" + $("#progress").data("user-id"),
      dataType: "script",
      success: function(){}
    });
  }
}

function hideFlashes() {
  if ($("#notice").not(".static").length > 0)
    $("#notice").delay(5000).slideUp();
    
  if ($("#error").not(".static").length > 0)
    $("#error").delay(10000).slideUp();
}

function initFacebookLike() {
  if ($("#facebook_button").length > 0)
    setTimeout("insertFacebookButton()", 1000);
}

  function insertFacebookButton() {
    var id = $("#facebook_button").text();
    $.ajax({
      type: "GET",
      url: "/facebook_button/" + id,
      dataType: "script",
      data: {},
      success: function(){}
    });
  }

function initFacebookSend() {
  if ($("#fb-root").length) {
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=165505650138958";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
}

function initBannerReflection() {
  if ($("#show_info").length > 0)
    $("#show_info .show_banner img").reflect({ opacity: 0.28, height: 0.42 });
}

function initEpisodeOverviewToggle() {
  $(".season_list .overview a.toggle").live("click", function(){
    $this = $(this);
    $this.parent().hide();
    $this.parents(".overview").find("." + $this.attr("rel")).removeClass("hidden").show();
    return false;
  });
}

function initContentCarousel() {
  $("#settings_pagination a").click(function() {
    var index = $("#settings_pagination a").index(this);    
    $("#carousel_items .item").hide();
    $("#carousel_items .item").eq(index).show();    
    $("#settings_pagination li").removeClass("selected");
    $(this).parent().addClass("selected");    
    window.location.hash = "#" + parseInt(index + 1);
    return false;
  });
  
  var current_hash = window.location.hash;
  if (current_hash == "")
    current_hash = "#7";
  if (current_hash.indexOf("#") >= 0 ) {
    var hash_index = current_hash.replace("#", "");
    if (parseInt(hash_index))
      $("#settings_pagination a").eq(hash_index - 1).click();
  }
  
}

function initUnwatchedAnchors() {
  $("#show_anchors li a").click(function() {
    var $link = $(this);
    $("#show_anchors li a").removeClass("selected");
    $link.addClass("selected");
    $("#reload a span").text($link.text().replace(/\s\(\d+\)$/, ""));
    $("#unwatched_episodes > div").hide();
    var $wrapper = $("#" + $link.parent().attr("id") + "_episodes");
    if (!$wrapper.length)
    {
      $("#reload").hide();
      $("#unwatched_loader").removeClass("hidden").show();
      $.ajax({ 
        type: "POST",
        url: $link.attr("href"),
        dataType: "script",
        data: {},
        success: function() {}
      });
    }
    else {
      $wrapper.show();
      $("#reload").show();
    }
      
    return false;    
  });
  $("#show_anchors li:first a").click();
  
  $("#reload a").click(function(){
    $link = $("#show_anchors ul .selected");
    var id = $link.parent().attr("id");
    $("#" + id + "_episodes").remove();
    $link.click();
    return false;
  });
}

function initEpisodeHider() {
  $(".episode .hide a, .episode .unhide a").click(function(){

    var $link = $(this);
    var $episode = $link.parents(".episode");
    
    var hide = $episode.hasClass("hidden_episode") ? 0 : 1;
    
    $loader = $("#" + $link.attr("rel"));
    $loader.show();
    $episode.find(".hide_while_loading_small").hide();
    
    ajaxUrl = $link.attr("href") + ($link.attr("href").indexOf("?") > 0 ? "&" : "?") + "hide=" + hide;
    
    //Send ajax request
    $.ajax({
      type: "POST",
      url: ajaxUrl,
      dataType: "script",
      data: {},
      success: function(){
        $episode.find(".hide_while_loading_small").show();
        $episode.find(".ui-checkbox-state-checked").removeClass("ui-checkbox-state-checked");
        $loader.hide();
        hide === 0 ? $episode.removeClass("hidden_episode") : $episode.addClass("hidden_episode")
      }
    });
    
    return false;
  });
}

function initContactForm() {
  if (!$("#new_ticket").length)
    return;

  $form = $("#new_ticket");
  $checkbox = $("#contact :checkbox");
  $checkbox.checkBox("changeCheckStatus", false);
  $checkbox.click(function(){
    $form.toggleClass("disabled");
  });
  $form.submit(function(){
    if ($form.hasClass("disabled"))
      return false;
  });  
}

function initSlider() {
  if (!$("#slides").length)
    return;
    
  $("#slides").slides({
    play: 5500,
    pause: 3500,
    hoverPause: true,
    animationStart: function(current){
      $('.caption').animate({ bottom: -38 }, 200);
    },
    animationComplete: function(current){
      $('.caption').animate({ bottom: 0 }, 200);
    },
    slidesLoaded: function() {
      $('.caption').animate({ bottom: 0 }, 200);
    }
  });
}

function initLazyLoading() {
  $("img.lazy").lazy({
    afterLoad: function(element) {
      element.removeClass("loading").addClass("loaded");
    },
    onError: function(element) {
      element.addClass("broken");
    }
  });
}