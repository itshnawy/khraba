        // sheetID you can find in the URL of your spreadsheet after "spreadsheet/d/"
        const sheetId = "1A5eTnALiSbdoYwsHnUGJhASXEx_o3ZPo2xxdYFGegMQ";
        // sheetName is the name of the TAB in your spreadsheet
        const sheetName = encodeURIComponent("Sheet1");
        const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
        
        fetch(sheetURL)
          .then((response) => response.text())
          .then((csvText) => handleResponse(csvText));
        
        function handleResponse(csvText) {
          let data = csvText
          document.getElementById("area").addEventListener("change", () => {
            // Search terms
            var governorate = document.getElementById("gov").value;
            var area = document.getElementById("area").value;
            // Search CSV data
            var result = searchCSV(data, governorate, area);

            // Print result
            document.getElementById("output").style.display = "block";
            document.getElementById("output").innerHTML = result;
            
        })
        }








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



    