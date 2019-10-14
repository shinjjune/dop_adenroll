$(function(){
    $('.input-group.date').datepicker({
        calendarWeeks: false,
        todayHighlight: true,
        autoclose: true,
        format: "yyyy/mm/dd",
        language: "kr"
    });
}); //datapicker form

function checkable(frm)
{
    if( frm.surveyCheck.checked == true ){
	   frm.survey.disabled = false;
	} else 
	{
	   frm.survey.disabled = true;
	}
}