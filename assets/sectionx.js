(function(){

	var clickAction = function clickAction(source, tar){

		source.click(function(){

			target = '#' + tar;

			$(target).on('show.bs.collapse', function(){
				if(source.attr('hide'))
					source.html("<b>"+ source.attr('hide') +"</b><span class='fa fa-angle-up pull-left'/>");
				else
					source.html("<span class='fa fa-angle-up'/>");
			});

			$(target).on('hide.bs.collapse', function(){
				if(source.attr('show'))
					source.html("<b>"+ source.attr('show') +"</b><span class='fa fa-angle-down pull-left'/>");
				else
					source.html("<span class='fa fa-angle-down'/>");
			});

			$(target).collapse("toggle");

		});
	};

	var init = function init(){

		$('sec').each(function(){

			var html = $(this).html();
			var content = ''
				+ '<div class="panel panel-default">'
				+ '	<div class="panel-heading">'
				+ '		<h2></h2>'
				+ '	</div>'
				+ '	<div class="panel-collapse collapse">'
				+ ' 	<div class="panel-body">'
				+ html
				+ '		</div>'
				+ '	</div>'
				+ '</div>';

			$(this).html(content);
			$(this).find('h2').text($(this).data('title'));
			$(this).find('.panel-collapse.collapse').attr("id", $(this).data('id'));

			if($(this).data('show'))
			{
				$(this).find('.panel-collapse.collapse').addClass('in');
				$(this).find('.panel-heading').children('h2').append('<a class="pull-right section atTitle" target="' + $(this).data('id') + '"><span class="fa fa-times" /></a>');
			}

		});

		$('.section').each(function(){

			if($(this).attr('show'))
				$(this).html("<b>"+ $(this).attr('show') +"</b><span class='fa fa-angle-down pull-left'/>");
			else
				$(this).html("<span class='fa fa-angle-down'/>");

			if($(this).hasClass('atTitle'))
				$(this).addClass('btn').addClass('btn-default');
			else
				$(this).addClass('btn').addClass('btn-primary');

			clickAction($(this), $(this).attr('target'));
		});	

		if($('div.book').hasClass('color-theme-2'))
			$('.panel').each(function(){
				$(this).addClass('dark');
			});

		$('#color-theme-preview-0, #color-theme-preview-1').click(function(){
			$('.panel').each(function(){
				$(this).removeClass('dark');
			});	
		});

		$('#color-theme-preview-2').click(function(){
			$('.panel').each(function(){
				if($(this).hasClass('dark') === false)
					$(this).addClass('dark');
			});
		});

	};

	require(["gitbook"], function(gitbook) {

		gitbook.events.bind("page.change", function(){
			init();
		});
		
	});

})();

