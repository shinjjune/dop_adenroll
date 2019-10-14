$(document).ready(function () {
    $('#btnSave').click(function () {
        const title = $('#title').val();
        const companyName = $('#companyName').val();
        const companyAddress = $('#companyAddress').val();
        const companyURL = $('#companyURL').val();
        const managerName = $('#managerName').val();
        const managerEmail1 = $('#managerEmail1').val();
        const managerEmail2 = $('#managerEmail2').val();
        const missionCondition = $('#missionCondition').val();
        const missionUserNum = $('#missionUserNum').val();
        const content = $('#content').val();
        const tag = $('#tag').val();
        const inputGroupFile = $('#inputGroupFile').val(); //주의
        const startDate = $('#startDate').val();
        const endDate = $('#endDate').val();
        const survey = $('#survey').val();
        // const survey =$('#survey').val();
        // const survey =$('#survey').val();
            
        const enroll_params = {
            title,
            companyName,
            companyAddress,
            companyURL,
            managerName,
            managerEmail1,
            managerEmail2,
            missionCondition,
            missionUserNum,
            content,
            tag,
            inputGroupFile,
            startDate,
            endDate,
            survey
        };

        $.post('/boardReq', enroll_params, function (data, status) {
            const data_parse = JSON.parse(data);
            alert(data_parse.msg);
            location.href = "/dop"

        });
    });
});