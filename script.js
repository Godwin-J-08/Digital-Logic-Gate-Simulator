document.addEventListener("DOMContentLoaded", function () {

    const gate = document.getElementById("gate");
    const inputA = document.getElementById("inputA");
    const inputB = document.getElementById("inputB");

    const output = document.getElementById("output");
    const calculateButton = document.getElementById("calculateButton");

    const inputBLabel = document.querySelector('label[for="inputB"]');

    const displayA = document.getElementById("displayA");
    const displayB = document.getElementById("displayB");
    const displayOutput = document.getElementById("displayOutput");
    const gateDisplay = document.getElementById("gateDisplay");

    const truthTableBody = document.getElementById("truthTableBody");


    // -------------------------------
    // Calculate Logic Gate Output
    // -------------------------------

    calculateButton.addEventListener("click", function () {

        let A = Number(inputA.value);
        let B = Number(inputB.value);

        let selectedGate = gate.value;
        let result;


        if (selectedGate === "AND") {
            result = A && B;
        }

        else if (selectedGate === "OR") {
            result = A || B;
        }

        else if (selectedGate === "NOT") {
            result = A === 0 ? 1 : 0;
        }

        else if (selectedGate === "NAND") {
            result = !(A && B) ? 1 : 0;
        }

        else if (selectedGate === "NOR") {
            result = !(A || B) ? 1 : 0;
        }

        else if (selectedGate === "XOR") {
            result = A !== B ? 1 : 0;
        }

        else if (selectedGate === "XNOR") {
            result = A === B ? 1 : 0;
        }


        // Display output

        output.textContent = "Output = " + result;

        displayA.textContent = A;
        displayB.textContent = B;
        displayOutput.textContent = result;
        gateDisplay.textContent = selectedGate;

    });


    // -------------------------------
    // Generate Truth Table
    // -------------------------------

    function generateTruthTable() {

        truthTableBody.innerHTML = "";

        let selectedGate = gate.value;


        // NOT gate

        if (selectedGate === "NOT") {

            let combinations = [0, 1];

            combinations.forEach(function (A) {

                let result = A === 0 ? 1 : 0;

                let row = document.createElement("tr");

                row.innerHTML = `
                    <td>${A}</td>
                    <td>-</td>
                    <td>${result}</td>
                `;

                truthTableBody.appendChild(row);

            });

        }


        // Two-input gates

        else {

            let combinations = [
                [0, 0],
                [0, 1],
                [1, 0],
                [1, 1]
            ];


            combinations.forEach(function (values) {

                let A = values[0];
                let B = values[1];

                let result;


                if (selectedGate === "AND") {
                    result = A && B;
                }

                else if (selectedGate === "OR") {
                    result = A || B;
                }

                else if (selectedGate === "NAND") {
                    result = !(A && B) ? 1 : 0;
                }

                else if (selectedGate === "NOR") {
                    result = !(A || B) ? 1 : 0;
                }

                else if (selectedGate === "XOR") {
                    result = A !== B ? 1 : 0;
                }

                else if (selectedGate === "XNOR") {
                    result = A === B ? 1 : 0;
                }


                let row = document.createElement("tr");

                row.innerHTML = `
                    <td>${A}</td>
                    <td>${B}</td>
                    <td>${result}</td>
                `;

                truthTableBody.appendChild(row);

            });

        }

    }


    // -------------------------------
    // Change Gate
    // -------------------------------

    gate.addEventListener("change", function () {

        if (gate.value === "NOT") {

            inputB.style.display = "none";
            inputBLabel.style.display = "none";

        }

        else {

            inputB.style.display = "inline-block";
            inputBLabel.style.display = "block";

        }


        // Update truth table

        generateTruthTable();

    });


    // Generate table when page loads

    generateTruthTable();

});