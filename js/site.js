/*get values from forms, check that they are integers, 
if they are divide interestRate by 100 to get decimal then run
displayStats using parameters gathered from form
*/
function getValues() {
    let loanTotal = document.getElementById("loanTotal").value;
    let loanTerm = document.getElementById("term").value;
    let interestRate = document.getElementById("interest").value;

    loanTotal = parseFloat(loanTotal);
    loanTerm = parseInt(loanTerm);
    interestRate = parseFloat(interestRate) / 100;   

    if(Number.parseFloat(loanTotal) && Number.isInteger(loanTerm) && Number.parseFloat(interestRate)){

    let stats = displayStats(loanTotal, loanTerm, interestRate);
    return stats;

    } else {
        alert("Please enter a number")
    }
}

//calculate the fixed monthly payment
function calculateMonthlyPayment(lTotal, lTerm, iRate) {

    //divide yearly interest rate by 12 to get monthly interest rate
    let monthlyRate = iRate / 12;
    /* calculates the monthly payment amount needed to repay a loan
    within the term length including the principal and interest based
    on the loan, monthly interest rate, and loan term
    */
    let monthlyPayment = (lTotal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -lTerm));
    return monthlyPayment;
}

/*calculates the amount of principal paid off and interest paid, 
remaining balance, and total interest paid to date for each month
populates the table with with data monthly data
*/
function displayStats(lTotal, lTerm, iRate){

    let monthlyPayment = calculateMonthlyPayment(lTotal, lTerm, iRate);
    let remainingBalance = lTotal;
    let totalInterest = 0;

    //iterates over each month and performs payment calculations
    for (let month = 1; month <= lTerm; month++){

        let interestPayment = remainingBalance * (iRate / 12);
        let principalPayment = monthlyPayment - interestPayment;
        remainingBalance -= principalPayment;
        totalInterest += interestPayment;

        let template = document.getElementById("monthlyData-template").content.cloneNode(true);

        template.querySelector("[data-month]").textContent = month;
        template.querySelector("[data-payment]").textContent = "$" + monthlyPayment.toFixed(2).toLocaleString();
        template.querySelector("[data-principal]").textContent = "$" + principalPayment.toFixed(2).toLocaleString();
        template.querySelector("[data-interest]").textContent = "$" + interestPayment.toFixed(2).toLocaleString();
        template.querySelector("[data-totalInterest]").textContent = "$" + totalInterest.toFixed(2).toLocaleString();
        template.querySelector("[data-balance]").textContent = "$" + remainingBalance.toFixed(2).toLocaleString();

        paymentData.appendChild(template);

        /*once the month is greater than the term length populate top table with
        last total interest paid along with the amount of the loan and the total
        cost of the loan including interest*/
        if(month >= lTerm){

            let loanAmount = lTotal;
            let totalCost = lTotal += totalInterest;

            document.getElementById("lTotal").innerHTML = "$" + loanAmount.toFixed(2).toLocaleString();
            document.getElementById("tInterest").innerHTML = "$" +  totalInterest.toFixed(2).toLocaleString();
            document.getElementById("tCost").innerHTML = "$" +  totalCost.toFixed(2).toLocaleString();
            document.getElementById("monthlyPayment").innerHTML = "$" + monthlyPayment.toFixed(2).toLocaleString();
            
        }
    }
}