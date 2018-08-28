//Old script for the news filtering
var targetDiv = '.loadnews'
$savedDateURL = ''
$savedURL = ''
$('.categories ul li a').click(function(e) {
    $('.loading').show();
    e.preventDefault();
    $('.categories ul li a').removeClass('active');
    $(this).addClass('active');
    $savedURL = $(this).attr('href');
    var savedFinalURL = '//www.devmatrix.act.gov.au/tc/functionality/news-and-events/news-search?queries_category_query=' + $(this).attr('href') + '&date=' + $savedDateURL;
    $(targetDiv).load(savedFinalURL);
    //console.log(savedFinalURL);
});

$('.meta .newscategory a').click(function(e) {
    $('.loading').show();
    e.preventDefault();
    $('.deep-nav-menu ul li a').removeClass('active');
    var savedURL = $(this).attr('href');
    $('.deep-nav-menu').find('[href="'+ savedURL +'"]').addClass('active');
    $(targetDiv).load('//www.devmatrix.act.gov.au/tc/functionality/news-and-events/news-search?queries_category_query=' + savedURL);
    //console.log('./?a=http://www.devmatrix.act.gov.au/tc/functionality/news-and-events/news-search?queries_category_query=' + savedURL);
    
});

$('.date ul li a').click(function(e) {
    $('.loading').show();
    e.preventDefault();
    $('.date ul li a').removeClass('active');
    $(this).addClass('active');
    $savedDateURL = $(this).attr('href');
    var savedFinalURL = '//www.devmatrix.act.gov.au/tc/functionality/news-and-events/news-search?date=' + $(this).attr('href') + '&queries_category_query=' + $savedURL;
    $(targetDiv).load(savedFinalURL + '&search_page_1215104_submit_button=Submit');
    //console.log(savedFinalURL + '&search_page_1215104_submit_button=Submit');
});

//This function lets us use AJAX to load in the content while still being able to use arrows in the pagination (currently the .load in newsPaginationFunction is firing twice so i've hardcoded the hrefs first part for now, also need to add logic to hide/show if first or last item)
var paginationArrowsFunction = function() {
    var currentPage = parseInt($('.currentpagenumber').text());
    //var prevPageHref = $('.prev-pagination').attr('href');
    //var nextPageHref = $('.next-pagination').attr('href');
    var nextPageHref = 'https://www.devmatrix.act.gov.au/tc/functionality/news-and-events/news-search?queries_category_query=0001&result_1215104_result_page='
    var prevPageHref = 'https://www.devmatrix.act.gov.au/tc/functionality/news-and-events/news-search?queries_category_query=0001&result_1215104_result_page='
    var prevPageNumber = currentPage-1
    var nextPageNumber = currentPage+1
    $('.prev-pagination').attr('href', prevPageHref+prevPageNumber);
    $('.next-pagination').attr('href', nextPageHref+nextPageNumber);
};
paginationArrowsFunction();

  
var newsPaginationFunction = function() {
    $(document).unbind('click');
    $(document).on('click', '.newspagination a', function(e) {
        $('.loading').show();
        e.preventDefault();
        var savedURL = $(this).attr('href');
        $(targetDiv).load(savedURL, function() {
            $('.loading').hide();
            paginationArrowsFunction();
        })
    });
};
newsPaginationFunction();

$("#search_page_1215127 #btnSearchNews").click(function(e) {
    $('.loading').show();
    e.preventDefault();
    var savedURL = $("#search_page_1215127 input[name='queries_text_query']").val();
    console.log(savedURL);
    var savedFinalURL = '//www.devmatrix.act.gov.au/tc/functionality/news-and-events/news-filter-text?queries_text_query='+savedURL;
    $(targetDiv).load(savedFinalURL+'&search_page_1215127_submit_button=Submit');
});


//top nav
$('button.showmenu').click(function() {
    $(this).toggleClass('white-background');
    $('button.showmenu i').toggleClass('hidden');
});


// Datepicker
var dateRange = 2015;
$('.datePicker').datepicker({
	//showOn: 'both',
	//buttonImage: './?a=1126604',
	//buttonImageOnly: true,
	//buttonText: 'Select date',
	changeYear: true,
	dateFormat: "dd/mm/yy",
	minDate: minDate(),
	yearRange: yearRange(),
	onSelect: function(dateText, inst) {
		var type = $(this).attr('data-date');
		$('#q1219814_q2_value_d').val(inst.selectedDay);
		$('#q1219814_q2_value_m').val(inst.selectedMonth+1);
		$('#q1219814_q2_value_y').val(inst.selectedYear);
	}
});
function minDate() { return new Date(dateRange, 1 - 1, 1); }
function yearRange() { return dateRange + ":+nn"; }

//prevent default on side nav collapse/expand icon
$('.spf-side-nav--first a i').click(function(e) {
    e.preventDefault();
});
