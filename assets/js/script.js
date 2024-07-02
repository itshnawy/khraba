const sheetId = "1A5eTnALiSbdoYwsHnUGJhASXEx_o3ZPo2xxdYFGegMQ";
const sheetName = encodeURIComponent("Sheet1");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

fetch(sheetURL)
  .then((response) => response.text())
  .then((csvText) => {
    let rows = csvText.split('\n');
    let rowsCount = rows.length;
    document.getElementById("count").innerHTML = "متوفر " + (rowsCount - 1) + " مدينة " + " من اصل " + 396 + " مدينة";

    handleResponse(csvText)
  });

function handleResponse(csvText) {
  let data = csvText
  document.getElementById("area").addEventListener("change", () => {
    var governorate = document.getElementById("gov").value;
    var area = document.getElementById("area").value;
    var result = searchCSV(data, governorate, area);

    document.getElementById("output").style.display = "block";
    document.getElementById("output").innerHTML = result;

  })
}

// Function to search CSV data
function searchCSV(csvData, governorate, area) {
  var rows = csvData.split('\n');
  var results = [];
  for (var i = 1; i < rows.length; i++) {
    var columns = rows[i].split(',');
    var submittedAt = columns[0].replace(/"/g, '').trim();
    var csvGovernorate = columns[1].replace(/"/g, '').trim();
    var csvArea = columns[2].replace(/"/g, '').trim();
    var cuttingTime = columns[3].replace(/"/g, '').trim();

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

