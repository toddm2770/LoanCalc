function getValues(){
    let loanTotal = document.getElementById("loanTotal").value;
    let loanTerm = document.getElementById("term").value;
    let interestRate = document.getElementById("interest").value;

    loanTotal = parseInt(loanTotal);
    loanTerm = parseInt(loanTerm);
    interestRate = parseFloat(interestRate)/100;

    let totalInterest = calculateTotalInterest(loanTotal, interestRate);
    let monthlyPayment = calculateMonthlyPayment(loanTotal, loanTerm, interestRate);
    let payments = displayPayments(loanTotal, loanTerm, interestRate, monthlyPayment);
    return {totalInterest, monthlyPayment, payments};
}

function calculateTotalInterest(lTotal, iRate){
    let totalInterest = lTotal * iRate;
    let totalCost = totalInterest + lTotal;
    displayStatsTop(lTotal, totalInterest, totalCost);
    return totalInterest;
}

function displayStatsTop(lTotal, tInterest, tCost){
    document.getElementById("lTotal").innerHTML = "$" + lTotal.toLocaleString();
    document.getElementById("tInterest").innerHTML = "$" +  tInterest.toLocaleString();
    document.getElementById("tCost").innerHTML = "$" +  tCost.toLocaleString();
}

function calculateMonthlyPayment(lTotal, lTerm, iRate){
    let monthlyRate = iRate / 12;
    let totalMonthlyPayment = lTotal * (monthlyRate) / (1 - Math.pow(1 + monthlyRate, -lTerm));
    document.getElementById("monthlyPayment").innerHTML = "$" + totalMonthlyPayment.toLocaleString();
    return totalMonthlyPayment;
}

function displayPayments(lTotal, lTerm, iRate, monthlyPayment) {
    // Prepare the table body
    let paymentData = document.getElementById("paymentData");
    paymentData.innerHTML = ""; // Clear any existing data

    let balance = lTotal;
    let totalInterest = 0;

    for (let month = 1; month <= lTerm; month++) {
        let monthlyRate = iRate / 12;
        let interestPayment = balance * monthlyRate;
        let principalPayment = monthlyPayment - interestPayment;
        balance -= principalPayment;
        totalInterest += interestPayment;

        // Ensure balance doesn't go negative
        if (balance < 0) balance = 0;

        // Get the template and clone it
        let template = document.getElementById("monthlyData-template").content.cloneNode(true);

        // Set the values for the current month
        template.querySelector("[data-month]").textContent = month;
        template.querySelector("[data-payment]").textContent = "$" + monthlyPayment.toLocaleString();
        template.querySelector("[data-principal]").textContent = "$" + principalPayment.toLocaleString();
        template.querySelector("[data-interest]").textContent = "$" + interestPayment.toLocaleString();
        template.querySelector("[data-totalInterest]").textContent = "$" + totalInterest.toLocaleString();
        template.querySelector("[data-balance]").textContent = "$" + balance.toLocaleString();

        // Append the populated row to the table
        paymentData.appendChild(template);
    }
}