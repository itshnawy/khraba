   // Function to search CSV data
   function searchCSV(csvData, governorate, area) {
    // Split CSV data into rows
    var rows = csvData.split('\n');
    
    // Initialize variable to store result
    var results = [];
    
    // Loop through each row
    for (var i = 1; i < rows.length; i++) { // Start from index 1 to skip header row
        // Split row into columns
        var columns = rows[i].split(',');
        
        // Extract relevant data
        var submittedAt = columns[2].replace(/"/g, '').trim();
        var csvGovernorate = columns[3].replace(/"/g, '').trim();
        var csvArea = columns[4].replace(/"/g, '').trim();
        var cuttingTime = columns[5].replace(/"/g, '').trim();
        
        // Check if governorate and area match
        if (csvGovernorate === governorate && csvArea === area) {
            results.push({
                submittedAt: submittedAt,
                cuttingTime: cuttingTime
            });
        }
    }
    
    // Sort results by submittedAt in descending order
    results.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    
    // Return last cutting time
    return results.length > 0 ? results[0].cuttingTime : "مفيش مواعيد موجوده، لو تعرف معاد القطع ضيفه في الداتا";
}

// Fetch data from CSV file
fetch('./assets/data/data.csv')
    .then(response => response.text())
    .then(csvData => {
        document.getElementById("area").addEventListener("keyup", (event) => {
            if (event.keyCode === 13) { // press enter button
            // Search terms
            var governorate = document.getElementById("gov").value;
            var area = document.getElementById("area").value;

            // Search CSV data
            var result = searchCSV(csvData, governorate, area);

            // Print result
            document.getElementById("output").style.display = "block";
            document.getElementById("output").innerHTML = result;
            }
        });
    })
    .catch(error => console.error('Error fetching CSV file:', error));