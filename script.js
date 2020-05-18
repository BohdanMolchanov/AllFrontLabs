const pushStatus = (message, errType) => {
    console.log(message);
    $("#status")
        .text(errType === "err" ? message.responseJSON.message : `Your token is ${message}`)
        .css(errType === "err" ? {color : "red"} : {color : "black"})
}
const validate = () => {
    return ($('#email-in').val() && $('#password-in').val() && $('#message-in').val()) ? true : false;
}

const printEmployees = ({employee_name, employee_salary, employee_age}) => {
    $('#employees-list')
        .append(`<li>Name is: ${employee_name}; Salary is: ${employee_salary}; Age is: ${employee_age};</li>`);
}

$(document).ready(() => {
    $("#login-form").on('submit', (e) => {
        e.preventDefault();
        const username = $('#email-in').val();
        const password = $('#password-in').val();
        const message = $('#message-in').val();
        const data = JSON.stringify({username, password});
        if(validate())
            //sending request to get JWT token
            $.ajax({
                type: "POST",
                url: "http://localhost:4000/auth/authenticate",
                data: data,
                headers: {
                    'Content-Type':'application/json'
                },
                success: (result) => pushStatus(result.token),
                error: (error) => pushStatus(error, "err")
            });
        else $("#status")
            .text("Validation error. Fill all the fields correctly")
            .css({color : "red"});
    });
    $('#employees-list').ready(() => {
        $.ajax({
            type: "GET",
            url: "http://dummy.restapiexample.com/api/v1/employees",
            success: (result) => result.data.map(employee => printEmployees(employee)),
            error: (error) => $('#employees-list').text("Something went wrong while loading employees list. Check console for errors")
        });
    })
})